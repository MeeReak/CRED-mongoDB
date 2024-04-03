import { TokenRepo } from "../databases/repositories/tokenRepo";
import { UserRepo } from "../databases/repositories/userRepo";
import { ApiError } from "../utils/classError";
import { generateVerificationToken } from "../utils/generateToken";
import { verifyPassword } from "../utils/jwt";
import { sendVerificationEmail } from "../utils/sendVerifyEmail";
import { StatusCode } from "../utils/statusCode";

export class UserService {
  repo: any;
  tokenRepo: any;

  constructor() {
    this.repo = new UserRepo();
    this.tokenRepo = new TokenRepo();
  }

  async SignUp(newData: object) {
    return await this.repo.SignUp(newData);
  }

  async SendVerifyEmail(email: string, id: string) {
    try {
      const token = generateVerificationToken();
      sendVerificationEmail(email, token);

      await this.tokenRepo.createTokenId({ id, token });
    } catch (error) {
      throw error;
    }
  }

  async VerifyUser(token: string) {
    const isToken = await this.tokenRepo.findToken(token);

    if (!isToken) {
      throw new ApiError(
        "Verification token is invalid",
        StatusCode.BadRequest
      );
    }

    // Find the user associated with this token
    const user = await this.repo.FindUserById(isToken.id.toString());
    if (!user) {
      throw new ApiError("User does not exist.", StatusCode.NotFound);
    }

    // Mark the user's email as verified
    user.isVerified = true;
    await user.save();

    // Remove the verification token
    await this.tokenRepo.deleteToken(token);
    return user;
  }

  async Login(email: string, password: string) {
    const user = await this.repo.FindUserByEmail(email);

    if (!user) {
      throw new ApiError("Email Not Found", StatusCode.NotFound);
    }

    console.log(user);
    return verifyPassword(password, user.password);
  }
}
