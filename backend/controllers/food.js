// import functions from Food model
import {
    getFoods,
    getFoodById,
    insertFood,
    updateFoodById,
    deleteFoodById,
} from "../models/FoodModel.js";
import mongoose from "mongoose";

// Helper function to validate MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// get all Foods
export const showFoods = (req, res) => {
    getFoods((err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
};

// get single Food
export const showFoodById = (req, res) => {
    // Validate if the ID is a valid MongoDB ObjectId
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid food ID format" });
    }

    getFoodById(req.params.id, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!results) {
            res.status(404).json({ error: "Food not found" });
        } else {
            res.json(results);
        }
    });
};

// create Food
export const createFood = (req, res) => {
    const data = req.body;
    insertFood(data, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json(results);
        }
    });
};

// update Food
export const updateFood = (req, res) => {
    // Validate if the ID is a valid MongoDB ObjectId
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid food ID format" });
    }

    const data = req.body;
    const id = req.params.id;
    updateFoodById(data, id, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!results) {
            res.status(404).json({ error: "Food not found" });
        } else {
            res.json(results);
        }
    });
};

// delete Food
export const deleteFood = (req, res) => {
    // Validate if the ID is a valid MongoDB ObjectId
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid food ID format" });
    }

    const id = req.params.id;
    deleteFoodById(id, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!results) {
            res.status(404).json({ error: "Food not found" });
        } else {
            res.json({ message: "Food deleted successfully" });
        }
    });
};