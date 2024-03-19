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
  const errorID = new ApiError("Invalid ID", StatusCode.NotFound);
  // console.log(errorID)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    next(errorID);
  }
  next();
};
