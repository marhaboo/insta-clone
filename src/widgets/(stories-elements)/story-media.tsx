"use client"

import { useRef } from "react"

export interface StoryMediaProps {
  fileName: string
  isMuted: boolean
}

export function StoryMedia({ fileName, isMuted }: StoryMediaProps) {
  const mediaRef = useRef<HTMLVideoElement | HTMLImageElement>(null)

  const isVideo = fileName && typeof fileName === "string" && fileName.endsWith(".mp4")

  return isVideo ? (
    <video
      ref={mediaRef as React.RefObject<HTMLVideoElement>}
      src={`https://instagram-api.softclub.tj/images/${fileName}`}
      className="w-full h-full object-cover"
      autoPlay
      playsInline
      muted={isMuted}
    />
  ) : (
    <img
      ref={mediaRef as React.RefObject<HTMLImageElement>}
      src={`https://instagram-api.softclub.tj/images/${fileName}`}
      alt="Story"
      className="w-full h-[100vh] object-cover"
    />
  )
}
