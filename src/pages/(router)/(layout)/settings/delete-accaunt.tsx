"use client"

import { useState } from "react"
import { useSettings } from "./contexts/settings-contexts"
import { Label } from "@/shared/ui/label"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { useDispatch } from "react-redux"
import { deleteAccount } from "@/entities/settings/api/page"
import { getToken } from "@/shared/utils/token"
import { JwtPayload } from "jwt-decode"
import { AppDispatch } from "@/app/store/store"
import { useRouter } from "next/navigation"

const DeleteAccountSettings = () => {
  const [confirmText, setConfirmText] = useState("")
  const { language } = useSettings()

  const translations = {
    en: {
      title: "Delete Account",
      description:
        "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
      confirmPrompt: 'To confirm, type "DELETE" below:',
      deleteButton: "Permanently delete my account",
    },
    ru: {
      title: "Удалить аккаунт",
      description:
        "Это действие нельзя отменить. Оно навсегда удалит ваш аккаунт и удалит ваши данные с наших серверов.",
      confirmPrompt: 'Для подтверждения введите "УДАЛИТЬ" ниже:',
      deleteButton: "Навсегда удалить мой аккаунт",
    },
    tg: {
      title: "Нест кардани ҳисоб",
      description:
        "Ин амалро бекор кардан мумкин нест. Ин ҳисоби шуморо пурра нест мекунад ва маълумоти шуморо аз серверҳои мо нест мекунад.",
      confirmPrompt: 'Барои тасдиқ, "НЕСТ КАРДАН" -ро дар поён нависед:',
      deleteButton: "Ҳисоби маро пурра нест кунед",
    },
  }
  const router = useRouter();
  const t = translations[language]
  const dispatch = useDispatch<AppDispatch>();
  interface CustomJwtPayload extends JwtPayload {
    name?: string;
    email?: string;
    sid?: string;
  }

  const token: CustomJwtPayload | undefined = getToken();

  const handleDeleteAccount = () => {
    if (confirmText === "DELETE") {
      dispatch(deleteAccount(token?.sid as string))
      console.log("Account deleted")
      router.push("/registration");
    } else {
      console.log("Confirmation text does not match")
    }
  }

  return (
    <div className="space-y-4 my-[120px] sm:my-[100px] md:my-[80px] lg:my-[60px] xl:my-[40px] 2xl:my-[50px]">
      <h2 className="text-2xl font-semibold">{t.title}</h2>
      <p className="text-red-500">{t.description}</p>
      <div className="space-y-2">
        <Label htmlFor="confirm-delete">{t.confirmPrompt}</Label>
        <Input id="confirm-delete" value={confirmText} onChange={(e) => setConfirmText(e.target.value)} />
      </div>
      <Button onClick={handleDeleteAccount} disabled={confirmText !== "DELETE"} variant="destructive">
        {t.deleteButton}
      </Button>
    </div>
  )
}

export default DeleteAccountSettings

