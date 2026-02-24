"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  ChevronUp,
  ChevronDown as ChevronDownIcon,
  AlertCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { segments } from "@/lib/data/segments";
import { campaignsBySegment } from "@/lib/data/campaigns";
import { frequencyBySegment } from "@/lib/data/frequency";
import type { Campaign, MessageType } from "@/lib/types";

const messageColorMap: Record<MessageType, string> = {
  email: "bg-blue-500",
  sms: "bg-teal-500",
  whatsapp: "bg-green-500",
};

function getAiScoreStyle(score: number) {
  if (score >= 80)
    return "bg-[#00BDA5]/10 text-[#00BDA5] border-[#00BDA5]/20";
  if (score >= 60)
    return "bg-[#DBAB09]/10 text-[#DBAB09] border-[#DBAB09]/20";
  return "bg-[#F2545B]/10 text-[#F2545B] border-[#F2545B]/20";
}

export default function SegmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const segment = segments.find((s) => s.id === id);
  if (!segment) notFound();

  const campaigns = campaignsBySegment[id] || [];
  const frequencyDays = frequencyBySegment[id] || [];

  const [guardrailsOpen, setGuardrailsOpen] = useState(true);
  const [emailLimit, setEmailLimit] = useState(4);
  const [smsLimit, setSmsLimit] = useState(2);
  const [whatsappLimit, setWhatsappLimit] = useState(2);

  return (
    <div className="p-10 flex-1 flex flex-col max-w-[1400px] w-full mx-auto pb-20">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm mb-4">
        <Link
          href="/marketing/messages"
          className="text-[#00A4BD] hover:underline font-medium"
        >
          Message Strategy
        </Link>
        <ChevronRight size={14} className="text-[#cbd6e2]" />
        <span className="text-[#516F90]">{segment.name}</span>
      </nav>

      {/* Page Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-semibold tracking-tight text-[#33475B]">
            {segment.name.split("(")[0].trim()}
          </h1>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-xs text-[#516F90] bg-[#F5F8FA] px-2.5 py-1 rounded-full border border-[#EAF0F6] font-medium">
              {segment.contactCount.toLocaleString()} contacts
            </span>
            {segment.status === "risk" && (
              <span className="flex items-center gap-1.5 text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full text-xs font-medium border border-rose-100">
                <AlertCircle size={12} strokeWidth={2} />
                {segment.statusLabel}
              </span>
            )}
            {segment.status === "warning" && (
              <span className="flex items-center gap-1.5 text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full text-xs font-medium border border-amber-200">
                <AlertTriangle size={12} strokeWidth={2} />
                {segment.statusLabel}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button className="px-4 py-2 border border-[#cbd6e2] bg-white rounded text-sm font-medium text-[#33475B] hover:bg-gray-50 transition-colors">
            Edit segment
          </button>
          <button className="px-4 py-2 border border-[#cbd6e2] bg-white rounded text-sm font-medium text-[#33475B] hover:bg-gray-50 transition-colors">
            Set frequency cap
          </button>
        </div>
      </div>

      {/* Warning Banner (risk segments only) */}
      {segment.status === "risk" && (
        <div className="bg-rose-50 border border-rose-200 rounded-md p-3 mb-6 flex items-center gap-3 shadow-sm">
          <AlertTriangle size={18} className="text-rose-600" />
          <div className="text-sm text-rose-800">
            <strong className="font-semibold">Over-messaging Risk:</strong> This
            segment receives {segment.messagesPerWeek} messages per contact per
            week. Your guardrail limit is {emailLimit} emails/week.
          </div>
        </div>
      )}

      {/* 5 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
        {/* Msgs/contact/week */}
        <div className="bg-white border border-[#EAF0F6] rounded-md p-4 shadow-sm flex flex-col justify-center">
          <div className="text-xs font-medium text-[#516F90] mb-1.5">
            Msgs/contact/week
          </div>
          <div className="flex items-end gap-2">
            <div className="text-2xl font-semibold tracking-tight text-[#33475B]">
              {segment.messagesPerWeek}
            </div>
            <div className="flex items-center gap-0.5 text-xs font-medium text-rose-600 mb-1">
              <TrendingUp size={12} strokeWidth={2.5} />
              vs 3.5 avg
            </div>
          </div>
        </div>

        {/* Avg open rate */}
        <div className="bg-white border border-[#EAF0F6] rounded-md p-4 shadow-sm flex flex-col justify-center">
          <div className="text-xs font-medium text-[#516F90] mb-1.5">
            Avg open rate
          </div>
          <div className="flex items-end gap-2">
            <div className="text-2xl font-semibold tracking-tight text-[#33475B]">
              {segment.openRate}%
            </div>
            <div className="flex items-center gap-0.5 text-xs font-medium text-rose-600 mb-1">
              <TrendingDown size={12} strokeWidth={2.5} />
              vs 26.3% avg
            </div>
          </div>
        </div>

        {/* Avg click rate */}
        <div className="bg-white border border-[#EAF0F6] rounded-md p-4 shadow-sm flex flex-col justify-center">
          <div className="text-xs font-medium text-[#516F90] mb-1.5">
            Avg click rate
          </div>
          <div className="flex items-end gap-2">
            <div className="text-2xl font-semibold tracking-tight text-[#33475B]">
              {segment.clickRate}%
            </div>
            <div className="flex items-center gap-0.5 text-xs font-medium text-rose-600 mb-1">
              <TrendingDown size={12} strokeWidth={2.5} />
              vs 4.2% avg
            </div>
          </div>
        </div>

        {/* Unsubscribe rate */}
        <div
          className={`rounded-md p-4 shadow-sm flex flex-col justify-center relative overflow-hidden ${
            segment.unsubscribeHighlight
              ? "bg-rose-50 border border-rose-200"
              : "bg-white border border-[#EAF0F6]"
          }`}
        >
          <div
            className={`text-xs font-medium mb-1.5 flex items-center justify-between ${
              segment.unsubscribeHighlight ? "text-rose-800" : "text-[#516F90]"
            }`}
          >
            Unsubscribe rate
            {segment.unsubscribeHighlight && (
              <AlertTriangle size={14} className="text-rose-500" />
            )}
          </div>
          <div className="flex items-end gap-2">
            <div
              className={`text-2xl font-semibold tracking-tight ${
                segment.unsubscribeHighlight
                  ? "text-rose-600"
                  : "text-[#33475B]"
              }`}
            >
              {segment.unsubscribeRate}%
            </div>
            <div className="flex items-center gap-0.5 text-xs font-medium text-rose-600 mb-1">
              <TrendingUp size={12} strokeWidth={2.5} />
              vs 1.1% avg
            </div>
          </div>
        </div>

        {/* Active campaigns */}
        <div className="bg-white border border-[#EAF0F6] rounded-md p-4 shadow-sm flex flex-col justify-center">
          <div className="text-xs font-medium text-[#516F90] mb-1.5">
            Active campaigns
          </div>
          <div className="flex items-end gap-2">
            <div className="text-2xl font-semibold tracking-tight text-[#33475B]">
              {segment.activeCampaigns}
            </div>
            <div className="text-xs font-medium text-[#516F90] mb-1">
              vs 3 avg
            </div>
          </div>
        </div>
      </div>

      {/* Frequency Timeline */}
      <div className="bg-white border border-[#EAF0F6] rounded-lg p-6 shadow-sm mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold tracking-tight text-[#33475B]">
            Message frequency — last 14 days
          </h2>
          <div className="flex items-center gap-4 text-xs font-medium text-[#516F90]">
            <span className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              Email
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-teal-500" />
              SMS
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              WhatsApp
            </span>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar pb-2">
          <div className="min-w-[700px]">
            {/* Dots grid */}
            <div className="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-2 h-40 border-b border-[#EAF0F6]">
              {frequencyDays.map((day, i) => {
                const isHeavy = day.messages.length >= 4;
                return (
                  <div
                    key={i}
                    className={`flex flex-col items-center justify-end gap-1.5 pb-3 ${
                      isHeavy
                        ? "bg-rose-50/50 rounded-t-md border-x border-t border-rose-100"
                        : ""
                    }`}
                  >
                    {/* Render dots bottom-up: reverse so bottom of column = first messages */}
                    {[...day.messages].reverse().map((msg, j) => (
                      <div
                        key={j}
                        className={`w-3.5 h-3.5 rounded-full ${messageColorMap[msg]}`}
                      />
                    ))}
                  </div>
                );
              })}
            </div>

            {/* X-axis labels */}
            <div className="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-2 mt-3 text-[11px] font-medium text-center text-[#516F90]">
              {frequencyDays.map((day, i) => (
                <div key={i} className="flex flex-col gap-0.5">
                  <span>{day.label}</span>
                  {day.summary && (
                    <span
                      className={`text-[10px] ${
                        day.summaryHighlight
                          ? "text-rose-500 font-semibold"
                          : "text-[#516F90]/80"
                      }`}
                    >
                      {day.summary}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white border border-[#EAF0F6] rounded-lg shadow-sm mb-10 overflow-hidden flex flex-col">
        <div className="p-5 border-b border-[#EAF0F6] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-lg font-semibold tracking-tight text-[#33475B]">
            Campaigns reaching this segment
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-[#F5F8FA] border border-[#cbd6e2] rounded px-3 py-1.5 focus-within:border-[#00A4BD] transition-colors w-64">
              <Search size={14} className="text-[#516F90]" />
              <input
                type="text"
                placeholder="Search campaigns..."
                className="bg-transparent border-none outline-none text-sm text-[#33475B] ml-2 w-full placeholder-[#516F90]/70"
              />
            </div>
            <button className="flex items-center gap-2 bg-white border border-[#cbd6e2] rounded px-3 py-1.5 text-sm font-medium text-[#33475B] hover:bg-gray-50 transition-colors">
              Filter by Channel
              <ChevronDownIcon size={14} className="text-[#516F90]" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50/50 text-xs font-semibold text-[#516F90] border-b border-[#EAF0F6]">
                <th className="py-3 px-5 font-medium tracking-wide">
                  Campaign name
                </th>
                <th className="py-3 px-5 font-medium tracking-wide">
                  Channel
                </th>
                <th className="py-3 px-5 font-medium tracking-wide">
                  Msgs/wk
                </th>
                <th className="py-3 px-5 font-medium tracking-wide">Status</th>
                <th className="py-3 px-5 font-medium tracking-wide">
                  Frequency
                </th>
                <th className="py-3 px-5 font-medium tracking-wide text-right">
                  Open rate
                </th>
                <th className="py-3 px-5 font-medium tracking-wide text-right">
                  Click rate
                </th>
                <th className="py-3 px-5 font-medium tracking-wide text-center">
                  AI Score
                </th>
                <th className="py-3 px-5 font-medium tracking-wide text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-sm text-[#33475B] divide-y divide-[#EAF0F6]">
              {campaigns.map((campaign) => (
                <CampaignRow key={campaign.id} campaign={campaign} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Guardrails Panel */}
      <div className="bg-white border border-[#EAF0F6] rounded-lg shadow-sm mb-6 flex flex-col">
        <div
          className="p-5 border-b border-[#EAF0F6] flex justify-between items-center cursor-pointer hover:bg-gray-50/50 transition-colors"
          onClick={() => setGuardrailsOpen(!guardrailsOpen)}
        >
          <div className="flex items-center gap-3">
            <ShieldCheck
              size={20}
              strokeWidth={1.5}
              className="text-[#00A4BD]"
            />
            <h2 className="text-lg font-semibold tracking-tight text-[#33475B]">
              Frequency Guardrails
            </h2>
          </div>
          {guardrailsOpen ? (
            <ChevronUp size={16} className="text-[#516F90]" />
          ) : (
            <ChevronDownIcon size={16} className="text-[#516F90]" />
          )}
        </div>

        {guardrailsOpen && (
          <div className="p-6">
            {/* AI Recommendation */}
            <div className="bg-[#F0F1FA] border border-purple-200/60 rounded-lg p-5 flex gap-4 items-start mb-8 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-purple-200/50 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles
                  size={18}
                  strokeWidth={1.5}
                  className="text-purple-600"
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#33475B] mb-1">
                  AI Recommendation
                </h3>
                <p className="text-sm text-[#516F90] leading-relaxed">
                  Pause the{" "}
                  <strong className="text-[#33475B] font-semibold">
                    &apos;Getting Started SMS&apos;
                  </strong>{" "}
                  campaign for contacts who opened 2+ welcome emails. This would
                  reduce messages from 7.2 to 4.8/week and cut unsubscribes by
                  an estimated 35%.
                </p>
                <button className="mt-3 text-sm font-medium text-purple-700 hover:text-purple-800 transition-colors border border-purple-200 bg-white px-3 py-1.5 rounded shadow-sm">
                  Apply recommendation
                </button>
              </div>
            </div>

            {/* Guardrail Bars */}
            <div className="space-y-7 max-w-4xl">
              {/* Email */}
              <div>
                <div className="flex justify-between items-end mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <span className="font-medium text-sm text-[#33475B]">
                      Email
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-rose-600 font-semibold flex items-center gap-1">
                      <AlertCircle size={12} />
                      Actual: 6.8/week
                    </span>
                    <span className="text-[#cbd6e2]">|</span>
                    <span className="text-[#516F90] font-medium">Limit:</span>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="flex-1 h-2.5 bg-gray-100 rounded-full relative">
                    <div className="absolute left-[57%] top-[-6px] bottom-[-6px] w-0.5 bg-slate-400 z-10 rounded-full" />
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-rose-500 rounded-full"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <input
                      type="number"
                      value={emailLimit}
                      onChange={(e) => setEmailLimit(Number(e.target.value))}
                      className="w-14 border border-[#cbd6e2] rounded px-2 py-1 text-sm text-center text-[#33475B] font-medium focus:border-[#00A4BD] outline-none transition-colors"
                    />
                    <span className="text-xs text-[#516F90] w-12">/ week</span>
                  </div>
                </div>
              </div>

              {/* SMS */}
              <div>
                <div className="flex justify-between items-end mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                    <span className="font-medium text-sm text-[#33475B]">
                      SMS
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-[#516F90] font-medium">
                      Actual: 1.2/week
                    </span>
                    <span className="text-[#cbd6e2]">|</span>
                    <span className="text-[#516F90] font-medium">Limit:</span>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="flex-1 h-2.5 bg-gray-100 rounded-full relative">
                    <div className="absolute left-[66%] top-[-6px] bottom-[-6px] w-0.5 bg-slate-400 z-10 rounded-full" />
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-teal-500 rounded-full"
                      style={{ width: "40%" }}
                    />
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <input
                      type="number"
                      value={smsLimit}
                      onChange={(e) => setSmsLimit(Number(e.target.value))}
                      className="w-14 border border-[#cbd6e2] rounded px-2 py-1 text-sm text-center text-[#33475B] font-medium focus:border-[#00A4BD] outline-none transition-colors"
                    />
                    <span className="text-xs text-[#516F90] w-12">/ week</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div>
                <div className="flex justify-between items-end mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <span className="font-medium text-sm text-[#33475B]">
                      WhatsApp
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-[#516F90] font-medium">
                      Actual: 1.2/week
                    </span>
                    <span className="text-[#cbd6e2]">|</span>
                    <span className="text-[#516F90] font-medium">Limit:</span>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="flex-1 h-2.5 bg-gray-100 rounded-full relative">
                    <div className="absolute left-[66%] top-[-6px] bottom-[-6px] w-0.5 bg-slate-400 z-10 rounded-full" />
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-green-500 rounded-full"
                      style={{ width: "40%" }}
                    />
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <input
                      type="number"
                      value={whatsappLimit}
                      onChange={(e) => setWhatsappLimit(Number(e.target.value))}
                      className="w-14 border border-[#cbd6e2] rounded px-2 py-1 text-sm text-center text-[#33475B] font-medium focus:border-[#00A4BD] outline-none transition-colors"
                    />
                    <span className="text-xs text-[#516F90] w-12">/ week</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-[#EAF0F6] flex justify-end">
              <button className="bg-[#FF7A59] hover:bg-[#e86c4f] text-white px-5 py-2 rounded text-sm font-medium transition-colors shadow-sm">
                Save guardrails
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CampaignRow({ campaign }: { campaign: Campaign }) {
  const isSent = campaign.status === "Sent";
  const scoreStyle = getAiScoreStyle(campaign.aiScore);

  const nameContent = campaign.isClickable ? (
    <Link
      href={`/marketing/messages/email/${campaign.emailId || campaign.id}`}
      className={`font-medium ${
        isSent
          ? "text-[#516F90]"
          : "text-[#00A4BD] group-hover:underline"
      }`}
    >
      {campaign.name}
    </Link>
  ) : (
    <span
      className={`font-medium ${
        isSent ? "text-[#516F90]" : "text-[#33475B]"
      }`}
    >
      {campaign.name}
    </span>
  );

  return (
    <tr
      className={`hover:bg-gray-50/50 transition-colors ${
        campaign.isClickable ? "group cursor-pointer" : ""
      }`}
    >
      <td className="py-4 px-5">{nameContent}</td>
      <td className={`py-4 px-5 ${isSent ? "text-[#516F90]" : ""}`}>
        {campaign.channel}
      </td>
      <td className="py-4 px-5 text-[#516F90]">{campaign.msgsPerWeek}</td>
      <td className="py-4 px-5">
        <span
          className={`flex items-center gap-1.5 text-xs font-medium ${
            campaign.status === "Active"
              ? "text-emerald-700"
              : "text-[#516F90]"
          }`}
        >
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              campaign.status === "Active"
                ? "bg-emerald-500"
                : "bg-[#cbd6e2]"
            }`}
          />
          {campaign.status}
        </span>
      </td>
      <td className="py-4 px-5 text-[#516F90]">{campaign.frequency}</td>
      <td className="py-4 px-5 text-right">
        {campaign.openRate !== null ? (
          <span className={`font-medium ${isSent ? "text-[#516F90]" : ""}`}>
            {campaign.openRate}%
          </span>
        ) : (
          <span className="text-[#cbd6e2]">—</span>
        )}
      </td>
      <td className="py-4 px-5 text-right">
        <span className={`font-medium ${isSent ? "text-[#516F90]" : ""}`}>
          {campaign.clickRate}%
        </span>
      </td>
      <td className="py-4 px-5 text-center">
        <div
          className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-semibold text-xs border ${scoreStyle} ${
            isSent ? "opacity-80" : ""
          }`}
        >
          {campaign.aiScore}
        </div>
      </td>
      <td className="py-4 px-5 text-right font-medium text-xs">
        {campaign.status === "Active" ? (
          <span className="text-[#00A4BD]">Pause / Edit</span>
        ) : (
          <span className="text-[#cbd6e2]">—</span>
        )}
      </td>
    </tr>
  );
}
