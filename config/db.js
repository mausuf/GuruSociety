const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI"); //Pulling in from default.json

// To connect to mongoDB
const connectDB = async () => {
    // try will try to connect, if there is an error it will catch it
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true, // This gets rid of Deprecation Warning when running server ---> Deprecation Warnin is mongoose error
            useCreateIndex: true, //To get rid of Deprecation Warning while setting up to see if new "User already exists" in users.js file
            useFindAndModify: false // Documentation @ https://mongoosejs.com/docs/deprecations.html for all 3
        });
        console.log("mongoDB Connected Successfully!");
    } catch(err) {
        console.log(err.message);
        // Exit process with failure
        process.exit(1);
    }
 }

 module.exports = connectDB;