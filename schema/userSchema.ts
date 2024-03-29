import * as z from "zod";

export const userSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters long"),
  email: z.string().trim().min(3, "Name must be at least 3 characters long"),
  password: z.string().trim().min(3, "Name must be at least 3 characters long"),
});
