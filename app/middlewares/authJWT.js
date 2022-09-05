import jwt from "jsonwebtoken";
import { User } from "../routes/users/users.schema.js";

const verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  try {
    if (typeof bearerHeader === "undefined") {
      res.handler.badRequest(undefined, "Token is required!");
    }
    const bearer = bearerHeader.split(" ");
    if (String(bearer[0]) !== "Bearer") {
      res.handler.badRequest(undefined, "Bearer token is required!");
    }
    const token = bearer[1];
    jwt.verify(token, process.env.API_SECRET, async (err, decode) => {
      if (err) {
        res.handler.badRequest(undefined, err?.message);
      }
      const user = await User.findOne({ _id: decode.id });
      if (!user) {
        res.handler.badRequest(undefined, "Something went wrong with token!");
      }
      req.body.user = user;
      next();
    });
  } catch (error) {
    console.log("user.verify token error====>", error);
    res.handler.badRequest(undefined, error.message);
  }
};
export { verifyToken };
