import { ApiError } from "../../utils/classError";
import { StatusCode } from "../../utils/statusCode";
import userModel from "../models/userModel";

export class UserRepo {
  // Create a new user
  async SignUp(newData: object) {
    try {
      return await userModel.create(newData);
    } catch (error) {
      throw new ApiError("The email already use", StatusCode.OK);
    }
  }

  async FindUserById(id: string) {
    try {
      return await userModel.findById(id);
    } catch (error) {
      throw new ApiError("User does not exist!", StatusCode.NotFound);
    }
  }


}
