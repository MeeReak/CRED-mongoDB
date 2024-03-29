import { ApiError } from "../../utils/classError";
import { StatusCode } from "../../utils/statusCode";
import userModel from "../models/userModel";

export class UserRepo {
  async SignUp(newData: object) {
    try {
      return await userModel.create(newData);
    } catch (error) {
      throw new ApiError("The email already use", StatusCode.OK);
    }
  }
}
