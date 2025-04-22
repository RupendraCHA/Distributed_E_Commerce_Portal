const mongoose = require("mongoose");

const GoodsIssueSchema = new mongoose.Schema(
  {
    processOrder: { type: String, required: true },
    material: { type: String, required: true },
    quantity: { type: Number, required: true },
    storageLocation: { type: String, required: true },
    postingDate: { type: Date, required: true },
    documentDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const GoodsIssueModel = mongoose.model("GoodsIssue", GoodsIssueSchema);
module.exports = GoodsIssueModel;
