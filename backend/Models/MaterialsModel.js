const mongoose = require("mongoose");

const MaterialSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // Associate requisition with a user
    materialId: { type: String, required: true, unique: true },
    materialName: { type: String, required: true },
    category: String,
    brand: String,
    price: String,
    description: String,
    weight: String,
    stock: Number,
    expirationDate: String,
    image: String,
  },
  { timestamps: true }
);

const MaterialModel = mongoose.model("Material", MaterialSchema);
module.exports = MaterialModel;
