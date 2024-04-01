import { UserRepo } from "../databases/repositories/userRepo";
import { generateVerificationToken } from "../utils/generateToken";

export class UserService {
  repo: any;
  constructor() {
    this.repo = new UserRepo();
  }

  async SignUp(newData: object) {
    return await this.repo.SignUp(newData);
  }
}
