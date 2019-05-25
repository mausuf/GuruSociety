const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {  // middleware function --> a function that has access to req and res objects; next is the callback to move on to the next piece of middleware
    
    // Get token from header
    const token = req.header("x-auth-token"); // x-auth-token is the header key that the token is sent in

    // Check if no token
    if(!token) {
        return res.status(401).json({ msg: "No token, authorization restricted" });
    }

    //Vertify token
    try {
        const decoded = jwt.verify(token, config.get("jwtSecret")); // decodes the token via jwt.verify

        req.user = decoded.user; // sets the req.user to the user that's in the decoded object
        next(); // Use the req.user in any of the routes
    } catch(err) {
        res.status(401).json({ msg: "Token is not valid" })
    }

}