"use client"

import { useState } from "react"
import { useSettings } from "./contexts/settings-contexts"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { ScrollArea } from "@/shared/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"

const CloseFriendsSettings = () => {
  const [closeFriends, setCloseFriends] = useState<string[]>(["user1", "user2", "user3"])
  const [newFriend, setNewFriend] = useState("")
  const { language } = useSettings()

  const translations = {
    en: {
      title: "Close Friends",
      placeholder: "Enter username to add",
      addButton: "Add Friend",
      removeButton: "Remove",
    },
    ru: {
      title: "Близкие друзья",
      placeholder: "Введите имя пользователя для добавления",
      addButton: "Добавить друга",
      removeButton: "Удалить",
    },
    tg: {
      title: "Дӯстони наздик",
      placeholder: "Номи корбарро барои илова кардан ворид кунед",
      addButton: "Илова кардани дӯст",
      removeButton: "Хориҷ кардан",
    },
  }

  const t = translations[language]

  const handleAddFriend = () => {
    if (newFriend && !closeFriends.includes(newFriend)) {
      setCloseFriends([...closeFriends, newFriend])
      setNewFriend("")
    }
  }

  const handleRemoveFriend = (friend: string) => {
    setCloseFriends(closeFriends.filter((f) => f !== friend))
  }

  return (
    <div className="space-y-4 my-[120px] sm:my-[100px] md:my-[80px] lg:my-[60px] xl:my-[40px] 2xl:my-[50px]">
      <h2 className="text-2xl font-semibold">{t.title}</h2>
      <div className="flex space-x-2">
        <Input placeholder={t.placeholder} value={newFriend} onChange={(e) => setNewFriend(e.target.value)} />
        <Button onClick={handleAddFriend}>{t.addButton}</Button>
      </div>
      <ScrollArea className="h-[300px] w-full border rounded-md p-4">
        {closeFriends.map((friend) => (
          <div key={friend} className="flex justify-between items-center py-2">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${friend}`} />
                <AvatarFallback>{friend[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <span>{friend}</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => handleRemoveFriend(friend)}>
              {t.removeButton}
            </Button>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}

export default CloseFriendsSettings

