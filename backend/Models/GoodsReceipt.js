const mongoose = require("mongoose");

const ManufactureGoodsReceiptSchema = new mongoose.Schema(
  {
    material: { type: String, required: true },
    quantity: { type: Number, required: true },
    storageLocation: { type: String, required: true },
    documentDate: { type: Date, required: true },
    postingDate: { type: Date, required: true },
    deliveryNote: { type: String },
    docHeaderText: { type: String },
    batch: { type: String },
    valuationType: { type: String },
    movementType: { type: String },
    stockType: { type: String },
    plant: { type: String, required: true },
    stockSegment: { type: String },
  },
  { timestamps: true }
);

const ManufactureGoodsReceiptModel = mongoose.model(
  "ManufactureGoodsReceipt",
  ManufactureGoodsReceiptSchema
);
module.exports = ManufactureGoodsReceiptModel;
