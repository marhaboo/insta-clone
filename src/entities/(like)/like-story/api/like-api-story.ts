import { axiosRequest } from "@/shared/utils/axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const likeApiStory=createAsyncThunk("likeApiStory",async(id:number | undefined)=>{
    const {data}=await axiosRequest.post(`/Story/LikeStory?storyId=${id}`)
})