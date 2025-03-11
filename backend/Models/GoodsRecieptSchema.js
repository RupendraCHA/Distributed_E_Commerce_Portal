const mongoose = require("mongoose");

const GoodsReceiptSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // User who created the Goods Receipt
    supplierId: { type: String, required: true }, // Supplier ID
    supplierName: { type: String, required: true }, // Supplier Name
    documentDate: { type: String, required: true }, // Goods Receipt Document Date
    items: [
      {
        sNo: { type: Number, required: true }, // Serial Number
        materialId: { type: String, required: true },
        materialName: { type: String, required: true },
        shortText: { type: String, default: "" },
        quantity: { type: Number, required: true },
        unit: { type: String, default: "" },
        plant: { type: String, default: "" },
        storageLocation: { type: String, default: "" },
        movementType: { type: String, default: "101" }, // Goods Movement Type
        stockType: { type: String, default: "Unrestricted" },
        goodsRecipient: { type: String, default: "" },
        itemOK: { type: Boolean, default: true },
      },
    ],
  },
  { timestamps: true }
);

const GoodsReceiptModel = mongoose.model("GoodsReceipt", GoodsReceiptSchema);
module.exports = GoodsReceiptModel;
