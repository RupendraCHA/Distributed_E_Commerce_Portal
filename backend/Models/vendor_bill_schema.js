const mongoose = require("mongoose");

const VendorBillSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // User who created the Vendor Bill
    supplierName: { type: String, required: true },
    documentDate: { type: String },
    poReference: { type: String, required: true },
    basicData: { type: mongoose.Schema.Types.Mixed, default: {} },
    payment: { type: mongoose.Schema.Types.Mixed, default: {} },
    details: { type: mongoose.Schema.Types.Mixed, default: {} },
    tax: { type: mongoose.Schema.Types.Mixed, default: {} },
    contacts: { type: mongoose.Schema.Types.Mixed, default: {} },
    note: { type: mongoose.Schema.Types.Mixed, default: {} },
    poItems: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

const VendorBillModel = mongoose.model("VendorBill", VendorBillSchema);
module.exports = VendorBillModel;
