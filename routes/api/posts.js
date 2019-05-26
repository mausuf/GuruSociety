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


// @route   GET api/posts
// @desc    Get all posts
// @access  Private (need auth and express validator) because you need to be logged in to see the post thus need for Private. (Depends on app creators preference)
router.get("/", auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 }); // Get variable posts and tell it find a Post model and sort from the most date, and most recent is set as -1. (Oldest is set as 1)
        res.json(posts);
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Sever ever dude :/")
    }
});


module.exports = router;