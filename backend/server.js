const express = require("express");

const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");
const homeRoutes = require("./routes/home");

const errorController = require("./controllers/error");

const app = express();

// process.env.PORT - server port when it is deployed
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Treat with cross origin resource (cors) issues
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoutes); //localhost:3000/auth
app.use("/home", homeRoutes);
app.use(errorController.get404); //error handing
app.use(errorController.get500); //error handing

app.listen(port, () => console.log(`Listening on port ${port}`));
