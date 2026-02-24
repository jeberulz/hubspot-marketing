import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Segment } from "@/lib/types";

const statusConfig = {
  risk: {
    icon: AlertCircle,
    textColor: "text-rose-700",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-100",
  },
  healthy: {
    icon: CheckCircle2,
    textColor: "text-emerald-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100",
  },
  warning: {
    icon: AlertTriangle,
    textColor: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
  opportunity: {
    icon: TrendingUp,
    textColor: "text-[#00A4BD]",
    bgColor: "bg-[#EAF0F6]",
    borderColor: "border-[#cbd6e2]/50",
  },
};

export function SegmentCard({ segment }: { segment: Segment }) {
  const config = statusConfig[segment.status];
  const StatusIcon = config.icon;

  return (
    <Link
      href={`/marketing/messages/segment/${segment.id}`}
      className="bg-white border border-[#cbd6e2] rounded-lg p-6 shadow-sm hover:border-[#00A4BD] hover:shadow-md transition-all cursor-pointer group flex flex-col"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <h3 className="font-semibold text-lg text-[#33475B] tracking-tight group-hover:text-[#00A4BD] transition-colors">
            {segment.name}
          </h3>
          <div className="text-xs text-[#516F90] mt-1.5 bg-[#F5F8FA] px-2.5 py-1 rounded-full inline-flex items-center font-medium border border-[#EAF0F6]">
            {segment.contactCount.toLocaleString()} contacts
          </div>
        </div>
        <div
          className={`flex items-center gap-1.5 ${config.textColor} ${config.bgColor} px-2.5 py-1 rounded-full text-xs font-medium border ${config.borderColor} shrink-0 ${segment.status === "risk" ? "animate-pulse-risk" : ""}`}
        >
          <StatusIcon size={14} />
          {segment.statusLabel}
        </div>
      </div>

      {/* Frequency bar */}
      <div className="mb-5">
        <div className="text-sm font-medium text-[#33475B] mb-2.5">
          {segment.messagesPerWeek} messages / contact / week
        </div>
        <div className="h-2.5 flex rounded-full overflow-hidden bg-gray-100">
          {segment.barWidths.email > 0 && (
            <div
              className="bg-[#00A4BD] border-r border-white/20"
              style={{ width: `${segment.barWidths.email}%` }}
            />
          )}
          {segment.barWidths.sms > 0 && (
            <div
              className="bg-[#00BDA5] border-r border-white/20"
              style={{ width: `${segment.barWidths.sms}%` }}
            />
          )}
          {segment.barWidths.whatsapp > 0 && (
            <div
              className="bg-[#00C853]"
              style={{ width: `${segment.barWidths.whatsapp}%` }}
            />
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 border-t border-[#EAF0F6] pt-5 mb-auto">
        <div>
          <div className="text-xs text-[#516F90] mb-1">Open rate</div>
          <div className="text-sm font-semibold text-[#33475B]">
            {segment.openRate}%
          </div>
        </div>
        <div>
          <div className="text-xs text-[#516F90] mb-1">Click rate</div>
          <div className="text-sm font-semibold text-[#33475B]">
            {segment.clickRate}%
          </div>
        </div>
        <div>
          <div className="text-xs text-[#516F90] mb-1">Unsubscribe</div>
          {segment.unsubscribeHighlight ? (
            <div className="text-sm font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded inline-block">
              {segment.unsubscribeRate}%
            </div>
          ) : (
            <div className="text-sm font-semibold text-[#33475B]">
              {segment.unsubscribeRate}%
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 pt-4 border-t border-[#EAF0F6] flex items-center justify-between transition-colors">
        <div className="text-xs text-[#516F90] flex items-center gap-2 font-medium">
          <Layers size={14} className="text-[#00A4BD]" />
          {segment.activeCampaigns} active campaigns
        </div>
        <div className="text-xs font-semibold text-[#00A4BD] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
          View details <ArrowRight size={12} />
        </div>
      </div>
    </Link>
  );
}
