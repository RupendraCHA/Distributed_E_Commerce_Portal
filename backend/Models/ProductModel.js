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
  quantity: {
    type: Number,
    default: 1000,
  },
});

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
