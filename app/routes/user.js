import express from "express";
import { signup, signin } from "../controllers/auth.controller.js";

const userRouter = express.Router();
userRouter.post("/register", signup);
userRouter.post("/login", signin);

export { userRouter };
