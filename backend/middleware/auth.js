const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  // if no authorization header
  if (!authHeader) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }

  // authorization token format- Bearer fdf454xfdsf
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    // refer to auth.js in controllers
    decodedToken = jwt.verify(token, "secretfortoken");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }
  req.isLoggedIn = true;
  req.userId = decodedToken.userId;
  req.email = decodedToken.email;
  next();
};
