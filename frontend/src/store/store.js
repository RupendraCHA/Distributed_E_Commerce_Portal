import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice'; // Import the cart reducer
import allProductsReducer from "./viewProductsSlice"
import userOrdersReducer from "./userOrdersSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer, // Add cart reducer
    allProducts: allProductsReducer,
    userOrders: userOrdersReducer
  },
});

export default store;
