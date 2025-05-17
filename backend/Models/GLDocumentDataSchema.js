const mongoose = require("mongoose");

const GLDocumentDataSchema = new mongoose.Schema(
  {
    chartOfAccounts: String,
    G_L_Account: Number,
    balanceSheetAccount: String,
    G_L_Account1: Number,
    groupAccountNumber: String,
    createdOn: Date,
    createdBy: String,
    "P&L_statmt_acct_type": String,
    accountGroup: String,
    sampleAccount: String,
    Trading_Partner_No: String,
    Mark_for_Deletion: String,
    Blocked_for_Creation: String,
    Blocked_for_Posting: String,
    Blocked_for_Planning: String,
    Search_Term: String,
    Functional_Area: String,
    G_L_Account_Type: String,
    G_L_Account_Subtype: String,
    reconciliationAccount: String,
    timeStampCreated: Date,
    shortText: String,
    G_L_Acct_Long_Text: String,
    G_L_Long_Text: String,
    timeStampModified: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "GLDocumentData",
  GLDocumentDataSchema,
  "gldocumentdata"
);
