import { UserProfile } from "../../profile-by-id/models/types";

 export interface MyPost {
  postId: number;
  userId: string;
  userName: string;
  userImage: string;
  datePublished: string;
  images: string[];
  postLike: boolean;
  postLikeCount: number;
  userLikes: Array<{
    userId: string;
    userName: string;
    userPhoto: string;
    fullname: string;
  }>;
  commentCount: number;
  comments: Array<{
    postCommentId: number;
    userId: string;
    userName: string;
    userImage: string;
    dateCommented: string;
    comment: string;
  }>;
  postView: number;
  userViews: Array<{
    userId: string;
    userName: string;
    userPhoto: string;
    fullname: string;
  }>;
  postFavorite: boolean;
  userFavorite: any[]; 
  title: string | null;
  content: string | null;
}

interface FollowingShortInfo {
  userId: string;
  userName: string;
  userPhoto: string;
  fullname: string;
}

export interface UserFollowing {
  id: number;
  userShortInfo: FollowingShortInfo;
  isFollowing: boolean
}
 
export interface MyProfileState   {
  data : UserProfile 
  loading: boolean
  editModal: boolean
  followersModal: boolean
  followingModal: boolean
  myProfileData: MyPost[]
  followings : UserFollowing[]
  followers : UserFollowing[]
  userId : string
};

export interface UserProfileHeader {
  userName: string;
  image: string;
  postCount: number;
  followersCount: number;
  followingCount: number;
  about?: string;
  website?: string;
}