"use client"

import { useState } from "react"
import { useSettings } from "./contexts/settings-contexts"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { ScrollArea } from "@/shared/ui/scroll-area"

const BlockedAccountsSettings = () => {
  const [blockedAccounts, setBlockedAccounts] = useState<string[]>(["user1", "user2", "user3"])
  const [newBlockedAccount, setNewBlockedAccount] = useState("")
  const { language } = useSettings()

  const translations = {
    en: {
      title: "Blocked Accounts",
      placeholder: "Enter username to block",
      blockButton: "Block User",
      unblockButton: "Unblock",
    },
    ru: {
      title: "Заблокированные аккаунты",
      placeholder: "Введите имя пользователя для блокировки",
      blockButton: "Заблокировать",
      unblockButton: "Разблокировать",
    },
    tg: {
      title: "Ҳисобҳои басташуда",
      placeholder: "Номи корбарро барои бастан ворид кунед",
      blockButton: "Бастани корбар",
      unblockButton: "Кушодан",
    },
  }

  const t = translations[language]

  const handleBlockUser = () => {
    if (newBlockedAccount && !blockedAccounts.includes(newBlockedAccount)) {
      setBlockedAccounts([...blockedAccounts, newBlockedAccount])
      setNewBlockedAccount("")
    }
  }

  const handleUnblockUser = (user: string) => {
    setBlockedAccounts(blockedAccounts.filter((account) => account !== user))
  }

  return (
    <div className="space-y-4 my-[120px] sm:my-[100px] md:my-[80px] lg:my-[60px] xl:my-[40px] 2xl:my-[50px]">
      <h2 className="text-2xl font-semibold">{t.title}</h2>
      <div className="flex space-x-2">
        <Input
          placeholder={t.placeholder}
          value={newBlockedAccount}
          onChange={(e) => setNewBlockedAccount(e.target.value)}
        />
        <Button onClick={handleBlockUser}>{t.blockButton}</Button>
      </div>
      <ScrollArea className="h-[200px] w-full border rounded-md p-4">
        {blockedAccounts.map((account) => (
          <div key={account} className="flex justify-between items-center py-2">
            <span>{account}</span>
            <Button variant="outline" size="sm" onClick={() => handleUnblockUser(account)}>
              {t.unblockButton}
            </Button>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}

export default BlockedAccountsSettings

