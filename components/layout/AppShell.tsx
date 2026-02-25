"use client";

import { useOnboarding } from "@/lib/onboarding/context";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { AiOnboardingChat } from "@/components/onboarding/AiOnboardingChat";
import { MilestoneWatcher } from "@/components/onboarding/MilestoneToast";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { state, isLoaded } = useOnboarding();

  // Don't render anything until localStorage state is loaded to avoid flash
  if (!isLoaded) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#F5F8FA]">
        <div className="w-8 h-8 border-2 border-[#00A4BD] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isImmersive = state.phase === "welcome" || state.phase === "setup";

  if (isImmersive) {
    return <main className="h-screen w-screen overflow-hidden">{children}</main>;
  }

  return (
    <>
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 bg-[#F5F8FA]">
        <TopNav />
        <div className="flex-1 overflow-y-auto flex flex-col">{children}</div>
      </main>
      <AiOnboardingChat />
      <MilestoneWatcher />
    </>
  );
}
