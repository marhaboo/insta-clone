"use client"

import { useState } from "react"
import { useSettings } from "./contexts/settings-contexts"
import { Label } from "@/shared/ui/label"
import { Switch } from "@/shared/ui/switch"
import { Button } from "@/shared/ui/button"
import type React from "react" // Added import for React

const ActivityStatusSettings = () => {
  const [showActivityStatus, setShowActivityStatus] = useState(true)
  const [showLastSeen, setShowLastSeen] = useState(true)
  const { language } = useSettings()

  const translations = {
    en: {
      title: "Activity Status",
      showActivityStatus: "Show activity status",
      showLastSeen: "Show last seen",
      saveChanges: "Save Changes",
    },
    ru: {
      title: "Статус активности",
      showActivityStatus: "Показывать статус активности",
      showLastSeen: "Показывать последнее посещение",
      saveChanges: "Сохранить изменения",
    },
    tg: {
      title: "Ҳолати фаъолият",
      showActivityStatus: "Нишон додани ҳолати фаъолият",
      showLastSeen: "Нишон додани охирин дидор",
      saveChanges: "Сабти тағйирот",
    },
  }

  const t = translations[language]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Activity status settings updated")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 my-[120px] sm:my-[100px] md:my-[80px] lg:my-[60px] xl:my-[40px] 2xl:my-[50px]"
    >
      <h2 className="text-2xl font-semibold">{t.title}</h2>
      <div className="flex items-center justify-between">
        <Label htmlFor="show-activity-status">{t.showActivityStatus}</Label>
        <Switch id="show-activity-status" checked={showActivityStatus} onCheckedChange={setShowActivityStatus} />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="show-last-seen">{t.showLastSeen}</Label>
        <Switch id="show-last-seen" checked={showLastSeen} onCheckedChange={setShowLastSeen} />
      </div>
      <Button type="submit">{t.saveChanges}</Button>
    </form>
  )
}

export default ActivityStatusSettings

