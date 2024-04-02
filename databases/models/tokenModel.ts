import mongoose from "mongoose";
import { Schema } from "mongoose";
import { ApiError } from "../../utils/classError";
import { StatusCode } from "../../utils/statusCode";

export interface IToken extends mongoose.Document {
  id: string;
  token: string;
}

const tokenSchema = new Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
    validate: (value: string): boolean => {
      if (!value || value.length !== 64) {
        throw new ApiError(
          "Invalid email verification token",
          StatusCode.BadRequest
        );
      }
      return true;
    },
  },
});

export default mongoose.model<IToken>("Token", tokenSchema);
