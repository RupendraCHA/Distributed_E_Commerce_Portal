const mongoose = require("mongoose");

const ScheduleLineSchema = new mongoose.Schema({
  requirementDate: String, // 'MM.YYYY' format
  plannedQty: Number,
  valueINR: Number,
  pricePerUnit: Number,
  bomExplosion: String,
  standardVal: String,
});

const ProductionPlanSchema = new mongoose.Schema(
  {
    material: String,
    productGroup: String,
    requirementsPlan: String,
    externalRequirementsPlan: String,
    mrpArea: String,
    plant: String,

    version: String,
    planningHorizonFrom: Date,
    planningHorizonTo: Date,
    planningPeriod: String, // "Month", "Week", etc.

    shortText: String,
    planQty: Number,
    unit: String,
    requirementType: String,
    requirementClass: String,
    mrpType: String,
    strategyGroup: String,
    issueStorageLocation: String,
    mrpGroup: String,

    baseUnit: String,
    requirementSegment: String,
    monthlyPlanQuantities: {
      type: Map,
      of: Number, // key: 'MM.YYYY', value: planned quantity
    },

    scheduleLines: [ScheduleLineSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductionPlan", ProductionPlanSchema);
