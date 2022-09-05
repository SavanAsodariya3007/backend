import express from "express";
import { body } from "express-validator";

import { validate } from "../middlewares/validator.js";
import { useController } from "../controllers/UserController.js";

const userRouter = express.Router();

userRouter.post(
  "/register",
  validate([
    body("fullName")
      .notEmpty()
      .isString()
      .withMessage("fullName is required field!"),
    body("email")
      .notEmpty()
      .withMessage("email is required field!")
      .isEmail()
      .withMessage("Enter valid email address"),
    body("role")
      .notEmpty()
      .withMessage("role is required field!")
      .isIn(["admin", "normal"])
      .withMessage("role is either admin or normal"),
    body("password").notEmpty().withMessage("password is required field!"),
  ]),
  useController.add
);

userRouter.post(
  "/login",
  validate([
    body("email")
      .notEmpty()
      .withMessage("email is required field!")
      .isEmail()
      .withMessage("Enter valid email address"),
    body("password").notEmpty().withMessage("password is required field!"),
  ]),
  useController.login
);

export { userRouter };
