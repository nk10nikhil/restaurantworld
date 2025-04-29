// import mongoose
import mongoose from "mongoose";

// Define BookTable Schema
const bookTableSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    booking_date: {
        type: Date,
        required: true
    },
    booking_time: {
        type: String,
        required: true
    },
    booking_guests: {
        type: Number,
        required: true
    },
    booking_request: {
        type: String
    }
    // Add any other fields that were in your MySQL booktable table
}, {
    timestamps: true
});

// Create BookTable model from schema
const BookTable = mongoose.model('BookTable', bookTableSchema);

// insert Booking
export const insertBooking = async (data, result) => {
    try {
        const newBooking = new BookTable(data);
        const savedBooking = await newBooking.save();
        result(null, savedBooking);
    } catch (err) {
        console.log(err);
        result(err, null);
    }
};

export default BookTable;