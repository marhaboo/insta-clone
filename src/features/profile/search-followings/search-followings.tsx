"use client"

import { useState } from "react"
import { Search } from "lucide-react"

export function SearchFollowings({ onSearch }: { onSearch: (query: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="p-4 border-b border-[#DBDBDB] dark:border-[#363636]">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-3 w-3 text-[#8E8E8E]" />
        <input
          type="text"
          placeholder="Поиск"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            onSearch(e.target.value)
          }}
          className="w-full pl-8 pr-3 py-1.5 bg-[#EFEFEF] dark:bg-[#363636] text-[#262626] dark:text-white text-sm h-8 rounded border-none outline-none placeholder:text-[#8E8E8E]"
        />
      </div>
    </div>
  )
}
