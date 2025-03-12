const mongoose = require("mongoose");

const InboundDeliverySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // User who created the delivery
    supplierId: { type: String, required: true }, // Supplier ID
    supplierName: { type: String, required: true }, // Supplier Name
    documentDate: { type: String, required: true }, // Document Date
    items: [
      {
        sNo: { type: Number, required: true }, // Serial Number
        materialId: { type: String, required: true },
        materialName: { type: String, required: true },
        deliveryQuantity: { type: Number, required: true },
        unit: { type: String, default: "" },
        storageLocation: { type: String, default: "" },
        supplierBatch: { type: String, default: "" },
        grossWeight: { type: String, default: "" },
        volume: { type: String, default: "" },
        warehouseNo: { type: String, default: "" },
        referenceDocument: { type: String, default: "" },
        putawayQty: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

const InboundDeliveryModel = mongoose.model(
  "InboundDelivery",
  InboundDeliverySchema
);
module.exports = InboundDeliveryModel;
