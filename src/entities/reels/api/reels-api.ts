import { axiosRequest } from '@/shared/utils/axiosRequest';
import { createAsyncThunk } from '@reduxjs/toolkit';
export const getReels=createAsyncThunk("reels/getReels",async ()=>{
  const {data} = await axiosRequest.get("Post/get-reels")
  return data.data
})