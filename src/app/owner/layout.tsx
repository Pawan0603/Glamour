import { ReactNode } from "react";
import { OwnerSidebar } from "@/components/owner/OwnerSidebar";

interface OwnerLayoutProps {
  children: ReactNode;
}

export default function OwnerLayout({ children }: OwnerLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex w-full">
      {/* Sidebar */}
      <OwnerSidebar />

      {/* Page Content */}
      <main className="flex-1 lg:p-8 p-4 pt-20 lg:pt-8 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}