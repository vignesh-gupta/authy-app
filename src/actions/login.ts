"use server";

import { LoginSchema } from "@/schemas";
import { z } from "zod";
import { hash } from "bcryptjs";
import { SALT_ROUNDS } from "@/lib/constants";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.parse(values);

  if (!validatedFields) return { error: "Invalid fields" };

  const { email, password } = validatedFields;
  const hashedPassword = await hash(password, SALT_ROUNDS);

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default:
          return { error: "Something went wrong!" }
      }
    }

    throw error;
  }
  return { success: "Email sent!" };
};
