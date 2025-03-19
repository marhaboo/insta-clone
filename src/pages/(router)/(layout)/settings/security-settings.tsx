"use client"

import { useState } from "react"
import { useSettings } from "./contexts/settings-contexts"
import { Label } from "@/shared/ui/label"
import { Switch } from "@/shared/ui/switch"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { getToken } from "@/shared/utils/token"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/app/store/store"
import { JwtPayload } from "jwt-decode"
import { securitySettings } from "@/entities/settings/api/page"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

interface CustomJwtPayload extends JwtPayload {
  name?: string;
  email?: string;
  sid?: string;
}

const schema = z.object({
  currentPassword: z.string().min(6, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password must match new password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

const SecuritySettings = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  })
  
  const [twoFactor, setTwoFactor] = useState(false)
  const [loginAlerts, setLoginAlerts] = useState(true)
  const { language } = useSettings()
  const token: CustomJwtPayload | undefined = getToken();
  console.log(token);

  const dispatch = useDispatch<AppDispatch>();

  const translations = {
    en: {
      twoFactor: "Two-factor authentication",
      loginAlerts: "Login alerts",
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmPassword: "Confirm New Password",
      updatePassword: "Update Password",
    },
    ru: {
      twoFactor: "Двухфакторная аутентификация",
      loginAlerts: "Оповещения о входе",
      currentPassword: "Текущий пароль",
      newPassword: "Новый пароль",
      confirmPassword: "Подтвердите новый пароль",
      updatePassword: "Обновить пароль",
    },
    tg: {
      twoFactor: "Тасдиқи дуомила",
      loginAlerts: "Огоҳиҳои воридшавӣ",
      currentPassword: "Рамзи ҷорӣ",
      newPassword: "Рамзи нав",
      confirmPassword: "Тасдиқи рамзи нав",
      updatePassword: "Навсозии рамз",
    },
  }

  const t = translations[language]

  const onSubmit = (data: any) => {
    dispatch(securitySettings(data))
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-[120px] sm:my-[100px] md:my-[80px] lg:my-[60px] xl:my-[40px] 2xl:my-[50px]">
      <div className="flex items-center justify-between">
        <Label htmlFor="two-factor">{t.twoFactor}</Label>
        <Switch id="two-factor" checked={twoFactor} onCheckedChange={setTwoFactor} />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="login-alerts">{t.loginAlerts}</Label>
        <Switch id="login-alerts" checked={loginAlerts} onCheckedChange={setLoginAlerts} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="current-password">{t.currentPassword}</Label>
        <Input id="current-password" type="password" {...register("currentPassword")} />
        {errors.confirmPassword?.message && <p className="text-red-500">{String(errors.confirmPassword.message)}</p>}

      </div>
      <div className="space-y-2">
        <Label htmlFor="new-password">{t.newPassword}</Label>
        <Input id="new-password" type="password" {...register("newPassword")} />
        {errors.newPassword?.message && <p className="text-red-500">{String(errors.newPassword.message)}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">{t.confirmPassword}</Label>
        <Input id="confirm-password" type="password" {...register("confirmPassword")} />
        {errors.confirmPassword?.message && <p className="text-red-500">{String(errors.confirmPassword.message)}</p>}
      </div>
      <Button type="submit">{t.updatePassword}</Button>
    </form>
  )
}

export default SecuritySettings
