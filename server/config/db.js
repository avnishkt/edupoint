const mongoose = require('mongoose');
require('dotenv').config();

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false
};


const connectDb = async () => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        console.error("MongoDB URI is not defined in the environment variables.");
        process.exit(1); 
    }

    try {
        
        await mongoose.connect(mongoUri, options);
        console.log("✅ Database connected successfully");
    } catch (error) {
        console.error(`❌ Database connection failed: ${error.message}`);
       
        setTimeout(() => {
            console.log("🔄 Retrying database connection...");
            connectDb();
        }, 5000);
    }
};


mongoose.connection.on('disconnected', () => {
    console.log("⚠️ MongoDB disconnected. Reconnecting...");
    connectDb(); 
});

module.exports = connectDb;
