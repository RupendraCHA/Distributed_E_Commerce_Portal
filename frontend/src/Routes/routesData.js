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
)

const inventoryOrders = React.lazy(() => 
import('../components/InventoryAndOrders/InventoryOrders.jsx')
)
const TrackShipping = React.lazy(() => 
import('../components/TrackShipping/TrackShipping.jsx')
)
const FullFilledOrderDetails = React.lazy(() => 
  import('../components/FulfilledOrders/FilfilledOrderDetails.jsx')
)


import {
  productsData,
  solutionsData,
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
    element: UserProducts
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
    path: '/stripePayment',
    element: StripePayment,
  },
  {
    path: '/my-address',
    element: MyAddress,
  },
  {
    path: '/viewProducts',
    element: posetraAllProducts
  },
  {
    path: '/inventoryOrders',
    element: inventoryOrders
  },
  {
    path: '/trackShipping',
    element: TrackShipping
  },
  {
    path: "/consumerOrderFullfilled",
    element: FullFilledOrderDetails
  }
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
