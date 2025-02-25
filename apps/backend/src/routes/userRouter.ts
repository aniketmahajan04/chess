import { Router, type Router as ExpressRouter } from "express";
import { signin, signup } from "../controller/user";

const userRouter: ExpressRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);

export default userRouter;