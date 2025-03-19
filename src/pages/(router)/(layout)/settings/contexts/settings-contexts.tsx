"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "ru" | "tg"

interface SettingsContextType {
  darkMode: boolean
  setDarkMode: (darkMode: boolean) => void
  language: Language
  setLanguage: (language: Language) => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode")
    const storedLanguage = localStorage.getItem("language") as Language

    if (storedDarkMode !== null) {
      setDarkMode(JSON.parse(storedDarkMode))
    }

    if (storedLanguage) {
      setLanguage(storedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
    localStorage.setItem("language", language)

    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode, language])


  

  return (
    <SettingsContext.Provider value={{ darkMode, setDarkMode, language, setLanguage }}>
      {children}
    </SettingsContext.Provider>
  )
}

