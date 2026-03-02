"use client";

import { useState } from "react";
import { CreateSegmentModal } from "@/components/marketing/CreateSegmentModal";
import { CreateCampaignModal } from "@/components/marketing/CreateCampaignModal";
import { EmptySegmentCard } from "@/components/marketing/EmptySegmentCard";

// ─── Metric Cards (empty state) ──────────────────────────

function MetricCards() {
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

// ─── Segment Section (empty state) ───────────────────────

function SegmentSection({ onCreateSegment }: { onCreateSegment: () => void }) {
  return (
    <>
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <h2 className="text-xl font-semibold tracking-tight text-[#33475B]">
            Segment messaging health
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">
        <EmptySegmentCard variant="create" onClick={onCreateSegment} />
        <EmptySegmentCard variant="ai-preview" />
      </div>
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────

export default function MessageStrategyPage() {
  const [showSegmentModal, setShowSegmentModal] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);

  return (
    <div className="p-10 flex-1 flex flex-col max-w-[1400px] w-full mx-auto pb-20">
      {/* Header */}
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

      {/* Metric Cards (empty state) */}
      <MetricCards />

      {/* Segment Health (empty state) */}
      <SegmentSection onCreateSegment={() => setShowSegmentModal(true)} />

      {/* Modals */}
      {showSegmentModal && (
        <CreateSegmentModal
          onClose={() => setShowSegmentModal(false)}
          onComplete={() => setShowSegmentModal(false)}
        />
      )}
      {showCampaignModal && (
        <CreateCampaignModal
          onClose={() => setShowCampaignModal(false)}
          onComplete={() => setShowCampaignModal(false)}
        />
      )}
    </div>
  );
}
