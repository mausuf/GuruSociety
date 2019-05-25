// File for getting JSON webtoken for authentication

// Bring in Express router
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const User = require("../../models/User")

// @route   GET api/auth
// @desc    Test route
// @access  Public (Does not require token to access, otherwise user will get unauthorized access message)
router.get("/", auth, async (req, res) => { // Added auth as a second paramenter to use the middleware. Just doing this makes this route protected; added function async. Function to make call to database.
    try{
        const user = await User.findById(req.user.id).select("-password"); //req.user is pulled from middleware -> auth.js; -password leaves off password in res
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Sever error :(");
    }
}); 
module.exports = router;