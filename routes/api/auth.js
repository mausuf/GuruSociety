// File for getting JSON webtoken for authentication

// Bring in Express router
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// @route   GET api/auth
// @desc    Test route
// @access  Public (Does not require token to access, otherwise user will get unauthorized access message)
router.get("/", auth, (req, res) => res.send("Auth route")); // Added auth as a second paramenter to use the middleware. Just doing this makes this route protected
module.exports = router;