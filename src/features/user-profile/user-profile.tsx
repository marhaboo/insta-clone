"use client"

import ProfileUser from "@/shared/ui/profile-user";
import { jwtDecode } from "jwt-decode";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface DecodedToken {
  sub?: string;
  name?: string;
  email?: string;
}

export default function UserProfile() {
  const router = useRouter();
  const [decoded, setDecoded] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      // Удаляем кавычки, если они есть
      const trimmedToken = token.startsWith('"') && token.endsWith('"')
        ? token.slice(1, -1)
        : token;

      try {
        const decodedToken = jwtDecode<DecodedToken>(trimmedToken);
        setDecoded(decodedToken);
      } catch (e) {
        console.error("Ошибка декодирования токена:", e);
      }
    }
  }, []);

  return (
    <div onClick={() => router.push("/profile")}>
      <ProfileUser
        size="md"
        img={decoded?.sub || ""}
        userName={decoded?.name || ""}
        userNickname={decoded?.email || ""}
      />
    </div>
  );
}
