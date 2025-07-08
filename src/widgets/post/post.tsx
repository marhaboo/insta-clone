"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Send,
  Bookmark,
} from "lucide-react";
import { AppDispatch, RootState } from "@/app/store/store";
import { postApi } from "@/entities/post/api/post-api";
import ProfileUser from "@/shared/ui/profile-user";
import PostLike from "@/features/(like)/like-post/ui/like-post";
import CommentModal from "../comments-section/comment-section";
import { Skeleton } from "@/shared/ui/skeleton"; // Import ShadCN Skeleton
import Image from "next/image";

interface Post {
  postId: number;
  userId: string;
  userName: string;
  userImage: string | null;
  datePublished: string;
  images: string[];
  postLike: boolean;
  postLikeCount: number;
  commentCount: number;
  title: string | null;
  content: string | null;
}

export default function Post() {
  const [likeCount, setLikeCount] = useState(0);
  const [likeStatus, setLikeStatus] = useState(false);
  const { posts, loading } = useSelector((store: RootState) => store.post);
  const dispatch = useDispatch<AppDispatch>();
  const [modal, setModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleLikeClick = () => {
    setLikeStatus(!likeStatus);

    if (likeStatus) {
      setLikeCount(likeCount - 1); 
    } else {
      setLikeCount(likeCount + 1);
    }

  };

  useEffect(() => {
    dispatch(postApi());
  }, [dispatch]);

  const openModal = (post: Post) => {
    setSelectedPost(post);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setSelectedPost(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col w-full max-w-[468px] m-auto font-sans">
        <Skeleton className="w-10 h-10 mb-3" />
        <Skeleton className="w-full h-64 mb-3" />
        <Skeleton className="w-3/4 h-4 mb-2" />
        <Skeleton className="w-1/2 h-4 mb-3" />
      </div>
    );
  }

  return (
    <>
      {posts.map((post: Post) => (
        <div
          key={post.postId}
          className="flex flex-col w-full max-w-[468px] m-auto font-sans"
        >
          <div className="flex items-center p-3 gap-2">
            <ProfileUser
              userNickname={post.userName}
              img={post.userImage || undefined}
            />
            <button className="ml-auto">
              <MoreHorizontal />
            </button>
          </div>

          <div className="relative w-full">
            {post.images[0]?.endsWith(".mp4") ? (
              <video
                src={`https://instagram-api.softclub.tj/images/${post.images[0]}`}
                controls
                className="w-full lg:h-[500px] h-96 object-cover"
              />
            ) : (
              <Image
                src={`https://instagram-api.softclub.tj/images/${post.images[0]}`}
                alt="post-image"
                className="w-full lg:h-[500px] h-96 object-cover"
              />
            )}
          </div>

          {post.images.length > 1 && (
            <div className="absolute flex justify-between w-1/2 top-1/2 transform -translate-y-1/2 px-2">
              <button className="text-white text-4xl">
                <ChevronLeft />
              </button>
              <button className="text-white text-4xl">
                <ChevronRight />
              </button>
            </div>
          )}

          <div className="flex items-center p-3 gap-4">
            <div onClick={() => handleLikeClick(post)}>
              <PostLike id={post.postId} status={post.postLike} />
            </div>
            <MessageCircle
              onClick={() => {
                openModal(post);
              }}
              className="cursor-pointer"
            />
            <Send className="cursor-pointer" />
            <Bookmark className="ml-auto cursor-pointer" />
          </div>

          <div className="px-3 pb-3">
            <p className="font-semibold">
              {post.postLikeCount + likeCount} отметок &quot;Нравится&quot;
            </p>
            <p>
              <span className="font-semibold">{post.userName}</span>{" "}
              {post.content}
            </p>
            {post.content && post.content.length > 50 && (
              <button
                onClick={() => openModal(post)}
                className="text-gray-400 text-sm"
              >
                ... ещё
              </button>
            )}
            <button
              onClick={() => openModal(post)}
              className="text-gray-400 text-sm block mt-1"
            >
              Посмотреть все комментарии ({post.commentCount})
            </button>
          </div>
        </div>
      ))}
      {modal && selectedPost && (
        <CommentModal post={selectedPost} onClose={closeModal} />
      )}
    </>
  );
}
