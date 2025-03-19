import React from "react"
import Image from "next/image"

export default function ProfileUser({
  img,
  userName,
  size = "md",
  userNickname,
}: {
  img?: string
  size?: "sm" | "md" | "lg"
  userName?: string
  userNickname: string
}) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  }

  const imageSize = sizeClasses[size]

  return (
    <div className="flex items-center gap-3 cursor-pointer">
      <div className={`relative ${imageSize} flex-shrink-0`}>
        {img ? (
          <Image
            className="rounded-full object-cover"
            src={`https://instagram-api.softclub.tj/images/${img}`}
            alt=""
            layout="fill"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-person-circle text-gray-400 w-full h-full"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
        )}
      </div>
      <div className="flex flex-col min-w-0">
        <p className="font-semibold text-sm sm:text-base truncate">{userName || userNickname}</p>
        {userName && <p className="text-xs text-gray-500 truncate">{userNickname}</p>}
      </div>
    </div>
  )
}

