import { axiosRequest } from "@/shared/utils/axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Типы
interface Message {
  text: string;
  time: string; // Или Date, если используешь объекты даты
}

interface Chat {
  id: number;
  messages: Message[];
  // добавь другие поля при необходимости
}

interface PostMessageArgs {
  chatId: number;
  message: Message;
}

interface SendMessageResponse {
  success: boolean;
  message: Message;
}

interface ChatPreview {
  id: number;
  lastMessage: string;
  // добавь другие поля, если нужно
}

// Получить чат по ID
export const getChatsById = createAsyncThunk<Chat, number>(
  "chats/getChatsById",
  async (chatId) => {
    const { data } = await axiosRequest.get(`/Chat/get-chat-by-id?chatId=${chatId}`);
    return data.data as Chat;
  }
);

// Отправить сообщение по ID чата
export const postChatsById = createAsyncThunk<SendMessageResponse, PostMessageArgs>(
  "chats/postChatsById",
  async ({ chatId, message }) => {
    const { data } = await axiosRequest.post(`/Chat/send-message`, {
      chatId,
      text: message.text,
      time: message.time,
    });
    return data.data as SendMessageResponse;
  }
);

// Получить список всех чатов
export const getChats = createAsyncThunk<ChatPreview[]>(
  "chats/getChats",
  async () => {
    const { data } = await axiosRequest.get("/Chat/get-chats");
    return data.data as ChatPreview[];
  }
);
