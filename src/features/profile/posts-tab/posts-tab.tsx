"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, MessageCircle } from "lucide-react";
import CommentModal from "@/widgets/comments-section/comment-section";
import { MyPost } from "@/entities/profile/profile-by-id/models/types";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

interface PostsTabProps {
  posts: MyPost[];
}

const isVideo = (filename: string) => {
  return /\.(mp4|mov|avi|wmv|mkv)$/i.test(filename);
};

const PostsTab: React.FC<PostsTabProps> = ({ posts }) => {
  const { loading } = useSelector((state: RootState) => state.myProfile);
  const [modal, setModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<MyPost | null>(null);

  const imagePosts = posts.filter((post) => !isVideo(post.images[0]));

  const openModal = (post: MyPost) => {
    setSelectedPost(post);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setSelectedPost(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 mt-1">
      {!loading ? (
        imagePosts.length > 0 ? (
          imagePosts.map((post, index) => (
            <motion.div
              key={post.postId}
              className="aspect-square relative bg-gray-100 overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => openModal(post)}
            >
              <Image
                src={`https://instagram-api.softclub.tj/images/${post.images[0]}`}
                alt={post.title || "Post image"}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-white">
                  <Heart className="w-6 h-6 fill-white" />
                  <span className="text-base font-semibold font-sans">
                    {post.postLikeCount || 0}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <MessageCircle className="w-6 h-6 fill-white" />
                  <span className="text-base font-semibold font-sans">
                    {post.commentCount || 0}
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg font-sans mt-4">
            No posts available.
          </div>
        )
      ) : (
        [...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            className="aspect-square bg-gray-200 animate-pulse"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          />
        ))
      )}

      {modal && selectedPost && <CommentModal post={selectedPost} onClose={closeModal} />}
    </div>
  );
};

export default PostsTab;