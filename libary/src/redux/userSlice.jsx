import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        update: (state, action) => {
            state.user = action.payload; // Lưu thông tin user
        },
        logout: (state) => {
            state.user = null; // Xóa thông tin user
            localStorage.clear();
            window.location.reload();
        },
        
    },
});

export const { update, logout } = userSlice.actions;
export default userSlice.reducer;
