// File for posting comments

// Bring in Express router
const express = require("express");
const router = express.Router();

// Bring in express validator and auth middleware
const { check, validationResult } = require("express-validator/check"); //Documentation @: https://express-validator.github.io/docs/
const auth = require("../../middleware/auth");

//Bring in all models
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");


// @route   POST api/posts
// @desc    Create a post
// @access  Private (need auth and express validator) because you need to be logged in to post thus need for Private
router.post("/", [ auth, [ 
    check("text", "Text is required please").not().isEmpty() ] ],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const user = await User.findById(req.user.id).select("-password");     //User is model that is being imported; findById since we're logged in, we have the token which gives us the user ID which puts it inside req.user.id. - this will give us the user

        const newPost = new Post({ // newPost object is using new Post from the Model
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });

        await newPost.save(); // this is inside post variable so we can pass into res once the newPost is saved (added)
        res.json(newPost);

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error my friend :/");
    }
});


module.exports = router;