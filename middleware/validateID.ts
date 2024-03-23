import mongoose from "mongoose";
import { Request, Response } from "express";
import { ApiError } from "../utils/classError";
import { StatusCode } from "../utils/statusCode";

export const validateID = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const { id } = req.params;

  // console.log(errorID)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    next(new ApiError("Invalid ID", StatusCode.NotFound));
  }
  next();
};
