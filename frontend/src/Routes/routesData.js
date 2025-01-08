import React from 'react';

// Public Routes
import SignUp from '../components/SignIn/signUp.jsx';
// import Registration from '../components/Registration/Registration.jsx'
import Login from '../components/Login/Login.jsx';
import InitialPage from '../components/InitialPage/InitialPage.jsx';

// Private Routes
export const Products = React.lazy(() =>
  import('../components/ReusedComponents/Products/Products.jsx')
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

// Admin Routes
const AdminDashboard = React.lazy(() =>
  import('../components/Admin/AdminDashboard.jsx')
);
// const UserManagement = React.lazy(() =>
//   import('../components/Admin/UserManagement.jsx')
// );
// const OrderManagement = React.lazy(() =>
//   import('../components/Admin/OrderManagement.jsx')
// );
// const ProductManagement = React.lazy(() =>
//   import('../components/Admin/ProductManagement.jsx')
// );
// const CategoryManagement = React.lazy(() =>
//   import('../components/Admin/CategoryManagement.jsx')
// );

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

export const pirvateSections = [
  {
    path: '/products/:productcategory',
    data: categories,
    section: 'ProductCategory',
  },
  { path: '/products', data: productsData, section: 'Products' },
  { path: '/solutions', data: solutionsData, section: 'Solutions' },
  { path: '/pricing', data: pricingData, section: 'Pricing' },
  { path: '/inventory', data: InventoryData, section: 'Inventory' },
  { path: '/quotation', data: QuotationData, section: 'Quotation' },
  { path: '/order', data: OrderData, section: 'Order' },
  { path: '/ship', data: ShipData, section: 'Ship' },
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
