const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  item: { type: String },
  ict: { type: String }, // Item Category
  component: { type: String },
  componentDescription: { type: String },
  quantity: { type: String },
  unit: { type: String },
  validFrom: { type: String },
  validTo: { type: String },
  changeNumber: { type: String },
  sortString: { type: String },
  itemId: { type: String },
  changeNoTo: { type: String },
});

const billOfMaterialSchema = new mongoose.Schema(
  {
    materialCode: { type: String, required: true },
    plant: { type: String, default: "" },
    alternativeBOM: { type: String, default: "" },
    components: [componentSchema],
  },
  { timestamps: true }
);

const BillOfMaterialModel = mongoose.model(
  "BillOfMaterial",
  billOfMaterialSchema
);

module.exports = BillOfMaterialModel;
