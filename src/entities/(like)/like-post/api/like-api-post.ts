import { axiosRequest } from "@/shared/utils/axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const likeApiPost=createAsyncThunk("likeApiPost",async(id:number | undefined)=>{
    const {data}=await axiosRequest.post(`/Post/like-post?postId=${id}`)
    return data
})