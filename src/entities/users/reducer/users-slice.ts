import { createSlice } from "@reduxjs/toolkit";
import { usersApi } from "../api/users-api";

export const usersSlice=createSlice({
    name:"userSlice",
    initialState:{
      users:[]
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(usersApi.fulfilled,(state,action)=>{
            state.users=action.payload    
        })
    }
})

export default usersSlice.reducer