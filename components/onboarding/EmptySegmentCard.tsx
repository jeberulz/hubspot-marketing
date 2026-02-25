"use client";

import { Plus, Sparkles } from "lucide-react";

interface EmptySegmentCardProps {
  variant?: "create" | "ai-preview";
  onClick?: () => void;
}

export function EmptySegmentCard({
  variant = "create",
  onClick,
}: EmptySegmentCardProps) {
  if (variant === "ai-preview") {
    return (
      <div className="bg-[#F0F1FA]/50 border-2 border-dashed border-[#D4D2F0] rounded-lg p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
        <div className="w-10 h-10 rounded-full bg-[#F0F1FA] flex items-center justify-center mb-3">
          <Sparkles size={20} className="text-[#6C63FF]" />
        </div>
        <div className="text-sm font-semibold text-[#33475B] mb-1">
          AI-powered insights
        </div>
        <div className="text-xs text-[#516F90] max-w-[200px]">
          Create segments to unlock AI messaging health analysis.
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className="bg-white border-2 border-dashed border-[#cbd6e2] rounded-lg p-6 flex flex-col items-center justify-center text-center min-h-[200px] hover:border-[#00A4BD] hover:bg-[#00A4BD]/5 transition-all group cursor-pointer"
    >
      <div className="w-10 h-10 rounded-full bg-[#F5F8FA] group-hover:bg-[#00A4BD]/10 flex items-center justify-center mb-3 transition-colors">
        <Plus
          size={20}
          className="text-[#cbd6e2] group-hover:text-[#00A4BD] transition-colors"
        />
      </div>
      <div className="text-sm font-semibold text-[#33475B] mb-1">
        Create a segment
      </div>
      <div className="text-xs text-[#516F90] max-w-[200px]">
        Group contacts by behavior or attributes to track messaging health.
      </div>
    </button>
  );
}
