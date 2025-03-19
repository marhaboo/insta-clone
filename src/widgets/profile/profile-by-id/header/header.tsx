"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/shared/ui/button"
import defaultImg from "@/app/assets/images/profile/default-profile.svg"
import type { UserProfile } from "@/entities/profile/profile-by-id/models/types"
import { setFollowersModal, setFollowingsModal } from "@/entities/profile/my-profile/reducers/profile-slice"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/app/store/store"
import { FollowersModal } from "@/widgets/profile/profile-by-id/followersModal/followersModal"
import { FollowingModal } from "../followingsModal/followingsModal"
import { useParams, useRouter } from "next/navigation"
import { ActionMenu } from "../../../../features/profile/action-menu/action-menu"
import { followFunc, delFollowersFunc, getFollowingRelationShip } from "@/entities/profile/my-profile/api/api"
import { useState, useEffect } from "react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200,
    },
  },
}

const ProfileByIdWidget = ({ data }: { data: any }) => {
  const params = useParams()
  const id = params ? (params["profile-by-id"] as string | null) : null
  const baseImageUrl = "https://instagram-api.softclub.tj/images/"
  const router = useRouter()
  const dispatch: AppDispatch = useDispatch()
  const [isFollowing, setIsFollowing] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const user: UserProfile = {
    id: data?.id || "",
    userName: data?.userName || "",
    image: data?.image ? `${baseImageUrl}${data.image}` : defaultImg,
    postCount: data?.postCount || 0,
    followersCount: data?.subscribersCount || 0,
    followingCount: data?.subscriptionsCount || 0,
    about: data?.about || "",
  }

  useEffect(() => {
    const checkFollowingStatus = async () => {
      if (id) {
        try {
          const response = await dispatch(getFollowingRelationShip(id))
          if (response.payload) {
            setIsFollowing(response.payload)
          }
        } catch (error) {
          console.error("Error checking following status:", error)
        }
      }
    }
    checkFollowingStatus()
  }, [id, dispatch])

  const handleFollowToggle = async () => {
    if (id) {
      try {
        if (isFollowing) {
          await dispatch(delFollowersFunc(id))
        } else {
          await dispatch(followFunc(id))
        }
        setIsFollowing(!isFollowing)
      } catch (error) {
        console.error("Error toggling follow status:", error)
      }
    }
  }

  const handleMessageClick = () => {
    if (id) {
      router.push(`/chats/${id}`)
      dispatch(setFollowersModal(false))
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-start sm:flex-row sm:items-center gap-6 p-4 relative -mt-6"
    >
      <motion.div variants={itemVariants} className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            type: "spring",
            damping: 12,
            stiffness: 200,
          }}
          className="relative"
        >
          <Image
            src={user.image || "/placeholder.svg"}
            alt="Profile"
            width={160}
            height={160}
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-gray-300 shadow-md"
          />
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-col items-start sm:items-start">
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-2">
          <h1 className="text-xl font-semibold">{user.userName}</h1>
          <Button
            onClick={handleFollowToggle}
            className="bg-gray-200 px-4 py-2 text-sm"
            variant="secondary"
            size="sm"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {isFollowing ? (isHovering ? "Unfollow" : "Following") : "Follow"}
          </Button>
          <Button className="bg-gray-200 px-4 py-2 text-sm" variant="secondary" size="sm" onClick={handleMessageClick}>
            Message
          </Button>
            <ActionMenu />

        </motion.div>

        <motion.div variants={itemVariants} className="flex gap-8 mb-4 text-sm">
          <motion.span whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
            <strong>{user.postCount}</strong> posts
          </motion.span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => dispatch(setFollowersModal(true))}
          >
            <strong>{user.followersCount}</strong> followers
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => dispatch(setFollowingsModal(true))}
          >
            <strong>{user.followingCount}</strong> following
          </motion.button>
        </motion.div>

        <FollowersModal id={user.userName} />
        <FollowingModal id={user.userName} />

        {user.about && (
          <motion.p variants={itemVariants} className="text-sm mb-1 font-semibold">
            {user.about}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  )
}

export default ProfileByIdWidget

