const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productId: String,
  productName: String,
  category: String,
  brand: String,
  price: String,
  description: String,
  weight: String,
  stock: Number,
  expirationDate: String,
  image: String,
  quantity: Number,
});

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EmployeeModel",
    required: true,
  },
  items: [ProductSchema],
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
    enum: ["debit card", "check"],
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
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;
