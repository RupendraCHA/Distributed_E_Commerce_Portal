const mongoose = require("mongoose");

const OperationSchema = new mongoose.Schema({
  operation: String,
  subOperation: String,
  resource: String,
  controlKey: String,
  description: String,
  baseQuantity: String,
  unit: String,
  validFrom: Date,
  validTo: Date,
  changeNumber: String,
});

const MaterialComponentAssignmentSchema = new mongoose.Schema({
  material: String,
  operation: String,
  description: String,
  quantity: Number,
  unit: String,
  itemText: String,
  itemNumber: String,
  bom: String,
  path: String,
  validFrom: Date,
});

const RecipeSchema = new mongoose.Schema(
  {
    // Initial Screen
    recipeGroup: String,
    recipe: String,
    material: String,
    plant: String,
    prodVersion: String,
    profile: String,
    keyDate: Date,
    changeNumber: String,

    // Recipe Header
    status: String,
    usage: String,
    plannerGroup: String,
    resourceNetwork: String,
    networkPlant: String,
    chargeQuantityRange: {
      from: Number,
      to: Number,
      unit: String,
    },
    defaultValues: {
      baseQuantity: Number,
      unit: String,
      operationQuantity: Number,
    },

    // Operations
    operations: [OperationSchema],

    // Materials Tab
    materials: {
      material: String,
      plant: String,
      prodVersion: String,
      baseQuantity: String,
      componentAssignments: [MaterialComponentAssignmentSchema],
    },

    // Administrative Data
    adminData: {
      changeNumber: String,
      validFrom: Date,
      validTo: Date,
      createdOn: Date,
      createdBy: String,
      changedOn: Date,
      changedBy: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", RecipeSchema);
