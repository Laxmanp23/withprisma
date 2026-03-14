import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10).max(10),
  password: z.string().min(6)
});

export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().min(10).max(10).optional(),
  role: z.enum(["ADMIN", "STAFF"]).optional()
});


export const idParamSchema = z.object({
  id: z.coerce.number()
});