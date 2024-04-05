import { TokenRepo } from "../databases/repositories/tokenRepo";
import { UserRepo } from "../databases/repositories/userRepo";
import { ApiError } from "../utils/classError";
import { generateVerificationToken } from "../utils/generateToken";
import { generateTokenJWT, verifyPassword } from "../utils/jwt";
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

      const expiredIn = new Date();
      expiredIn.setMinutes(expiredIn.getMinutes() + 1); // Add 1 minute

      await this.tokenRepo.createTokenId({ id, token, expiredIn });
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

    if (new Date() > isToken.expiredIn) {
      //create a new token 
      const newToken = generateVerificationToken();
      //send it to user 
      sendVerificationEmail(user.email, newToken);
      //create new time for new token
      const newTime = new Date();
      //add 1 mn to the newTime
      newTime.setMinutes(newTime.getMinutes() + 1);
      //update newtime and new token 
      isToken.expiredIn = newTime;
      isToken.token = newToken;
      //save it again
      await isToken.save();
      //send message to user 
      throw new ApiError(
        "We wanted to inform you that your token has expired. You need to check your mail box, to get the new token.",
        StatusCode.BadRequest
      );
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

    const expiredIn = new Date();
    console.log(expiredIn);
    if (!user) {
      throw new ApiError("Invalid username or password", StatusCode.NotFound);
    }

    if (user.isVerified === false) {
      throw new ApiError(
        "That Email is not Verify yet, Please check your mail box and Verify!!",
        StatusCode.NotFound
      );
    }

    await verifyPassword(password, user.password);

    const token = generateTokenJWT({ id: user.id });

    return token;
  }
}
