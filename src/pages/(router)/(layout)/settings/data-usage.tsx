"use client"

import { useState } from "react"
import { useSettings } from "./contexts/settings-contexts"
import { Label } from "@/shared/ui/label"
import { Switch } from "@/shared/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { Button } from "@/shared/ui/button"

const DataUsageSettings = () => {
  const [useHighQualityImages, setUseHighQualityImages] = useState(true)
  const [preloadVideos, setPreloadVideos] = useState("wifi-only")
  const [autoplayVideos, setAutoplayVideos] = useState("always")
  const { language } = useSettings()

  const translations = {
    en: {
      title: "Data Usage & Autoplay",
      highQualityImages: "Use high quality images",
      preloadVideos: "Preload videos",
      autoplayVideos: "Autoplay videos",
      saveChanges: "Save Changes",
    },
    ru: {
      title: "Использование данных и автовоспроизведение",
      highQualityImages: "Использовать изображения высокого качества",
      preloadVideos: "Предзагрузка видео",
      autoplayVideos: "Автовоспроизведение видео",
      saveChanges: "Сохранить изменения",
    },
    tg: {
      title: "Истифодаи маълумот ва пахши худкор",
      highQualityImages: "Истифодаи тасвирҳои баландсифат",
      preloadVideos: "Пешборгирии видеоҳо",
      autoplayVideos: "Пахши худкори видеоҳо",
      saveChanges: "Сабти тағйирот",
    },
  }

  const t = translations[language]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Data usage settings updated")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 my-[120px] sm:my-[100px] md:my-[80px] lg:my-[60px] xl:my-[40px] 2xl:my-[50px]"
    >
      <h2 className="text-2xl font-semibold">{t.title}</h2>
      <div className="flex items-center justify-between">
        <Label htmlFor="high-quality-images">{t.highQualityImages}</Label>
        <Switch id="high-quality-images" checked={useHighQualityImages} onCheckedChange={setUseHighQualityImages} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="preload-videos">{t.preloadVideos}</Label>
        <Select value={preloadVideos} onValueChange={setPreloadVideos}>
          <SelectTrigger id="preload-videos">
            <SelectValue placeholder="Select preload option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="always">Always</SelectItem>
            <SelectItem value="wifi-only">Wi-Fi only</SelectItem>
            <SelectItem value="never">Never</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="autoplay-videos">{t.autoplayVideos}</Label>
        <Select value={autoplayVideos} onValueChange={setAutoplayVideos}>
          <SelectTrigger id="autoplay-videos">
            <SelectValue placeholder="Select autoplay option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="always">Always</SelectItem>
            <SelectItem value="wifi-only">Wi-Fi only</SelectItem>
            <SelectItem value="never">Never</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">{t.saveChanges}</Button>
    </form>
  )
}

export default DataUsageSettings

