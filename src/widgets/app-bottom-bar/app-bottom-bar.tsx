import React from "react";
import { FloatingDock } from "@/shared/ui/bottom-navigation";
import ProfileIcon, { CreateIcon, ExploreIcon, HomeIcon, MessageIcon, ReelsIcon } from "@/app/assets/icon/svg";

export default function AppBottomBar() {
  const links = [
    {
      title: "Home",
      icon: (
        <HomeIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },

    {
      title: "Explore",
      icon: (
        <ExploreIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/explore",
    },
    {
      title: "Reels",
      icon: (
        <ReelsIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/reels",
    },
    {
      title: "Create",
      icon: (
        <CreateIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
       
      ),
      href: "/create",
    },
    {
      title: "Messages",
      icon: (
        <MessageIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Profile",
      icon: (
        <ProfileIcon />
      ),
      href: "/profile",
    },
  ];
  return (
    <div className="flex items-center justify-center h-[35rem] w-full">
      <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}
