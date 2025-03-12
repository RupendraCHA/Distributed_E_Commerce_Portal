const mongoose = require("mongoose");

const GoodsReceiptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to User who created the Goods Receipt

    purchaseOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchaseOrder",
      required: true,
    }, // Reference to Purchase Order

    supplierId: {
      type: String,
      required: true,
      trim: true,
    }, // ✅ Supplier ID (added)

    supplierName: {
      type: String,
      required: true,
      trim: true,
    }, // ✅ Supplier Name (added)

    documentDate: {
      type: Date,
      required: true,
    }, // Changed to Date type for better validation and sorting

    deliveryNote: {
      type: String,
      trim: true,
      default: "",
    }, // Trimmed for unnecessary spaces

    items: [
      {
        sNo: {
          type: Number,
          required: true,
        }, // Serial Number

        materialId: {
          type: String,
          required: true,
          trim: true,
        }, // Material Identifier

        materialName: {
          type: String,
          required: true,
          trim: true,
        }, // Material Name

        shortText: {
          type: String,
          trim: true,
          default: "",
        }, // Short Description

        quantityOrdered: {
          type: Number,
          required: true,
          min: 1,
        }, // Must be at least 1

        quantityReceived: {
          type: Number,
          required: true,
          min: 0,
        }, // Cannot be negative

        unit: {
          type: String,
          trim: true,
          default: "",
        }, // Measurement Unit

        plant: {
          type: String,
          trim: true,
          default: "",
        }, // Plant Location

        storageLocation: {
          type: String,
          trim: true,
          default: "",
        }, // Storage Location

        batch: {
          type: String,
          trim: true,
          default: "",
        }, // Batch Information

        stockSegment: {
          type: String,
          trim: true,
          default: "",
        }, // Stock Segment

        movementType: {
          type: String,
          trim: true,
          default: "101",
        }, // Default Movement Type

        stockType: {
          type: String,
          trim: true,
          default: "Unrestricted",
        }, // Default Stock Type

        goodsRecipient: {
          type: String,
          trim: true,
          default: "",
        }, // Goods Recipient

        unloadingPoint: {
          type: String,
          trim: true,
          default: "",
        }, // Unloading Point

        valuationType: {
          type: String,
          trim: true,
          default: "",
        }, // Valuation Type

        extendedAmount: {
          type: Number,
          default: 0,
          min: 0,
        }, // Prevents negative amount

        taxCode: {
          type: String,
          trim: true,
          default: "",
        }, // Tax Code

        currency: {
          type: String,
          trim: true,
          default: "INR",
        }, // Default to INR

        itemOK: {
          type: Boolean,
          default: true,
        }, // Approval status
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

// Indexes for faster querying
GoodsReceiptSchema.index({ userId: 1, purchaseOrderId: 1 });

const GoodsReceiptModel = mongoose.model("GoodsReceipt", GoodsReceiptSchema);
module.exports = GoodsReceiptModel;
