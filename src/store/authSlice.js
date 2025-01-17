import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLoggedIn: false, name: "Kareem nour" };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logInOut: (state, action) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const { logInOut } = authSlice.actions;
export default authSlice.reducer;
