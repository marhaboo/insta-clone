import chatsReducer from "@/entities/chats/reducer/chatsSlice";
import  registrationReducer  from "@/entities/auth/reducers/registrationReducer/registratonSlice";
import postReducer from "@/entities/post/reducers/post-slice";
import storiesRducer from "@/entities/stories/reducers/stories-slice";
import usersReducer from "@/entities/users/reducer/users-slice";
import { configureStore } from "@reduxjs/toolkit";  
import postSlice from "@/app/store/post-slice/post-slice" 
import profileByIdReducer from "@/entities/profile/profile-by-id/reducers/profile-by-id-slice";
import  profileReducer from "@/entities/profile/my-profile/reducers/profile-slice";
import  settingsReducer  from "@/entities/settings/reducers/settings-reducer/settingsSlice";
import  exploreReducer  from "@/entities/explore/reducer/exploreSlice";
import  searchReducer  from "@/entities/comment/reducer/search-reducer/search";
import reelsReducer from "@/entities/reels/reducer/reels-reducer/reels-slice";
import chatsByIdReducer from "@/entities/chats/chats-by-idSlice";
// import  exploreReducer from "@/entities/explore/reducer/exploreSlice";


export const store = configureStore({
  reducer: {
    chats: chatsReducer,
    chatsById:chatsByIdReducer,
    settings: settingsReducer,
    profileById: profileByIdReducer,
    myProfile: profileReducer,
    stories: storiesRducer,
    users: usersReducer,
    post: postReducer,
    postPage : postSlice,
    explore:exploreReducer,
    registration:registrationReducer,
    search: searchReducer,
    reels: reelsReducer,
  }
})
    

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
