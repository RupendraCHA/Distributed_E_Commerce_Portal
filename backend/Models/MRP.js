const mongoose = require("mongoose");

const mrpItemSchema = new mongoose.Schema({
  materialId: String,
  materialName: String,
  mrpArea: String,
  plant: String,
  stckDS: Number,
  firstRDS: String,
  secondR: String,
  plantStock: Number,
  bun: String,
  safetyStock: Number,
  reorderPoint: Number,
  mtype: String,
  pt: String,
  sp: String,
  abcIndicator: String,
  mrpGroup: String,
  mt: String,
  cde: String,
});

const mrpSchema = new mongoose.Schema(
  {
    materialId: String,
    materialName: String,
    mrpArea: String,
    plant: String,
    items: [mrpItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("MRP", mrpSchema);
