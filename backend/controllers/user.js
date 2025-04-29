// import functions from User model
import {
    getAllUser,
    getUserByEmail,
    insertUser
} from "../models/UserModel.js";

// get all Users
export const allUsers = (req, res) => {
    getAllUser((err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
};

// get single user
export const showAUser = (req, res) => {
    getUserByEmail(req.params.email, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!results) {
            res.status(404).json({ error: "User not found" });
        } else {
            res.json(results);
        }
    });
};

// create user
export const createAccount = (req, res) => {
    const data = req.body;

    // Validate required fields
    if (!data.user_name || !data.user_email || !data.user_password) {
        return res.status(400).json({
            error: "Missing required fields. Name, email, and password are required."
        });
    }

    insertUser(data, (err, results) => {
        if (err) {
            // Check for duplicate email error (MongoDB duplicate key error)
            if (err.code === 11000) {
                res.status(409).json({ error: "Email already exists" });
            } else {
                res.status(500).json({ error: err.message });
            }
        } else {
            // Return just necessary user data without password
            const userResponse = {
                _id: results._id,
                user_name: results.user_name,
                user_email: results.user_email
            };
            res.status(201).json(userResponse);
        }
    });
};




