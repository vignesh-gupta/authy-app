import * as zod from "zod";

export const LoginSchema = zod.object({
  email: zod.string().email({
    message: "Enter a valid email",
  }),
  password: zod.string().min(1, {
    message: "Password is required",
  }),
  code: zod.optional(zod.string()),
});

export const RegisterSchema = zod.object({
  email: zod.string().email({
    message: "Enter a valid email",
  }),
  password: zod.string().min(6, {
    message: "Password should be at least 6 characters long",
  }),
  name: zod.string().min(1, {
    message: "Name is required",
  }),
});

export const ResetSchema = zod.object({
  email: zod.string().email({
    message: "Enter a valid email",
  }),
});

export const PasswordSchema = zod.object({
  password: zod.string().min(6, {
    message: "Password should be at least 6 characters long",
  }),
});
