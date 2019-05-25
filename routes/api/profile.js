// File for routes for user profiles

// Bring in Express router
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//Bring in Profile & User models
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   GET api/profile/me --> route to just get ours based on the user id that's in the token
// @desc    Get current user's profile
// @access  Private (Use auth middleware)
router.get("/me", auth, async (req, res) => { // Added auth as second parameter to pass in auth middleware
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate(["user", "name", "avatar"]); // Found in Profile.js model -> user field's ObjectID; set req.user.id to the "user:" that comes in. use method 'populate' from USER model and bring in name and avatar since currently were pulling from PROFILE model.

        if(!profile) { //If no profile exists
            return res.status(400).json({ msg: "No profile exist for this user" })
        }
        
        res.json(profile); //If there is a profile

    } catch(err){
        console.log(err.message);
        res.status(500).send("Server error :(");
    }
}); 

module.exports = router;