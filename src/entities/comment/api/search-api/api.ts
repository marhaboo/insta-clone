import { axiosRequest } from "@/shared/utils/axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";
const API_URL = "https://instagram-api.softclub.tj";
export interface User {
  id: number;
  username: string;
}

export const searchUsers = createAsyncThunk<User[], string, { rejectValue: string }>(
  "user/searchUsers",
  async (userName, { rejectWithValue }) => {
    try {
  

      const data = await axiosRequest.get(`${API_URL}/User/get-users?UserName=${userName}`);
      return data.data; 
    } catch (error) {
      console.log(error); 
      
    }
  }
);
