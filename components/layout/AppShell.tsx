"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 bg-[#F5F8FA]">
        <TopNav />
        <div className="flex-1 overflow-y-auto flex flex-col">{children}</div>
      </main>
    </>
  );
}
