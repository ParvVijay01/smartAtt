const mongoose = require("mongoose")
const dotenv = require("dotenv").config();

const connectDb = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1)
    }
}

module.exports = connectDb