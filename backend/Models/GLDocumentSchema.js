const mongoose = require("mongoose");

const GLItemSchema = new mongoose.Schema({
  glAccount: String,
  shortText: String,
  debitCreditIndicator: {
    type: String,
    enum: ["D", "C"],
  },
  amountInDocCurrency: Number,
  localCurrencyAmount: Number,
  taxJurisdictionCode: String,
  assignment: String,
});

const GLDocumentSchema = new mongoose.Schema(
  {
    documentDate: Date,
    postingDate: Date,
    currency: String,
    reference: String,
    documentHeaderText: String,
    crossCCNumber: String,
    companyCode: String,
    companyName: String,
    totalDebit: Number,
    totalCredit: Number,
    items: [GLItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("GLDocument", GLDocumentSchema);
