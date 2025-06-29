const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EmployeeModel",
    required: true,
  },
  items: [
    {
      product: { type: String, required: true },
      name: { type: String, required: true, default: "schema changed" },
      quantity: { type: Number, required: true, default: 1 },
      price: { type: String, required: true }, // $ prefixed string
    },
  ],
  total: { type: Number, required: true },
  address: {
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    zipCode: String,
  },
  paymentMethod: {
    type: String,
    enum: ["debit card", "check", "stripe"],
    required: true,
  },
  debitCardDetails: {
    cardNumber: String,
    expiryDate: String,
    cvv: String,
  },
  checkDetails: {
    checkNumber: String,
    bankName: String,
  },
  status: {
    type: String,
    default: "pending",
  },
  deliveryDate: Date,
  deliveryType: {
    type: String,
    enum: ["standard", "premium", "airMail"],
    default: "standard",
  },
  isFulfilled: {
    type: Boolean,
    default: false,
  },
  isCleared: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const OrderModel = mongoose.model("Order", OrderSchema);
module.exports = OrderModel;
