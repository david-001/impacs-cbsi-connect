const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.registration = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) return;

  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const other_names = req.body.other_names;
  const country = req.body.country;
  const email = req.body.email;
  const telephone = req.body.telephone;
  const password = req.body.password;

  try {
    // Hash password, hash password 12 times, each time same password is hashed you get different result
    const hashedPassword = await bcrypt.hash(password, 12);
    const userDetails = {
      first_name: first_name,
      last_name: last_name,
      other_names: other_names,
      country: country,
      email: email,
      telephone: telephone,
      password: hashedPassword,
    };
    const result = await User.save(userDetails);

    // 201 new resource created, json formatted
    res.status(201).json({ message: "User is registered" });
  } catch (err) {
    // refer to error.js
    if (!err.statusCode) {
      err.statusCode = 500; //default status code if there is no status code.
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.find(email);
    // check if user does not exists
    if (user[0].length !== 1) {
      const error = new Error("A user with this email cannot be found.");
      error.statusCode = 401; // Not authenticated
      throw error;
    }
    // user exists
    const storedUser = user[0][0];
    // Check if entered password matches database entry password
    const isEqual = await bcrypt.compare(password, storedUser.password);
    if (!isEqual) {
      const error = new Error("Wrong password!");
      error.statusCode = 401; // Not authenticated
      throw error;
    }
    // create json web token (cookie) that can be accessed in the client through local storage which have associated payload. We can give that a secret. Server needs to validate a particular secret. When client makes a request - attach a token, secret payload
    const token = jwt.sign(
      {
        email: storedUser.email,
        userId: storedUser.id,
      },
      "secretfortoken", // administered by the server
      { expiresIn: "1h" }
    );
    res.status(200).json({ token: token, userId: storedUser.id }); // Used in auth.service in angular services
  } catch (err) {
    // refer to error.js
    if (!err.statusCode) {
      err.statusCode = 500; //default status code if there is no status code.
    }
    next(err);
  }
};
