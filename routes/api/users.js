// File for registering and adding users

// Bring in Express router
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check"); //Documentation @: https://express-validator.github.io/docs/
const bcrypt = require("bcryptjs"); //install bcryptjs, initially bcrypt was installed
const jwt = require("jsonwebtoken");
const config = require("config"); //to bring in secret for jwt.sign

//Bring in gravatar
const gravatar = require("gravatar");

//Bring in User Model
const User = require("../../models/User");

// @route   POST api/users
// @desc    Register user
// @access  Public (Does not require token to access, otherwise user will get unauthorized access message)
router.post("/", [ // Adding second parameter to post route, check(found in documentation for express validation)
    check("name", "Name is required please").not().isEmpty(), //Second parameter for check is a custom error message
    check("email", "Please include a valid email address").isEmail(), //isEmail will check for email formatting
    check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 })
], 
async (req, res) => {  //label as async to implement Try Catch below
    const errors = validationResult(req);
    if(!errors.isEmpty()) { //This means --> "If there are errors" 
        return res.status(400).json({ errors: errors.array() }); //status 400 is bad request
    }

    const { name, email, password } = req.body; //Destructure/Pulling out name, email, and password from req.body

    try {
    // See if user exists
        let user = await User.findOne({ email: email }); // use "await" due to async usage above. findOne takes in a field, in this case email 
        if(user) {
            return res.status(400).json({ errors: [ { msg: "User already exists" } ] }); // within json() we are matching the array or errors written in line 22
        }

    // Get users gravatar (based on user's email) --> Pass the user's email into a method that will get us the URL for the gravatar
        const avatar = gravatar.url(email, {
            s: "200", // default size, a string of 200
            r: "pg", // image rating
            d: "mm" // default if user does not have gravatar, you could put 404 for error if you wanted
        })
        //Create the user
        user = new User({ // variable is set to this instance of a new User, and pass in objects of the fields we need. Before we save we need to encrpt password with bcryptjs. ***Testing in postman will CREATE user instance in mongoDB Atlas***
            name, 
            email, 
            avatar, 
            password
        })

    // Encrpt user's password
        const salt = await bcrypt.genSalt(10);   // salt does the hashing, passing in rounds of 10, more = more secure but slower
        user.password = await bcrypt.hash(password, salt); // hash takes in 1) plain text password 2) salt
        await user.save(); // Saving user. Note: Anything that uses a promise, use await since we're using async await, since we're not using .then

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