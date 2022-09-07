import jwt from "jsonwebtoken";
import { User } from "../routes/users/users.model.js";

export async function verifySocketToken(socket, next) {
  const token = socket.handshake.auth.token;
  if (!token) {
    const err = new Error("Please enter token with connection");
    next(err);
  }
  const bearerToken = String(token).split(" ");

  jwt.verify(bearerToken[1], process.env.API_SECRET, async (err, decode) => {
    if (err) {
      next(err);
    }
    const user = await User.findOne({ _id: decode.id });
    if (!user) {
      next(new Error("Something went wrong with token!"));
    }
    socket.handshake.user = user.toJSON();
    next();
  });
}
