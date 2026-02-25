"use client";

import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { useOnboarding } from "@/lib/onboarding/context";
import { MILESTONE_LABELS, TOTAL_MILESTONES } from "@/lib/onboarding/constants";
import type { MilestoneKey } from "@/lib/onboarding/types";
import { useToast } from "@/components/ui/Toast";

export function MilestoneWatcher() {
  const { state, completedMilestoneCount } = useOnboarding();
  const { showToast } = useToast();
  const prevMilestones = useRef(state.milestones);

  useEffect(() => {
    const prev = prevMilestones.current;
    const curr = state.milestones;

    // Check which milestone just changed
    for (const key of Object.keys(curr) as MilestoneKey[]) {
      if (!prev[key] && curr[key]) {
        const label = MILESTONE_LABELS[key];
        showToast(
          `${label.title} complete! (${completedMilestoneCount}/${TOTAL_MILESTONES})`,
          "success"
        );
      }
    }

    prevMilestones.current = curr;
  }, [state.milestones, completedMilestoneCount, showToast]);

  // Check for all milestones complete
  useEffect(() => {
    if (completedMilestoneCount === TOTAL_MILESTONES && state.phase === "proficient") {
      showToast(
        "You've completed all getting started tasks! Your full dashboard is now unlocked.",
        "success"
      );
    }
  }, [completedMilestoneCount, state.phase, showToast]);

  return null;
}

// Standalone visual milestone toast for special occasions (unused now but available)
export function MilestoneToastCard({
  milestone,
  completed,
  total,
}: {
  milestone: string;
  completed: number;
  total: number;
}) {
  return (
    <div className="flex items-center gap-3 bg-white border border-emerald-200 rounded-lg px-4 py-3 shadow-lg animate-toast-in">
      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center animate-check-bounce">
        <Check size={16} strokeWidth={2.5} className="text-emerald-600" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold text-[#33475B]">{milestone}</div>
        <div className="text-xs text-[#516F90]">
          {completed} of {total} complete
        </div>
      </div>
    </div>
  );
}
