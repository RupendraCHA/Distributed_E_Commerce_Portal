const mongoose = require("mongoose");

const ReceiptOrderSchema = new mongoose.Schema(
  {
    materialId: { type: String, required: true },
    plant: { type: String, required: true },
    storageLocation: { type: String, required: true },
    quantity: { type: Number },
    unit: { type: String },
    processOrderType: { type: String },
    processOrder: { type: String },
  },
  {
    strict: false,
    timestamps: true,
  }
);

const ReceiptOrderModel = mongoose.model("ReceiptOrder", ReceiptOrderSchema);

module.exports = ReceiptOrderModel;
