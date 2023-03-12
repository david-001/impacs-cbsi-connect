const express = require("express");
const { body } = require("express-validator");
const router = express.Router(); // Make request from another location
const User = require("../models/user");
const authController = require("../controllers/auth");

// validation - perform checks, for example check if input fields are valid,email address does not already exist

router.post(
  "/registration",
  [
    body("first_name").trim().not().isEmpty(), // remove white space, check if empty
    body("last_name").trim().not().isEmpty(),
    body("other_names").trim(),
    body("country").trim().not().isEmpty(),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email") // check if email is valid
      // check if email already exists
      .custom(async (email) => {
        const user = await User.find(email);
        if (user[0].length > 0) {
          return Promise.reject("Email address already exists");
        }
      })
      .normalizeEmail(), // normalize email e.g. uppercase and lowercase letters
    body("telephone").trim().not().isEmpty(),
    body("password").trim().isLength({ min: 7 }),
  ],
  authController.registration
);

router.post("/login", authController.login);

module.exports = router;
