import * as zod from 'zod';

export const LoginSchema = zod.object({
  email: zod.string().email({
    message: 'Enter a valid email',
  }),
  password: zod.string().min(1, {
    message: 'Password is required',
  }),
});