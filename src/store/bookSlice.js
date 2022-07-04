import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logInsert } from "./reportSlice";

const initialState = {
  books: [],
  isLoading: false,
  isError: null,
  bookInfo: {},
};

// get data
export const getBooks = createAsyncThunk(
  "book/getBooks",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch("http://localhost:5000/books");
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// insert data
export const insertBook = createAsyncThunk(
  "book/insertBook",
  async (bookData, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    try {
      bookData.userName = getState().auth.name;
      const res = await fetch("http://localhost:5000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(bookData),
      });
      const data = await res.json();
      dispatch(logInsert({ name: "insertBook", status: "success" }));
      return data;
    } catch (err) {
      dispatch(logInsert({ name: "insertBook", status: "failed" }));
      return rejectWithValue(err.message);
    }
  }
);

// delete data
export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:5000/books/${item.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return item;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// get book
export const getBook = createAsyncThunk(
  "book/getBook",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`http://localhost:5000/books/${item.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState,
  extraReducers: {
    // get books
    [getBooks.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = null;
    },
    [getBooks.fulfilled]: (state, action) => {
      state.books = action.payload;
      state.isLoading = false;
    },
    [getBooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },

    // insert book
    [insertBook.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = null;
    },
    [insertBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books.push(action.payload);
    },
    [insertBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },

    // delete book
    [deleteBook.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = null;
    },
    [deleteBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = state.books.filter((book) => book.id !== action.payload.id);
    },
    [deleteBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },

    // read book
    [getBook.pending]: (state, action) => {
      // state.isLoading = true;
      state.isError = null;
    },
    [getBook.fulfilled]: (state, action) => {
      // state.isLoading = false;
      state.bookInfo = action.payload;
    },
    [getBook.rejected]: (state, action) => {
      // state.isLoading = false;
      state.isError = action.payload;
    },
  },
});

export default bookSlice.reducer;
