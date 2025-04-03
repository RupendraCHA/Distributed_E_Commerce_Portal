const mongoose = require("mongoose");

const ItemInfoRecordSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // User who created the record
    purchOrgData1: { type: mongoose.Schema.Types.Mixed, default: {} },
    purchOrgData2: { type: mongoose.Schema.Types.Mixed, default: {} },
    sourceListOverview: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

const ItemInfoRecordModel = mongoose.model(
  "ItemInfoRecord",
  ItemInfoRecordSchema
);
module.exports = ItemInfoRecordModel;
