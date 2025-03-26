const mongoose = require("mongoose");

const MaterialSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // Associate requisition with a user
    sNo: { type: Number, required: true, unique: true }, // Auto-incremented Serial Number
    itemNo: { type: String, required: true, unique: true }, // Unique Item Number
    materialId: { type: String, required: true, unique: true },
    materialName: { type: String, required: true },
    shortText: { type: String, default: "" },
    materialGroup: { type: String, default: "" },
    category: { type: String, default: "" },
    brand: { type: String, default: "" },
    price: { type: String, default: "" },
    description: { type: String, default: "" },
    weight: { type: String, default: "" },
    stock: { type: Number, default: 0 },
    expirationDate: { type: String, default: "" },
    unit: { type: String, default: "" },
    image: { type: String, default: "" },

    // New fields based on the provided object
    status: { type: String, default: "" },
    plant: { type: String, default: "" },
    storageLocation: { type: String, default: "" },
    purchasingGroup: { type: String, default: "" },
    requisitioner: { type: String, default: "" },
    trackingNo: { type: String, default: "" },
    splitIndicator: { type: String, default: "" },
    purchasingOrg: { type: String, default: "" },
    agreement: { type: String, default: "" },
    itemInfoRecord: { type: String, default: "" },
    mpnMaterial: { type: String, default: "" },
  },
  { timestamps: true }
);

// Pre-save middleware to auto-generate itemNo based on sNo
MaterialSchema.pre("save", async function (next) {
  if (!this.itemNo) {
    const lastMaterial = await this.constructor.findOne().sort({ sNo: -1 });
    this.sNo = lastMaterial ? lastMaterial.sNo + 1 : 1;
    this.itemNo = `ITM${String(this.sNo).padStart(3, "0")}`;
  }
  next();
});

const MaterialModel = mongoose.model("Material", MaterialSchema);
module.exports = MaterialModel;
