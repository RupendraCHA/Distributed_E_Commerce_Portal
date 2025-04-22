const mongoose = require("mongoose");

const billOfMaterialSchema = new mongoose.Schema(
  {
    materialCode: { type: String, required: true },
    plant: { type: String, required: false },
    alternativeBOM: { type: String, default: "" },
    bomUsage: { type: String, default: "" },
    baseQuantity: { type: String, default: "" },
    unit: { type: String, default: "" },
    validityStart: { type: String, default: "" }, // Date string (ISO or YYYY-MM-DD)
    validityEnd: { type: String, default: "" },
    status: { type: String, default: "" },
    lotSize: { type: String, default: "" },
    revisionLevel: { type: String, default: "" },
    headerText: { type: String, default: "" },
    group: { type: String, default: "" },
    groupCounter: { type: String, default: "" },
    itemCategory: { type: String, default: "" },
    component: { type: String, default: "" },
    componentDescription: { type: String, default: "" },
    quantity: { type: String, default: "" },
    compUnit: { type: String, default: "" },
    itemText: { type: String, default: "" },
    scrap: { type: String, default: "" },
    operation: { type: String, default: "" },
  },
  { timestamps: true }
);

const BillOfMaterialModel = mongoose.model(
  "BillOfMaterial",
  billOfMaterialSchema
);

module.exports = BillOfMaterialModel;
