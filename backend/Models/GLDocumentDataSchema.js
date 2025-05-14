const mongoose = require("mongoose");

const GLDocumentDataSchema = new mongoose.Schema(
  {
    chartOfAccounts: String,
    glAccount: String,
    balanceSheetAccount: String,
    groupAccountNumber: String,
    createdOn: Date,
    createdBy: String,
    plStatementAccountType: String,
    accountGroup: String,
    sampleAccount: String,
    glAccountType: String,
    glAccountSubtype: String,
    reconciliationAccount: String,
    shortText: String,
    glAcctLongText: String,
    glLongText: String,
    timeStampCreated: Date,
    timeStampModified: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("GLDocumentData", GLDocumentDataSchema);
