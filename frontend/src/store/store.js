import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice'; // Import the cart reducer
import allProductsReducer from "./viewProductsSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer, // Add cart reducer
    allProducts: allProductsReducer
  },
});

export default store;
