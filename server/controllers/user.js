// controllers/userController.js
const User = require("../model/user");
const catchAsyncAwait = require('../utils/CatchAsync');
const CustomError = require('../utils/CoustomError'); // Corrected the spelling of CustomError

// Function to generate access and refresh tokens
const generateAccessTokenRefreshToken = catchAsyncAwait(async (id) => {
    const user = await User.findById(id); 
    if (!user) {
        throw new CustomError('User not found', 404);
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    return { accessToken, refreshToken };
});

// Function to create a new user
const createUser = catchAsyncAwait(async (req, res, next) => {
    const { name, email, password, roles } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new CustomError('User with this email already exists', 400));
    }

    // Create a new user
    const newUser = await User.create({
        name,
        email,
        password,
        roles: roles || ['User'], 
    });

    // Generate tokens for the new user
    const { accessToken, refreshToken } = await generateAccessTokenRefreshToken(newUser._id);
    
    // Save the refresh token in the user's document
    newUser.refreshToken = refreshToken; 
    await newUser.save(); // Await the save operation

    // Return the response (excluding sensitive data)
    res.status(201).json({
        success: true,
        data: {
            userId: newUser._id,
            name: newUser.name,
            email: newUser.email,
            avatar: newUser.avatar,
            roles: newUser.roles,
            accessToken, 
            refreshToken, 
        },
    });
});


module.exports = { createUser, generateAccessTokenRefreshToken };
