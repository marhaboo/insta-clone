'use client';

import "@/app/styles/globals.css";
import type React from "react";
import { SettingsProvider } from "@/pages/(router)/(layout)/settings/contexts/settings-contexts";
import { Providers } from "./(router)/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <SettingsProvider>{children}</SettingsProvider>
        </Providers>
      </body>
    </html>
  );
}