const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  productId: { type: String, required: true },  // Store productId as a string
  quantity: { type: Number, required: true, default: 1 },
  productName: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  weight: { type: String, required: true },
  expirationDate: { type: String, required: true },
  image: { type: String, required: true },
});

const CartModel = mongoose.model("Cart", CartSchema);

module.exports = CartModel;
