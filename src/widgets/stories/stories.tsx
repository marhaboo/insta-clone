"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/app/store/store"
import { storiesApi } from "@/entities/stories/api/stories-api"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import StoriesDialog from "../(stories-elements)/stories-dialog"
import { motion } from "framer-motion"

// Skeleton Loader for Story
const Skeleton = ({ className }: { className: string }) => (
  <motion.div
    className={`bg-gray-300 dark:bg-gray-700 animate-pulse rounded-full ${className}`}
    initial={{ opacity: 0.5 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
  />
)

interface Story {
  id: number
  fileName: string
  createAt: string
  liked: boolean
  likedCount: number
}

interface User {
  userId: string
  userName: string
  userImage: string | null
  stories: Story[]
}

export default function Stories() {
  const { stories, loading } = useSelector((store: RootState) => store.stories)
  const dispatch = useDispatch<AppDispatch>()
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null)

  useEffect(() => {
    dispatch(storiesApi())
  }, [dispatch])

  const handleStoryClick = (index: number) => {
    setSelectedUserIndex(index)
  }

  return (
    <>
      <div className="flex space-x-4 p-4 overflow-x-auto">
        {loading ? (
          <>
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <Skeleton className="w-20 h-20" />
                <Skeleton className="mt-2 w-20 h-4" />
              </div>
            ))}
          </>
        ) : (
          stories.map((user: User, index: number) => (
            <div key={user.userId} className="flex flex-col items-center">
              <Avatar
                className="ring-2 ring-pink-500 ring-offset-2 w-20 h-20 cursor-pointer"
                onClick={() => handleStoryClick(index)}
              >
                <AvatarImage
                  src={user.userImage ? `https://instagram-api.softclub.tj/images/${user.userImage}` : ""}
                  alt={user.userName}
                />
                <AvatarFallback>{user.userName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <p className="mt-2 w-20 font-medium text-center text-sm truncate">{user.userName}</p>
            </div>
          ))
        )}
      </div>
      {selectedUserIndex !== null && (
        <div className="bg-black">
          <StoriesDialog
            users={stories}
            initialUserIndex={selectedUserIndex}
            onClose={() => setSelectedUserIndex(null)}
          />
        </div>
      )}
    </>
  )
}
