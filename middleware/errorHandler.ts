import { Request, Response } from "express";
import { ApiError } from "../utils/classError";

export const handError = (
  err: any,
  req: Request,
  res: Response,
  next: () => void
) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: JSON.parse(err.message),
    });
  }
  next();
};
