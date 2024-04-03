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

export const generateTokenJWT = async (payload: object) => {
  try {
    return await jwt.sign(payload, process.env.APP_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } catch (error) {
    throw new ApiError(
      "Unable to generate signature from jwt",
      StatusCode.BadRequest
    );
  }
};

export const verifyPassword = async (pass: string, hashPass: string) => {
  const isMatch = await bcrypt.compare(pass, hashPass);
  if (!isMatch) {
    throw new ApiError("Invalid username or password", StatusCode.BadRequest);
  }
};
