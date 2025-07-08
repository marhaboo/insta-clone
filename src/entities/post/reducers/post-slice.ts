import { createSlice } from "@reduxjs/toolkit";
import { postApi } from "../api/post-api";

export const postSlice = createSlice({
  name: "postSlice",
  initialState: {
    posts: [],
    loading: false,
    error: null, 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postApi.pending, (state) => {
        state.loading = true; 
      })
      .addCase(postApi.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false; 
        state.error = null; 
      })
      .addCase(postApi.rejected, (state) => {
        state.loading = false; 
      });
  },
});

export default postSlice.reducer;
