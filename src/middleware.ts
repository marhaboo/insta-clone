import { type NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  
  const allowedRoutes = [
    "/",
    "/chats",
    "/explore",
    "/profile",
    "/reels",
    "/create-post",
    "/settings",
    "/login",
    "/not-found",
  ];

  
  const isAllowed = allowedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  
  if (pathname.startsWith("/api") || pathname === "/login") {
    return NextResponse.next();
  }

  
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  
  if (!isAllowed) {
    return NextResponse.redirect(new URL("./app/(router)/(layout)/not-found/page.tsx", req.url));
  }

  return NextResponse.next();
}

// Применяем middleware к нужным маршрутам (учитываем динамические сегменты)
export const config = {
  matcher: [
    "/",
    "/chats/:path*",
    "/explore",
    "/profile/:path*",
    "/reels",
    "/create-post",
    "/settings",
  ],
};
