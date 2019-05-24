// File for getting JSON webtoken for authentication

// Bring in Express router
const express = require("express");
const router = express.Router();

// @route   GET api/auth
// @desc    Test route
// @access  Public (Does not require token to access, otherwise user will get unauthorized access message)
router.get("/", (req, res) => res.send("Auth route"));

module.exports = router;