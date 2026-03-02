"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";

export function MarketingNav() {
  const pathname = usePathname();

  const isStrategy =
    pathname === "/marketing/messages" ||
    pathname.startsWith("/marketing/messages/segment");
  const isAllEmails = pathname === "/marketing/messages/emails";
  const isAIOptimize = pathname === "/marketing/messages/ai-optimize";

  return (
    <div className="bg-white border-b border-[#cbd6e2]/60 pt-4 px-10 shrink-0">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-medium text-[#516F90] uppercase tracking-wider">
          Marketing
        </span>
        <ChevronRight size={12} className="text-[#cbd6e2]" />
        <span className="text-xs font-medium text-[#33475B] uppercase tracking-wider">
          Messages
        </span>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-8">
        <Link
          href="/marketing/messages"
          className={`pb-3 font-semibold text-sm flex items-center gap-2 border-b-2 ${
            isStrategy
              ? "border-[#00A4BD] text-[#33475B]"
              : "border-transparent text-[#516F90] hover:text-[#33475B]"
          } transition-colors`}
        >
          Strategy
          <span className="bg-purple-100 text-purple-700 text-xs px-1.5 py-0.5 rounded font-semibold tracking-wide">
            NEW
          </span>
        </Link>
        <Link
          href="/marketing/messages/emails"
          className={`pb-3 font-medium text-sm border-b-2 ${
            isAllEmails
              ? "border-[#00A4BD] text-[#33475B] font-semibold"
              : "border-transparent text-[#516F90] hover:text-[#33475B]"
          } transition-colors`}
        >
          All Emails
        </Link>
        <Link
          href="/marketing/messages/ai-optimize"
          className={`pb-3 font-medium text-sm flex items-center gap-1.5 border-b-2 ${
            isAIOptimize
              ? "border-[#00A4BD] text-[#33475B] font-semibold"
              : "border-transparent text-[#516F90] hover:text-[#33475B]"
          } transition-colors`}
        >
          <Sparkles size={14} strokeWidth={1.5} className="text-purple-500" />
          AI Optimize
        </Link>
      </div>
    </div>
  );
}
