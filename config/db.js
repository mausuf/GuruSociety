const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI"); //Pulling in from default.json

// To connect to mongoDB
const connectDB = async () => {
    // try will try to connect, if there is an error it will catch it
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true // This gets rid of Deprecation Warning when running server
        });
        console.log("mongoDB Connected Successfully!");
    } catch(err) {
        console.log(err.message);
        // Exit process with faiulure
        process.exit(1);
    }
 }

 module.exports = connectDB;