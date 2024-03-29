import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  inVerified: boolean;
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("User", userSchema);
