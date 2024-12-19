import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Create async thunk for removing cart item
export const removeCartItemAsync = createAsyncThunk(
  'cart/removeCartItemAsync',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/cart/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Include your auth token if you store it somewhere
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      return productId; // Return the productId to use in the reducer
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  cartItems: [],
  error: null,
  loading: false,
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
    setCartItems: (state, action) => {
      state.cartItems = action.payload; // Replace cart items with payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeCartItemAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeCartItemAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = state.cartItems.filter(
          (item) => item.productId !== action.payload
        );
      })
      .addCase(removeCartItemAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  resetCart,
  setCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Async actions for fetching, adding, and removing items from the cart

// // Fetch cart items
// export const fetchCartItems = createAsyncThunk(
//   'cart/fetchCartItems',
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3002/cart', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data.cartItems; // Return the cart items
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || 'Failed to fetch cart items'
//       );
//     }
//   }
// );

// // Add an item to the cart
// export const addToCart = createAsyncThunk(
//   'cart/addToCart',
//   async (product, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post(
//         'http://localhost:3002/addToCart',
//         product,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data.cartItem; // Return the added item
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || 'Failed to add item to cart'
//       );
//     }
//   }
// );

// // Remove an item from the cart
// export const removeFromCart = createAsyncThunk(
//   'cart/removeFromCart',
//   async (productId, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`http://localhost:3002/cart/${productId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return productId; // Return the ID of the removed item
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || 'Failed to remove item from cart'
//       );
//     }
//   }
// );

// // Initial state
// const initialState = {
//   cartItems: [],
//   loading: false,
//   error: null,
// };

// // Create the slice
// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     // Synchronous action to reset the cart
//     resetCart: (state) => {
//       state.cartItems = [];
//     },
//     // Synchronous action to update cart items (if needed)
//     setCartItems: (state, action) => {
//       state.cartItems = action.payload;
//     },

//     updateQuantity: (state, action) => {
//       const { productId, quantity } = action.payload;
//       const item = state.cartItems.find((item) => item.productId === productId);
//       if (item) {
//         item.quantity = quantity; // Update the quantity of the item
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     // Handle fetchCartItems async action
//     builder
//       .addCase(fetchCartItems.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchCartItems.fulfilled, (state, action) => {
//         state.loading = false;
//         state.cartItems = action.payload; // Set the fetched cart items
//         state.error = null;
//       })
//       .addCase(fetchCartItems.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to fetch cart items';
//       })
//       // Handle addToCart async action
//       .addCase(addToCart.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(addToCart.fulfilled, (state, action) => {
//         state.loading = false;
//         state.cartItems.push(action.payload); // Add the item to the cart
//         state.error = null;
//       })
//       .addCase(addToCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to add item to cart';
//       })
//       // Handle removeFromCart async action
//       .addCase(removeFromCart.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(removeFromCart.fulfilled, (state, action) => {
//         state.loading = false;
//         state.cartItems = state.cartItems.filter(
//           (item) => item.productId !== action.payload // Remove the item from the cart
//         );
//         state.error = null;
//       })
//       .addCase(removeFromCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to remove item from cart';
//       });
//   },
// });

// // Export the actions
// export const { resetCart, setCartItems, updateQuantity } = cartSlice.actions;

// // Export the reducer
// export default cartSlice.reducer;
