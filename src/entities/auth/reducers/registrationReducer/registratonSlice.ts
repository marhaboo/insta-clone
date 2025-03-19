import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../../api/api";

export const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      console.log("registerUser.fulfilled")
      state.loading = false
      state.data = action.payload
      state.error = null
    })
    builder.addCase(registerUser.pending, (state) => {
      console.log("registerUser.pending")
      state.loading = true;
      state.error = null
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      console.log("registerUser.rejected")
      state.loading = false
      state.error = action.payload || "Registration failed";
    })

  },
});
export default registrationSlice.reducer