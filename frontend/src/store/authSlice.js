import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", "true"); // Store in localStorage
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem("isLoggedIn"); // Remove from localStorage
      localStorage.removeItem("token"); // Remove token from localStorage
    },
    setToken: (state, action) => {
      state.token = action.payload; // Set token in state
      localStorage.setItem("token", action.payload); // Store token in localStorage
    },
  },
});

export const { login, logout, setToken } = authSlice.actions;
export default authSlice.reducer;
