import { axiosRequest } from "@/shared/utils/axiosRequest";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Тип для поста
interface Post {
  id: number;
  title: string;
  content: string;
}

interface FormDataType {
  title: string;
  content: string;
}

interface PostState {
  openDialog: boolean;
  postData: Post | null;
  loading: boolean;
  error: string | null;
}

export const addPost = createAsyncThunk<Post, FormDataType, { rejectValue: string }>(
  "postPage/addPost",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.post("/Post/add-post", formData);
      return data.data as Post;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error");
    }
  }
);

const initialState: PostState = {
  openDialog: false,
  postData: null,
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: "postPage",
  initialState,
  reducers: {
    setOpenDialog: (state, action: PayloadAction<boolean>) => {
      state.openDialog = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        state.postData = action.payload;
      })
      .addCase(addPost.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export const { setOpenDialog } = postSlice.actions;
export default postSlice.reducer;
