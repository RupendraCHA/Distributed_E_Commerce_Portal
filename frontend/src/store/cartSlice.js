import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 }); // Set default quantity to 1
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.productId === productId);
      if (item && quantity >= 1) {
        item.quantity = quantity; // Update the quantity if it's valid (>= 1)
      }
    },
    resetCart: (state) => {
      state.cartItems = []; // Clear the cart items
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, resetCart } =
  cartSlice.actions;
export default cartSlice.reducer;
