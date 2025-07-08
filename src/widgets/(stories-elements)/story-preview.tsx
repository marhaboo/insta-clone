import { motion } from "framer-motion"
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/ui/avatar"
import { User } from "./stories-dialog"
import Image from "next/image"

export interface SidePreviewProps {
  user: User
  isNext: boolean
  onClick: () => void
}


export function SidePreview({ user,isNext, onClick }: SidePreviewProps) {
  return (
    <motion.div
      key={user.userId}
      initial={{ opacity: 0, x: isNext ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isNext ? 20 : -20 }}
      transition={{ duration: 0.2 }}
      className="group w-full border-2 h-full bg-gray-900 rounded-lg top-0 overflow-hidden cursor-pointer relative"
      onClick={onClick}
    >
      <Image
        src={`https://instagram-api.softclub.tj/images/${user.userImage}`}
        alt={user.userName}
        className="w-full h-full  opacity-50 group-hover:opacity-75 transition-opacity"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="top-2 left-1/2 absolute -translate-x-1/2">
        <Avatar className="border-white/50 border w-7 h-7">
          <AvatarImage src={user.userImage || ""} />
          <AvatarFallback>{user.userName.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
    </motion.div>
  )
}