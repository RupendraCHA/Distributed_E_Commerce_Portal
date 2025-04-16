const mongoose = require("mongoose");

const ReceiptOrderSchema = new mongoose.Schema(
  {
    materialId: { type: String, required: true },
    plant: { type: String, required: true },
    storageLocation: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    purchaseOrderRef: { type: String },
  },
  { timestamps: true }
);
const ReceiptOrderModel = mongoose.model("ReceiptOrder", ReceiptOrderSchema);

module.exports = ReceiptOrderModel;
