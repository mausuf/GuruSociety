const express = require("express");
const app = express();

app.get('/', (req, res) => res.send("API is Running"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));










// USES FOR DEPENDENCIES
// "bcrypt" --> Password encryption
// "config" --> Global variables
// "express" --> Main web framework
// "express-validator" --> For data validation for POST request to API
// "gravatar" --> Profile avatars
// "jsonwebtoken" --> JWT to pass along a token for validation
// "mongoose" --> Layer that sits on top of DB to interact with it
// "request" --> Module that allows to make HTTP request to another API - to pull github repo
// "concurrently" --> Run backend Express server and frontend React dev server at the same time
// "nodemon" --> Constantly watches server, eliminates need to refresh