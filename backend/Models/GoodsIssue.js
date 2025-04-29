// models/GoodsIssue.js
const mongoose = require("mongoose");

const GoodsIssueItemSchema = new mongoose.Schema({
  matShortText: { type: String },
  quantity: { type: Number },
  eun: { type: String },
  storageLocation: { type: String },
  batch: { type: String },
  valuationType: { type: String },
  stockType: { type: String },
  plant: { type: String },
  stockSegment: { type: String },
});

const GoodsIssueSchema = new mongoose.Schema(
  {
    processOrder: { type: String, required: true },
    receiptOrderId: { type: String },
    postingDate: { type: Date, required: true },
    documentDate: { type: Date, required: true },
    items: [GoodsIssueItemSchema], // <-- NEW
  },
  { timestamps: true }
);

const GoodsIssueModel = mongoose.model("GoodsIssue", GoodsIssueSchema);
module.exports = GoodsIssueModel;
