const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  component: { type: String },
  componentDescription: { type: String },
  quantity: { type: String },
  compUnit: { type: String },
  itemText: { type: String },
  scrap: { type: String },
  operation: { type: String },
});

const billOfMaterialSchema = new mongoose.Schema(
  {
    materialCode: { type: String, required: true },
    plant: { type: String },
    alternativeBOM: { type: String },
    bomUsage: { type: String },
    baseQuantity: { type: String },
    unit: { type: String },
    validityStart: { type: String },
    validityEnd: { type: String },
    status: { type: String },
    lotSize: { type: String },
    revisionLevel: { type: String },
    headerText: { type: String },
    group: { type: String },
    groupCounter: { type: String },
    itemCategory: { type: String },
    components: [componentSchema],
  },
  { timestamps: true }
);

const BillOfMaterialModel = mongoose.model(
  "BillOfMaterial",
  billOfMaterialSchema
);

module.exports = BillOfMaterialModel;
