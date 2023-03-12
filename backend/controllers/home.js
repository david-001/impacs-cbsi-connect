const { validationResult } = require("express-validator");
const Home = require("../models/home");
const bcrypt = require("bcryptjs");

exports.fetchName = async (req, res, next) => {
  try {
    const [[name]] = await Home.fetchName(req.params.id);
    res.status(200).json(name);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500; //default status code if there is no status code.
    }
    next(err);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const updateResponse = await Home.updatePassword(
      req.body.id,
      hashedPassword
    );
    res.status(200).json(updateResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500; //default status code if there is no status code.
    }
    next(err);
  }
};
