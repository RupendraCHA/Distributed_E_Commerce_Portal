const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    product: { type: String },
    name: { type: String },
    quantity: { type: Number },
    price: { type: String },
    isPaid: { type: Boolean, default: false },
    isFulfilled: { type: Boolean, default: false } // ✅ NEW
});


const transactionSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true },
        items: [itemSchema],
        total: { type: Number },
        address: {
            addressLine1: String,
            addressLine2: String,
            city: String,
            state: String,
            zipCode: String,
        },
        paymentMethod: String,
        status: String,
        deliveryType: String,
    },
    { timestamps: true }
);

const TransactionModel = mongoose.model('Transaction', transactionSchema, 'orders');
module.exports = { TransactionModel };
