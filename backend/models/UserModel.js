// import mongoose
import mongoose from "mongoose";

// Define User Schema
const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true,
        unique: true
    },
    user_password: {
        type: String,
        required: true
    },
    // Add any other fields that were in your MySQL user table
}, {
    timestamps: true // This adds createdAt and updatedAt fields
});

// Create User model from schema
const User = mongoose.model('User', userSchema);

// get all users
export const getAllUser = async (result) => {
    try {
        const users = await User.find();
        result(null, users);
    } catch (err) {
        console.log(err);
        result(err, null);
    }
};

// get single user by email
export const getUserByEmail = async (email, result) => {
    try {
        const user = await User.findOne({ user_email: email }).select('user_id user_name user_password');
        result(null, user);
    } catch (err) {
        console.log(err);
        result(err, null);
    }
};

// insert User
export const insertUser = async (data, result) => {
    try {
        const newUser = new User(data);
        const savedUser = await newUser.save();
        result(null, savedUser);
    } catch (err) {
        console.log(err);
        result(err, null);
    }
};

export default User;




