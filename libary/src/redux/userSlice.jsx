// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        email: "Undefined",
        phone:  "Undefined",
        gender: "Undefined",
        avatar: undefined,
        birth: null,
        country: 'Vietnam',
        role: '0',
        name: "Undefined",
    },
    reducers: {
        update: (state, action) => {
            // Cập nhật thông tin người dùng từ action payload
            state.user = action.payload.user;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.avatar = action.payload.avatar;
            state.role = action.payload.role;
            state.name = action.payload.name;
        }
    },
});

export const { update } = userSlice.actions;

export default userSlice.reducer;
