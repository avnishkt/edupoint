const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'] // Email validation
    },
    password: {
        type: String,
        required: true,
        minlength: 8, // Ensures passwords are at least 8 characters long
        select: false 
    },
    avatar: {
        type: String,
        default: 'default-avatar.png' 
    },
    roles: {
        type: [String], // Array to allow multiple roles (e.g., 'User', 'Editor', 'Admin')
        enum: ['User', 'Editor', 'Admin'],
        default: ['User']
    },
    refreshToken: {
        type: String,
        select: false // Hide refresh token in normal queries for security
    },
}, { timestamps: true }); 

// Pre-save hook for hashing passwords
userSchema.pre('save', async function (next) {
    // Only hash password if it's new or has been modified
    if (!this.isModified('password')) return next();
    
    // Use bcrypt to hash the password with dynamic salt rounds
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    
    next();
});

// Method to compare entered password with hashed password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Method to generate access token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        userInfo: {
            email: this.email,
            roles: this.roles
        }
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m'
    });
};

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { email: this.email },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d'
        }
    );
};

// Virtual field to return a user's role as a string, e.g., 'Admin' or 'User'
userSchema.virtual('role').get(function () {
    return this.roles[0]; 
});

// Index email for faster lookups and make roles indexable for role-based queries
userSchema.index({ email: 1 });
userSchema.index({ roles: 1 });

// Export the model
module.exports = mongoose.model('User', userSchema);
