import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    loading: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.error = false;
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailed: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.loading = false;
      state.currentUser = null;
    },
  },
});

export const { loginFailed, loginStart, loginSuccess, logout } =
  userSlice.actions;
export default userSlice.reducer;
