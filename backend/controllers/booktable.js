import {
    insertBooking
} from "../models/BookTableModel.js";
import mongoose from "mongoose";

// Helper function to validate MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// create Booking
export const createBooking = (req, res) => {
    const data = req.body;

    // Validate user_id is a valid ObjectId
    if (!isValidObjectId(data.user_id)) {
        return res.status(400).json({ error: "Invalid user ID format" });
    }

    // Validate booking data
    if (!data.booking_date || !data.booking_time || !data.booking_guests) {
        return res.status(400).json({
            error: "Missing required booking information. Date, time and number of guests are required."
        });
    }

    insertBooking(data, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json(results);
        }
    });
};