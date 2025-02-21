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
            state.books = state.books.filter((book) => book.id !== action.payload);
        },

        logoutBook: (state) => {
            state.books = [];
            localStorage.clear();
        },
    },
});

export const { setBooks, removeBook, logoutBook } = bookSlice.actions;
export default bookSlice.reducer;
