import { Request, Response, NextFunction } from "express";
import { userSchema } from "../schema/userSchema"; // Import the schema
import { ZodError } from "zod";
import { StatusCode } from "../utils/statusCode";
import { ApiError } from "../utils/classError";

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
      const formattedErrorString = JSON.stringify(formattedErrors)
      const inputError = new ApiError(formattedErrorString, StatusCode.NotFound)
      next(inputError)
     
    } else {
      console.error("Unexpected error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
