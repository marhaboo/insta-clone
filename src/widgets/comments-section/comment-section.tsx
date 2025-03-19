"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, MessageCircle, Share2, X, Bookmark, Send, ChevronLeft, ChevronRight } from "lucide-react";
import { getToken } from "@/shared/utils/token";

interface Comment {
  postCommentId: number;
  userId: string;
  userName: string;
  userImage: string;
  comment: string;
  dateCommented: string;
}

interface CommentModalProps {
  post: any;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function CommentModal({ post, onClose, onPrevious, onNext }: CommentModalProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [likeCount, setLikeCount] = useState<number>(post.postLikeCount || 0);
  const [isLiked, setIsLiked] = useState<boolean>(post.postLike);
  const userName = getToken();

  useEffect(() => {
    if (post.comments) {
      setComments(post.comments);
    }

    // Update like count when post changes
    setLikeCount(post.postLikeCount || 0);
    setIsLiked(post.postLike);
  }, [post]);

  const handleSubmitComment = async () => {
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        postCommentId: Date.now(),
        userId: "current-user-id",
        userName: userName,
        userImage: "/placeholder.svg",
        comment: newComment,
        dateCommented: new Date().toISOString(),
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row h-[90vh] relative">
        {onPrevious && (
          <button
            onClick={onPrevious}
            className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 hover:bg-opacity-75 transition-all z-10"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>
        )}
        {onNext && (
          <button
            onClick={onNext}
            className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 hover:bg-opacity-75 transition-all z-10"
          >
            <ChevronRight className="w-6 h-6 text-black" />
          </button>
        )}

        <div className="w-full md:w-3/5 h-1/2 md:h-full relative bg-black flex items-center justify-center">
          {post.isReel ? (
            <video
              src={`${process.env.NEXT_PUBLIC_API_URL}/images/${post.images}`}
              className="w-full h-full object-contain"
              controls
              autoPlay
              loop
            />
          ) : (
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/images/${post.images}`}
              alt={post.title || "Post image"}
              layout="fill"
              objectFit="contain"
            />
          )}
        </div>
        <div className="w-full md:w-2/5 h-1/2 md:h-full flex flex-col bg-white">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={post.userImage ? `${process.env.NEXT_PUBLIC_API_URL}/images/${post.userImage}` : "/placeholder.svg"}
                  alt={post.userName}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-sm">{post.userName}</p>
                <p className="text-xs text-gray-500">{post.title || post.content}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.postCommentId} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={comment.userImage ? `${process.env.NEXT_PUBLIC_API_URL}/images/${comment.userImage}` : "/placeholder.svg"}
                      alt={comment.userName}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-semibold">{comment.userName}</span> {comment.comment}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(comment.dateCommented).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No comments yet.</p>
            )}
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <button onClick={handleLike}>
                  <Heart className={`w-6 h-6 ${isLiked ? "text-red-500 fill-red-500" : "text-gray-700"}`} />
                </button>
              </div>
            </div>
            <p className="font-semibold text-sm">{likeCount} likes</p>
            <p className="text-xs text-gray-500 mt-1">Posted on {new Date(post.datePublished).toLocaleDateString()}</p>
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 p-2 border rounded-lg text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button onClick={handleSubmitComment} className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
