"use client"

import { useState } from "react"
import { useSettings } from "./contexts/settings-contexts"
import { Label } from "@/shared/ui/label"
import { Switch } from "@/shared/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { Button } from "@/shared/ui/button"

const CommentSettings = () => {
  const [allowComments, setAllowComments] = useState(true)
  const [commentFilter, setCommentFilter] = useState("low")
  const [hideOffensive, setHideOffensive] = useState(true)
  const { language } = useSettings()

  const translations = {
    en: {
      title: "Comment Settings",
      allowComments: "Allow comments",
      commentFilter: "Comment filter",
      hideOffensive: "Hide offensive comments",
      saveChanges: "Save Changes",
    },
    ru: {
      title: "Настройки комментариев",
      allowComments: "Разрешить комментарии",
      commentFilter: "Фильтр комментариев",
      hideOffensive: "Скрывать оскорбительные комментарии",
      saveChanges: "Сохранить изменения",
    },
    tg: {
      title: "Танзимоти шарҳҳо",
      allowComments: "Иҷозати шарҳҳо",
      commentFilter: "Филтри шарҳҳо",
      hideOffensive: "Пинҳон кардани шарҳҳои таҳқиромез",
      saveChanges: "Сабти тағйирот",
    },
  }

  const t = translations[language]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Comment settings updated")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 my-[120px] sm:my-[100px] md:my-[80px] lg:my-[60px] xl:my-[40px] 2xl:my-[50px]"
    >
      <h2 className="text-2xl font-semibold">{t.title}</h2>
      <div className="flex items-center justify-between">
        <Label htmlFor="allow-comments">{t.allowComments}</Label>
        <Switch id="allow-comments" checked={allowComments} onCheckedChange={setAllowComments} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="comment-filter">{t.commentFilter}</Label>
        <Select value={commentFilter} onValueChange={setCommentFilter}>
          <SelectTrigger id="comment-filter">
            <SelectValue placeholder="Select filter level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="off">Off</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="hide-offensive">{t.hideOffensive}</Label>
        <Switch id="hide-offensive" checked={hideOffensive} onCheckedChange={setHideOffensive} />
      </div>
      <Button type="submit">{t.saveChanges}</Button>
    </form>
  )
}

export default CommentSettings

