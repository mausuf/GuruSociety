// File for getting JSON webtoken for authentication

// Bring in Express router
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check"); //Documentation @: https://express-validator.github.io/docs/
const jwt = require("jsonwebtoken");
const config = require("config"); //to bring in secret for jwt.sign
const bcrypt = require("bcryptjs");

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

//-----Copied Below from users.js and updated for auth-----

// @route   POST api/auth
// @desc    Authenticate user to be able to login & get token
// @access  Public (Does not require token to access, otherwise user will get unauthorized access message)
router.post("/", [ // Adding second parameter to post route, check(found in documentation for express validation), removed check name since we are working on login and only require email & password
    check("email", "Please include a valid email address").isEmail(), //isEmail will check for email formatting
    check("password", "Password is required").exists() // Check to see if password exists
], 
async (req, res) => {  //label as async to implement Try Catch below
    const errors = validationResult(req);
    if(!errors.isEmpty()) { //This means --> "If there are errors" 
        return res.status(400).json({ errors: errors.array() }); //status 400 is bad request
    }

    const { email, password } = req.body; //Destructure/Pulling out email, and password from req.body, does not require name for auth, only for signup

    try {
    // See if user exists
        let user = await User.findOne({ email: email }); // use "await" due to async usage above. findOne takes in a field, in this case email 
        if(!user) { // Need to check if NOT a user
            return res.status(400).json({ errors: [ { msg: "Invalid Email" } ] }); //Updated msg
        }

// -----removed items-----

// -----*new item------
    //*bcrypt has method called 'compare' which takes a bcrypt password and plain text password that tells you if matchl; compare returns a promise
    const isMatch = await bcrypt.compare(password, user.password); //password is plaintext, second parameter is encrypted password
        if(!isMatch) {
            return res.status(400).json({ errors: [{ msg: "Invalid Password" }] });
        }

// -----below items are same-----
    // Return jsonwebtoken --> Documentation @: https://github.com/auth0/node-jsonwebtoken
        const payload = {   // payload is an object with user that has an id of
            user: {
                id: user.id     // mongDB Atlas shows _id, however mongoose does abstraction that allows just user.id instead of user._id
            }
        };
        jwt.sign( // takes in payload and secret, that we will put into config -> default.json
            payload, 
            config.get("jwtSecret"), 
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token }); //In order to see the token returned in Postman, we need to comment out the 2 res.send payload, and Users Registered messages below.
            }
        ); 

    // res.send(payload); --> This will return USER ID in Postman
    // res.send("Users registered"); //For testing in Postman --> Updated to registered
    console.log(req.body); //For testing in nodemon. req.body is the object of data (name, email, and password) that will be sent to this route, for this to work we need to initialize the middle ware from server.js
    } catch(err) {
        console.error(err.message);
        res.status(500).send("This is a server error message :)")
    }

});


module.exports = router;