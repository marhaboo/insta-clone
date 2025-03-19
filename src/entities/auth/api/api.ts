import { axiosRequest } from "@/shared/utils/axiosRequest"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const registerUser = createAsyncThunk(
  "user/registration",
  async (userData: { userName: string; fullName: string; email: string; password: string;confirmPassword:string }, { rejectWithValue }) => {
    try {
      const response = await axiosRequest.post("/Account/register", userData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

