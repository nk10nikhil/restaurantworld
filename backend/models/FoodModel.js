// import mongoose
import mongoose from "mongoose";

// Define Food Schema
const foodSchema = new mongoose.Schema({
    food_name: {
        type: String,
        required: true
    },
    food_price: {
        type: Number,
        required: true
    },
    food_image: {
        type: String
    },
    food_description: {
        type: String
    },
    food_category: {
        type: String
    }
    // Add any other fields that were in your MySQL food table
}, {
    timestamps: true // This adds createdAt and updatedAt fields
});

// Create Food model from schema
const Food = mongoose.model('Food', foodSchema);

// get all Foods
export const getFoods = async (result) => {
    try {
        const foods = await Food.find();
        result(null, foods);
    } catch (err) {
        console.log(err);
        result(err, null);
    }
};

// get single Food by ID
export const getFoodById = async (id, result) => {
    try {
        const food = await Food.findById(id);
        result(null, food);
    } catch (err) {
        console.log(err);
        result(err, null);
    }
};

// insert Food
export const insertFood = async (data, result) => {
    try {
        const newFood = new Food(data);
        const savedFood = await newFood.save();
        result(null, savedFood);
    } catch (err) {
        console.log(err);
        result(err, null);
    }
};

// update Food
export const updateFoodById = async (data, id, result) => {
    try {
        const updatedFood = await Food.findByIdAndUpdate(
            id,
            {
                food_name: data.food_name,
                food_price: data.food_price
                // Update other fields as needed
            },
            { new: true } // Return the updated document
        );
        result(null, updatedFood);
    } catch (err) {
        console.log(err);
        result(err, null);
    }
};

// delete Food
export const deleteFoodById = async (id, result) => {
    try {
        const deletedFood = await Food.findByIdAndDelete(id);
        result(null, deletedFood);
    } catch (err) {
        console.log(err);
        result(err, null);
    }
};

export default Food;