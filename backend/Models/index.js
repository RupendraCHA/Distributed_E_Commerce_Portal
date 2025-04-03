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
};
