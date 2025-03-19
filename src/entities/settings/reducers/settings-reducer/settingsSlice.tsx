import { createSlice } from "@reduxjs/toolkit";
import { deleteAccount, editAccount } from "../../api/page";

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(deleteAccount.rejected, (state) => {
        state.loading = false;
      })
      .addCase(editAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; 
      })
      .addCase(editAccount.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default settingsSlice.reducer;
