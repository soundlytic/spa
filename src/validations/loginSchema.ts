import { z } from "zod";

export const loginSchema = z.object({
  username: z.email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 6 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;