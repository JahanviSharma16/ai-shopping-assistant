import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.email("Please provide a valid email address").trim().toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
  avatar: z.string().trim().url("Avatar must be a valid URL").optional(),
});

export const loginSchema = z.object({
  email: z.email("Please provide a valid email address").trim().toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().trim().min(1, "Refresh token is required"),
});

export const logoutSchema = refreshTokenSchema;
