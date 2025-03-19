import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { searchUsers, type User } from "@/entities/comment/api/search-api/api"

interface SearchState {
  data: User | null
  searchResults: User[]
  recentUsers: User[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: SearchState = {
  data: null,
  searchResults: [],
  recentUsers: [],
  status: "idle",
  error: null,
}

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addRecentUser: (state, action: PayloadAction<User>) => {
      const existingUserIndex = state.recentUsers.findIndex((user) => user.id === action.payload.id)
      if (existingUserIndex !== -1) {
        state.recentUsers.splice(existingUserIndex, 1)
      }
      state.recentUsers.unshift(action.payload)
    },
    removeRecentUser: (state, action: PayloadAction<number>) => {
      state.recentUsers = state.recentUsers.filter((user) => user.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUsers.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(searchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = "succeeded"
        state.searchResults = action.payload
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload as string
      })
  },
})

export const { addRecentUser, removeRecentUser } = searchSlice.actions
export default searchSlice.reducer

