import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchName: ""
}

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