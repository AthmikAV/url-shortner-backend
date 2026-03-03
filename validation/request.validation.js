import { email, z } from "zod";

export const signupPostRequestBodySchema = z.object({
  firstname: z
    .string()
    .min(3, "First name must be at least 3 characters"),

  lastname: z
    .string()
    .optional(),

  email: z
    .string()
    .email("Invalid email format"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
});

export const loginPostRequestBodySchema = z.object({
  email: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export const shortenPostRequestBodySchema = z.object({
  url: z.string().url(),
  shortCode:z.string().optional(),
})