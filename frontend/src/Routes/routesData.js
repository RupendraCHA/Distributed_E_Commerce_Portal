import React from 'react';

// Public Routes
import SignUp from '../components/SignUp/signUp.jsx';
// import Registration from '../components/Registration/Registration.jsx'
import Login from '../components/Login/Login.jsx';
import InitialPage from '../components/InitialPage/InitialPage.jsx';

// Private Routes
import SuccessPage from '../components/SuccessPage.jsx';
export const Products = React.lazy(() =>
  import('../components/ReusedComponents/Products/Products.jsx')
);
const UserProducts = React.lazy(() =>
  import('../components/ReusedComponents/Products/UserProducts.jsx')
);
const Checkout = React.lazy(() =>
  import('../components/Checkout/Checkout.jsx')
);
const Settings = React.lazy(() =>
  import('../components/Settings/Settings.jsx')
);
const Cart = React.lazy(() => import('../components/Cart/Cart.jsx'));
const MyAccount = React.lazy(() =>
  import('../components/MyAccount/Myaccount.jsx')
);
const MyAddress = React.lazy(() =>
  import('../components/MyAddress/MyAddress.jsx')
);
const MyOrders = React.lazy(() =>
  import('../components/MyOrders/MyOrders.jsx')
);
const PlaceOrder = React.lazy(() =>
  import('../components/PlaceOrder/PlaceOrder.jsx')
);
const StripePayment = React.lazy(() =>
  import('../components/StripePayment/StripePayment.jsx')
);
const Logout = React.lazy(() => import('../components/Logout/Logout.jsx'));

const Ship = React.lazy(() => import('../components/Ship/Ship.jsx'));

// Admin Routes
const AdminDashboard = React.lazy(() =>
  import('../components/Admin/AdminDashboard.jsx')
);

const DistributorDashboard = React.lazy(() =>
  import('../components/Distributor/DistributorDashboard.jsx')
);
const DistributorRegistration = React.lazy(() =>
  import('../components/Distributor/DistributorRegistration.jsx')
);
const WarehouseManagement = React.lazy(() =>
  import('../components/Distributor/WarehouseManagement.jsx')
);
const InventoryManagement = React.lazy(() =>
  import('../components/Distributor/InventoryManagement.jsx')
);

const posetraAllProducts = React.lazy(() =>
  import('../components/ReusedComponents/AllProducts/AllProducts.jsx')
);

const inventoryOrders = React.lazy(() =>
  import('../components/InventoryAndOrders/InventoryOrders.jsx')
);
const TrackShipping = React.lazy(() =>
  import('../components/TrackShipping/TrackShipping.jsx')
);
const FullFilledOrderDetails = React.lazy(() =>
  import('../components/FulfilledOrders/FilfilledOrderDetails.jsx')
);
const SAPDataDetails = React.lazy(() =>
  import('../components/ReusedComponents/SAPDataDetails/SAPDataDetails.jsx')
);

const CreatePurchaseRequisition = React.lazy(() =>
  import('../components/PurchaseRequisition/CreatePurchaseRequisition.jsx')
);
const PurchaseRequisition = React.lazy(() =>
  import('../components/PurchaseRequisition/index.jsx')
);

const EditPurchaseRequisition = React.lazy(() =>
  import('../components/PurchaseRequisition/EditPurchaseRequisition.jsx')
);

const PurchaseOrderList = React.lazy(() =>
  import('../components/PurchaseOrder/index.jsx')
);
const CreatePurchaseOrder = React.lazy(() =>
  import('../components/PurchaseOrder/CreatePurchaseOrder.jsx')
);
const EditPurchaseOrder = React.lazy(() =>
  import('../components/PurchaseOrder/EditPurchaseOrder.jsx')
);

const GoodsReceiptOrder = React.lazy(() =>
  import('../components/GoodsRecieptOrder/index.jsx')
);
const CreateGoodsReceiptOrder = React.lazy(() =>
  import('../components/GoodsRecieptOrder/CreateGoodsRecieptOrder.jsx')
);
const EditGoodsReceiptOrder = React.lazy(() =>
  import('../components/GoodsRecieptOrder/EditGoodsRecieptOrder.jsx')
);

const InboundDelivery = React.lazy(() =>
  import('../components/InboundDelivery/index.jsx')
);
const CreateInboundDelivery = React.lazy(() =>
  import('../components/InboundDelivery/CreateInboundDelivery.jsx')
);
const EditInboundDelivery = React.lazy(() =>
  import('../components/InboundDelivery/EditInboundDelivery.jsx')
);

const VendorBill = React.lazy(() =>
  import('../components/VendorBill/index.jsx')
);

const CreateVendorBill = React.lazy(() =>
  import('../components/VendorBill/VendorBillCreate.jsx')
);
const EditVendorBill = React.lazy(() =>
  import('../components/VendorBill/VendorBillEdit.jsx')
);
const VendorMaster = React.lazy(() =>
  import('../components/VendorMaster/index.jsx')
);

const CreateVendorMaster = React.lazy(() =>
  import('../components/VendorMaster/CreateVendorMaster.jsx')
);
const EditVendorMaster = React.lazy(() =>
  import('../components/VendorMaster/EditVendorMaster.jsx')
);
const MaterialList = React.lazy(() =>
  import('../components/MaterialList/index.jsx')
);

const CreateMaterialList = React.lazy(() =>
  import('../components/MaterialList/CreateMaterialList.jsx')
);

const EditMaterialList = React.lazy(() =>
  import('../components/MaterialList/EditMaterialList.jsx')
);
const ManufacturingMaterialList = React.lazy(() =>
  import('../components/Manufacturing/MaterialList/index.jsx')
);

const ManufacturingCreateMaterialList = React.lazy(() =>
  import('../components/Manufacturing/MaterialList/CreateMaterialList.jsx')
);

const ManufacturingEditMaterialList = React.lazy(() =>
  import('../components/Manufacturing/MaterialList/EditMaterialList.jsx')
);

const ItemInfoRecords = React.lazy(() =>
  import('../components/ItemInfoRecords/index.jsx')
);

const CreateItemInfoRecords = React.lazy(() =>
  import('../components/ItemInfoRecords/CreateItemInfoRecords.jsx')
);

const EditItemInfoRecords = React.lazy(() =>
  import('../components/ItemInfoRecords/EditItemInfoRecords.jsx')
);

const CreateVendorAgreement = React.lazy(() =>
  import('../components/VendorAgreements/CreateVendorAgreement.jsx')
);
const EditVendorAgreement = React.lazy(() =>
  import('../components/VendorAgreements/EditVendorAgreement.jsx')
);
const VendorAgreementList = React.lazy(() =>
  import('../components/VendorAgreements/VendorAgreementList.jsx')
);
const GoodIssueForProcessOrderList = React.lazy(() =>
  import(
    '../components/Manufacturing/GoodsIssueProcessOrder/ListGoodsIssue.jsx'
  )
);
const EditGoodIssueForProcessOrder = React.lazy(() =>
  import(
    '../components/Manufacturing/GoodsIssueProcessOrder/EditGoodsIssue.jsx'
  )
);

const CreateGoodIssueForProcessOrder = React.lazy(() =>
  import(
    '../components/Manufacturing/GoodsIssueProcessOrder/CreateGoodsIssue.jsx'
  )
);
const CreateProcessOrder = React.lazy(() =>
  import('../components/Manufacturing/ProcessOrder/CreateProcessOrder.jsx')
);
const EditProcessOrder = React.lazy(() =>
  import('../components/Manufacturing/ProcessOrder/EditProcessOrder.jsx')
);
const ListProcessOrders = React.lazy(() =>
  import('../components/Manufacturing/ProcessOrder/ListProcessOrders.jsx')
);
const ProcessOrderDetails = React.lazy(() =>
  import('../components/Manufacturing/ProcessOrder/ProcessOrderDetails.jsx')
);
const CreateGoodsReceiptForTable = React.lazy(() =>
  import(
    '../components/Manufacturing/GoodsRecieptForTable/CreateGoodsReceipt.jsx'
  )
);
const EditGoodsReceiptForTable = React.lazy(() =>
  import(
    '../components/Manufacturing/GoodsRecieptForTable/EditGoodsReceipt.jsx'
  )
);
const ListGoodsReceiptForTable = React.lazy(() =>
  import(
    '../components/Manufacturing/GoodsRecieptForTable/ListGoodsReceipts.jsx'
  )
);

const BillOfMaterial = React.lazy(() =>
  import('../components/Manufacturing/BillOfMaterial/BillOfMaterialList.jsx')
);
const CreateBillOfMaterial = React.lazy(() =>
  import('../components/Manufacturing/BillOfMaterial/CreateBillOfMaterial.jsx')
);
const EditBillOfMaterial = React.lazy(() =>
  import('../components/Manufacturing/BillOfMaterial/EditBillOfMaterial.jsx')
);

const ListMRPScreen = React.lazy(() =>
  import('../components/Manufacturing/MRP/ListMRPScreen.jsx')
);

const CreateSetupScreen = React.lazy(() =>
  import('../components/Manufacturing/MRP/CreateSetupScreen.jsx')
);
const EditMRPScreen = React.lazy(() =>
  import('../components/Manufacturing/MRP/EditMRPScreen.jsx')
);
const MaterialListScreen = React.lazy(() =>
  import('../components/Manufacturing/MRP/MaterialListScreen.jsx')
);

const ProductionOrder = React.lazy(() =>
  import('../components/Manufacturing/ProductionOrder/ProductionOrder.jsx')
);
const CreateProductionOrder = React.lazy(() =>
  import(
    '../components/Manufacturing/ProductionOrder/CreateProductionOrder.jsx'
  )
);
const EditProductionOrder = React.lazy(() =>
  import('../components/Manufacturing/ProductionOrder/EditProductionOrder.jsx')
);

const ProductionOrderDetails = React.lazy(() =>
  import('../components/Manufacturing/ProductionOrder/ProductionOrderTabs.jsx')
);

const CreateProductionPlan = React.lazy(() =>
  import('../components/Manufacturing/ProductionPlan/CreateProductionPlan.jsx')
);
const EditProductionPlan = React.lazy(() =>
  import('../components/Manufacturing/ProductionPlan/EditProductionPlan.jsx')
);
const ProductionPlanList = React.lazy(() =>
  import('../components/Manufacturing/ProductionPlan/ListProductionPlan.jsx')
);
const ProductionPlanTabs = React.lazy(() =>
  import(
    '../components/Manufacturing/ProductionPlan/CreateProductionPlanDetails.jsx'
  )
);

const CreateRecipeInitial = React.lazy(() =>
  import('../components/Manufacturing/Recipe/CreateRecipeInitial.jsx')
);

const CreateRecipeDetails = React.lazy(() =>
  import('../components/Manufacturing/Recipe/RecipeTabs.jsx')
);

const RecipeList = React.lazy(() =>
  import('../components/Manufacturing/Recipe/RecipeList.jsx')
);

const EditRecipeInitial = React.lazy(() =>
  import('../components/Manufacturing/Recipe/EditRecipeInitial.jsx')
);

const CreateProductionOrderSettlement = React.lazy(() =>
  import(
    '../components/Manufacturing/ProductionOrderSettlement/CreateProductionOrderSettlement.jsx'
  )
);

const EditProductionOrderSettlement = React.lazy(() =>
  import(
    '../components/Manufacturing/ProductionOrderSettlement/EditProductionOrderSettlement.jsx'
  )
);

const ProductionOrderSettlementList = React.lazy(() =>
  import(
    '../components/Manufacturing/ProductionOrderSettlement/ProductionOrderSettlementList.jsx'
  )
);

import {
  productsData,
  solutionsData,
  SourcingData,
  pricingData,
  InventoryData,
  QuotationData,
  OrderData,
  ShipData,
  InvoiceData,
  DashboardsData,
  categories,
} from '../data/PosetraDataPage.jsx';
import Inventory from '../components/Inventory/Inventory.jsx';

export const pirvateSections = [
  {
    path: '/products/:productcategory',
    data: categories,
    section: 'ProductCategory',
  },
  { path: '/products', data: productsData, section: 'Products' },
  { path: '/solutions', data: solutionsData, section: 'Solutions' },
  { path: '/pricing', data: pricingData, section: 'Pricing' },
  {
    path: '/inventory',
    data: InventoryData,
    section: 'Inventory',
    element: Inventory,
  },
  { path: '/quotation', data: QuotationData, section: 'Quotation' },
  { path: '/order', data: OrderData, section: 'Order' },
  { path: '/ship', data: ShipData, section: 'Ship', element: Ship },
  { path: '/invoice', data: InvoiceData, section: 'Invoice' },
  { path: '/dashboards', data: DashboardsData, section: 'Dashboards' },
];

export const publicRoutes = [
  {
    path: '/',
    element: InitialPage,
  },
  {
    path: '/register',
    element: SignUp,
  },
  {
    path: '/success',
    element: SuccessPage,
  },
  {
    path: '/login',
    element: Login,
  },
];

export const privateRoutes = [
  {
    path: '/my-account',
    element: MyAccount,
  },
  {
    path: '/my-address',
    element: MyAddress,
  },
  {
    path: '/my-orders',
    element: MyOrders,
  },
  {
    path: '/logout',
    element: Logout,
  },
  {
    path: '/distributors/products',
    element: UserProducts,
  },
  {
    path: '/cart',
    element: Cart,
  },
  {
    path: '/checkout',
    element: Checkout,
  },
  {
    path: '/payment',
    element: PlaceOrder,
  },
  {
    path: '/settings',
    element: Settings,
  },
  {
    path: '/stripePayment',
    element: StripePayment,
  },
  {
    path: '/my-address',
    element: MyAddress,
  },
  {
    path: '/viewProducts',
    element: posetraAllProducts,
  },
  {
    path: '/inventoryOrders',
    element: inventoryOrders,
  },
  {
    path: '/trackShipping',
    element: TrackShipping,
  },
  {
    path: '/consumerOrderFullfilled',
    element: FullFilledOrderDetails,
  },
  {
    path: '/product/materials',
    element: SAPDataDetails,
  },
  {
    path: '/sourcing/purchase-requisitions',
    element: PurchaseRequisition,
  },
  {
    path: '/sourcing/create-requisition',
    element: CreatePurchaseRequisition,
  },
  {
    path: '/sourcing/edit-requisition/:id',
    element: EditPurchaseRequisition,
  },
  {
    path: '/sourcing/purchase-orders',
    element: PurchaseOrderList,
  },
  {
    path: '/sourcing/purchase-orders/create',
    element: CreatePurchaseOrder,
  },
  {
    path: '/sourcing/purchase-orders/edit/:id',
    element: EditPurchaseOrder,
  },
  {
    path: '/sourcing/goods-receipt-orders',
    element: GoodsReceiptOrder,
  },
  {
    path: '/sourcing/goods-receipt-orders/create',
    element: CreateGoodsReceiptOrder,
  },
  {
    path: '/sourcing/goods-receipt-orders/edit/:id',
    element: EditGoodsReceiptOrder,
  },
  {
    path: '/sourcing/inbound-deliveries',
    element: InboundDelivery,
  },
  {
    path: '/sourcing/inbound-deliveries/create',
    element: CreateInboundDelivery,
  },
  {
    path: '/sourcing/inbound-deliveries/edit/:id',
    element: EditInboundDelivery,
  },
  {
    path: '/sourcing/vendor-bills',
    element: VendorBill,
  },
  {
    path: '/sourcing/vendor-bills/create',
    element: CreateVendorBill,
  },
  {
    path: '/sourcing/vendor-bills/edit/:id',
    element: EditVendorBill,
  },
  {
    path: '/sourcing/vendor-master',
    element: VendorMaster,
  },
  {
    path: '/sourcing/vendor-master/create',
    element: CreateVendorMaster,
  },
  {
    path: '/sourcing/vendor-master/edit/:id',
    element: EditVendorMaster,
  },
  {
    path: '/sourcing/materialMaster',
    element: MaterialList,
  },
  {
    path: '/sourcing/materialMaster/create',
    element: CreateMaterialList,
  },
  {
    path: '/sourcing/materialMaster/edit/:id',
    element: EditMaterialList,
  },
  {
    path: '/sourcing/item-info-records',
    element: ItemInfoRecords,
  },
  {
    path: '/sourcing/item-info-records/create',
    element: CreateItemInfoRecords,
  },
  {
    path: '/sourcing/item-info-records/edit/:id',
    element: EditItemInfoRecords,
  },

  {
    path: '/manufacturing/goods-issue/create',
    element: CreateGoodIssueForProcessOrder,
  },
  {
    path: '/manufacturing/goods-issue',
    element: GoodIssueForProcessOrderList,
  },
  {
    path: '/manufacturing/goods-issue/edit/:id',
    element: EditGoodIssueForProcessOrder,
  },
  {
    path: '/manufacturing/process-orders',
    element: ListProcessOrders,
  },
  {
    path: '/manufacturing/process-orders/create/details',
    element: ProcessOrderDetails,
  },
  {
    path: '/manufacturing/process-orders/create',
    element: CreateProcessOrder,
  },
  {
    path: '/manufacturing/process-orders/edit/:id',
    element: EditProcessOrder,
  },
  {
    path: '/manufacturing/goods-receipt',
    element: ListGoodsReceiptForTable,
  },
  {
    path: '/manufacturing/goods-receipt/create',
    element: CreateGoodsReceiptForTable,
  },
  {
    path: '/manufacturing/goods-receipt/edit/:id',
    element: EditGoodsReceiptForTable,
  },

  {
    path: '/sourcing/vendor-agreements/create',
    element: CreateVendorAgreement,
  },
  {
    path: '/sourcing/vendor-agreements',
    element: VendorAgreementList,
  },
  {
    path: '/sourcing/vendor-agreements/edit/:id',
    element: EditVendorAgreement,
  },
  {
    path: '/manufacturing/product-master',
    element: ManufacturingMaterialList,
  },
  {
    path: '/manufacturing/product-master/create',
    element: ManufacturingCreateMaterialList,
  },
  {
    path: '/manufacturing/product-master/edit/:id',
    element: ManufacturingEditMaterialList,
  },
  {
    path: '/manufacturing/bill-of-material',
    element: BillOfMaterial,
  },
  {
    path: '/manufacturing/bill-of-material/create',
    element: CreateBillOfMaterial,
  },
  {
    path: '/manufacturing/bill-of-material/edit/:id',
    element: EditBillOfMaterial,
  },
  {
    path: '/manufacturing/mrp',
    element: ListMRPScreen,
  },
  {
    path: '/manufacturing/mrp/create',
    element: CreateSetupScreen,
  },
  {
    path: '/manufacturing/mrp/edit/:id',
    element: EditMRPScreen,
  },
  {
    path: '/manufacturing/mrp/create/details',
    element: MaterialListScreen,
  },
  {
    path: '/manufacturing/mrp/edit/:id/details',
    element: MaterialListScreen,
  },
  {
    path: '/manufacturing/product-orders',
    element: ProductionOrder,
  },
  {
    path: '/manufacturing/product-orders/create',
    element: CreateProductionOrder,
  },
  {
    path: '/manufacturing/product-orders/edit/:id',
    element: EditProductionOrder,
  },
  {
    path: '/manufacturing/product-orders/details',
    element: ProductionOrderDetails,
  },
  {
    path: '/manufacturing/production-plan',
    element: ProductionPlanList,
  },
  {
    path: '/manufacturing/production-plan/create',
    element: CreateProductionPlan,
  },
  {
    path: '/manufacturing/production-plan/edit/:id',
    element: EditProductionPlan,
  },
  {
    path: '/manufacturing/production-plan/details',
    element: ProductionPlanTabs,
  },
  {
    path: '/manufacturing/recipe/create',
    element: CreateRecipeInitial,
  },
  {
    path: '/manufacturing/recipe',
    element: RecipeList,
  },
  {
    path: '/manufacturing/recipe/edit/:id',
    element: EditRecipeInitial,
  },
  {
    path: '/manufacturing/recipe/details',
    element: CreateRecipeDetails,
  },
  {
    path: '/manufacturing/production-order-settlement',
    element: ProductionOrderSettlementList,
  },
  {
    path: '/manufacturing/production-order-settlement/create',
    element: CreateProductionOrderSettlement,
  },
  {
    path: '/manufacturing/production-order-settlement/edit/:id',
    element: EditProductionOrderSettlement,
  },
];

export const adminRoutes = [
  {
    path: '/admin',
    element: AdminDashboard,
  },
  // {
  //   path: '/admin/users',
  //   element: UserManagement,
  // },
  // {
  //   path: '/admin/orders',
  //   element: OrderManagement,
  // },
  // {
  //   path: '/admin/products',
  //   element: ProductManagement,
  // },
  // {
  //   path: '/admin/categories',
  //   element: CategoryManagement,
  // },
];

// Admin section data
export const adminSectionsData = {
  dashboard: {
    title: 'Dashboard',
    path: '/admin',
    icon: 'dashboard',
  },
  // users: {
  //   title: 'User Management',
  //   path: '/admin/users',
  //   icon: 'users',
  // },
  // orders: {
  //   title: 'Order Management',
  //   path: '/admin/orders',
  //   icon: 'shopping-cart',
  // },
  // products: {
  //   title: 'Product Management',
  //   path: '/admin/products',
  //   icon: 'box',
  // },
  // categories: {
  //   title: 'Category Management',
  //   path: '/admin/categories',
  //   icon: 'folder',
  // },
};

// Add distributor routes
export const distributorRoutes = [
  {
    path: '/distributor',
    element: DistributorDashboard,
  },
  {
    path: '/distributor/register',
    element: DistributorRegistration,
  },
  {
    path: '/distributor/warehouses',
    element: WarehouseManagement,
  },
  {
    path: '/distributor/inventory',
    element: InventoryManagement,
  },
];

// Add distributor sections data
export const distributorSectionsData = {
  dashboard: {
    title: 'Dashboard',
    path: '/distributor',
    icon: 'dashboard',
  },
  warehouses: {
    title: 'Warehouse Management',
    path: '/distributor/warehouses',
    icon: 'warehouse',
  },
  inventory: {
    title: 'Inventory Management',
    path: '/distributor/inventory',
    icon: 'inventory',
  },
};
