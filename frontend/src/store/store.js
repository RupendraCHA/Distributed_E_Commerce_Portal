import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice'; // Import the cart reducer

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer, // Add cart reducer

  },
});

export default store;
