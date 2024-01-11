"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { SALT_ROUNDS } from "@/lib/constants";
import db from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { SettingSchema } from "@/schemas";
import { compare, hash } from "bcryptjs";
import { z } from "zod";

export const settings = async (values: z.infer<typeof SettingSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized!" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  // Update password handling
  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await compare(values.password, dbUser.password);

    if (!passwordMatch) {
      return { error: "Incorrect Password!" };
    }

    const hashedPassword = await hash(values.newPassword, SALT_ROUNDS);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  // Update email handling
  if (values.email && values.email !== dbUser.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already exists!" };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Verification email sent!." };
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      ...values,
    },
  });

  return { success: "Setting updated!" };
};
