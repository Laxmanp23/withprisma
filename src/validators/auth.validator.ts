import { email, z } from "zod";

export const singnUpUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone must be 10 digits"),
  // role: z.enum(["SUPER_ADMIN","ADMIN","STAFF"])
});

export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).optional()
});

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive()
});

export const userQuerySchema = z.object({
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional()
});