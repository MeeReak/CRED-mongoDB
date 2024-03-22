import mongoose, { Document } from "mongoose";
import { boolean, isValid, string } from "zod";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  phone: string;
  isVerify: boolean;
}

const userSchema = new mongoose.Schema(
  {
    username: { type: string, required: true },
    email: { type: string, required: true, unique: true },
    password: { type: string, required: true },
    isVerify: { type: boolean, default: false },
  },
  {}
);
