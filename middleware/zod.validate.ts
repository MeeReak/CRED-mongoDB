import { Request, Response, NextFunction } from "express";
import { userSchema } from "../schema/userSchema"; // Import the schema
import { ZodError } from "zod";

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    userSchema.parse(req.body);
    next();
  } catch (error: any) {
    if (error instanceof ZodError) {
      const formattedErrors = error.issues.reduce(
        (acc: { [key: string | number]: string }, issue) => {
          acc[issue.path[0]] = issue.message;
          return acc;
        },
        {}
      );
      return res.status(400).json({ error: formattedErrors });
    } else {
      console.error("Unexpected error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
