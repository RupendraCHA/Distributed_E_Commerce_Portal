const mongoose = require("mongoose");

const vendorAgreementSchema = new mongoose.Schema(
  {
    initial: {
      supplier: String,
      agreementType: String,
      agreementDate: String,
      purchasingOrganization: String,
      purchasingGroup: String,
      itemCategory: String,
      accountAssignmentCategory: String,
      plant: String,
      storageLocation: String,
      materialGroup: String,
      reqTrackingNumber: String,
      supplierSubrange: String,
      acknowledgmentRequired: Boolean,
    },
    header: {
      companyCode: String,
      purchasingOrganization: String,
      purchasingGroup: String,
      itemNumberInterval: String,
      subitemInterval: String,
      validityStart: String,
      validityEnd: String,
      paymentTerms: String,
      targetValue: String,
      exchangeRate: String,
      incoterms: String,
      incotermsLocation1: String,
      deviatingLocation: String,
      quotationDate: String,
      yourReference: String,
      ourReference: String,
      salesperson: String,
      telephone: String,
      invoicingParty: String,
    },
    contract: {
      material: String,
      shortText: String,
      targetQty: String,
      netPrice: String,
      priceUnit: String,
      orderUnit: String,
      materialGroup: String,
      plant: String,
      storageLocation: String,
      stockSegment: String,
    },
  },
  { timestamps: true }
);

const VendorAgreement = mongoose.model(
  "VendorAgreement",
  vendorAgreementSchema
);

module.exports = VendorAgreement;
