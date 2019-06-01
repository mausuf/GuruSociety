// File for routes for user profiles

// Bring in Express router
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check"); //Documentation @: https://express-validator.github.io/docs/

//Below two packages needed for uri*
const request = require("request");
const config = require("config");

//Bring in Profile & User models
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//Bring in Post(comments) models --> First iteration of this used to be able to delete post(comments) upon Account Deletion!
const Post = require("../../models/Post");


// @route   GET api/profile/me --> route to just get ours based on the user id that's in the token
// @desc    Get current user's profile
// @access  Private (Use auth middleware)
router.get("/me", auth, async (req, res) => { // Added auth as second parameter to pass in auth middleware
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate(["user", "name", "avatar"]); // Found in Profile.js model -> user field's ObjectID; set req.user.id to the "user:" that comes in. use method 'populate' from USER model and bring in name and avatar since currently were pulling from PROFILE model.

        if(!profile) { //If no profile exists
            return res.status(400).json({ msg: "No profile exist for this user" })
        };

        res.json(profile); //If there is a profile

    } catch(err) {
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
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim()); // .split turns the skills string into an array with a comma delimitor; map will go through the array, for each skill it will be trimmed to get rid of spaces. Needs to be done due to the way skills is passed in.
        }

        // console.log(profileFields.skills);
        // res.send("Skills is working!"); // --> Commenting out to get next res.send

        //Build social object
        profileFields.social = {}; // Initialize social, otherwise undefined error will occur stating can't find twitter of undefined
        if (youtube)profileFields.social.youtube = youtube;
        if (twitter)profileFields.social.twitter = twitter;
        if (facebook)profileFields.social.facebook = facebook;
        if (linkedin)profileFields.social.linkedin = linkedin;
        if (instagram)profileFields.social.instagram = instagram;
        
        // console.log(profileFields.social.twitter); // Testing

        // Update and insert the data with a try catch
        try{
            
            let profile = await Profile.findOne({ user: req.user.id }) // find Profile model by the user; get the user by req.user.id which comes from the token
            
            if(profile) {

                // UPDATE
                // If there is a proile, findOneAndUpdate method via promise(using await for async); param 1 - by user; param 2 - set profile fields above; param 3 - add an object of new and set to true
                profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
                return res.json(profile); // Return profile if found
            }
                // CREATE
                // If no profile found, create it
                profile = new Profile(profileFields);
                await profile.save();
                res.json(profile);

        } catch(err) {
            console.error(err.message);
            res.status(500).send("Server error :/")
        }
    }
);


// @route   GET api/profile/
// @desc    Get all profiles
// @access  Public (No auth middleware)
router.get("/", async (req, res) => {
    try {
        const profiles = await Profile.find().populate("user", ["name", "avatar"]);
        res.json(profiles);
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error :(");
    }

});


// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public (No auth middleware)
router.get("/user/:user_id", async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate("user", ["name", "avatar"]); // profile instead of profiles since were getting only 1 using findOne and the id comes from the URL

        if(!profile) return res.status(400).json({ msg: "There is no profile for this user :( you can create a new profile though! :)" });

        res.json(profile);
    } catch(err) {
        console.error(err.message);
        if(err.kind == "ObjectId") { // Adding this if statement to avoid getting res.status(500).send("Server error :/"). ObjectId is _id defined in mongodb.
            return res.status(400).json({ msg: "Profile not found :( you can create a new profile though! :)" })
        }
        res.status(500).send("Server error :/");
    }

});


// @route   DELETE api/profile/
// @desc    Delete profile , user, and posts
// @access  Private (Use auth middleware & validation middleware)
router.delete("/", auth, async (req, res) => {
    try {
        //@todo - remove users posts
        //REMOVE USER POSTS(COMMENTS) ---> MUST be done BEFORE Removing Profile and User
        await Post.deleteMany({ user:req.user.id });

        //REMOVE PROFILE
        await Profile.findOneAndRemove({ user: req.user.id }); // No need to Get anything, so no need for variable
        //REMOVE USER
        await User.findOneAndRemove({ _id: req.user.id }); 

        res.json({ msg: "User and Profile deleted :O" });
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error :(");
    }

});


// @route   PUT api/profile/experience --> This can be made as POST as well, however it is updating info an array within a collection within a document***. Updating part of a profile
// @desc    Add profile experience
// @access  Private (Use auth middleware & validation middleware)
router.put("/experience", [ auth, [
    check("title", "Title is required please").not().isEmpty(),
    check("company", "Company is required please").not().isEmpty(),
    check("from", "From date is required please").not().isEmpty()
    ] 
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Will give us array of errors
    }

    // Get (pull) this information out of req.body, so need to destrucuture data
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    // This will create an object with the data the user submits; this is benefityou can have this strucuture in 1 collection in nosql database instead of a seperate table like in sql db
    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    };

    // To interact with mongodb
    try {
        const profile = await Profile.findOne({ user: req.user.id }); // Create variable called profile since we need to fetch the profile we want to add the expereince to.

        profile.experience.unshift(newExp); // Unshift pushes onto beginning so most recent are first

        await profile.save();

        res.json(profile);

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error :c");
    }
});


// @route   DELETE api/profile/experience --> This can also be made as PUT, but not recommended
// @desc    Delete experience from profile
// @access  Private (Use auth middleware & validation middleware)
router.delete("/experience/:exp_id", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }); // Get profile by user id

        // Need to get the correct experience to remove so
        // Get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id); // set variable removeIndex and map through it and pass in item and return item.id then chain on indexOf and match it to that exp id.

        profile.experience.splice(removeIndex, 1); // splice the experience and take out 1

        await profile.save(); // re-saving profile

        res.json(profile); // sending back profile
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error :'C");
    }
});


// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private (Use auth middleware & validation middleware)
router.put("/education", [ auth, [
    check("school", "School is required please").not().isEmpty(),
    check("degree", "Degree is required please").not().isEmpty(),
    check("fieldofstudy", "Field of study is required please").not().isEmpty(),
    check("from", "From date is required please").not().isEmpty()
    ] 
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Will give us array of errors
    }

    // Get (pull) this information out of req.body, so need to destrucuture data
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    // This will create an object with the data the user submits; this is benefityou can have this strucuture in 1 collection in nosql database instead of a seperate table like in sql db
    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    };

    // To interact with mongodb
    try {
        const profile = await Profile.findOne({ user: req.user.id }); // Create variable called profile since we need to fetch the profile we want to add the expereince to.

        profile.education.unshift(newEdu); // Unshift pushes onto beginning so most recent are first

        await profile.save();

        res.json(profile);

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error :c");
    }
});


// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private (Use auth middleware & validation middleware)
router.delete("/education/:edu_id", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }); // Get profile by user id

        // Need to get the correct experience to remove so
        // Get remove index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id); // set variable removeIndex and map through it and pass in item and return item.id then chain on indexOf and match it to that exp id.

        profile.education.splice(removeIndex, 1); // splice the experience and take out 1

        await profile.save(); // re-saving profile

        res.json(profile); // sending back profile
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error :'C");
    }
});


// @route   GET api/profile/education/:username
// @desc    Get user repos from Github
// @access  Public --> Since anyone can view a profile to show repositories
router.get("/github/:username", (req, res) => {
    try {

        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get("githubClientId")}&client_secret=${config.get("githubSecret")}`,// 5 repos per page sort by dated created in ascending order, get client id and client secret from config using config npm package
            method: "GET",
            headers: { "user-agent": "node.js" }  // user-agent needed for this to work
        };

        request(options, (error, response, body) => {
            if(error) console.error(error);

            if(response.statusCode !== 200) {  // 200=successful - If no github username found
                return res.status(404).json({ msg: "No Github profile found" });
            }

            res.json(JSON.parse(body)); // The body will originally be a regular string with escaped quotes, so need to surround with JSON.parse
        });

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error :/");
    }
})

module.exports = router;