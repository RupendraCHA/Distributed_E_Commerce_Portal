const mongoose = require("mongoose");

const ProductionOrderSettlementSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true },
    category: String,
    settlementReceiver: String,
    receiverShortText: String,
    percentage: Number,
    equivalenceNumber: String,
    ruleNumber: Number,
    fromS: Number,
    toS: Number,
    toFiscalYear: Number,
    firstUsedDate: Date,
    lastUsedDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ProductionOrderSettlement",
  ProductionOrderSettlementSchema
);
