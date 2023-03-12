const express = require("express");
const homeController = require("../controllers/home");
const auth = require("../middleware/auth");
const router = express.Router(); // Make request from another location

// validation - perform checks
// auth middleware acts as protection. you have to be logged in to perform requests
router.get("/:id", auth, homeController.fetchName);

router.put("/", auth, homeController.updatePassword);

module.exports = router;
