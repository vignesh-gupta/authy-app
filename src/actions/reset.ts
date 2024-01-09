"use server";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { SALT_ROUNDS } from "@/lib/constants";
import db from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";
import { PasswordSchema, ResetSchema } from "@/schemas";
import { hash } from "bcryptjs";
import { z } from "zod";

export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
  const validatedField = ResetSchema.safeParse(values);

  if (!validatedField.success) {
    return { error: "Invalid Email!" };
  }

  const { email } = values;
  const existingUser = await db.user.findUnique({
    where: { email },
  });
  if (!existingUser) {
    return { error: "Invalid Email!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset Email sent!" };
};

export const newPassword = async (
  values: z.infer<typeof PasswordSchema>,
  token: string
) => {
  if (!token) return { error: "Missing token!" };

  const validatedField = PasswordSchema.safeParse(values);

  if (!validatedField.success) {
    return { error: "Invalid Field!" };
  }
  const { password } = values;

  // Check if token is valid
  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: "Invalid Token!" };
  }

  // Check if token is expired
  if (existingToken.expiresAt < new Date()) {
    return { error: "Token Expired!" };
  }

  // Check if user exists
  const existingUser = await db.user.findUnique({
    where: { email: existingToken.email },
  });
  if (!existingUser) {
    return { error: "User does not exist!" };
  }

  // Update user password

  const hashedPassword = await hash(password, SALT_ROUNDS);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });


  // Delete token
  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });



  return { success: "Password Reset!" };
};
