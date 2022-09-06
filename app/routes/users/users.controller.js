import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./users.model.js";
import { usersService } from "./users.service.js";

class UserController {
  async add(req, res) {
    try {
      const userDB = await User.findOne({ email: req.body.email });
      if (userDB) {
        throw new Error("E-mail already exists!");
      }
      const { isError, data } = await usersService.addUser(req.body);
      if (isError) {
        throw data;
      }
      res.handler.success(data);
    } catch (error) {
      console.log("user.add error====>", error);
      res.handler.badRequest(undefined, error.message);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await usersService.getUserByEmail(email);
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
