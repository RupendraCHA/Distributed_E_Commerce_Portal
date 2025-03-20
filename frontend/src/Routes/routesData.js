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
