import SettingsLayout from "@/pages/(router)/(layout)/settings/settings-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Settings Instagram",
    description: "Instagram settings page",
}

export default function SettingsPage() {
    return <SettingsLayout />

}

