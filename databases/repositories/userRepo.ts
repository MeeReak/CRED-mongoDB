import userModel from "../models/userModel";

export class UserRepo{
  async SignUp(newData: object){
    try{
      return await userModel.create(newData);
    }catch(error){
      console.log(error)
    }
  }
}