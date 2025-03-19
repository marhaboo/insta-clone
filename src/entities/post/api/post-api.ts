import { axiosRequest } from "@/shared/utils/axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const postApi=createAsyncThunk("postApi",async ()=>{
   const {data}= await axiosRequest.get("/Post/get-posts")
   
    return data.data 
})