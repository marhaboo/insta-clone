"use client";

import { useSessionManagement } from "../../shared/utils/useSessionManagement";

export function SessionHandler({ children }: { children: React.ReactNode }) {
  const { isLoading, isRedirecting } = useSessionManagement();

  if (isLoading || isRedirecting) {
    return (
      <div className="loader">
        <h1>Loading...</h1>
      </div>
    );
  }

  return <>{children}</>;
}
