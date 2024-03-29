import express, { Response, Request, NextFunction } from "express";
import { UserController } from "../controllers/Controller";
import { UserService } from "../services/userService";
import { StatusCode } from "../utils/statusCode";

const userRouter = express.Router();

//login
userRouter.get("/login", (req: Request, res: Response, _next: NextFunction) => {
  res.json({ message: "hello" });
});

//signup
userRouter.post(
  "/signup",
  async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const userController = new UserController(new UserService());
      const user = await userController.createUser(req.body);
      res.status(StatusCode.OK).json({ user });
    } catch (error) {
      _next(error);
    }
  }
);

export default userRouter;
