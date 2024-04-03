import { ApiError } from "../../utils/classError";
import { StatusCode } from "../../utils/statusCode";
import userModel from "../models/userModel";

export class UserRepo {
  // Create a new user
  async SignUp(newData: object) {
    try {
      return await userModel.create(newData);
    } catch (error) {
      throw new ApiError(
        "The email already SignUp, Please Check your mail box and Verify!!",
        StatusCode.NotFound
      );
    }
  }

  async FindUserById(id: string) {
    try {
      return await userModel.findById(id);
    } catch (error) {
      throw new ApiError("User does not exist!", StatusCode.NotFound);
    }
  }

  async FindUserByEmail(email: string) {
    try {
      return await userModel.findOne({ email });
    } catch (error) {
      throw new ApiError("User not Found", StatusCode.NotFound);
    }
  }
}
