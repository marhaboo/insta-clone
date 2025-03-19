import { axiosRequest } from "@/shared/utils/axiosRequest";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Типы для состояния
interface PostState {
  openDialog: boolean;
  postData: any | null;
  loading: boolean;
  error: string | null;
}

interface FormDataType {
  title: string;
  content: string;
}

export const addPost = createAsyncThunk<any, FormDataType, { rejectValue: string }>(
  "postPage/addPost",
  async (formData: FormDataType, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.post("/Post/add-post", formData);
      return data.data; // возвращаем данные в случае успеха
    } catch (error: any) {
      return rejectWithValue(error.message); // возвращаем ошибку в случае неудачи
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
      .addCase(addPost.fulfilled, (state, action) => {
        state.loading = false;
        state.postData = action.payload;
      })
      .addCase(addPost.rejected, (state, action:any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setOpenDialog } = postSlice.actions;
export default postSlice.reducer;
