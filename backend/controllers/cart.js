// import functions from Cart model
import {
    getAllItems,
    getAItem,
    insertToCart,
    updateCartItemQty,
    deleteItemInCart,
    deleteAllItemsByUser
} from "../models/CartModel.js";
import mongoose from "mongoose";

// Helper function to validate MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// get all Items
export const allItems = (req, res) => {
    // Validate if the user ID is a valid MongoDB ObjectId
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid user ID format" });
    }

    getAllItems(req.params.id, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
};

// get a Item
export const getItem = (req, res) => {
    // Validate if the IDs are valid MongoDB ObjectIds
    if (!isValidObjectId(req.params.user_id) || !isValidObjectId(req.params.food_id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    const user_id = req.params.user_id;
    const food_id = req.params.food_id;
    getAItem(user_id, food_id, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
};

// add to cart
export const addItems = (req, res) => {
    // Validate if the IDs in the request body are valid MongoDB ObjectIds
    if (!isValidObjectId(req.body.user_id) || !isValidObjectId(req.body.food_id)) {
        return res.status(400).json({ error: "Invalid ID format in request" });
    }

    const data = req.body;
    insertToCart(data, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json(results);
        }
    });
};

// update Item
export const updateItem = (req, res) => {
    // Validate if the IDs in the request body are valid MongoDB ObjectIds
    if (!isValidObjectId(req.body.user_id) || !isValidObjectId(req.body.food_id)) {
        return res.status(400).json({ error: "Invalid ID format in request" });
    }

    const data = req.body;
    updateCartItemQty(data, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!results) {
            res.status(404).json({ error: "Cart item not found" });
        } else {
            res.json(results);
        }
    });
};

// delete a item in cart
export const deleteItem = (req, res) => {
    // Validate if the IDs are valid MongoDB ObjectIds
    if (!isValidObjectId(req.params.user_id) || !isValidObjectId(req.params.food_id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    const user_id = req.params.user_id;
    const food_id = req.params.food_id;
    deleteItemInCart(user_id, food_id, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!results) {
            res.status(404).json({ error: "Cart item not found" });
        } else {
            res.json({ message: "Cart item deleted successfully" });
        }
    });
};

// delete all items in cart
export const deleteItems = (req, res) => {
    // Validate if the user ID is a valid MongoDB ObjectId
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid user ID format" });
    }

    deleteAllItemsByUser(req.params.id, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: "All cart items deleted successfully" });
        }
    });
};
