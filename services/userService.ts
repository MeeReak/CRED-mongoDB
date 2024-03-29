import { UserRepo } from "../databases/repositories/userRepo";

export class UserService{
  repo: any;
  constructor(){
    this.repo = new UserRepo();
  }

  async SignUp(newData: object){
    return await this.repo.SignUp(newData);
  }
}