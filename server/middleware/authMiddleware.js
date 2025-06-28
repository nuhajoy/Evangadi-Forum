const { StatusCodes } = require("http-status-codes");
require("dotenv").config();

const jwt = require("jsonwebtoken");
async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    // Check if the user is authenticated
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        // If the authorization header is missing or does not start with "Bearer ", return an error
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Authentication invalid" });
    }
    const token = authHeader.split(" ")[1];
    // console.log(authHeader)
    // console.log(token)
    // Verify the token using jwt.verify

    try {
        const { user_name, user_id } = jwt.verify(token, process.env.JWT_SECRET);
        // If the token is valid, attach user information to the request object
        req.user = { user_name, user_id };
        // If the user is authenticated, proceed to the next middleware or route handler
        next()
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Authentication invalid" });
        
    }
}

module.exports = authMiddleware