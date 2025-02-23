import { Router, type Router as ExpressRouter } from "express";
import { signup } from "../controller/user";

const userRouter: ExpressRouter = Router();

userRouter.post("/signup", signup);

export default userRouter;