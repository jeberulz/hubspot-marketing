"use client";

import { useOnboarding } from "@/lib/onboarding/context";
import { MILESTONE_LABELS, TOTAL_MILESTONES } from "@/lib/onboarding/constants";
import type { MilestoneKey } from "@/lib/onboarding/types";
import { ProgressRing } from "./ProgressRing";
import { Check, ChevronRight } from "lucide-react";

interface ChecklistProps {
  onAction?: (milestone: MilestoneKey) => void;
}

export function GettingStartedChecklist({ onAction }: ChecklistProps) {
  const { state, completedMilestoneCount } = useOnboarding();
  const milestoneKeys = Object.keys(MILESTONE_LABELS) as MilestoneKey[];

  return (
    <div className="bg-white border border-[#EAF0F6] rounded-lg p-6 shadow-sm mb-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-[#33475B]">
            Getting started
          </h2>
          <p className="text-sm text-[#516F90] mt-0.5">
            Complete these to unlock your full dashboard.
          </p>
        </div>
        <ProgressRing completed={completedMilestoneCount} total={TOTAL_MILESTONES} />
      </div>

      {/* Checklist items */}
      <div className="space-y-1">
        {milestoneKeys.map((key) => {
          const milestone = MILESTONE_LABELS[key];
          const isComplete = state.milestones[key];

          return (
            <div
              key={key}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                isComplete
                  ? "bg-[#F5F8FA]/50"
                  : "hover:bg-[#F5F8FA] cursor-pointer"
              }`}
              onClick={() => !isComplete && onAction?.(key)}
              role={isComplete ? undefined : "button"}
              tabIndex={isComplete ? undefined : 0}
              onKeyDown={(e) => {
                if (!isComplete && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  onAction?.(key);
                }
              }}
            >
              {/* Checkbox */}
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  isComplete
                    ? "bg-[#00BDA5] border-[#00BDA5]"
                    : "border-[#cbd6e2]"
                }`}
              >
                {isComplete && (
                  <Check
                    size={12}
                    strokeWidth={2.5}
                    className="text-white animate-check-bounce"
                  />
                )}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div
                  className={`text-sm font-medium ${
                    isComplete
                      ? "text-[#516F90] line-through"
                      : "text-[#33475B]"
                  }`}
                >
                  {milestone.title}
                </div>
                {!isComplete && (
                  <div className="text-xs text-[#516F90] mt-0.5">
                    {milestone.description}
                  </div>
                )}
              </div>

              {/* CTA arrow */}
              {!isComplete && (
                <ChevronRight
                  size={16}
                  className="text-[#cbd6e2] shrink-0"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
