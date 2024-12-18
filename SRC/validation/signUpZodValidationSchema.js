import { z } from 'zod';

export const signUpZodSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  username: z.string().min(3)
});

export const signInZodSchema = z.object({
  email: z.string().email(),
  password: z.string()
});
