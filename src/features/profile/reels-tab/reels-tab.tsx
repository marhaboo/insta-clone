"use client"

import type { MyPost } from "@/entities/profile/my-profile/models/types"
import { motion } from "framer-motion"
import { PlayCircle, Heart, MessageCircle, Eye } from "lucide-react"
import { useState, useRef } from "react"
import type React from "react"
import CommentModal from "@/widgets/comments-section/comment-section"

interface ReelsTabProps {
  posts?: MyPost[]
}

const isVideo = (filename: string) => /\.(mp4|mov|avi|wmv|mkv)$/i.test(filename)

const ReelsTab: React.FC<ReelsTabProps> = ({ posts = [] }) => {
  const [modal, setModal] = useState(false)
  const [selectedPost, setSelectedPost] = useState<MyPost | null>(null)

  if (!Array.isArray(posts)) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-gray-500">Loading reels...</p>
      </div>
    )
  }

  const videoPosts = posts.filter((post) => post.images?.[0] && isVideo(post.images[0]))

  const openModal = (post: MyPost) => {
    setSelectedPost(post)
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
    setSelectedPost(null)
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
      {videoPosts.length > 0 ? (
        videoPosts.map((post, index) => (
          <ReelItem key={post.postId} post={post} index={index} onOpenModal={() => openModal(post)} />
        ))
      ) : (
        <div className="flex items-center justify-center w-full col-span-2 sm:col-span-3 md:col-span-4 h-40">
          <p className="text-gray-500">No reels available.</p>
        </div>
      )}
      {modal && selectedPost && <CommentModal post={selectedPost} onClose={closeModal} />}
    </div>
  )
}

interface ReelItemProps {
  post: MyPost
  index: number
  onOpenModal: () => void
}

const ReelItem: React.FC<ReelItemProps> = ({ post, index, onOpenModal }) => {
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleMouseEnter = () => {
    if (videoRef.current && videoRef.current?.readyState >= 2) { 
      setIsHovered(true)
      videoRef.current.play().catch((err) => console.error("Error playing video:", err))
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    videoRef.current?.pause()
  }

  return (
    <motion.div
      className="relative aspect-[9/16] bg-black overflow-hidden group cursor-pointer rounded-xl"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onOpenModal}
    >
      <video
        ref={videoRef}
        src={post.images?.[0] ? `https://instagram-api.softclub.tj/images/${post.images[0]}` : ""}
        className="w-full h-full object-cover"
        loop
        playsInline
        muted
        onError={(e) => console.error("Video error:", e)}
      />

      {/* Overlay with stats */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4">
        <div className="flex items-center justify-end space-x-2">
          <Eye className="w-4 h-4 text-white" />
          <span className="text-white text-sm">{post.postView || 0}</span>
        </div>
        <div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4 text-white" />
              <span className="text-white text-sm">{post.postLike || 0}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4 text-white" />
              <span className="text-white text-sm">{post.comments?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {!isHovered && (
        <div className="absolute inset-0 flex items-center justify-center">
          <PlayCircle className="w-12 h-12 text-white opacity-80" />
        </div>
      )}
    </motion.div>
  )
}

export default ReelsTab
