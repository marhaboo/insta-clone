
"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

export const useSessionManagement = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === "undefined") return


    if (pathname === "/login") {
      setIsLoading(false)
      setIsRedirecting(false)
      return
    }

    const token = localStorage.getItem("access_token")
    if (!token) {
      setIsRedirecting(true)
      router.replace("/login")
      return
    }

    const activeTab = sessionStorage.getItem("activeTab")
    const lastUnload = localStorage.getItem("lastUnload")
    const now = Date.now()

    if (!activeTab) {
      if (lastUnload && now - Number(lastUnload) < 2000) {
        sessionStorage.setItem("activeTab", "true")
      } else {
        localStorage.removeItem("access_token")
        setIsRedirecting(true)
        router.replace("/login")
        return
      }
    }

    setIsLoading(false)
    setIsRedirecting(false)

    const handleBeforeUnload = () => {
      localStorage.setItem("lastUnload", Date.now().toString())
    }
    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [router, pathname])

  return { isLoading, isRedirecting }
}
