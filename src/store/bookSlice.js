import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { books: [], isLoading: false, isError: null };

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

const bookSlice = createSlice({
  name: "book",
  initialState,
  extraReducers: {
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
  },
});

export default bookSlice.reducer;
