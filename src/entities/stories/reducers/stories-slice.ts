import { createSlice } from "@reduxjs/toolkit";
import { storiesApi } from "../api/stories-api";

export const storiesSlice = createSlice({
  name: "storiesSlice",
  initialState: {
    stories: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(storiesApi.fulfilled, (state, action) => {
        state.stories = action.payload;
        state.loading = false;
      })
      .addCase(storiesApi.pending, (state) => {
        state.loading = true; 
      })
      .addCase(storiesApi.rejected, (state) => {
        state.loading = false; 
      });
  },
});

export default storiesSlice.reducer;
