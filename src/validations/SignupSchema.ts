import { z } from "zod";

export const signupSchema = z.object({
  username: z.email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(8, "Password confirmation is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // error will be shown on the confirmPassword field
});

export type SignupSchema = z.infer<typeof signupSchema>;