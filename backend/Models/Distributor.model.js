// models/DistributorModel.js
const mongoose = require("mongoose");

// Warehouse Schema
const warehouseSchema = new mongoose.Schema({
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: String,
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  isPrimary: {
    type: Boolean,
    default: false,
  },
  phone: String,
  capacity: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  inventory: [
    {
      productId: {
        type: String,
      },
      quantity: {
        type: Number,
        default: 0,
      },
    },
  ],
});

// Distributor Schema
const distributorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  distributorId: {
    type: String,
    unique: true,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  contactPerson: {
    name: String,
    email: String,
    phone: String,
  },
  warehouses: [warehouseSchema],
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      price: {
        type: Number,
        required: true,
      },
      active: {
        type: Boolean,
        default: true,
      },
    },
  ],
  status: {
    type: String,
    enum: ["active", "inactive", "suspended"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the updatedAt field
distributorSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Method to generate unique distributor ID
distributorSchema.statics.generateDistributorId = async function () {
  const count = await this.countDocuments();
  const year = new Date().getFullYear().toString().slice(-2);
  return `DIST${year}${(count + 1).toString().padStart(4, "0")}`;
};

// Method to check if warehouse exists
distributorSchema.methods.hasWarehouse = function () {
  return this.warehouses.length > 0;
};

const DistributorModel = mongoose.model("Distributor", distributorSchema);

module.exports = DistributorModel;
