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


// @route   GET api/posts/:id
// @desc    Get posts by ID
// @access  Private (need auth and express validator) because you need to be logged in to see the post thus need for Private. (Depends on app creators preference)
router.get("/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) { //If there is no post with the Id being searched for
            return res.status(404).json({ msg: "Sorry, post not found :c" });
        };

        res.json(post);
    } catch(err) {
        console.error(err.message);
        if (err.kind === "ObjectId") { // err object has property called kind; if ObjectId is the kind of error, that means the ObjectId is not formatted thus there will be no post found*** When would the res.status(500) get thrown?
            return res.status(404).json({ msg: "Sorry, post not found :C" });
        };
        res.status(500).send("Sever ever dude :(")
    }
});


// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private (need auth and express validator) because you need to be logged in to see the post thus need for Private. (Depends on app creators preference)
router.delete("/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if there is no post with the Id being searched for to delete
        if (!post) { 
            return res.status(404).json({ msg: "Sorry, post not found :c" });
        };

        // Only the user that owns the post can be able to delete the post
        // Check user is post owner
        if (post.user.toString() !== req.user.id) { // req.user.id is the logged in user; req.user.id is a string, post.user is an object ID, so we need to add the .toString() method --> will not work without this.
            return res.status(401).json({ msg: "Why are you trying to delete another user's post? :P" })
        };

        await post.remove();

        res.json({ msg: "Post has been removed :3" });
    } catch(err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Sorry, post not found :c" });
        };
        res.status(500).send("Sever ever dude :/")
    }
});


// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private (need auth and express validator) Only logged in users can like a post
router.put("/like/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id); // fetching the post by id
        
        // Check if the post has already been liked by the logged in user
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) { // (filter is a high order array method) like function --> compares the current user to the user that's logged in; the .length > 0 means the post has already been liked
        return res.status(400).json({ msg: "You've already liked this post! I know it's amazing but no more likes :P" }); // return ends the process
        }

        post.likes.unshift({ user: req.user.id }); // unshift adds the user id at the beginning of the array

        await post.save(); // save the like

        res.json(post.likes); // responding with the: likes
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error my dude :/");
    }
});


// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private (need auth and express validator) Only logged in users can unlike a post
router.put("/unlike/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id); // fetching the post by id
        
        // Check if the post has already been liked by the logged in user
        if(
            post.likes.filter(like => like.user.toString() === req.user.id).length === 0) { // (filter is a high order array method) like function --> compares the current user to the user that's logged in; the .length = 0 means the logged in user has not yet liked it
        return res.status(400).json({ msg: "You can't unlike something you've not liked" }); // return ends the process
        };

        // Get the remove index  (find like to remove)
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id); // map -> For each like, return like.user, then chain on get indexOf the user id 

        post.likes.splice(removeIndex, 1); // splice the like out of the array; 1 -> will remove 1

        await post.save(); // save the array of likes

        res.json(post.likes); // responding with the likes
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error my dude :/");
    }
});


// @route   POST api/posts/comment/:id
// @desc    Comment on a post; comments are similar to posts except they don't have likes
// @access  Private (need auth and express validator) because you need to be logged in to comment on post
router.post("/comment/:id", [ auth, [ 
    check("text", "Text is required please").not().isEmpty() ] ],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const user = await User.findById(req.user.id).select("-password");     //User is model that is being imported; findById since we're logged in, we have the token which gives us the user ID which puts it inside req.user.id. - this will give us the user
        const post = await Post.findById(req.params.id) // req.params.id fetches id from the url; 

        const newComment = { // Since there is no collection in db for this, it's just going to be a new object.
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };

        // Add this new comment to the post's comments, use unshift to add to beginning, then pass in newComment
        post.comments.unshift(newComment);

        await post.save();
        res.json(post.comments);

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error my dude :/");
    }
});


// @route   DELETE api/posts/comment/:id/:comment_id  --> Need the post ID and the comment ID in order to delete a comment
// @desc    Delete a comment on a post
// @access  Private (need auth and express validator) because you need to be logged in to comment on post
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {  //
    try {
        // fetch the post by it's id
        const post = await Post.findById(req.params.id); 

        //Pull out comment from the post
        const comment = post.comments.find(comment => comment.id === req.params.comment_id); //.toString()
        
        // Make sure comment exists
        if(!comment) {
            return res.status(404).json({ msg: "Cant delete a comment that doesn't exist my dude!" });
        };

        // Check if user deleting comment is the user that made it
        if(comment.user.toString() !== req.user.id) { // turn object id of comment.user into a string and if not = to logged in user
            return res.status(401).json({ msg: "Sorry, I cant let you do that" });
        }; 
       
        // Get the remove index  (find comment to remove)
        const removeIndex = post.comments.map(comment => comment.id).indexOf(req.params.comment_id);

        // splice the comment out of the array; 1 -> will remove 1
        post.comments.splice(removeIndex, 1); 
        
        // save the array of commments
        await post.save(); 

        // responding with the comments
        res.json(post.comments); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Sever error my dudette");
    }
});

module.exports = router;