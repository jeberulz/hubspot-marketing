"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Sparkles,
  ShieldCheck,
  Mail,
  MessageSquare,
  Moon,
  ChevronDown,
} from "lucide-react";
import { segments } from "@/lib/data/segments";
import { SegmentCard } from "@/components/strategy/SegmentCard";
import { useOnboarding } from "@/lib/onboarding/context";
import { WelcomeBanner } from "@/components/onboarding/WelcomeBanner";
import { GettingStartedChecklist } from "@/components/onboarding/GettingStartedChecklist";
import { EmptySegmentCard } from "@/components/onboarding/EmptySegmentCard";
import { CreateSegmentModal } from "@/components/onboarding/CreateSegmentModal";
import { CreateCampaignModal } from "@/components/onboarding/CreateCampaignModal";
import type { MilestoneKey } from "@/lib/onboarding/types";

// ─── Metric Cards ─────────────────────────────────────────

function MetricCards({ muted }: { muted: boolean }) {
  if (muted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {[
          { label: "Active campaigns", value: "--", sub: "across channels" },
          {
            label: "Avg. messages per contact",
            value: "--",
            sub: "per week",
          },
          { label: "Segments at risk", value: "--", sub: "no data yet" },
          { label: "Avg. open rate", value: "--", sub: "across all emails" },
        ].map(({ label, value, sub }) => (
          <div
            key={label}
            className="bg-white border border-[#EAF0F6] rounded-md p-5 shadow-sm opacity-60"
            title="This will populate once you have active campaigns"
          >
            <div className="text-sm font-medium text-[#516F90] mb-2">
              {label}
            </div>
            <div className="text-3xl font-semibold tracking-tight text-[#cbd6e2] mb-1">
              {value}
            </div>
            <div className="text-xs text-[#cbd6e2]">{sub}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      <div className="bg-white border border-[#EAF0F6] rounded-md p-5 shadow-sm">
        <div className="text-sm font-medium text-[#516F90] mb-2">
          Active campaigns
        </div>
        <div className="text-3xl font-semibold tracking-tight text-[#33475B] mb-1">
          14
        </div>
        <div className="text-xs text-[#516F90]">across 3 channels</div>
      </div>

      <div className="bg-white border border-[#EAF0F6] rounded-md p-5 shadow-sm">
        <div className="text-sm font-medium text-[#516F90] mb-2">
          Avg. messages per contact
        </div>
        <div className="flex items-end gap-3 mb-1">
          <div className="text-3xl font-semibold tracking-tight text-[#33475B]">
            4.2{" "}
            <span className="text-base font-normal text-[#516F90]">
              / week
            </span>
          </div>
          <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded text-xs font-medium mb-1.5">
            <TrendingUp size={12} /> 0.8
          </div>
        </div>
        <div className="text-xs text-[#516F90]">across all segments</div>
      </div>

      <div className="bg-white border border-[#EAF0F6] rounded-md p-5 shadow-sm relative overflow-hidden">
        <div className="text-sm font-medium text-[#516F90] mb-2 flex items-center justify-between">
          Segments at risk
          <div className="w-2 h-2 rounded-full bg-rose-500" />
        </div>
        <div className="text-3xl font-semibold tracking-tight text-[#33475B] mb-1">
          3
        </div>
        <div className="text-xs text-[#516F90]">over-messaging detected</div>
      </div>

      <div className="bg-white border border-[#EAF0F6] rounded-md p-5 shadow-sm">
        <div className="text-sm font-medium text-[#516F90] mb-2">
          Avg. open rate
        </div>
        <div className="flex items-end gap-3 mb-1">
          <div className="text-3xl font-semibold tracking-tight text-[#33475B]">
            26.3%
          </div>
          <div className="flex items-center gap-1 text-[#516F90] bg-[#F5F8FA] px-1.5 py-0.5 rounded text-xs font-medium mb-1.5">
            <TrendingDown size={12} /> 1.2%
          </div>
        </div>
        <div className="text-xs text-[#516F90]">across all emails</div>
      </div>
    </div>
  );
}

// ─── AI Insights Banner ───────────────────────────────────

function AiInsightsBanner() {
  return (
    <div className="bg-[#F0F1FA] border border-purple-200/60 rounded-lg p-6 flex gap-4 items-start shadow-sm mb-6">
      <div className="w-10 h-10 rounded-full bg-purple-200/50 flex items-center justify-center shrink-0">
        <Sparkles size={20} strokeWidth={1.5} className="text-purple-600" />
      </div>
      <div className="flex-1 pt-1">
        <div className="flex justify-between items-start mb-5">
          <h3 className="text-base font-semibold text-[#33475B]">
            AI detected 3 messaging risks this week.
          </h3>
          <button className="text-[#00A4BD] font-medium text-sm hover:underline hover:text-[#00899e] transition-colors">
            Review recommendations
          </button>
        </div>
        <ul className="space-y-4">
          <li className="flex items-start gap-3 text-sm text-[#516F90] leading-relaxed">
            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
            <span>
              <strong className="font-semibold text-[#33475B]">
                New Trial Users
              </strong>{" "}
              are receiving 7.2 messages/week — 80% above your 4/week guardrail.
              3.8% unsubscribe rate is 2.4x above average.
            </span>
          </li>
          <li className="flex items-start gap-3 text-sm text-[#516F90] leading-relaxed">
            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
            <span>
              <strong className="font-semibold text-[#33475B]">
                Free Plan Users
              </strong>{" "}
              have a 2.9% unsubscribe rate on re-engagement emails. Consider
              reducing frequency or improving targeting.
            </span>
          </li>
          <li className="flex items-start gap-3 text-sm text-[#516F90] leading-relaxed">
            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
            <span>
              <strong className="font-semibold text-[#33475B]">
                Dormant Users
              </strong>{" "}
              segment has low coverage. Only 2 campaigns are active — consider
              adding a WhatsApp re-engagement sequence.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

// ─── Guardrails Bar ───────────────────────────────────────

function GuardrailsBar() {
  return (
    <div className="bg-white border border-[#EAF0F6] rounded-lg p-5 shadow-sm mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
          <ShieldCheck
            size={20}
            strokeWidth={1.5}
            className="text-[#00A4BD]"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[#33475B]">
            Frequency Guardrails Active
          </h3>
          <p className="text-xs text-[#516F90]">
            System-wide caps protecting your contacts from over-messaging
          </p>
        </div>
      </div>
      <div className="flex items-center gap-8 bg-[#F5F8FA] px-6 py-2.5 rounded-md border border-[#EAF0F6]">
        <div className="flex flex-col">
          <span className="text-xs text-[#516F90] mb-0.5 flex items-center gap-1.5">
            <Mail size={10} /> Email Limit
          </span>
          <span className="text-sm font-semibold text-[#33475B]">
            Max 4 / week
          </span>
        </div>
        <div className="w-px h-8 bg-[#cbd6e2]/50" />
        <div className="flex flex-col">
          <span className="text-xs text-[#516F90] mb-0.5 flex items-center gap-1.5">
            <MessageSquare size={10} /> SMS Limit
          </span>
          <span className="text-sm font-semibold text-[#33475B]">
            Max 2 / week
          </span>
        </div>
        <div className="w-px h-8 bg-[#cbd6e2]/50" />
        <div className="flex flex-col">
          <span className="text-xs text-[#516F90] mb-0.5 flex items-center gap-1.5">
            <Moon size={10} /> Quiet Hours
          </span>
          <span className="text-sm font-semibold text-[#33475B]">
            8:00 PM - 8:00 AM
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Segment Section ──────────────────────────────────────

function SegmentSection({
  showSegments,
  onCreateSegment,
}: {
  showSegments: boolean;
  onCreateSegment: () => void;
}) {
  return (
    <>
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <h2 className="text-xl font-semibold tracking-tight text-[#33475B]">
            Segment messaging health
          </h2>
          {showSegments && (
            <div className="flex items-center gap-4 text-xs font-medium text-[#516F90] bg-white border border-[#EAF0F6] px-3 py-1.5 rounded-full shadow-sm">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00A4BD]" />
                Email
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00BDA5]" />
                SMS
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00C853]" />
                WhatsApp
              </div>
            </div>
          )}
        </div>
        {showSegments && (
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white border border-[#cbd6e2] rounded px-3 py-1.5 text-sm font-medium text-[#33475B] hover:bg-gray-50 transition-colors shadow-sm">
              Channel: All{" "}
              <ChevronDown size={14} className="text-[#516F90]" />
            </button>
            <button className="flex items-center gap-2 bg-white border border-[#cbd6e2] rounded px-3 py-1.5 text-sm font-medium text-[#33475B] hover:bg-gray-50 transition-colors shadow-sm">
              Last 30 days{" "}
              <ChevronDown size={14} className="text-[#516F90]" />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">
        {showSegments ? (
          segments.map((segment) => (
            <SegmentCard key={segment.id} segment={segment} />
          ))
        ) : (
          <>
            <EmptySegmentCard variant="create" onClick={onCreateSegment} />
            <EmptySegmentCard variant="ai-preview" />
          </>
        )}
      </div>
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────

export default function MessageStrategyPage() {
  const { state, completeMilestone } = useOnboarding();
  const [showSegmentModal, setShowSegmentModal] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);

  const isFirstActions = state.phase === "first-actions";
  const isExploring = state.phase === "exploring";
  const isProficient = state.phase === "proficient";
  const showFullDashboard = isExploring || isProficient;

  const handleChecklistAction = (milestone: MilestoneKey) => {
    switch (milestone) {
      case "createdSegment":
        setShowSegmentModal(true);
        break;
      case "createdCampaign":
        setShowCampaignModal(true);
        break;
      case "setGuardrails":
        completeMilestone("setGuardrails");
        break;
      case "importedContacts":
        completeMilestone("importedContacts");
        break;
      case "usedAiOptimizer":
        window.location.href = "/marketing/messages/emails";
        break;
    }
  };

  return (
    <div className="p-10 flex-1 flex flex-col max-w-[1400px] w-full mx-auto pb-20">
      {/* Phase-based header */}
      {isFirstActions || isExploring ? (
        <WelcomeBanner />
      ) : (
        <div className="flex justify-between items-start mb-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-semibold tracking-tight text-[#33475B] mb-2">
              Message Strategy
            </h1>
            <p className="text-base text-[#516F90]">
              See how your messaging reaches each audience segment across
              channels. Spot risks before they become unsubscribes.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button className="px-4 py-2 border border-[#cbd6e2] bg-white rounded text-sm font-medium text-[#33475B] hover:bg-gray-50 transition-colors">
              Manage guardrails
            </button>
            <button
              onClick={() => setShowCampaignModal(true)}
              className="px-4 py-2 bg-[#FF7A59] hover:bg-[#e86c4f] rounded text-sm font-medium text-white transition-colors"
            >
              Create campaign
            </button>
          </div>
        </div>
      )}

      {/* Getting Started Checklist (first-actions only) */}
      {isFirstActions && (
        <GettingStartedChecklist onAction={handleChecklistAction} />
      )}

      {/* Metric Cards */}
      <MetricCards muted={isFirstActions} />

      {/* AI Insights (hidden for first-actions) */}
      {showFullDashboard && <AiInsightsBanner />}

      {/* Guardrails Bar (hidden for first-actions) */}
      {showFullDashboard && <GuardrailsBar />}

      {/* Segment Health */}
      <SegmentSection
        showSegments={showFullDashboard}
        onCreateSegment={() => setShowSegmentModal(true)}
      />

      {/* Modals */}
      {showSegmentModal && (
        <CreateSegmentModal
          onClose={() => setShowSegmentModal(false)}
          onComplete={() => {
            completeMilestone("createdSegment");
            setShowSegmentModal(false);
          }}
        />
      )}
      {showCampaignModal && (
        <CreateCampaignModal
          onClose={() => setShowCampaignModal(false)}
          onComplete={() => {
            completeMilestone("createdCampaign");
            setShowCampaignModal(false);
          }}
        />
      )}
    </div>
  );
}
