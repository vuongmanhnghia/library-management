// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
    },
    reducers: {
        update: (state, action) => {
            // Cập nhật thông tin người dùng từ action payload
            state.user = action.payload.user;   
        }
    },
});

export const { update } = userSlice.actions;

export default userSlice.reducer;
