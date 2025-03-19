"use client"

import * as React from "react"
import { Ban, AlertTriangle, Flag, Share2, User, MoreHorizontal } from "lucide-react"

export function ActionMenu() {
  const [open, setOpen] = React.useState(false)

  const menuItems = [
    { label: "Заблокировать", icon: Ban, color: "text-red-500" },
    { label: "Ограничить", icon: AlertTriangle },
    { label: "Пожаловаться", icon: Flag },
    { label: "Поделиться...", icon: Share2 },
    { label: "Об аккаунте", icon: User },
  ]

  const handleClickOutside = React.useCallback(
    (event: MouseEvent) => {
      if (open && !(event.target as Element).closest(".action-menu")) {
        setOpen(false)
      }
    },
    [open],
  )

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [handleClickOutside])

  return (
    <div className="relative inline-block action-menu ">
      <button
        onClick={() => setOpen(!open)}
        className={`p-2 rounded-full `}
      >
        <MoreHorizontal className="h-5 w-5" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-[280px] z-10 bg-white px-4 py-2 rounded-2xl shadow-lg min-w-[100px] text-center">
          <div className="py-1">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-100 flex items-center ${item.color || "text-gray-700"}`}
                onClick={() => setOpen(false)}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.label}
              </button>
            ))}
            <button
              className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 border-t"
              onClick={() => setOpen(false)}
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

