"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import Image from "next/image"
import type { AppDispatch, RootState } from "@/app/store/store"
import { useSelector, useDispatch } from "react-redux"
import { followFunc, delFollowersFunc, getSubscriptions, getProfileId } from "@/entities/profile/my-profile/api/api"
import defaultImg from "@/app/assets/images/profile/default-profile.svg"
import { useRouter } from "next/navigation"
import { setFollowingsModal } from "@/entities/profile/my-profile/reducers/profile-slice"

interface FollowerShortInfo {
  userId: string
  userName: string
  userPhoto: string
  fullname: string
}

export interface UserFollower {
  id: number
  userShortInfo: FollowerShortInfo
  isFollowing: boolean
}

export function FollowingModal({ id }: { id: string }) {
  const dispatch: AppDispatch = useDispatch()
  const router = useRouter()
  const { followingModal, followers, userId } = useSelector((state: RootState) => state.myProfile)
  const [searchQuery, setSearchQuery] = useState("")
  const [localFollowers, setLocalFollowers] = useState<UserFollower[]>([])

  useEffect(() => {
    dispatch(getProfileId(id))
  }, [dispatch, id])

  useEffect(() => {
    if (userId) {
      dispatch(getSubscriptions(userId))
    }
  }, [dispatch, userId])

  useEffect(() => {
    setLocalFollowers(followers.map((follower) => ({ ...follower, isFollowing: false })))
  }, [followers])

  if (!followingModal) return null

  const baseImageUrl = "https://instagram-api.softclub.tj/images/"
  const filteredFollowers = localFollowers.filter((follower: UserFollower) =>
    [follower.userShortInfo.userName.toLowerCase(), follower.userShortInfo.fullname.toLowerCase()].some((text) =>
      text.includes(searchQuery.toLowerCase()),
    ),
  )

  const handleFollowToggle = (userId: string) => {
    const follower = localFollowers.find((f) => f.userShortInfo.userId === userId)
    if (follower) {
      if (follower.isFollowing) {
        dispatch(delFollowersFunc(userId))
      } else {
        dispatch(followFunc(userId))
      }
      setLocalFollowers((prevFollowers) =>
        prevFollowers.map((f) => (f.userShortInfo.userId === userId ? { ...f, isFollowing: !f.isFollowing } : f)),
      )
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-50"
        onClick={() => dispatch(setFollowingsModal(false))}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[400px] w-full bg-white dark:bg-[#262626] rounded-xl shadow-xl z-50 overflow-hidden">
        {/* Header */}
        <div className="relative py-2 px-4 text-center border-b border-[#DBDBDB] dark:border-[#363636]">
          <h2 className="text-[16px] leading-5 font-semibold text-[#262626] dark:text-white font-['Helvetica']">
            Подписки
          </h2>
          <button
            onClick={() => dispatch(setFollowingsModal(false))}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-[#F8F8F8] dark:hover:bg-[#363636] dark:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-[#DBDBDB] dark:border-[#363636]">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3 w-3 text-[#8E8E8E]" />
            <input
              type="text"
              placeholder="Поиск"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[#EFEFEF] dark:bg-[#363636] text-[#262626] dark:text-white text-sm h-8 rounded border-none outline-none placeholder:text-[#8E8E8E]"
            />
          </div>
        </div>

        <div className="max-h-[356px] overflow-y-auto">
          {filteredFollowers.map((follower: UserFollower) => {
            const profileImage = follower.userShortInfo.userPhoto
              ? `${baseImageUrl}${follower.userShortInfo.userPhoto}`
              : defaultImg

            return (
              <div
                key={follower.userShortInfo.userId}
                className="flex items-center justify-between py-2 px-4 hover:bg-[#FAFAFA] dark:hover:bg-[#363636] transition-colors"
              >
                <div
                  className="flex items-center gap-3"
                  onClick={() => {
                    router.push(`/profile/${follower.userShortInfo.userId}`)
                    dispatch(setFollowingsModal(false))
                  }}
                >
                  <div className="relative h-[44px] w-[44px] rounded-full overflow-hidden">
                    <Image
                      src={profileImage || "/placeholder.svg"}
                      alt={follower.userShortInfo.userName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#262626] dark:text-white leading-[18px] font-['Helvetica']">
                      {follower.userShortInfo.userName}
                    </span>
                    <span className="text-sm text-[#8E8E8E] leading-[18px] font-['Helvetica']">
                      {follower.userShortInfo.fullname}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleFollowToggle(follower.userShortInfo.userId)}
                  className={`px-4 h-8 text-sm font-semibold rounded-full transition-colors ${
                    follower.isFollowing
                      ? "bg-[#EFEFEF] text-[#262626] hover:bg-[#DBDBDB]"
                      : "bg-[#0095F6] text-white hover:bg-[#006DB6]"
                  }`}
                >
                  {follower.isFollowing ? "Unfollow" : "Follow"}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

