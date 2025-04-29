// import mongoose
import mongoose from "mongoose";

// Define BillStatus Schema
const billStatusSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bill_date: {
        type: Date,
        default: Date.now
    },
    bill_status: {
        type: Number,
        default: 1
    },
    bill_paid: {
        type: Boolean,
        default: false
    },
    bill_total: {
        type: Number,
        required: true
    }
    // Add any other fields that were in your MySQL billstatus table
}, {
    timestamps: true
});

// Create BillStatus model from schema
const BillStatus = mongoose.model('BillStatus', billStatusSchema);

// get newest Bill Status
export const getNewestId = async (result) => {
    try {
        const newestBill = await BillStatus.findOne()
            .sort({ _id: -1 })
            .limit(1);
        result(null, newestBill);
    } catch (err) {
        console.log(err);
        result(err, null);
    }
};

// insert Bill Status
export const insertBillStatus = async (data, result) => {
    try {
        const newBillStatus = new BillStatus(data);
        const savedBillStatus = await newBillStatus.save();
        result(null, savedBillStatus);
    } catch (err) {
        console.log(err);
        result(err, null);
    }
};

// get all Bills Status by user
export const getBillsByUser = async (userId, result) => {
    try {
        const bills = await BillStatus.find({ user_id: userId });
        result(null, bills);
    } catch (err) {
        console.log(err);
        result(err, null);
    }
};

// get Bill Status by bill id
export const getBillsByBill = async (billId, result) => {
    try {
        const bill = await BillStatus.findById(billId);
        result(null, bill ? [bill] : []);
    } catch (err) {
        console.log(err);
        result(err, null);
    }
};

// get all Bills Status
export const getAll = async (result) => {
    try {
        const allBills = await BillStatus.find();
        result(null, allBills);
    } catch (err) {
        console.log(err);
        result(err, null);
    }
};

// update Bill Status (increment by 1)
export const updateStatus = async (id, result) => {
    try {
        const updatedBill = await BillStatus.findByIdAndUpdate(
            id,
            { $inc: { bill_status: 1 } }, // Increment bill_status by 1
            { new: true }
        );
        result(null, updatedBill);
    } catch (err) {
        console.log(err);
        result(err, null);
    }
};

// update Bill Paid status to true
export const updatePaid = async (id, result) => {
    try {
        const updatedBill = await BillStatus.findByIdAndUpdate(
            id,
            { bill_paid: true },
            { new: true }
        );
        result(null, updatedBill);
    } catch (err) {
        console.log(err);
        result(err, null);
    }
};

// cancel Bill Status (set status to 0 and paid to false)
export const cancelStatus = async (id, result) => {
    try {
        const updatedBill = await BillStatus.findByIdAndUpdate(
            id,
            { bill_status: 0, bill_paid: false },
            { new: true }
        );
        result(null, updatedBill);
    } catch (err) {
        console.log(err);
        result(err, null);
    }
};

export default BillStatus;