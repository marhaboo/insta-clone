import { Avatar, AvatarImage, AvatarFallback } from "@/shared/ui/avatar"
import { Volume2, VolumeX, MoreHorizontal } from "lucide-react"
import { Story, User } from "./stories-dialog"

export interface StoryHeaderProps {
  user: User
  story: Story
  isMuted: boolean
  setIsMuted: (value: boolean) => void
}
 

export function StoryHeader({ user, story, isMuted, setIsMuted }: StoryHeaderProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-4 pt-6">
      <div className="flex items-center space-x-2">
        <Avatar className="w-8 h-8 border-2 border-pink-500">
          <AvatarImage src={user?.userImage || ""} alt={user?.userName} />
          <AvatarFallback>{user?.userName.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-white text-sm font-semibold">{user?.userName}</span>
          <span className="text-white/70 text-xs">{new Date(story?.createAt).toLocaleString()}</span>
        </div>
      </div>
      
      
      <div className="flex items-center space-x-4">
        <button className="text-white/90 hover:text-white" onClick={() => setIsMuted(!isMuted)}>
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>
        <button className="text-white/90 hover:text-white">
          <MoreHorizontal className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
