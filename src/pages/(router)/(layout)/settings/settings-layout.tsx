"use client"

import { useState } from "react"
import { useSettings } from "./contexts/settings-contexts"
import { Card, CardContent } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import NotificationSettings from "./notification-settings"
import PrivacySettings from "./privacy-settings"
import SecuritySettings from "./security-settings"
import LogoutSettings from "./logout-settings"
import CommentSettings from "./comment-settings"
import StorySettings from "./story-settings"
import CloseFriendsSettings from "./close-friends-settings"
import ActivityStatusSettings from "./activity-status-settings"
import AccountSettings from "./accaunt-settings"
import AppearanceSettings from "./appearence-settings"
import BlockedAccountsSettings from "./blocked-accaunt-settings"
import DataUsageSettings from "./data-usage"
import AccountVerificationSettings from "./accaunt-verification"
import DeleteAccountSettings from "./delete-accaunt"

const SettingsLayout = () => {
  const [activeTab, setActiveTab] = useState("account")
  const { language } = useSettings()

  const translations = {
    en: {
      settings: "Settings",
      account: "Account",
      appearance: "Appearance",
      notifications: "Notifications",
      privacy: "Privacy",
      security: "Security",
      blocked: "Blocked Accounts",
      comments: "Comments",
      story: "Story",
      data: "Data Usage",
      closeFriends: "Close Friends",
      activityStatus: "Activity Status",
      verification: "Verification",
      logout: "Logout",
      delete: "Delete Account",
    },
    ru: {
      settings: "Настройки",
      account: "Аккаунт",
      appearance: "Внешний вид",
      notifications: "Уведомления",
      privacy: "Конфиденциальность",
      security: "Безопасность",
      blocked: "Заблокированные аккаунты",
      comments: "Комментарии",
      story: "История",
      data: "Использование данных",
      closeFriends: "Близкие друзья",
      activityStatus: "Статус активности",
      verification: "Подтверждение аккаунта",
      logout: "Выйти",
      delete: "Удалить аккаунт",
    },
    tg: {
      settings: "Танзимот",
      account: "Ҳисоб",
      appearance: "Намуди зоҳирӣ",
      notifications: "Огоҳиҳо",
      privacy: "Махфият",
      security: "Амният",
      blocked: "Ҳисобҳои манъшуда",
      comments: "Шарҳҳо",
      story: "Ҳикоя",
      data: "Истифодаи маълумот",
      closeFriends: "Дӯстон наздик",
      activityStatus: "Вазъияти фаъолият",
      verification: "Тасдиқи ҳисоб",
      logout: "Баромадан",
      delete: "Нест кардани ҳисоб",
    },
  }

  const t = translations[language]

  const tabs = [
    { key: "account", label: t.account, component: <AccountSettings /> },
    { key: "appearance", label: t.appearance, component: <AppearanceSettings /> },
    { key: "notifications", label: t.notifications, component: <NotificationSettings /> },
    { key: "privacy", label: t.privacy, component: <PrivacySettings /> },
    { key: "security", label: t.security, component: <SecuritySettings /> },
    { key: "blocked", label: t.blocked, component: <BlockedAccountsSettings /> },
    { key: "comments", label: t.comments, component: <CommentSettings /> },
    { key: "story", label: t.story, component: <StorySettings /> },
    { key: "data", label: t.data, component: <DataUsageSettings /> },
    { key: "closeFriends", label: t.closeFriends, component: <CloseFriendsSettings /> },
    { key: "activityStatus", label: t.activityStatus, component: <ActivityStatusSettings /> },
    { key: "verification", label: t.verification, component: <AccountVerificationSettings /> },
    { key: "logout", label: t.logout, component: <LogoutSettings /> },
    { key: "delete", label: t.delete, component: <DeleteAccountSettings /> },
  ]

  return (
    <div className="container px-4 py-1 flex h-[100vh] max-w-4xl">
      <Card className="w-1/3 space-y-2 border-r pr-2 bg-white dark:bg-neutral-900 shadow-md rounded-lg p-4">
        <h1 className="text-xl font-semibold mb-4 text-black dark:text-white">{t.settings}</h1>
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            variant={activeTab === tab.key ? "default" : "ghost"}
            className={`w-full text-left text-base py-3 transition-all duration-300 rounded-lg ${
              activeTab === tab.key
                ? "bg-gray-200 dark:bg-neutral-800 text-black dark:text-white font-semibold"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700"
            }`}
          >
            {tab.label}
          </Button>
        ))}
      </Card>
      <Card className="w-2/3 bg-white dark:bg-neutral-900 shadow-md rounded-lg p-6 ml-2 overflow-y-auto">
        <CardContent>
          {tabs.find((tab) => tab.key === activeTab)?.component}
        </CardContent>
      </Card>
    </div>
  )
}

export default SettingsLayout
