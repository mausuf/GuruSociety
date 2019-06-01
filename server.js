const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require("path"); // For Heroku Deployment

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false })); //Make POST request in Postman to test

//Getting rid of this for Heroku Deployment (deleted)


// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

// ----Heroku Deployment----
// Serve static assets in production
if(process.env.NODE_ENV === "production") {
    // Set static folder - client/build to be the static folder
    app.use(express.static("cliet/build"));
    // Route to * (anything besides the API routes above), then load the index.html, via current directory (__dirname)
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
};
// -------------------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));










// USES FOR DEPENDENCIES
// "bcrypt" --> Password encryption
// "config" --> Global variables --> uses default.json file found in config folder
// "express" --> Main web framework
// "express-validator" --> For data validation for POST request to API
// "gravatar" --> Profile avatars
// "jsonwebtoken" --> JWT to pass along a token for validation
// "mongoose" --> Layer that sits on top of DB to interact with it
// "request" --> Module that allows to make HTTP request to another API - to pull github repo
// "concurrently" --> Run backend Express server and frontend React dev server at the same time
// "nodemon" --> Constantly watches server, eliminates need to refresh