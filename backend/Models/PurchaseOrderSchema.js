const mongoose = require("mongoose");

const PurchaseOrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // User who created the PO
    supplierId: { type: String, required: true }, // Ssupplier ID
    supplierName: { type: String, required: true }, // Ssupplier Name
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
        startDate: { type: String, default: "" }, // New: Start Date
        endDate: { type: String, default: "" }, // New: End Date
        plant: { type: String, default: "" },
        storageLocation: { type: String, default: "" },
        batch: { type: String, default: "" }, // New: Batch
        stockSegment: { type: String, default: "" }, // New: Stock Segment
        requestSegment: { type: String, default: "" }, // New: Request Segment
        requirementNo: { type: String, default: "" }, // New: Requirement Number
        requisitioner: { type: String, default: "" }, // New: Requisitioner
        netPrice: { type: Number, required: true },
        currency: { type: String, default: "INR" },
        taxCode: { type: String, default: "" },
        infoRecord: { type: String, default: "" }, // New: Info Record
        outlineAgreement: { type: String, default: "" }, // New: Outline Agreement
        issuingStorageLocation: { type: String, default: "" }, // New: Issuing Storage Location
        servicePerformer: { type: String, default: "" }, // New: Service Performer
        revisionLevel: { type: String, default: "" }, // New: Revision Level
        supplierMatNo: { type: String, default: "" }, // New: Supplier Material No.
        supplierSubrange: { type: String, default: "" }, // New: Supplier Subrange
        supplierBatch: { type: String, default: "" }, // New: Supplier Batch
        commodityCode: { type: String, default: "" }, // New: Commodity Code
      },
    ],
  },
  { timestamps: true }
);

const PurchaseOrderModel = mongoose.model("PurchaseOrder", PurchaseOrderSchema);
module.exports = PurchaseOrderModel;
