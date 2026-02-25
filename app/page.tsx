"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/lib/onboarding/context";

export default function Home() {
  const { state, isLoaded } = useOnboarding();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (state.phase === "welcome") {
      router.replace("/welcome");
    } else if (state.phase === "setup") {
      router.replace("/setup");
    } else {
      router.replace("/marketing/messages");
    }
  }, [isLoaded, state.phase, router]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#F5F8FA]">
      <div className="w-8 h-8 border-2 border-[#00A4BD] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
