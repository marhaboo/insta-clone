import { createSlice } from "@reduxjs/toolkit";
import { getFollowingRelationShip, getMyPost, getMyProfileUser, getProfileId, getSubscriptions } from "../api/api";
import {  MyProfileState, MyPost, UserFollowing } from "../models/types";
import { UserProfile } from "../../profile-by-id/models/types";

const initialState: MyProfileState = {
  data: {} as UserProfile,
  loading: false,
  editModal: false,
  followersModal: false,
  followingModal: false,
  followings : [] as UserFollowing[],
  followers : [] as UserFollowing[],
  myProfileData: [] as MyPost[],
  userId : "" 
};
export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setFollowersModal: (state, action) => {
      state.followersModal = action.payload;
    },
    setFollowingsModal: (state, action) => {
      state.followingModal = action.payload;
    },
    setEditModal: (state, action) => {
      state.editModal = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyProfileUser.fulfilled, (state, action) => {
        state.data = action.payload as UserProfile;
        state.loading = false;
      })
      .addCase(getMyProfileUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyPost.fulfilled, (state, action) => {
        state.myProfileData = action.payload;
        state.loading = false;
      })
      .addCase(getMyPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getFollowingRelationShip.fulfilled, (state,action) => {
        state.followings = action.payload || []
      })
      .addCase(getSubscriptions.fulfilled, (state,action) => {
        state.followers = action.payload || []
      })
      .addCase(getProfileId.fulfilled, (state,action) => {
        state.userId =  action.payload.length > 0 ? action.payload[0]?.id : null
      })
  },
});

export default profileSlice.reducer;
export const {setFollowersModal, setFollowingsModal, setEditModal} = profileSlice.actions