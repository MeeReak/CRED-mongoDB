import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "./utils/classError";
import { StatusCode } from "./utils/statusCode";

const salt = 10;

export const generatePassword = async (password: string) => {
  try {
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw Error("Unable to generate password");
  }
};
