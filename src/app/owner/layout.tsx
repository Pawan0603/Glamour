import { ReactNode } from "react";
import { OwnerSidebar } from "@/components/owner/OwnerSidebar";
import { SalonProvider } from "@/lib/contexts/SalonContext";

interface OwnerLayoutProps {
  children: ReactNode;
}

export default function OwnerLayout({ children }: OwnerLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex w-full">
      <SalonProvider>
        <OwnerSidebar />
        <main className="flex-1 lg:p-8 p-4 pt-20 lg:pt-8 overflow-x-hidden">
          {children}
        </main>
      </SalonProvider>
    </div>
  );
}