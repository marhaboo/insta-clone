"use client"

import { Button } from "@/shared/ui/button"
import { useSettings } from "./contexts/settings-contexts"
import { destroyToken } from "@/shared/utils/token"
import { useRouter } from "next/navigation"

const LogoutSettings = () => {
  const { language } = useSettings()

  const translations = {
    en: {
      title: "Log out",
      description: "Are you sure you want to log out?",
      logoutButton: "Log out",
    },
    ru: {
      title: "Выйти",
      description: "Вы уверены, что хотите выйти?",
      logoutButton: "Выйти",
    },
    tg: {
      title: "Баромадан",
      description: "Шумо мутмаин ҳастед, ки мехоҳед бароед?",
      logoutButton: "Баромадан",
    },
  }

  const t = translations[language]
  const router = useRouter();

  const handleLogout = () => {
    destroyToken()
    router.push("/login")
    console.log("User logged out")
  }

  return (
    <div className="flex flex-col items-center space-y-6 p-6 my-[120px] sm:my-[100px] md:my-[80px] lg:my-[60px] xl:my-[40px] 2xl:my-[50px]">
      <h2 className="text-lg font-bold text-neutral-900 dark:text-white">{t.title}</h2>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">{t.description}</p>
      <Button 
        onClick={handleLogout} 
        className="w-full max-w-xs bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-all"
      >
        {t.logoutButton}
      </Button>
    </div>
  )
}

export default LogoutSettings
