"use client"

import { useEffect, useState } from "react"
import { Search, X } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { searchUsers } from "@/entities/comment/api/search-api/api"
import type { AppDispatch } from "@/app/store/store"
import StoriesDialog, { type User } from "@/widgets/(stories-elements)/stories-dialog"

interface SearchSidebarProps {
  onClose: () => void
}

export function SearchSidebar({ onClose }: SearchSidebarProps) {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const [query, setQuery] = useState<string>("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const data = useSelector((state: any) => state.search.searchResults)

  useEffect(() => {
    if (query.trim() !== "") {
      dispatch(searchUsers(query))
    }
  }, [query, dispatch])

  return (
    <div className="w-[350px] bg-white dark:bg-[#1A1A1A] h-full border-l border-gray-200 dark:border-gray-700 border-r-2 absolute left-14">
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Search</h2>
        <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
          <X size={24} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-gray-700 dark:text-gray-300 focus-within:ring-2 focus-within:ring-blue-500">
          <Search size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full border-none outline-none bg-transparent text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>

      <div className="px-4">
        <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Results</h3>
        {data?.data?.slice(1, 5).map((el: any) => (
          <div
            key={el.id}
            className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
          >
            <div className="flex items-center">
              <img
                className="w-10 h-10 mr-3 rounded-full cursor-pointer"
                src={`https://instagram-api.softclub.tj/images/${el.avatar}`}
                alt=""
                onClick={() =>
                  setSelectedUser({
                    userId: el.id,
                    userName: el.fullName,
                    userImage: `https://instagram-api.softclub.tj/images/${el.avatar}`,
                    stories: el.stories || [],
                  })
                }
              />
              <span
                className="text-sm cursor-pointer text-gray-900 dark:text-gray-100"
                onClick={() => router.push(`/profile/${el.id}`)}
              >
                {el.fullName}
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedUser && (
        <StoriesDialog users={[selectedUser]} initialUserIndex={0} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  )
}
