"use client"

import { useState } from "react"
import { useSettings } from "./contexts/settings-contexts"
import { Label } from "@/shared/ui/label"
import { Switch } from "@/shared/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { Button } from "@/shared/ui/button"

const StorySettings = () => {
  const [allowReplies, setAllowReplies] = useState("followers")
  const [allowSharing, setAllowSharing] = useState(true)
  const [saveToArchive, setSaveToArchive] = useState(true)
  const [allowGroupStories, setAllowGroupStories] = useState(true)
  const { language } = useSettings()

  const translations = {
    en: {
      title: "Story Settings",
      allowReplies: "Allow replies",
      allowSharing: "Allow sharing",
      saveToArchive: "Save to archive",
      allowGroupStories: "Allow group stories",
      saveChanges: "Save Changes",
    },
    ru: {
      title: "Настройки историй",
      allowReplies: "Разрешить ответы",
      allowSharing: "Разрешить делиться",
      saveToArchive: "Сохранять в архив",
      allowGroupStories: "Разрешить групповые истории",
      saveChanges: "Сохранить изменения",
    },
    tg: {
      title: "Танзимоти ҳикояҳо",
      allowReplies: "Иҷозати ҷавобҳо",
      allowSharing: "Иҷозати мубодила",
      saveToArchive: "Сабт ба бойгонӣ",
      allowGroupStories: "Иҷозати ҳикояҳои гурӯҳӣ",
      saveChanges: "Сабти тағйирот",
    },
  }

  const t = translations[language]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Story settings updated")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 my-[120px] sm:my-[100px] md:my-[80px] lg:my-[60px] xl:my-[40px] 2xl:my-[50px]"
    >
      <h2 className="text-2xl font-semibold">{t.title}</h2>
      <div className="space-y-2">
        <Label htmlFor="allow-replies">{t.allowReplies}</Label>
        <Select value={allowReplies} onValueChange={setAllowReplies}>
          <SelectTrigger id="allow-replies">
            <SelectValue placeholder="Select who can reply" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="everyone">Everyone</SelectItem>
            <SelectItem value="followers">Followers</SelectItem>
            <SelectItem value="off">Off</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="allow-sharing">{t.allowSharing}</Label>
        <Switch id="allow-sharing" checked={allowSharing} onCheckedChange={setAllowSharing} />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="save-to-archive">{t.saveToArchive}</Label>
        <Switch id="save-to-archive" checked={saveToArchive} onCheckedChange={setSaveToArchive} />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="allow-group-stories">{t.allowGroupStories}</Label>
        <Switch id="allow-group-stories" checked={allowGroupStories} onCheckedChange={setAllowGroupStories} />
      </div>
      <Button type="submit">{t.saveChanges}</Button>
    </form>
  )
}

export default StorySettings

