import {createSlice } from "@reduxjs/toolkit";
import { getPostsById, getProfileById } from "../api/api";
import { MyPost } from "../models/types";

export const profileByIdSlice = createSlice({
  name: "profileById",
  initialState: {
    loading: false,
    data: [],
    myProfileData: [] as MyPost[],
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder 
    .addCase(getProfileById.fulfilled, (state,action) => {
      state.data = action.payload
      state.loading = false
    })
    .addCase(getProfileById.pending, (state) => {
      state.loading = true
    })
      .addCase(getPostsById.fulfilled, (state, action) => {
            state.myProfileData = action.payload;
          })
  },
});


export default profileByIdSlice.reducer