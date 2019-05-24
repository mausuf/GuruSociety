// File for registering and adding users

// Bring in Express router
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check"); //Documentation @: https://express-validator.github.io/docs/

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
async (req, res) => {                       //label as async to implement Try Catch below
    const errors = validationResult(req);
    if(!errors.isEmpty()) { //This means --> "If there are errors" 
        return res.status(400).json({ errors: errors.array() }); //status 400 is bad request
    }

    const { name, email, password } = req.body; //Destructure/Pulling out name, email, and password from req.body

    try {
    //See if user exists

    //Get users gravatar (based on user's email)

    //Encrpt user's password

    //Return jsonwebtoken


    res.send("Users route"); //For testing in Postman
    console.log(req.body); //For testing in nodemon. req.body is the object of data (name, email, and password) that will be sent to this route, for this to work we need to initialize the middle ware from server.js
    } catch(err) {
        console.error(err.message);
        res.status(500).send("This is a server error message :)")
    }

});

module.exports = router;