const EmployeeModel = require("./Employee");
const AddressModel = require("./AddressSchema");
const OrderModel = require("./OrdersSchema");
const CartModel = require("./CartSchema");
const SavedItemModel = require("./SavedItemSChema");
const DistributorModel = require("./Distributor.model");
const ProductModel = require("./ProductModel");
const GoodsReceiptModel = require("./GoodsRecieptSchema");
const InboundDeliveryModel = require("./InboundDeliverySchema");
const VendorBillModel = require("./vendor_bill_schema");
const VendorMasterModel = require("./VendorMasterSchema");
const ItemInfoRecordModel = require("./ItemInfoRecordSchema");
const VendorAgreementModel = require("./vendorAgreementSchema");
const GoodsIssueModel = require("./GoodsIssue");
const ManufactureGoodsReceiptModel = require("./GoodsReceipt");
const RecieptOrderModel = require("./RecieptOrder");
const BillOfMaterialModel = require("./BillOfMaterial.js");
const MRPModel = require("./MRP.js");
const ProductionOrderModel = require("./ProductionOrder.js");
const ProductionPlanModel = require("./ProductionPlan.js");
const RecipeModel = require("./Recipe.js");
const ProductionOrderSettlementModel = require("./ProductionOrderSettlement.js");
const GLDocumentModel = require("./GLDocumentSchema");
const GLDocumentDataModel = require("./GLDocumentDataSchema");
module.exports = {
  EmployeeModel,
  AddressModel,
  OrderModel,
  CartModel,
  SavedItemModel,
  ProductModel,
  DistributorModel,
  GoodsReceiptModel,
  InboundDeliveryModel,
  VendorBillModel,
  VendorMasterModel,
  ItemInfoRecordModel,
  VendorAgreementModel,
  GoodsIssueModel,
  RecieptOrderModel,
  ManufactureGoodsReceiptModel,
  BillOfMaterialModel,
  MRPModel,
  ProductionOrderModel,
  ProductionPlanModel,
  RecipeModel,
  ProductionOrderSettlementModel,
  GLDocumentModel,
  GLDocumentDataModel,
};
