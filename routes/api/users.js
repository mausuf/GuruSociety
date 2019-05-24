// File for registering and adding users

// Bring in Express router
const express = require("express");
const router = express.Router();

// @route   GET api/users
// @desc    Test route
// @access  Public (Does not require token to access, otherwise user will get unauthorized access message)
router.get("/", (req, res) => res.send("Users route"));

module.exports = router;