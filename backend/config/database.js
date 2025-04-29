import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// MongoDB Atlas connection string - you'll need to replace this with your actual connection string
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://username:password@cluster0.mongodb.net/restaurant?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
    console.error("Please make sure your MongoDB Atlas credentials are correct and the service is accessible.");
    throw new Error("Failed to connect to MongoDB. See error details above.");
  });

export default mongoose.connection;