// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null, // Trạng thái mặc định
    },
    reducers: {
        update: (state, action) => {
            // Cập nhật thông tin người dùng từ action payload
            state.user = action.payload.user;
        },
        logout: (state) => {
            // Reset thông tin người dùng khi logout
            state.user = null;
        },
    },
});

export const { update, logout } = userSlice.actions;

export default userSlice.reducer;
