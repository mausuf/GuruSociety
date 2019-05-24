// File for posting comments

// Bring in Express router
const express = require("express");
const router = express.Router();

// @route   GET api/posts
// @desc    Test route
// @access  Public (Does not require token to access, otherwise user will get unauthorized access message)
router.get("/", (req, res) => res.send("Posts route"));

module.exports = router;