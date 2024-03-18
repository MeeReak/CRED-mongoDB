import { Timestamp } from "mongodb";
import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface IStudent {
  name: string;
  age: number;
  university: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    university: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
