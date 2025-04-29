import {
    insertBillDetails,
    getBillDetails
} from "../models/BillDetailsModel.js";
import mongoose from "mongoose";

// Helper function to validate MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// create BillDetails
export const createBillDetails = (req, res) => {
    const data = req.body;

    // Validate bill_id and food_id are valid ObjectIds
    if (!isValidObjectId(data.bill_id) || !isValidObjectId(data.food_id)) {
        return res.status(400).json({ error: "Invalid ID format in request" });
    }

    insertBillDetails(data, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json(results);
        }
    });
};

// get BillDetails
export const getBillDetailsById = (req, res) => {
    // Validate bill ID
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid bill ID format" });
    }

    getBillDetails(req.params.id, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
};