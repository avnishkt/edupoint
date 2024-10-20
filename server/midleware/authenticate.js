const jwt = require('jsonwebtoken');
const CustomError = require('../utils/CoustomError');

const authenticateJWT = (req, res, next) => {
    // Try to get the token from cookies or Authorization header (Bearer token)
    const token = req.cookies.accessToken || req.headers['authorization']?.split(' ')[1];

    // If no token is found, return an authentication error
    if (!token) {
        return next(new CustomError('Authentication required', 401));
    }

    // Verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            return next(new CustomError('Invalid or expired token', 401));
        }
 
        // Set the user ID in req.user for use in subsequent middleware/routes
        req.user = decoded; // Assuming the user ID is stored in the token's payload

        console.log('User ID from JWT:', decoded); // Logging the user ID for debugging
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authenticateJWT;
