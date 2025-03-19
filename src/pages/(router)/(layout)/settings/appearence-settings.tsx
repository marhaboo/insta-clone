"use client"

import { Label } from "@/shared/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { Switch } from "@/shared/ui/switch"
import { useSettings } from "./contexts/settings-contexts"


const AppearanceSettings = () => {
  const { darkMode, setDarkMode, language, setLanguage } = useSettings()

  return (
    <div className="space-y-4 my-[120px] sm:my-[100px] md:my-[80px] lg:my-[60px] xl:my-[40px] 2xl:my-[50px]">
      <div className="flex items-center justify-between">
        <Label htmlFor="dark-mode">Dark Mode</Label>
        <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="language">Language</Label>
        <Select value={language} onValueChange={(value: "en" | "ru" | "tg") => setLanguage(value)}>
          <SelectTrigger id="language">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ru">Русский</SelectItem>
            <SelectItem value="tg">Тоҷикӣ</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default AppearanceSettings

