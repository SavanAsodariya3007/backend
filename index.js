import express from "express";
import mongoose from "mongoose";
import dotENV from "dotenv";

import { ResponseHandler } from "./app/configs/responseHandler.js";
import { verifyToken } from "./app/middlewares/authJWT.js";
import { userRouter } from "./app/routes/users/users.route.js";
import { deviceRouter } from "./app/routes/device/device.route.js";

const app = express();
const PORT = process.env.PORT || 8080;
dotENV.config();

try {
  mongoose.connect(
    "mongodb+srv://senricroot:cDVaBEw3DQEKbQMw@senricblink.ashjway.mongodb.net/?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  );
  console.log("connected to db");
} catch (error) {
  handleError(error);
}

// process.on("unhandledRejection", (error) => {
//   console.log("unhandledRejection", error.message);
// });

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  res.handler = new ResponseHandler(req, res);
  next();
});

app.get("/", (req, res) => {
  res.send("GET request to the homepage");
});

app.use("/users", userRouter);
app.use("/devices", verifyToken, deviceRouter);

app.listen(PORT, () =>
  console.log(`Example app is listening on port ${PORT}.`)
);
