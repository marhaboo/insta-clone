export type SidebarItem = {
  title: string;
  url?: string;
  icon: React.FC;
  activeIcon?: React.FC;
  onClick?: () => void;
};