import * as z from "zod";

export const userSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters long"),
  age: z.number().positive().int("Age must be a positive integer"),
  university: z.string()
});
