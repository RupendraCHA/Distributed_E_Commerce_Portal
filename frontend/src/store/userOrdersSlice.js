import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userOrdersData: [],
    isUpdated: false,
    deductedOrderDetails: [],
    insufficientOrderDetails: []
}

const userOrdersSlice = createSlice({
    name: "userOrders",
    initialState,
    reducers: {
        setUserOrders: (state, action) => {
            state.userOrdersData = action.payload
            console.log("Payload", action.payload)
        },
        setUpdated: (state, action) => {
            state.isUpdated = action.payload
            console.log("isUpdated",action.payload)
        },
        setDeductedOrderDetails: (state, action) => {
            state.deductedOrderDetails = action.payload
        },
        setInsufficientOrderDetails: (state, action) => {
            state.insufficientOrderDetails = action.payload
        }
    }
})

export const {setUserOrders, setUpdated, setDeductedOrderDetails, setInsufficientOrderDetails} = userOrdersSlice.actions

export default userOrdersSlice.reducer