// Tạo redux book để tái sử dụng trong app

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    books: [], 
};

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setBooks: (state, action) => {
            state.books = action.payload;
        },
        removeBook: (state, action) => {
            state.books = state.books.filter(book => book.id !== action.payload);
        }
    },
});

export const { setBooks, removeBook } = bookSlice.actions;
export default bookSlice.reducer;
