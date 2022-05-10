import express from "express";
import { getAllUsers, logIn, signUp } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post('/signup', signUp);
userRouter.post('/login', logIn)

export default userRouter;
