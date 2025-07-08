 
export interface UserProfile {
  id: string
  userName: string
  image: string
  postCount: number
  followersCount: number
  followingCount: number
  about: string
  website?: string
}


export interface MyPost {
  isReel: boolean
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
  userFavorite: unknown[]; 
  title: string | null;
  content: string | null;
}
 
export interface MyProfileState   {
  data : UserProfile 
  loading: boolean
  followersModal: boolean
  myProfileData: MyPost[]
};
