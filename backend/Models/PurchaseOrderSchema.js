const mongoose = require("mongoose");

const PurchaseOrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // User who created the PO
    vendorId: { type: String, required: true }, // Vendor ID
    vendorName: { type: String, required: true }, // Vendor Name
    documentDate: { type: String, required: true }, // Purchase Order Document Date
    items: [
      {
        sNo: { type: Number, required: true }, // Serial Number
        itemNo: { type: String, required: true }, // Item Number
        materialId: { type: String, required: true },
        materialName: { type: String, required: true },
        shortText: { type: String, default: "" },
        materialGroup: { type: String, default: "" },
        quantity: { type: Number, required: true },
        unit: { type: String, default: "" },
        deliveryDate: { type: String, required: true },
        plant: { type: String, default: "" },
        storageLocation: { type: String, default: "" },
        netPrice: { type: Number, required: true },
        currency: { type: String, default: "INR" },
        taxCode: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true }
);

const PurchaseOrderModel = mongoose.model("PurchaseOrder", PurchaseOrderSchema);
module.exports = PurchaseOrderModel;
