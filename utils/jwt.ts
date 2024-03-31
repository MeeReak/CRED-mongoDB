import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "./classError";
import { StatusCode } from "./statusCode";

export const generatePassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw Error("Unable to generate password");
  }
};
