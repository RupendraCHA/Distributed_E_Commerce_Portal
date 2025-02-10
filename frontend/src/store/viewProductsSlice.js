import { createSlice } from "@reduxjs/toolkit";
// import "dotenv/config.js"

const initialState = {
    searchName: ""
}

// const backendURL = process.env.Server_URL
// console.log(backendURL)

const allProductsSlice = createSlice({
    name: "allProducts",
    initialState,
    reducers: {
        setItemName: (state, action) => {
            state.searchName = action.payload
            console.log("Search Name", action.payload)
        }
    }
})

export const {setItemName} = allProductsSlice.actions

export default allProductsSlice.reducer