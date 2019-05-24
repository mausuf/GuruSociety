// File for routes for user profiles

// Bring in Express router
const express = require("express");
const router = express.Router();

// @route   GET api/profile
// @desc    Test route
// @access  Public (Does not require token to access, otherwise user will get unauthorized access message)
router.get("/", (req, res) => res.send("Profile route"));

module.exports = router;