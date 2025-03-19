import { axiosRequest } from "@/shared/utils/axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getMyProfileUser = createAsyncThunk(
  "profile/getMyProfileUser",
  async () => {
    try {
      const { data } = await axiosRequest.get(`/UserProfile/get-my-profile`);
      return data.data;
    } catch (error) { 
      console.log(error);
    }
  }
);

export const getFollowingRelationShip = createAsyncThunk(
  "profile/getFollowingRelationShip",
  async (id: string) => {
    try {
      const { data } = await axiosRequest.get(
        `/FollowingRelationShip/get-subscribers?UserId=${id}`
      );
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getSubscriptions = createAsyncThunk(
  "profile/getSubscriptions",
  async (id: string) => {
    try {
      const { data } = await axiosRequest.get(
        `/FollowingRelationShip/get-subscriptions?UserId=${id}`
      );
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getProfileId = createAsyncThunk(
  "profile/getProfileId", async (userName: string) => {
  const {data} = await axiosRequest.get(`/User/get-users?UserName=${userName}`)
  return data.data
  }
)

export const getMyPost = createAsyncThunk(
  "profile/getPostFavorites",
  async () => {
    try {
      const { data } = await axiosRequest.get(`/Post/get-my-posts`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);


export const followFunc =  createAsyncThunk(
  "profile/followFunc",
  async (id: string, {dispatch}) => {
    await axiosRequest.post(`/FollowingRelationShip/add-following-relation-ship?followingUserId=${id}`)
    dispatch(getMyProfileUser())
  }
)

export const delFollowersFunc =  createAsyncThunk(
  "profile/delFollowersFunc",
  async (id: string, {dispatch}) => {
    await axiosRequest.delete(`/FollowingRelationShip/delete-following-relation-ship?followingUserId=${id}`)
    dispatch(getMyProfileUser())
  }
)

export const delPhoto = createAsyncThunk("profile,delPhoto" ,
  async (_,{dispatch}) => {
    await axiosRequest.delete("/UserProfile/delete-user-image-profile")
    dispatch(getMyProfileUser())
  }
) 

export const putPhoto = createAsyncThunk("profile,putPhoto" ,
  async (file: File,{dispatch}) => {
    const formData = new FormData()
    formData.append("imageFile", file)
    await axiosRequest.put("/UserProfile/update-user-image-profile", formData,  {
      headers: {
        "Content-Type": "multipart/form-data", 
      }})
    dispatch(getMyProfileUser())
  }
) 