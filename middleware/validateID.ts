import mongoose from "mongoose";
import { Request, Response } from "express";
import { ApiError } from "../utils/classError";

export const validateID = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const { id } = req.params;
  const errorID = new ApiError("Invalid ID", 404);
  // console.log(errorID)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    next(errorID);
  }
  next();
};
