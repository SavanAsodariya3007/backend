const express = require("express");
const mongoose = require("mongoose");
const verifyToken = require("./app/middlewares/authJWT");

require("dotenv").config();

const app = express();
const userRoutes = require("./app/routes/user");
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
app.use(userRoutes);

app.listen(process.env.PORT || 8080, () =>
  console.log("Example app is listening on port 8080.")
);
