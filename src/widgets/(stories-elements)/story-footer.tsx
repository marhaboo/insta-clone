import StoryLike from "@/features/(like)/like-story/ui/like-story";
import { Send } from "lucide-react";
import { useState } from "react";

export interface StoryFooterProps {
  userName: unknown;
  onReplyClick: () => void;
  liked: boolean;
  id: number;
  onLikeClick: () => void;
}

export function StoryFooter({ userName, id, onReplyClick, liked, onLikeClick }: StoryFooterProps) {
  const [input,setInput]=useState("")
  return (
    <div className="sticky bottom-0 left-0 right-0 z bg-black/50 backdrop-blur-sm w-full rounded-lg m-auto py-3">
      <div className="max-w-screen-sm mx-auto flex items-center space-x-4 px-4">
        <div className="flex-1 relative">
          <input
          value={input}
          onChange={(e)=>setInput(e.target.value)}
            type="text"
            placeholder={`Reply to ${userName.userName}...`}
            className="w-full bg-transparent text-white rounded-full py-2 px-4 border border-white/20 focus:outline-none focus:border-white/40 text-sm"
          />
          <button 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/90 hover:text-white" 
            onClick={onReplyClick}
          >
            <form onSubmit={(e)=>{e.preventDefault(); setInput("")}} action="">

            <Send type="submit" onClick={()=>setInput("")} className="w-5 h-5 rotate-12" />
            </form>
          </button>
        </div>
        
        <button className="text-white/90 hover:text-white" onClick={onLikeClick}>
          <StoryLike id={id} status={liked} />
        </button>
      </div>
    </div>
  );
}
