import express from "express";
import mongoose from "mongoose";
import { userRouter } from "./app/routes/user.js";
import dotENV from "dotenv";

const app = express();
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

process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", error.message);
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

//using user route
app.use(userRouter);

app.listen(process.env.PORT || 8080, () =>
  console.log("Example app is listening on port 8080.")
);
