// File for routes for user profiles

// Bring in Express router
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check"); //Documentation @: https://express-validator.github.io/docs/

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

// @route   POST api/profile/
// @desc    Create or update user profile
// @access  Private (Use auth middleware & validation middleware)
router.post("/", [ auth, [   // 1) First middleware is 'auth' 2) second middleware is containtained in brackets which are the 2 'check'
    check("status", "Status is required").not().isEmpty(),
    check("skills", "Skills is required").not().isEmpty()
    ]
],
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) { // If there are errors then we want to return status of 400
            return res.status(400).json({ errors: errors.array() });
        }

        const {  // Need to check if fields were filled out before submitting to the database
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        // Build profile object
        const profileFields = {};
        profileFields.user = req.user.id; // Matching profile fields with login user
        if(company) profileFields.company = company;
        if (website) profileFields.website = website;
        if(location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if(status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim()); // .split turns the skills string into an array with a comma delimitor; map will go through the array, for each skill it will be trimmed to get rid of spaces. Needs to be done due to the way skills is passed in.
        }

        console.log(profileFields.skills);
        res.send("Skills is working!");
        
    }
);


module.exports = router;