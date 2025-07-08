"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { Post } from "../../../../entities/explore/reducer/exploreSlice";
import { axiosRequest } from "@/shared/utils/axiosRequest";
import { Skeleton } from "@/widgets/skeleton-explore/Skeleton";
import CommentModal from "@/widgets/comments-section/comment-section";

export default function Explore() {
  const [modal, setModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [content, setContent] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingNew, setIsFetchingNew] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex] = useState<number>(0); 

  const fetchContent = useCallback(async () => {
    if (isFetchingNew) return;
    setIsFetchingNew(true);

    try {
      const reelsResponse = await axiosRequest.get(`/Post/get-reels?page=${page}`);
      const postsResponse = await axiosRequest.get(`/Post/get-posts?page=${page}`);

      const combinedContent = [
        ...(reelsResponse.data?.data || []).map((reel: Post) => ({ ...reel, isReel: true })),
        ...(postsResponse.data?.data || []).map((post: Post) => ({ ...post, isReel: false })),
      ];

      setContent((prev) => [...prev, ...combinedContent].sort(() => Math.random() - 0.5));
    } catch (error) {
      console.error("Unexpected error fetching content:", error);
    } finally {
      setIsFetchingNew(false);
      setIsLoading(false);
    }
  }, [page, isFetchingNew]);

  useEffect(() => {
    fetchContent();
  }, [page,fetchContent]);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNew) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.95 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [isFetchingNew]);

  const openModal = (post: Post) => {
    setSelectedPost(post);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setSelectedPost(null);
  };
  const goToPreviousPost = () => {
    const currentIndex = content.findIndex((item) => item.postId === selectedPost?.postId);
    if (currentIndex > 0) {
      setSelectedPost(content[currentIndex - 1]);
    }
  };

  const goToNextPost = () => {
    const currentIndex = content.findIndex((item) => item.postId === selectedPost?.postId);
    if (currentIndex < content.length - 1) {
      setSelectedPost(content[currentIndex + 1]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Explore</h1>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      ) : content.length === 0 ? (
        <p className="text-center text-gray-500">No content to show at the moment.</p>
      ) : (
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[auto]">
            {content.map((item, index) => (
              <PostCard
                key={`${item.postId}-${index}`}
                post={item}
                onClick={() => openModal(item)}
                isActive={index === currentIndex} 
              />
            ))}
          </div>

         
        </div>
      )}

      {isFetchingNew && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      )}

      <div ref={observerRef} className="h-10"></div>

      {modal && selectedPost && <CommentModal post={selectedPost} onNext={goToNextPost} onPrevious={goToPreviousPost} onClose={closeModal} />}
    </div>
  );
}

const PostCard = ({ post, onClick, isActive }: { post: Post; onClick: () => void; isActive: boolean }) => {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-lg overflow-hidden cursor-pointer shadow-md transition-all duration-300 hover:shadow-xl ${
        post.isReel ? "row-span-2" : "row-span-1"
      } ${isActive ? "border-4 border-blue-500" : ""}`} 
    >
      {post.isReel ? (
        <video
          src={`${process.env.NEXT_PUBLIC_API_URL}/images/${post.images}`}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
        />
      ) : (
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/images/${post.images}`}
          alt={post.title || "Post image"}
          fill
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-end justify-start p-4">
        <div>
          <p className="text-white text-lg font-semibold">{post.userName}</p>
          <p className="text-white text-sm">{post.postLikeCount} likes</p>
        </div>
      </div>
      {post.isReel && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          Reel
        </div>
      )}
    </div>
  );
};
