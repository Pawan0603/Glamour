import { ReactNode } from "react";
import { OwnerSidebar } from "./OwnerSidebar";

interface OwnerLayoutProps {
  children: ReactNode;
}

export function OwnerLayout({ children }: OwnerLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex w-full">
      <OwnerSidebar />
      <main className="flex-1 lg:p-8 p-4 pt-20 lg:pt-8 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
