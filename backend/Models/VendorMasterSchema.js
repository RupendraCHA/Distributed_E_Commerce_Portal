const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // User who manages the Vendor
    vendorAddress: { type: mongoose.Schema.Types.Mixed, default: {} },
    vendorControl: { type: mongoose.Schema.Types.Mixed, default: {} },
    paymentTransactions: { type: mongoose.Schema.Types.Mixed, default: {} },
    contactPersons: { type: mongoose.Schema.Types.Mixed, default: {} },
    accountingInformation: { type: mongoose.Schema.Types.Mixed, default: {} },
    paymentTransactionsAccounting: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    purchasingData: { type: mongoose.Schema.Types.Mixed, default: {} },
    partnerFunctions: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

const VendorMaster = mongoose.model("Vendor", VendorSchema);
module.exports = VendorMaster;
