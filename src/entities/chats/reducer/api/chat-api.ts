import { axiosRequest } from "@/shared/utils/axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getChatsById = createAsyncThunk(
    "chats/getChatsById",
    async (chatId: number) => {
      const { data } = await axiosRequest.get(`/Chat/get-chat-by-id?chatId=${chatId}`);
      return data.data;
    }
  );
  
  export const postChatsById = createAsyncThunk(
    "chats/postChatsById",
    async ({ chatId, message }: { chatId: number; message: any }) => {
      const { data } = await axiosRequest.post(`/Chat/send-message`, {
        chatId,
        text: message.text,
        time: message.time,
      });
      return data.data;
    }
  );
  
  export const getChats = createAsyncThunk(
    "chats/getChats",
    async () => {
      const { data } = await axiosRequest.get("/Chat/get-chats");
      console.log(data.data);
      return data.data;
      
    }
  );
  