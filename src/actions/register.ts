"use server";

import { getUserByEmail } from "@/data/user";
import { SALT_ROUNDS } from "@/lib/constants";
import db from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { hash } from "bcryptjs";
import { z } from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.parse(values);

  if (!validatedFields) return { error: "Invalid fields" };

  const { email, password, name } = validatedFields;
  const hashedPassword = await hash(password, SALT_ROUNDS);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: "Email already in use!" };

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // TODO: Send verification token email

  return { success: "Email sent!" };
};
