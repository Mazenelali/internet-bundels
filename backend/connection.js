import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Get the MongoDB connection URI from environment variables
const uri = process.env.DATABASE_URL;


// Connect to MongoDB
const connect = mongoose
    .connect(uri)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

export default connect;
