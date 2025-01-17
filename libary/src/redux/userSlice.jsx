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
            localStorage.removeItem('access_token'); // Xóa token
            localStorage.removeItem('user'); // Xóa thông tin user
        },
        
    },
});

export const { update, logout } = userSlice.actions;
export default userSlice.reducer;
