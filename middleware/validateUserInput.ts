import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/classError";
import { StatusCode } from "../utils/statusCode";
import { userSchema } from "../schema/userSchema";
import { ZodError } from "zod";

export const validateUserInput = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    userSchema.parse(req.body);
    _next();
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.issues.reduce(
        (acc: { [key: string | number]: string }, issue) => {
          acc[issue.path[0]] = issue.message;
          return acc;
        },
        {}
      );
      const formattedErrorString = JSON.stringify(formattedErrors);
      const inputError = new ApiError(
        formattedErrorString,
        StatusCode.NotFound
      );
      _next(inputError);
      _next(new ApiError("Internal Server Error!!", StatusCode.BadRequest));
    }
  }
};
