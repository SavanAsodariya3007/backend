import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

class UserController {
  async add(req, res) {
    try {
      const userDB = await User.findOne({ email: req.body.email });
      if (userDB) {
        throw new Error("E-mail already exists!");
      }
      const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        role: req.body.role,
        password: bcrypt.hashSync(req.body.password, 8),
      });
      await user.save();
      res.handler.success(user);
    } catch (error) {
      console.log("user.add error====>", error);
      res.handler.badRequest(undefined, error.message);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found!");
      }

      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (!isValidPassword) {
        throw new Error("Wrong password!");
      }

      const authToken = jwt.sign({ id: user._id }, process.env.API_SECRET, {
        expiresIn: 86400,
      });

      res.handler.success({
        user: {
          authToken,
          ...user.toJSON(),
        },
      });
    } catch (error) {
      console.log("user.login error====>", error);
      res.handler.badRequest(undefined, error.message);
    }
  }
}

const useController = new UserController();
export { useController };
