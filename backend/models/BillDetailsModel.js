// import mongoose
import mongoose from "mongoose";

// Define BillDetails Schema
const billDetailsSchema = new mongoose.Schema({
    bill_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BillStatus',
        required: true
    },
    food_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
        required: true
    },
    item_qty: {
        type: Number,
        required: true
    },
    item_price: {
        type: Number,
        required: true
    }
    // Add any other fields that were in your MySQL billdetails table
}, {
    timestamps: true
});

// Create BillDetails model from schema
const BillDetails = mongoose.model('BillDetails', billDetailsSchema);

// insert Bill Details
export const insertBillDetails = async (data, result) => {
    try {
        const newBillDetail = new BillDetails(data);
        const savedBillDetail = await newBillDetail.save();
        result(null, savedBillDetail);
    } catch (err) {
        console.log(err);
        result(err, null);
    }
};

// get Bill Details
export const getBillDetails = async (billId, result) => {
    try {
        const billDetails = await BillDetails.find({ bill_id: billId })
            .populate('food_id')
            .exec();
        result(null, billDetails);
    } catch (err) {
        console.log(err);
        result(err, null);
    }
};

export default BillDetails;