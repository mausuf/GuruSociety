//Structured just like User model but with more fields

const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    user: { // Every profile needs to be associated with a user
        type: mongoose.Schema.Types.ObjectId, // this is the _id field that mongoDB creates, not shown in User model but exists in Atlas db
        ref: "user" // Reference to the User model
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String], // An array of strings, a comma seperate value which JS will seperate into an array. 
        required: true
    },
    bio: {
        type: String
    },
    githubusername: {
        type: String
    },
    experience: [ // Array
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String,
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    education: [ //Array
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldofstudy: {
                type: String,
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    social: { // Object
            youtube: {
                type: String
            },
            twitter: {
                type: String
            },
            facebook: {
                type: String
            },
            linkedin: {
                type: String
            },
            instagram: {
                type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema); // To bring into our profile routes