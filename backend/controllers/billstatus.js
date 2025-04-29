import {
    getNewestId,
    insertBillStatus,
    getBillsByUser,
    getBillsByBill,
    getAll,
    updateStatus,
    updatePaid,
    cancelStatus
} from "../models/BillStatusModel.js";
import mongoose from "mongoose";

// Helper function to validate MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// get newest Bill Status
export const showNewestStatusId = (req, res) => {
    getNewestId((err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
};

// create BillStatus
export const createBillStatus = (req, res) => {
    const data = req.body;

    // Validate user_id is a valid ObjectId
    if (!isValidObjectId(data.user_id)) {
        return res.status(400).json({ error: "Invalid user ID format" });
    }

    insertBillStatus(data, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json(results);
        }
    });
};

// get Bills Status by user
export const getAllBillsByUser = (req, res) => {
    // Validate user ID
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid user ID format" });
    }

    getBillsByUser(req.params.id, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
};

// get Bills Status by bill ID
export const getAllBillsByBill = (req, res) => {
    // Validate bill ID
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid bill ID format" });
    }

    getBillsByBill(req.params.id, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!results || results.length === 0) {
            res.status(404).json({ error: "Bill not found" });
        } else {
            res.json(results);
        }
    });
};

// get all Bills Status
export const getAllBills = (req, res) => {
    getAll((err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
};

// update Status
export const updateBillStatus = (req, res) => {
    // Validate bill ID
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid bill ID format" });
    }

    updateStatus(req.params.id, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!results) {
            res.status(404).json({ error: "Bill not found" });
        } else {
            res.json(results);
        }
    });
};

// update Paid status
export const updateBillPaid = (req, res) => {
    // Validate bill ID
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid bill ID format" });
    }

    updatePaid(req.params.id, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!results) {
            res.status(404).json({ error: "Bill not found" });
        } else {
            res.json(results);
        }
    });
};

// cancel Status
export const cancelBillStatus = (req, res) => {
    // Validate bill ID
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid bill ID format" });
    }

    cancelStatus(req.params.id, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!results) {
            res.status(404).json({ error: "Bill not found" });
        } else {
            res.json({ message: "Bill status canceled successfully" });
        }
    });
};