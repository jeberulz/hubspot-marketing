"use client";

import { Mail } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

export default function AllEmailsPage() {
  return (
    <div className="p-10 flex-1 flex flex-col max-w-[1400px] w-full mx-auto">
      <div className="flex-1 flex items-center justify-center">
        <EmptyState
          icon={Mail}
          title="No emails yet"
          description="Create your first email campaign to see AI-powered optimization scores here."
          actionLabel="Create email"
        />
      </div>
    </div>
  );
}
