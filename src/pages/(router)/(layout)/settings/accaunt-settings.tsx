"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSettings } from "./contexts/settings-contexts"
import { Label } from "@/shared/ui/label"
import { Button } from "@/shared/ui/button"
import { getToken } from "@/shared/utils/token"
import { JwtPayload } from "jwt-decode"
import { Input } from "@/shared/ui/input"
import { useDispatch } from "react-redux"
import { editAccount } from "@/entities/settings/api/page"
import { AppDispatch } from "@/app/store/store"

interface CustomJwtPayload extends JwtPayload {
  name?: string
  email?: string
  sid?: string
}

const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
})

const AccountSettings = () => {
  const token: CustomJwtPayload | undefined = getToken()
  
  const dispatch = useDispatch<AppDispatch>()
  const { language } = useSettings()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: token?.name || "",
      email: token?.email || "",
    },
  })

  const translations = {
    en: {
      userImage: "User Image",
      username: "Username",
      email: "Email",
      saveChanges: "Save Changes",
    },
    ru: {
      userImage: "Изображение пользователя",
      username: "Имя пользователя",
      email: "Электронная почта",
      saveChanges: "Сохранить изменения",
    },
    tg: {
      userImage: "",
      username: "Номи корбар",
      email: "Почтаи электронӣ",
      saveChanges: "Сабти тағйирот",
    },
  }

  const t = translations[language]

  const onSubmit = (data: FormData) => {
    dispatch(editAccount({ ...token, sid: token?.sid, ...data }))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-[120px] sm:my-[100px] md:my-[80px] lg:my-[60px] xl:my-[40px] 2xl:my-0 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="space-y-2">
        <Label htmlFor="username">{t.username}</Label>
        <Input id="username" {...register("username")} />
        {errors.username && <p className="text-red-500">{String(errors.username.message)}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">{t.email}</Label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email && <p className="text-red-500">{String(errors.email.message)}</p>}
      </div>

      <Button type="submit" className="w-full sm:w-auto">{t.saveChanges}</Button>
    </form>
  )
}

export default AccountSettings
