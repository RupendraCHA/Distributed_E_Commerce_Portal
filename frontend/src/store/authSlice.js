// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     login: (state) => {
//       state.isLoggedIn = true;
//       localStorage.setItem("isLoggedIn", "true"); // Store in localStorage
//     },
//     logout: (state) => {
//       state.isLoggedIn = false;
//       localStorage.removeItem("isLoggedIn"); // Remove from localStorage
//       localStorage.removeItem("token"); // Remove token from localStorage
//     },
//     setToken: (state, action) => {
//       state.token = action.payload; // Set token in state
//       localStorage.setItem("token", action.payload); // Store token in localStorage
//     },
//   },
// });

// export const { login, logout, setToken } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    setUserRole: (state, action) => {
      if (state.user) {
        state.user.role = action.payload;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
  },
});

// Action creators
export const { login, logout, setToken, updateUser, setUserRole } =
  authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectUserRole = (state) => state.auth.user?.role;
export const selectIsAdmin = (state) => state.auth.user?.role === 'admin';
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
