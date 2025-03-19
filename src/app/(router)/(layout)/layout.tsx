"use client";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar";
import AppBottomBar from "@/widgets/app-bottom-bar/app-bottom-bar";
import { AppSidebar } from "@/widgets/app-sidebar/app-sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <>
          {children}
          <AppBottomBar />
        </>
      ) : (
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      )}
    </>
  );
}
