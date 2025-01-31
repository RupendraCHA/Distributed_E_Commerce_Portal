import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userOrdersData: []
}

const userOrdersSlice = createSlice({
    name: "userOrders",
    initialState,
    reducers: {
        setUserOrders: (state, action) => {
            state.userOrdersData = action.payload
            console.log("Payload", action.payload)
        }
    }
})

export const {setUserOrders} = userOrdersSlice.actions

export default userOrdersSlice.reducer