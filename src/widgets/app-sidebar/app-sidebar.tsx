import { useState } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/shared/ui/sidebar";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { InstagramLogoIcon, InstagramText } from "@/app/assets/icon/svg";
import { items } from "@/entities/navigation/data";
import Image from "next/image";
import Profile from "@/widgets/app-sidebar/profile.jpg";
import { useSettings } from "@/pages/(router)/(layout)/settings/contexts/settings-contexts";
import { SearchSidebar } from "../app-sheet/app-sheet";
import { Settings } from "lucide-react";

type Language = 'en' | 'ru' | 'tj';

export function AppSidebar() {
  const dispatch = useDispatch();
  const [isSearchSidebarOpen, setIsSearchSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { language }: { language: Language } = useSettings();

  const translations = {
    en: {
      home: "Home",
      search: "Search",
      explore: "Explore",
      reels: "Reels",
      messages: "Messages",
      notifications: "Notifications",
      create: "Create",
      profile: "Profile",
    },
    ru: {
      home: "Главная",
      search: "Поиск",
      explore: "Обзор",
      reels: "Ролики",
      messages: "Сообщения",
      notifications: "Уведомления",
      create: "Создать",
      profile: "Профиль",
    },
    tj: {
      home: "Асосӣ",
      search: "Ҷустуҷӯ",
      explore: "Кашф",
      reels: "Наворҳо",
      messages: "Паёмҳо",
      notifications: "Огоҳиномаҳо",
      create: "Эҷод кардан",
      profile: "Профил",
    },
  };

  const t = translations[language] || translations.tj;

  return (
    <Sidebar>
      <SidebarContent className={`transition-all duration-300 ${isSearchSidebarOpen ? 'w-[72px]' : 'w-full'}`}>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Sidebar Logo */}
              <SidebarMenuItem className="my-[4px] mb-[20px] md:p-[4px] xl:p-[25px_12px_16px_12px]">
                <SidebarMenuButton>
                  <Link href="/">
                    <div className="flex items-center gap-2">
                      {/* {isSearchSidebarOpen ? <InstagramLogoIcon /> : <InstagramText />} */}
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {items.map((item) => (
                <SidebarMenuItem className="my-[4px] p-[4px]" key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url || "#"} onClick={() => {
                      if (item.title === "Search") {
                        setIsSearchSidebarOpen(!isSearchSidebarOpen);
                      } else if (item.onClick) {
                        item.onClick();
                      }
                    }}>
                      <div className="flex items-center gap-2">
                        {pathname === item.url ? (
                          <item.activeIcon size={24} />
                        ) : (
                          <item.icon size={24} />
                        )}
                        <span className={`transition-all duration-300 ${isSearchSidebarOpen ? 'hidden' : 'xl:block md:hidden'}`}>
                          {t[item.title.toLowerCase() as keyof typeof t] || item.title}
                        </span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem className="my-[4px] p-[4px]">
                <SidebarMenuButton>
                  <Link href="/profile">
                    <div className="flex items-center gap-2">
                      <Image
                        className="rounded-full"
                        width={25}
                        height={25}
                        src={Profile}
                        alt="Profile"
                      />
                      <span className={`transition-all duration-300 ${isSearchSidebarOpen ? 'hidden' : 'xl:block md:hidden'}`}>{t.profile}</span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem className="my-[4px] p-[4px]">
                <SidebarMenuButton>
                  <Link href="/settings">
                    <div className="flex items-center gap-2">
                      <Settings />
                      <span className={`transition-all duration-300 ${isSearchSidebarOpen ? 'hidden' : 'xl:block md:hidden'}`}>Settings</span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {isSearchSidebarOpen && <SearchSidebar onClose={() => setIsSearchSidebarOpen(false)} />}
    </Sidebar>
  );
}