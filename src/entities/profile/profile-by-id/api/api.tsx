import { axiosRequest } from "@/shared/utils/axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProfileById = createAsyncThunk("profileById/getProfileById", async (id: string) => {
     const {data} = await axiosRequest.get(`/UserProfile/get-user-profile-by-id?id=${id}`)     
     return data.data
});

export const getPostsById  = createAsyncThunk("profileById/getPostsById", async (id: string) => {
 const {data} = await axiosRequest.get(`/Post/get-posts?UserId=${id}`)
 return data.data
})
