"use client";

import { useState } from "react";
import {
  Sparkles,
  TrendingUp,
  MousePointerClick,
  ShieldCheck,
  Mail,
  BarChart2,
  Zap,
  ArrowRight,
} from "lucide-react";
import { CreateCampaignModal } from "@/components/marketing/CreateCampaignModal";

// ─── Stat Card ───────────────────────────────────────────

function StatCard({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div className="text-center">
      <div className={`text-3xl font-semibold tracking-tight mb-1 ${color}`}>
        {value}
      </div>
      <div className="text-xs text-[#516F90]">{label}</div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────

export default function AiOptimizePage() {
  const [showCampaignModal, setShowCampaignModal] = useState(false);

  return (
    <div className="p-10 flex-1 flex flex-col max-w-[1000px] w-full mx-auto pb-20 animate-fade-in">
      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="text-center mb-12 pt-4">
        <div className="w-14 h-14 rounded-full bg-[#F0F1FA] flex items-center justify-center mx-auto mb-5">
          <Sparkles size={28} strokeWidth={1.5} className="text-[#6C63FF]" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-[#33475B] mb-3">
          AI-Powered Email Optimization
        </h1>
        <p className="text-base text-[#516F90] max-w-xl mx-auto leading-relaxed">
          Let AI analyze every email you send and surface actionable
          suggestions that improve open rates, boost engagement, and protect
          your sender reputation — automatically.
        </p>
      </div>

      {/* ── Value Cards ──────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
        <div className="bg-white border border-[#EAF0F6] rounded-lg p-6 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
            <TrendingUp size={20} strokeWidth={1.5} className="text-emerald-600" />
          </div>
          <h3 className="text-sm font-semibold text-[#33475B] mb-2">
            Higher open rates
          </h3>
          <p className="text-sm text-[#516F90] leading-relaxed">
            AI scores your subject lines and rewrites spam triggers, weak
            phrasing, and low-performing patterns so more contacts actually
            open your emails.
          </p>
        </div>

        <div className="bg-white border border-[#EAF0F6] rounded-lg p-6 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-4">
            <MousePointerClick size={20} strokeWidth={1.5} className="text-blue-600" />
          </div>
          <h3 className="text-sm font-semibold text-[#33475B] mb-2">
            Better engagement
          </h3>
          <p className="text-sm text-[#516F90] leading-relaxed">
            Get suggestions to consolidate competing CTAs, sharpen your
            copy, and match content to your audience so every click counts.
          </p>
        </div>

        <div className="bg-white border border-[#EAF0F6] rounded-lg p-6 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center mb-4">
            <ShieldCheck size={20} strokeWidth={1.5} className="text-amber-600" />
          </div>
          <h3 className="text-sm font-semibold text-[#33475B] mb-2">
            Fewer unsubscribes
          </h3>
          <p className="text-sm text-[#516F90] leading-relaxed">
            AI flags artificial urgency, tone mismatches, and over-messaging
            risks before they erode your contact list.
          </p>
        </div>
      </div>

      {/* ── How It Works ─────────────────────────────────── */}
      <div className="mb-14">
        <h2 className="text-lg font-semibold text-[#33475B] text-center mb-8">
          How it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#F5F8FA] border border-[#EAF0F6] flex items-center justify-center mb-3">
              <Mail size={18} strokeWidth={1.5} className="text-[#00A4BD]" />
            </div>
            <div className="text-xs font-semibold text-[#00A4BD] uppercase tracking-wider mb-1.5">
              Step 1
            </div>
            <h3 className="text-sm font-semibold text-[#33475B] mb-1">
              Create &amp; send
            </h3>
            <p className="text-xs text-[#516F90] max-w-[200px]">
              Build your first email campaign and start reaching your audience.
            </p>
            {/* Connector arrow (hidden on mobile) */}
            <div className="hidden md:block absolute top-5 -right-3 text-[#cbd6e2]">
              <ArrowRight size={16} />
            </div>
          </div>

          <div className="relative flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#F5F8FA] border border-[#EAF0F6] flex items-center justify-center mb-3">
              <BarChart2 size={18} strokeWidth={1.5} className="text-[#6C63FF]" />
            </div>
            <div className="text-xs font-semibold text-[#6C63FF] uppercase tracking-wider mb-1.5">
              Step 2
            </div>
            <h3 className="text-sm font-semibold text-[#33475B] mb-1">
              AI analyzes
            </h3>
            <p className="text-xs text-[#516F90] max-w-[200px]">
              Each email is scored across 4 dimensions: subject line, content
              quality, send timing, and audience match.
            </p>
            <div className="hidden md:block absolute top-5 -right-3 text-[#cbd6e2]">
              <ArrowRight size={16} />
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#F5F8FA] border border-[#EAF0F6] flex items-center justify-center mb-3">
              <Zap size={18} strokeWidth={1.5} className="text-[#FF7A59]" />
            </div>
            <div className="text-xs font-semibold text-[#FF7A59] uppercase tracking-wider mb-1.5">
              Step 3
            </div>
            <h3 className="text-sm font-semibold text-[#33475B] mb-1">
              Apply suggestions
            </h3>
            <p className="text-xs text-[#516F90] max-w-[200px]">
              Get actionable recommendations with estimated impact — apply
              them in one click.
            </p>
          </div>
        </div>
      </div>

      {/* ── Business Impact ──────────────────────────────── */}
      <div className="bg-[#F0F1FA]/50 border border-[#D4D2F0]/40 rounded-lg p-8 mb-14">
        <h2 className="text-lg font-semibold text-[#33475B] text-center mb-6">
          What AI optimization delivers
        </h2>
        <div className="grid grid-cols-3 gap-6">
          <StatCard
            value="+40%"
            label="avg. open rate improvement"
            color="text-emerald-600"
          />
          <StatCard
            value="-60%"
            label="unsubscribe risk reduction"
            color="text-[#00A4BD]"
          />
          <StatCard
            value="82+"
            label="avg. AI score after optimization"
            color="text-[#6C63FF]"
          />
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────── */}
      <div className="text-center">
        <p className="text-sm text-[#516F90] mb-4">
          Create your first campaign to unlock AI-powered optimization.
        </p>
        <button
          onClick={() => setShowCampaignModal(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF7A59] hover:bg-[#e86c4f] rounded-lg text-sm font-semibold text-white transition-colors shadow-sm"
        >
          Create your first campaign
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Modal */}
      {showCampaignModal && (
        <CreateCampaignModal
          onClose={() => setShowCampaignModal(false)}
          onComplete={() => setShowCampaignModal(false)}
        />
      )}
    </div>
  );
}
