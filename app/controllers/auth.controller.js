const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const {
  isEmpty,
  isValidEmail,
  isAllRequireKeyPresent,
  isValidValueForKey,
} = require("../utils");

exports.signup = async (req, res) => {
  if (isEmpty(req.body)) {
    res.status(500).send({
      status: false,
      message: "fullName, email, role and passwords are require fields!",
    });
    return;
  }

  const checkedAllKeys = isAllRequireKeyPresent({
    object: req.body,
    requireKeys: ["fullName", "email", "role", "password"],
    response: res,
  });

  if (checkedAllKeys) {
    if (!isValidEmail(req.body.email)) {
      res.status(500).send({
        status: false,
        message: "Please enter valid email",
      });
      return;
    }

    if (!isValidValueForKey(req.body.role, ["normal", "admin"])) {
      res.status(500).send({
        status: false,
        message: "Please add role either admin or normal",
      });
      return;
    }

    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      role: req.body.role,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    const newUser = await user.save().catch((error) => {
      res.status(500).send({
        message: error,
      });
      return;
    });
    console.log("ret", newUser);
    res.status(200).send({
      status: true,
      message: "User Registered successfully",
      ...newUser,
    });

    // (err, user) => {
    //   if (err) {
    //     res.status(500).send({
    //       message: err,
    //     });
    //     return;
    //   } else {
    //     console.log("user", user);
    //     res.status(200).send({
    //       status: true,
    //       message: "User Registered successfully",
    //       ...user,
    //     });
    //   }
    // }
  }
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({
        message: err,
      });
      return;
    }
    if (!user) {
      return res.status(404).send({
        message: "User Not found.",
      });
    }

    //comparing passwords
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    // checking if password was valid and send response accordingly
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    //signing token with user id
    var token = jwt.sign(
      {
        id: user.id,
      },
      process.env.API_SECRET,
      {
        expiresIn: 86400,
      }
    );

    //responding to client request with user profile success message and  access token .
    res.status(200).send({
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
      message: "Login successfull",
      accessToken: token,
    });
  });
};
