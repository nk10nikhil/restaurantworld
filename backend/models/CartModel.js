// import mongoose
import mongoose from "mongoose";

// Define Cart Schema
const cartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    food_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
        required: true
    },
    item_qty: {
        type: Number,
        required: true,
        default: 1
    },
    item_price: {
        type: Number,
        required: true
    }
    // Add any other fields that were in your MySQL cart table
}, {
    timestamps: true
});

// Composite index for user_id and food_id to ensure uniqueness
cartSchema.index({ user_id: 1, food_id: 1 }, { unique: true });

// Create Cart model from schema
const Cart = mongoose.model('Cart', cartSchema);

// get all items by user id
export const getAllItems = async (userId, result) => {
    try {
        const cartItems = await Cart.find({ user_id: userId })
            .populate('food_id') // This will populate food details
            .exec();
        result(null, cartItems);
    } catch (err) {
        console.log(err);
        result(err, null);
    }
};

// get a specific item by user id and food id
export const getAItem = async (userId, foodId, result) => {
    try {
        const cartItem = await Cart.findOne({
            user_id: userId,
            food_id: foodId
        });
        result(null, cartItem);
    } catch (err) {
        console.log(err);
        result(err, null);
    }
};

// insert new item to cart
export const insertToCart = async (data, result) => {
    try {
        const newCartItem = new Cart(data);
        const savedCartItem = await newCartItem.save();
        result(null, savedCartItem);
    } catch (err) {
        console.log(err);
        result(err, null);
    }
};

// update qty of a cart item
export const updateCartItemQty = async (data, result) => {
    try {
        const updatedCart = await Cart.findOneAndUpdate(
            { user_id: data.user_id, food_id: data.food_id },
            { item_qty: data.item_qty },
            { new: true }
        );
        result(null, updatedCart);
    } catch (err) {
        console.log(err);
        result(err, null);
    }
};

// delete cart item
export const deleteItemInCart = async (userId, foodId, result) => {
    try {
        const deletedItem = await Cart.findOneAndDelete({
            user_id: userId,
            food_id: foodId
        });
        result(null, deletedItem);
    } catch (err) {
        console.log(err);
        result(err, null);
    }
};

// delete all Items for a user
export const deleteAllItemsByUser = async (userId, result) => {
    try {
        const deleteResult = await Cart.deleteMany({ user_id: userId });
        result(null, deleteResult);
    } catch (err) {
        console.log(err);
        result(err, null);
    }
};

export default Cart;