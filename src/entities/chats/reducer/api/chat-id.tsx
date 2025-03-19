
import { axiosRequest } from "@/shared/utils/axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const  getChatsById = createAsyncThunk("chats/getChatsById",
     async (id:string) => {
    const { data } = await axiosRequest.get(`/Chat/get-chat-by-id?chatId=${id}`);
    return data.data;
}
);