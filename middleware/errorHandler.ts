import { ApiError } from "../utils/classError";
import { Response, Request, NextFunction } from "express";

export const handError = (err: any , req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    const { statusCode, message } = err;
    try {
      const parsedMessage = JSON.parse(message);
      res.status(statusCode).json({ statusCode, message: parsedMessage });
    } catch (parseErr) {
      res.status(statusCode).json({ statusCode, message });
    }
  } else {
    next(err);
  }
};