"use client";

import { useOnboarding } from "@/lib/onboarding/context";
import { Sparkles, X } from "lucide-react";
import { useState } from "react";

export function WelcomeBanner() {
  const { state, completedMilestoneCount } = useOnboarding();
  const [dismissed, setDismissed] = useState(false);
  const firstName = state.profile.firstName;

  if (dismissed) return null;

  // Compact strip for exploring phase
  if (state.phase === "exploring") {
    return (
      <div className="bg-white border border-[#EAF0F6] rounded-md px-4 py-2.5 flex items-center justify-between mb-6 animate-fade-in">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#FF7A59]/10 flex items-center justify-center">
            <Sparkles size={12} className="text-[#FF7A59]" />
          </div>
          <span className="text-sm text-[#33475B]">
            <span className="font-semibold">{completedMilestoneCount} of 5</span>{" "}
            getting started tasks complete.
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-[#cbd6e2] hover:text-[#516F90] transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  // Full banner for first-actions phase
  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex justify-between items-start">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-[#33475B] mb-2">
            {firstName
              ? `Welcome back, ${firstName}!`
              : "Welcome to Message Strategy"}
          </h1>
          <p className="text-base text-[#516F90]">
            Complete a few steps to unlock your full dashboard and AI-powered
            messaging insights.
          </p>
        </div>
      </div>
    </div>
  );
}
