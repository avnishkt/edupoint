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
        // unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'] 
    },
    password: {
        type: String,
        required: true,
        minlength: 8, 
        select: false
    },
    avatar: {
        type: String,
        default: 'default-avatar.png'
    },
    roles: {
        type: [String], 
        enum: ['User', 'Editor', 'Admin'],
        default: ['User']
    },
    refreshToken: {
        type: String,
        select: false
    },
}, { timestamps: true });

// Pre-save hook for hashing passwords
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;
    this.password = await bcrypt.hash(this.password, saltRounds);

    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Method to generate access token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        userInfo: {
            id:this._id,
            email: this.email,
            roles: this.roles
        }
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d'
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
