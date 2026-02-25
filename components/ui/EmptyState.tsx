"use client";

import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  secondaryLabel?: string;
  onSecondaryAction?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
  secondaryLabel,
  onSecondaryAction,
}: EmptyStateProps) {
  const ActionTag = actionHref ? "a" : "button";

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-[#F5F8FA] flex items-center justify-center mb-4">
        <Icon size={28} strokeWidth={1.5} className="text-[#cbd6e2]" />
      </div>
      <h3 className="text-lg font-semibold text-[#33475B] mb-1.5">{title}</h3>
      <p className="text-sm text-[#516F90] max-w-sm mb-6">{description}</p>
      <div className="flex items-center gap-4">
        {actionLabel && (
          <ActionTag
            onClick={onAction}
            href={actionHref}
            className="px-5 py-2.5 bg-[#FF7A59] hover:bg-[#e86c4f] text-white text-sm font-medium rounded-lg transition-colors"
          >
            {actionLabel}
          </ActionTag>
        )}
        {secondaryLabel && (
          <button
            onClick={onSecondaryAction}
            className="text-sm font-medium text-[#00A4BD] hover:text-[#00899e] transition-colors"
          >
            {secondaryLabel}
          </button>
        )}
      </div>
    </div>
  );
}
