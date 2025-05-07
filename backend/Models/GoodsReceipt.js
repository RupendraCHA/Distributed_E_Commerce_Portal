const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  lineNo: Number,
  material: String,
  shortText: String,
  quantity: Number,
  unit: String,
  storageLocation: String,
  stockSegment: String,
  batch: String,
  valuationType: String,
  movementType: { type: String, default: "101" },
  stockType: { type: String, default: "+ Quality Insp." },
  plant: String,
  jitCallNo: String,
  wOk: { type: Boolean, default: false },
});

const GoodsReceiptSchema = new mongoose.Schema(
  {
    orderNumber: String,
    documentDate: Date,
    postingDate: Date,
    deliveryNote: String,
    headerText: String,
    items: [ItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ManufactureGoodsReceipt", GoodsReceiptSchema);
