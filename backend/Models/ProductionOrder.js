const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  material: String,
  description: String,
  originalQty: Number,
  quantity: Number,
  confirmedQty: Number,
  grQty: Number,
  unit: String,
});

const ComponentSchema = new mongoose.Schema({
  material: String,
  totalQty: Number,
  unit: String,
  plant: String,
  batch: String,
});

const ProductionOrderSchema = new mongoose.Schema(
  {
    // Initial screen
    material: String,
    productionPlant: String,
    planningPlant: String,
    orderType: String,
    order: String,
    copyFromOrder: String,

    // General tab
    status: String,
    description: String,
    type: String,

    // Assignment tab
    mrpController: String,
    productionSupervisor: String,
    mrpArea: String,
    wbsElement: String,
    salesOrder: String,
    businessArea: String,
    profitCenter: String,
    objectClass: String,
    inspectionLot: String,
    plannedOrder: String,
    routingVersion: String,

    // Goods Receipt tab
    stockType: String,
    grProcessingTime: String,
    grNonValuated: Boolean,
    deliveryCompleted: Boolean,
    location: String,
    batch: String,
    stkSegment: String,
    goodsRecipient: String,
    unloadingPoint: String,

    // Control tab
    referenceOrder: String,
    reservationType: String,
    costing: {
      plnCostVar: String,
      actCostVar: String,
      costingSheet: String,
      overheadKey: String,
      raKey: String,
      varianceKey: String,
      plannedCostCalc: String,
    },
    scheduling: {
      type: String,
      reduction: String,
      profile: String,
      exactBreaks: String,
      autoSchedule: String,
      priority: String,
    },
    floats: {
      schedMarginKey: String,
      floatBefProdn: String,
      floatAftProdn: String,
      releasePeriod: String,
    },

    // Dates/Quantities tab
    basicDates: {
      release: String,
      start: String,
      end: String,
    },
    scheduledDate: String,
    confirmedDate: String,
    committedDate: String,
    quantities: {
      planned: Number,
      order: Number,
      delivered: Number,
      committed: Number,
      unit: String,
      scrap: Number,
    },

    // Master Data tab
    productionVersion: String,
    routing: {
      group: String,
      groupCounter: String,
      validFrom: String,
      validTo: String,
      lotSizeFrom: String,
      lotSizeTo: String,
      explosionDate: String,
      plannerGroup: String,
      tlType: String,
    },

    // Administration tab
    createdBy: String,
    createdAt: String,
    changeIndicator: String,
    changeProcessType: String,

    // Items and Components
    items: [ItemSchema],
    components: [ComponentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductionOrder", ProductionOrderSchema);
