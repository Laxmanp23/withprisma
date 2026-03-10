import { z } from "zod";

export const userResponseSchema = z.object({
  name: z.string(),
  email: z.email(),
  phone: z.string(),
  password: z.string(),
  
});