const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  productId: String,
  productName: String,
  category: String,
  brand: String,
  price: String,
});

const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;
