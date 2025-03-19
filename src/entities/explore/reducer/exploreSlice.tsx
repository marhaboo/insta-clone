import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";

export interface Comment {
  postCommentId: number;
  userId: string;
  userName: string;
  userImage: string;
  comment: string;
  dateCommented: string;
}

export interface Post {
  postId: number;
  userName: string;
  userImage: string;
  images: string;
  title: string;
  commentCount: number;
  postLikeCount: number;
  datePublished: string;
  content: string;
  comments: Comment[];
  isReel: boolean;
}

interface ExploreState {
  modal: boolean;
  selectedPost: WritableDraft<Post> | null;
}

const initialState: ExploreState = {
  modal: false,
  selectedPost: null,
};

export const exploreSlice = createSlice({
  name: "explore",
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload;
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload as WritableDraft<Post> | null;
    },
  },
});

export const { toggleModal, setSelectedPost } = exploreSlice.actions;
export default exploreSlice.reducer;
