import { CreateIcon, ExploreActiveIcon, ExploreIcon, HomeIcon, HomeIconActive, MessageActiveIcon, MessageIcon, NotificationActiveIcon, NotificationIcon, ReelsActiveIcon, ReelsIcon, SearchIconActive } from "@/app/assets/icon/svg";
import { SidebarItem } from "./model/types";

export const items: SidebarItem[] = [
  {
    title: "Home",
    url: "/",
    icon: HomeIcon,
    activeIcon: HomeIconActive,
  },
  {
    title: "Search",
    icon: SearchIconActive,
    activeIcon: SearchIconActive,
    // onClick: () => {
    //   setIsSearchModalOpen(true); // Open modal when Search is clicked
    // },
  },
  {
    title: "Explore",
    url: "/explore",
    icon: ExploreIcon,
    activeIcon: ExploreActiveIcon,
  },
  {
    title: "Reels",
    url: "/reels",
    icon: ReelsIcon,
    activeIcon: ReelsActiveIcon,
  },
  {
    title: "Messages",
    url: "/chats",
    icon: MessageIcon,
    activeIcon: MessageActiveIcon,
  },
  {
    title: "Notifications",
    icon: NotificationIcon,
    activeIcon: NotificationActiveIcon,
  },
  {
    title: "Create",
    icon: CreateIcon,
    // onClick: () => {
    //   dispatch(setOpenDialog(true)); 
    //   console.log("create");
    // },
  },
];