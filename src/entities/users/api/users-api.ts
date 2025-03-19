import { axiosRequest } from "@/shared/utils/axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const usersApi=createAsyncThunk("usersApi",async()=>{
    const {data}=await axiosRequest.get("/User/get-users?PageSize=5")
    return data.data
})