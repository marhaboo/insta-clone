import { createSlice } from "@reduxjs/toolkit";
import { getChatsById } from "./reducer/api/chat-api";

export const chatsByIdSlice = createSlice({
  name: "chatsById",
  initialState: {
    data: [],
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChatsById.fulfilled, (state, action) => {
    console.log(action.payload);
    
      state.data = action.payload;
    });
  },
});

export default chatsByIdSlice.reducer;
