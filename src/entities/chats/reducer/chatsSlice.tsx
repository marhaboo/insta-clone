import { createSlice } from "@reduxjs/toolkit";
import { getChats } from "./api/chat-api";

export const chatsSlice = createSlice({
  name: "chats",
  initialState: {
    data: []
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(getChats.fulfilled, (state,action)=>{
    state.data=action.payload
    })
  }
});
export const { setData } = chatsSlice.actions
export default chatsSlice.reducer;
