"use client"

import { useState } from "react"
import { useSettings } from "./contexts/settings-contexts"
import { Label } from "@/shared/ui/label"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import type React from "react" // Added import for React
import { Textarea } from "@/shared/ui/textarea"

const AccountVerificationSettings = () => {
  const [fullName, setFullName] = useState("")
  const [knownAs, setKnownAs] = useState("")
  const [category, setCategory] = useState("")
  const [audience, setAudience] = useState("")
  const { language } = useSettings()

  const translations = {
    en: {
      title: "Account Verification",
      fullName: "Full Name",
      knownAs: "Known As",
      category: "Category",
      audience: "Audience",
      submitRequest: "Submit Verification Request",
    },
    ru: {
      title: "Верификация аккаунта",
      fullName: "Полное имя",
      knownAs: "Известен как",
      category: "Категория",
      audience: "Аудитория",
      submitRequest: "Отправить запрос на верификацию",
    },
    tg: {
      title: "Тасдиқи ҳисоб",
      fullName: "Номи пурра",
      knownAs: "Маъруф ҳамчун",
      category: "Категория",
      audience: "Аудитория",
      submitRequest: "Пешниҳоди дархости тасдиқ",
    },
  }

  const t = translations[language]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Verification request submitted")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 my-[120px] sm:my-[100px] md:my-[80px] lg:my-[60px] xl:my-[40px] 2xl:my-[50px]"
    >
      <h2 className="text-2xl font-semibold">{t.title}</h2>
      <div className="space-y-2">
        <Label htmlFor="full-name">{t.fullName}</Label>
        <Input id="full-name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="known-as">{t.knownAs}</Label>
        <Input id="known-as" value={knownAs} onChange={(e) => setKnownAs(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">{t.category}</Label>
        <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="audience">{t.audience}</Label>
        <Textarea id="audience" value={audience} onChange={(e) => setAudience(e.target.value)} />
      </div>
      <Button type="submit">{t.submitRequest}</Button>
    </form>
  )
}

export default AccountVerificationSettings

