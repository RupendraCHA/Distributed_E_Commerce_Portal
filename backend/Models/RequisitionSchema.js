const mongoose = require("mongoose");

const RequisitionSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    materials: [
      {
        materialId: { type: String, required: true },
        materialName: { type: String, required: true },
        quantity: { type: Number, required: true },
        deliveryDate: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const RequisitionModel = mongoose.model("Requisition", RequisitionSchema);
module.exports = RequisitionModel;
