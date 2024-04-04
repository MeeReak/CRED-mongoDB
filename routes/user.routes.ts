import express, { Response, Request, NextFunction } from "express";
import { UserController } from "../controllers/Controller";
import { UserService } from "../services/user.service";
import { StatusCode } from "../utils/statusCode";
import { validateUserInput } from "../middleware/validateUserInput";

const userRouter = express.Router();

//login
userRouter.get("/login", (req: Request, res: Response, _next: NextFunction) => {
  res.json({ message: "hello" });
});

//signup
userRouter.post(
  "/signup",
  validateUserInput,
  async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const userController = new UserController(new UserService());
      await userController.createUser(req.body);
      res.status(StatusCode.OK).json({ message: "Sign Up Successful" });
    } catch (error) {
      _next(error);
    }
  }
);

userRouter.get(
  "/verify",
  async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const token = req.query.token as string;
      const userController = new UserController(new UserService());
      await userController.verifyUser(token);
      res.status(StatusCode.OK).json({ message: "User verified" });
    } catch (error) {
      _next(error);
    }
  }
);

userRouter.post(
  "/login",
  async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const userController = new UserController(new UserService());
      const jwtToken = await userController.login(req.body);
      res
        .status(StatusCode.OK)
        .json({ message: "Login successful", token: jwtToken });
    } catch (error) {
      _next(error);
    }
  }
);

export default userRouter;
