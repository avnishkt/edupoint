
const User = require("../model/user");
const catchAsyncAwait = require('../utils/CatchAsync');
const CustomError = require('../utils/CoustomError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
require("dotenv").config(); 

// Function to generate access and refresh tokens
const generateAccessTokenRefreshToken = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new CustomError('User not found', 404);
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    
    return { accessToken, refreshToken };
};

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
        password: password,
        roles: roles || ['User'],
    });

    // Generate tokens for the new user
    const { accessToken, refreshToken } = await generateAccessTokenRefreshToken(newUser._id);

    
    newUser.refreshToken = refreshToken;
    await newUser.save(); 

    
    res.cookie('accessToken', accessToken, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 60 * 60 * 1000 , // 1 hour
    });

    res.status(201).json({
        success: true,
        data: {
            userId: newUser._id,
            name: newUser.name,
            email: newUser.email,
            avatar: newUser.avatar,
            roles: newUser.roles,
            accessToken,
            password:newUser.password
        },
    });
});

// Logout user and clear the cookie
const logoutUser = catchAsyncAwait(async (req, res) => {
    res.clearCookie('refreshToken'); 
    res.status(200).json({ success: true, message: 'Logged out successfully' });
});

// Login user
const loginUser = catchAsyncAwait(async (req, res, next) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
        return next(new CustomError('Invalid email or password', 400));
    }

    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) {
        return next(new CustomError('Invalid email or password', 400));
    }

    // Generate tokens for the user
    const { accessToken, refreshToken } = await generateAccessTokenRefreshToken(existingUser._id);

    // Save the refresh token in the user's document
    existingUser.refreshToken = refreshToken;
    await existingUser.save();

  
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 1000 //i hour
    });

    
    res.status(200).json({
        success: true,
        data: {
            userId: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            avatar: existingUser.avatar,
            roles: existingUser.roles,
            accessToken,
        },
    });
});

// Delete all users (use with caution)
const deleteUser = catchAsyncAwait(async (req, res) => {
    await User.deleteMany();
    res.json({ message: 'All users deleted' });
});

const updateUser = catchAsyncAwait(async (req, res, next) => {
    const { userId } = req.params; 
    const { name, email, password, roles } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
        return next(new CustomError('User not found', 404));
    }

    
    if (name) user.name = name;
    if (email) {
        
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser._id.toString() !== userId) {
            return next(new CustomError('Email is already in use by another user', 400));
        }
        user.email = email;
    }
    if (password) user.password = password; 
    if (roles) user.roles = roles;

   
    await user.save();
    const { accessToken, refreshToken } = await generateAccessTokenRefreshToken(newUser._id);

   
    newUser.refreshToken = refreshToken;
    await newUser.save(); 

    
    res.cookie('accessToken', accessToken, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 60 * 60 * 1000 , // 1 hour
    });

    res.status(201).json({
        success: true,
        data: {
            userId:  user._id,
            name: user.name,
            email:  user.email,
            avatar:  user.avatar,
            roles:  user.roles,
            accessToken,
        },
    });
});


module.exports = {
    createUser,
    generateAccessTokenRefreshToken,
    loginUser,
    logoutUser,
    deleteUser,
    updateUser
};
