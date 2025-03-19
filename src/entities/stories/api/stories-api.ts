import { axiosRequest } from "@/shared/utils/axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const storiesApi=createAsyncThunk("storiesApi",async()=>{
    const {data}= await axiosRequest.get("/Story/get-stories")
    return data
})