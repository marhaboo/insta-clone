import { createSlice } from "@reduxjs/toolkit";
import { getReels } from "../../api/reels-api";

export const reelsSlice = createSlice({
  name: "reels",
  initialState: {
    reels: []
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getReels.fulfilled, (state, action) => {
      state.reels = action.payload
    })
  }
})

export default reelsSlice.reducer