"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { followFunc, delFollowersFunc } from "@/entities/profile/my-profile/api/api"
import { AppDispatch } from "@/app/store/store";

export function FollowButton({ userId, isFollowing }: { userId: string; isFollowing: boolean }) {
  const dispatch: AppDispatch = useDispatch()
  const [localFollowing, setLocalFollowing] = useState(isFollowing)

  const handleFollowToggle = () => {
    setLocalFollowing((prev) => !prev)
    dispatch(localFollowing ? delFollowersFunc(userId) : followFunc(userId))
  }

  return (
    <button
      onClick={handleFollowToggle}
      className={`px-4 h-8 text-sm font-semibold rounded-full transition-colors ${
        localFollowing ? "bg-[#EFEFEF] text-[#262626] hover:bg-[#DBDBDB]" : "bg-[#0095F6] text-white hover:bg-[#006DB6]"
      }`}
    >
      {localFollowing ? "Unfollow" : "Follow"}
    </button>
  )
}
