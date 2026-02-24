"use client";

import { use, useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Search,
  ListFilter,
  ChevronRight,
  Users,
  Mail,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Minus,
  Sparkles,
  RefreshCw,
  ArrowUp,
  CheckCircle,
  Check,
  Loader2,
} from "lucide-react";
import {
  emails,
  emailNavItems,
  suggestionsByEmail,
  type Suggestion,
} from "@/lib/data/emails";
import { useToast } from "@/components/ui/Toast";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function getNavScoreClasses(score: number) {
  if (score >= 80) return "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200";
  if (score >= 60) return "bg-amber-100 text-amber-700 ring-1 ring-amber-200";
  return "bg-rose-100 text-rose-700 ring-1 ring-rose-200";
}

function getScoreBadgeClasses(score: number) {
  if (score >= 60) return "text-amber-600 bg-amber-50";
  return "text-rose-600 bg-rose-50";
}

function getGaugeColor(score: number) {
  if (score >= 80) return "#059669";
  if (score >= 60) return "#D97706";
  if (score >= 40) return "#E11D48";
  return "#E11D48";
}

function getGaugeVerdict(score: number) {
  if (score >= 80) return "Strong performer";
  if (score >= 60) return "Room for improvement";
  if (score >= 40) return "Needs revision";
  return "Needs critical revision";
}

function getGaugeVerdictClasses(score: number) {
  if (score >= 80)
    return "text-emerald-700 bg-emerald-50 border-emerald-100";
  if (score >= 60) return "text-amber-700 bg-amber-50 border-amber-100";
  return "text-rose-700 bg-rose-50 border-rose-100";
}

const CIRCUMFERENCE = 251;

export default function EmailOptimizerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { showToast } = useToast();
  const [selectedId, setSelectedId] = useState(id);
  const [gaugeAnimated, setGaugeAnimated] = useState(false);

  // Interaction state
  const [appliedSuggestions, setAppliedSuggestions] = useState<Set<string>>(new Set());
  const [dismissedSuggestions, setDismissedSuggestions] = useState<Set<string>>(new Set());
  const [scoreBoost, setScoreBoost] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [dynamicSuggestions, setDynamicSuggestions] = useState<Suggestion[] | null>(null);

  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const email = emails[selectedId];
  const baseSuggestions = dynamicSuggestions || suggestionsByEmail[selectedId] || [];
  const suggestions = baseSuggestions.filter(
    (s) => !dismissedSuggestions.has(s.id)
  );

  // Reset state when switching emails
  useEffect(() => {
    setGaugeAnimated(false);
    setAppliedSuggestions(new Set());
    setDismissedSuggestions(new Set());
    setScoreBoost(0);
    setDynamicSuggestions(null);
    setChatMessages([]);
    setChatInput("");
    const t = setTimeout(() => setGaugeAnimated(true), 50);
    return () => clearTimeout(t);
  }, [selectedId]);

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleApply = useCallback(
    (suggestion: Suggestion) => {
      setAppliedSuggestions((prev) => new Set(prev).add(suggestion.id));
      const boost = suggestion.priority === "high" ? 6 : suggestion.priority === "medium" ? 4 : 2;
      setScoreBoost((prev) => prev + boost);
      setGaugeAnimated(false);
      setTimeout(() => setGaugeAnimated(true), 50);
      showToast(
        `Suggestion applied. ${suggestion.estimatedImpact || "Score improved."}`,
        "success"
      );
    },
    [showToast]
  );

  const handleDismiss = useCallback((suggestionId: string) => {
    setDismissedSuggestions((prev) => new Set(prev).add(suggestionId));
  }, []);

  const handleRefresh = useCallback(async () => {
    if (!email || refreshing) return;
    setRefreshing(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailId: selectedId,
          subject: email.subject,
          body: email.body,
          segment: email.segment,
          metrics: email.metrics,
          score: email.score,
        }),
      });
      const data = await res.json();
      if (data.suggestions?.length) {
        setDynamicSuggestions(data.suggestions);
        setAppliedSuggestions(new Set());
        setDismissedSuggestions(new Set());
        showToast("Suggestions refreshed with AI analysis.", "info");
      }
    } catch {
      showToast("Couldn't refresh. Using existing suggestions.", "error");
    } finally {
      setRefreshing(false);
    }
  }, [email, refreshing, selectedId, showToast]);

  const handleChatSend = useCallback(async () => {
    const msg = chatInput.trim();
    if (!msg || isStreaming || !email) return;
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", content: msg }]);
    setIsStreaming(true);
    setChatMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: msg,
          emailContext: {
            name: email.name,
            subject: email.subject,
            segment: email.segment,
            metrics: email.metrics,
            score: email.score,
          },
          history: chatMessages,
        }),
      });

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader");
      const decoder = new TextDecoder();
      let text = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        const currentText = text;
        setChatMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: currentText };
          return updated;
        });
      }
    } catch {
      setChatMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content:
            "I'd suggest focusing on the subject line first — it has the biggest impact on open rates for this segment. Try replacing discount-driven language with value-driven copy.",
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  }, [chatInput, isStreaming, email, chatMessages]);

  if (!email) {
    return (
      <div className="flex-1 flex items-center justify-center text-[#516F90]">
        Email not found.
      </div>
    );
  }

  const displayScore = Math.min(100, email.score.overall + scoreBoost);
  const dashOffset = CIRCUMFERENCE * (1 - displayScore / 100);

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Mobile Email Selector (below 1024px) */}
      <div className="lg:hidden border-b border-[#EAF0F6] p-3 bg-white flex items-center gap-3 shrink-0">
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="flex-1 bg-[#F5F8FA] border border-[#cbd6e2] rounded px-3 py-2 text-sm text-[#33475B] font-medium outline-none focus:border-[#0091AE]"
        >
          {emailNavItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} (Score: {item.score})
            </option>
          ))}
        </select>
      </div>

      {/* Left Panel: Email Navigator */}
      <section className="w-[300px] shrink-0 border-r border-[#EAF0F6] bg-[#F9FBFC] hidden lg:flex flex-col z-10 shadow-[2px_0_8px_-4px_rgba(0,0,0,0.05)]">
        <div className="p-4 border-b border-[#EAF0F6] bg-white">
          <Link
            href="/marketing/messages/segment/new-trial-users"
            className="flex items-center gap-2 text-[#516F90] hover:text-[#33475B] transition-colors mb-3"
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            <span className="text-sm font-medium">Back to segment</span>
          </Link>
          <div className="flex items-center bg-[#F5F8FA] border border-[#cbd6e2] rounded px-2.5 py-1.5 focus-within:border-[#0091AE] transition-colors">
            <Search size={14} className="text-[#516F90]" />
            <input
              type="text"
              placeholder="Find email..."
              className="bg-transparent border-none outline-none text-sm text-[#33475B] ml-2 w-full placeholder-[#516F90]/70"
            />
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-2 border-b border-[#EAF0F6] bg-[#F5F8FA]">
          <span className="text-xs font-medium text-[#516F90] uppercase tracking-wider">
            Lowest score first
          </span>
          <ListFilter size={14} className="text-[#516F90] cursor-pointer" />
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {emailNavItems.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`w-full text-left p-4 border-b border-[#EAF0F6] border-l-[3px] transition-colors flex flex-col gap-2 ${
                  isSelected
                    ? "border-l-[#0091AE] bg-sky-50/50 hover:bg-sky-50"
                    : "border-l-transparent hover:bg-white"
                }`}
              >
                <div className="flex justify-between items-start w-full">
                  <span className="text-sm font-medium text-[#33475B] truncate pr-2 leading-tight">
                    {item.name}
                  </span>
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-semibold text-xs shrink-0 ${getNavScoreClasses(
                      item.score
                    )}`}
                  >
                    {item.score}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#516F90]">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      item.status === "Active"
                        ? "bg-emerald-500"
                        : "bg-[#cbd6e2]"
                    }`}
                  />
                  {item.status} &bull; {item.statusDetail}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Center Panel: Analysis & Preview */}
      <section className="flex-1 flex flex-col overflow-y-auto custom-scrollbar bg-white relative">
        <div className="max-w-[800px] w-full mx-auto p-8 lg:p-10">
          {/* Header */}
          <div className="mb-8">
            <nav className="flex items-center gap-2 text-xs mb-3">
              <Link
                href="/marketing/messages"
                className="text-[#0091AE] hover:underline font-medium"
              >
                Message Strategy
              </Link>
              <ChevronRight size={12} className="text-[#cbd6e2]" />
              <Link
                href="/marketing/messages/segment/new-trial-users"
                className="text-[#0091AE] hover:underline font-medium"
              >
                New Trial Users
              </Link>
              <ChevronRight size={12} className="text-[#cbd6e2]" />
              <span className="text-[#516F90]">{email.name}</span>
            </nav>
            <h1 className="text-2xl font-semibold tracking-tight text-[#33475B] mb-3">
              {email.name}
            </h1>
            <div className="flex items-center flex-wrap gap-3">
              <span className="flex items-center gap-1.5 text-xs font-medium text-[#516F90] bg-[#F5F8FA] px-2.5 py-1 rounded-md border border-[#EAF0F6]">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    email.status === "Active"
                      ? "bg-emerald-500"
                      : "bg-[#cbd6e2]"
                  }`}
                />
                {email.status === "Sent"
                  ? `Sent ${email.sentDate}`
                  : email.sentDate}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-[#516F90] bg-[#F5F8FA] px-2.5 py-1 rounded-md border border-[#EAF0F6]">
                <Users size={12} strokeWidth={2} />
                {email.recipients.toLocaleString()} recipients
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-[#516F90] bg-[#F5F8FA] px-2.5 py-1 rounded-md border border-[#EAF0F6]">
                <Mail size={12} strokeWidth={2} />
                Email Channel
              </span>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            <div className="border border-[#EAF0F6] rounded-lg p-4 bg-white shadow-sm flex flex-col gap-1.5">
              <div className="text-xs font-medium text-[#516F90]">
                Open rate
              </div>
              <div className="flex items-end gap-2">
                <span className="text-xl font-semibold tracking-tight text-[#33475B]">
                  {email.metrics.openRate}%
                </span>
                <span className="flex items-center text-[10px] font-medium text-rose-600 mb-0.5">
                  <ArrowDownRight size={10} strokeWidth={2} />
                  vs. 23.1% avg
                </span>
              </div>
            </div>
            <div className="border border-[#EAF0F6] rounded-lg p-4 bg-white shadow-sm flex flex-col gap-1.5">
              <div className="text-xs font-medium text-[#516F90]">
                Click rate
              </div>
              <div className="flex items-end gap-2">
                <span className="text-xl font-semibold tracking-tight text-[#33475B]">
                  {email.metrics.clickRate}%
                </span>
                <span className="flex items-center text-[10px] font-medium text-rose-600 mb-0.5">
                  <ArrowDownRight size={10} strokeWidth={2} />
                  vs. 4.5% avg
                </span>
              </div>
            </div>
            <div className="border border-rose-200 bg-rose-50/30 rounded-lg p-4 shadow-sm flex flex-col gap-1.5">
              <div className="text-xs font-medium text-rose-800 flex justify-between">
                Unsubscribe rate
                <AlertTriangle size={12} className="text-rose-500" />
              </div>
              <div className="flex items-end gap-2">
                <span className="text-xl font-semibold tracking-tight text-rose-600">
                  {email.metrics.unsubscribeRate}%
                </span>
                <span className="flex items-center text-[10px] font-medium text-rose-600 mb-0.5">
                  <ArrowUpRight size={10} strokeWidth={2} />
                  vs. 0.4% avg
                </span>
              </div>
            </div>
            <div className="border border-[#EAF0F6] rounded-lg p-4 bg-white shadow-sm flex flex-col gap-1.5">
              <div className="text-xs font-medium text-[#516F90]">
                Bounce rate
              </div>
              <div className="flex items-end gap-2">
                <span className="text-xl font-semibold tracking-tight text-[#33475B]">
                  {email.metrics.bounceRate}%
                </span>
                <span className="flex items-center text-[10px] font-medium text-emerald-600 mb-0.5">
                  <Minus size={10} strokeWidth={2} />
                  vs. 0.3% avg
                </span>
              </div>
            </div>
          </div>

          {/* AI Performance Analysis */}
          <div className="border border-purple-100 rounded-xl bg-gradient-to-br from-[#FAFAFE] to-white p-6 shadow-sm mb-10">
            <div className="flex items-center gap-2 mb-6 border-b border-purple-100/50 pb-4">
              <div className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center">
                <Sparkles
                  size={14}
                  strokeWidth={2}
                  className="text-purple-600"
                />
              </div>
              <h2 className="text-base font-semibold text-[#33475B]">
                AI Performance Analysis
              </h2>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Gauge */}
              <div className="flex flex-col items-center shrink-0">
                <div className="relative w-[120px] h-[120px]">
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#F1F5F9"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke={getGaugeColor(displayScore)}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={CIRCUMFERENCE}
                      strokeDashoffset={
                        gaugeAnimated ? dashOffset : CIRCUMFERENCE
                      }
                      style={{
                        transition: "stroke-dashoffset 0.8s ease-out",
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
                    <span
                      className="text-3xl font-semibold tracking-tight leading-none"
                      style={{ color: getGaugeColor(displayScore) }}
                    >
                      {displayScore}
                    </span>
                    <span className="text-[10px] font-medium text-[#516F90] uppercase tracking-widest mt-1">
                      Score
                    </span>
                  </div>
                </div>
                <p
                  className={`text-xs font-medium mt-4 text-center px-4 py-1.5 rounded-full border ${getGaugeVerdictClasses(
                    displayScore
                  )}`}
                >
                  {getGaugeVerdict(displayScore)}
                </p>
              </div>

              {/* 2x2 Breakdown */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {[
                  {
                    label: "Subject Line",
                    score: email.score.subjectLine,
                    verdict: email.verdicts.subjectLine,
                  },
                  {
                    label: "Content Quality",
                    score: email.score.contentQuality,
                    verdict: email.verdicts.contentQuality,
                  },
                  {
                    label: "Send Timing",
                    score: email.score.sendTiming,
                    verdict: email.verdicts.sendTiming,
                  },
                  {
                    label: "Audience Match",
                    score: email.score.audienceMatch,
                    verdict: email.verdicts.audienceMatch,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white border border-[#EAF0F6] rounded-md p-3 flex flex-col gap-1"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-[#33475B]">
                        {item.label}
                      </span>
                      <span
                        className={`text-xs font-semibold px-1.5 py-0.5 rounded ${getScoreBadgeClasses(
                          item.score
                        )}`}
                      >
                        {item.score}
                      </span>
                    </div>
                    <p className="text-xs text-[#516F90] leading-snug">
                      &ldquo;{item.verdict}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Email Preview */}
          <div className="border border-[#cbd6e2] rounded-lg bg-[#F5F8FA] overflow-hidden flex flex-col mb-10 shadow-sm">
            {/* Client Header */}
            <div className="bg-white border-b border-[#cbd6e2] p-4 flex flex-col gap-2">
              <div className="flex items-center text-sm">
                <span className="w-16 text-[#516F90] font-medium">From:</span>
                <span className="text-[#33475B]">
                  The HubSpot Team &lt;hello@hubspot.com&gt;
                </span>
              </div>
              <div className="flex items-center text-sm">
                <span className="w-16 text-[#516F90] font-medium">To:</span>
                <span className="text-[#33475B]">
                  {email.segment} (Segment)
                </span>
              </div>
              <div className="flex items-center text-sm mt-1">
                <span className="w-16 text-[#516F90] font-medium">
                  Subject:
                </span>
                <span
                  className="text-[#33475B] font-medium bg-rose-100 px-1 rounded ring-1 ring-rose-200"
                  title="Spam trigger detected"
                >
                  <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[9px] font-bold mr-1.5 leading-none">
                    1
                  </span>
                  {email.subject}
                </span>
              </div>
            </div>

            {/* Email Body */}
            <div className="h-[400px] overflow-y-auto custom-scrollbar p-6 bg-white mx-4 my-4 rounded border border-[#EAF0F6] shadow-sm text-sm text-[#33475B] leading-relaxed">
              {selectedId === "re-engagement-inactive-trials" ? (
                <ReEngagementEmailBody />
              ) : selectedId === "welcome-drip-day-1" ? (
                <WelcomeDripEmailBody />
              ) : selectedId === "february-product-update" ? (
                <FebruaryUpdateEmailBody />
              ) : selectedId === "feature-adoption-nudges" ? (
                <FeatureAdoptionEmailBody />
              ) : selectedId === "trial-expiry-countdown" ? (
                <TrialExpiryEmailBody />
              ) : (
                <GenericEmailBody subject={email.subject} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Floating AI Button (below 1280px) */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="xl:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg flex items-center justify-center transition-colors"
      >
        <Sparkles size={20} strokeWidth={2} />
        {suggestions.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF7A59] rounded-full text-[10px] font-bold flex items-center justify-center">
            {suggestions.length}
          </span>
        )}
      </button>

      {/* AI Drawer Overlay (below 1280px) */}
      {drawerOpen && (
        <div className="xl:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-[380px] max-w-[90vw] bg-white shadow-xl flex flex-col animate-slide-in-right">
            <div className="p-4 border-b border-[#EAF0F6] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-purple-600" />
                <span className="font-semibold text-[#33475B]">AI Suggestions</span>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-[#516F90] hover:text-[#33475B] text-xl leading-none"
              >
                &times;
              </button>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4 bg-[#F9FBFC]">
              {suggestions.map((s, index) => (
                <div
                  key={s.id}
                  className="animate-slide-in-right"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <SuggestionCard
                    suggestion={s}
                    isApplied={appliedSuggestions.has(s.id)}
                    onApply={() => handleApply(s)}
                    onDismiss={() => handleDismiss(s.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Right Panel: AI Suggestions (1280px+) */}
      <section className="w-[380px] shrink-0 border-l border-[#EAF0F6] bg-white hidden xl:flex flex-col z-10 shadow-[-2px_0_8px_-4px_rgba(0,0,0,0.05)]">
        {/* Header */}
        <div className="p-5 border-b border-[#EAF0F6] flex justify-between items-center bg-[#FAFAFE]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-purple-100 flex items-center justify-center border border-purple-200">
              <Sparkles
                size={14}
                strokeWidth={2}
                className="text-purple-600"
              />
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-tight text-[#33475B] leading-tight">
                AI Suggestions
              </h2>
              <span className="text-[11px] text-[#516F90] font-medium">
                {suggestions.length} opportunities found
              </span>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="w-7 h-7 flex items-center justify-center rounded text-[#516F90] hover:bg-white hover:text-[#33475B] border border-transparent hover:border-[#EAF0F6] transition-all shadow-sm disabled:opacity-50"
          >
            <RefreshCw
              size={12}
              strokeWidth={2}
              className={refreshing ? "animate-spin" : ""}
            />
          </button>
        </div>

        {/* Suggestions List + Chat */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4 bg-[#F9FBFC]">
          {refreshing ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white border border-[#EAF0F6] rounded-lg p-4 shadow-sm"
                >
                  <div className="flex gap-2 mb-3">
                    <div className="h-4 w-20 skeleton rounded" />
                    <div className="h-4 w-16 skeleton rounded" />
                  </div>
                  <div className="h-4 w-3/4 skeleton rounded mb-2" />
                  <div className="h-3 w-full skeleton rounded mb-1.5" />
                  <div className="h-3 w-5/6 skeleton rounded mb-3" />
                  <div className="flex justify-between">
                    <div className="h-3 w-24 skeleton rounded" />
                    <div className="h-6 w-16 skeleton rounded" />
                  </div>
                </div>
              ))}
            </>
          ) : (
            suggestions.map((s, index) => (
              <div
                key={s.id}
                className="animate-slide-in-right"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <SuggestionCard
                  suggestion={s}
                  isApplied={appliedSuggestions.has(s.id)}
                  onApply={() => handleApply(s)}
                  onDismiss={() => handleDismiss(s.id)}
                />
              </div>
            ))
          )}

          {/* Chat Messages */}
          {chatMessages.length > 0 && (
            <div className="border-t border-[#EAF0F6] pt-4 mt-4 space-y-3">
              <span className="text-[10px] font-medium text-[#516F90] uppercase tracking-wider">
                Conversation
              </span>
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#FF7A59]/10 text-[#33475B] border border-[#FF7A59]/20"
                        : "bg-white text-[#33475B] border border-[#EAF0F6] shadow-sm"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <div className="flex items-center gap-1.5 mb-1">
                        <Sparkles
                          size={10}
                          className="text-purple-500"
                        />
                        <span className="text-[10px] font-medium text-purple-600">
                          Claude
                        </span>
                      </div>
                    )}
                    {msg.content || (
                      <span className="flex gap-1 py-1">
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-[#EAF0F6] bg-white shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
          <div className="relative flex items-end bg-[#F5F8FA] border border-[#cbd6e2] rounded-lg p-2 focus-within:border-purple-400 focus-within:ring-1 focus-within:ring-purple-400/20 transition-all">
            <textarea
              rows={2}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleChatSend();
                }
              }}
              placeholder="Ask AI about this email..."
              className="bg-transparent border-none outline-none text-sm text-[#33475B] w-full resize-none placeholder-[#516F90]/60 p-1 custom-scrollbar"
            />
            <button
              onClick={handleChatSend}
              disabled={isStreaming || !chatInput.trim()}
              className="w-8 h-8 rounded-full bg-[#FF7A59] hover:bg-[#e86c4f] flex items-center justify-center text-white shrink-0 transition-colors shadow-sm self-end mb-0.5 mr-0.5 disabled:opacity-50"
            >
              {isStreaming ? (
                <Loader2 size={14} strokeWidth={2.5} className="animate-spin" />
              ) : (
                <ArrowUp size={14} strokeWidth={2.5} />
              )}
            </button>
          </div>
          <div className="text-center mt-2">
            <span className="text-[10px] text-[#cbd6e2] font-medium tracking-wide flex items-center justify-center gap-1">
              <Sparkles size={10} />
              Powered by Claude
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

function SuggestionCard({
  suggestion: s,
  isApplied,
  onApply,
  onDismiss,
}: {
  suggestion: Suggestion;
  isApplied: boolean;
  onApply: () => void;
  onDismiss: () => void;
}) {
  if (isApplied) {
    return (
      <div className="bg-white border border-[#EAF0F6] border-l-4 border-l-emerald-500 rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
            <Check size={12} strokeWidth={2.5} className="text-emerald-600" />
          </div>
          <span className="text-sm font-semibold text-[#33475B]">
            {s.title}
          </span>
        </div>
        {s.estimatedImpact && (
          <p className="text-xs text-emerald-600 font-medium mt-1.5 ml-7">
            {s.estimatedImpact}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#EAF0F6] rounded-lg p-4 shadow-sm hover:border-purple-200 transition-colors group relative overflow-hidden">
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${s.categoryColorClasses}`}
        >
          {s.categoryLabel}
        </span>
        <span className="flex items-center gap-1 text-[10px] font-semibold text-[#33475B]">
          <div className={`w-1.5 h-1.5 rounded-full ${s.priorityDot}`} />
          {s.priority === "high"
            ? "High Priority"
            : s.priority === "medium"
            ? "Medium Priority"
            : "Low Priority"}
        </span>
      </div>

      <h3 className="text-sm font-semibold text-[#33475B] mb-1.5">
        {s.numberBadge && (
          <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[9px] font-bold mr-1.5 leading-none translate-y-[-1px]">
            {s.numberBadge}
          </span>
        )}
        {s.title}
      </h3>
      <p className="text-xs text-[#516F90] leading-relaxed mb-3">{s.body}</p>

      {s.alternatives && (
        <div className="bg-gray-50 border border-gray-100 rounded p-2 mb-3">
          <p className="text-[11px] text-[#516F90] mb-1 font-medium">
            Suggested alternatives:
          </p>
          <div className="text-xs text-[#33475B] font-medium space-y-1">
            {s.alternatives.map((alt, i) => (
              <div
                key={i}
                className="flex items-start gap-1.5 hover:text-[#0091AE] cursor-pointer"
              >
                <CheckCircle
                  size={12}
                  strokeWidth={2}
                  className="text-emerald-500 mt-0.5 shrink-0"
                />
                {alt}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-1">
        {s.estimatedImpact && (
          <span className="text-xs font-semibold text-emerald-600">
            {s.estimatedImpact}
          </span>
        )}
        <div className={`flex gap-2 ${!s.estimatedImpact ? "ml-auto" : ""}`}>
          <button
            onClick={onDismiss}
            className="text-xs font-medium text-[#516F90] hover:text-[#33475B] px-2 py-1"
          >
            Dismiss
          </button>
          {s.actionType === "apply" && (
            <button
              onClick={onApply}
              className="bg-[#0091AE] hover:bg-[#007a93] text-white px-3 py-1 rounded text-xs font-semibold shadow-sm transition-colors"
            >
              Apply
            </button>
          )}
          {s.actionType === "review" && (
            <button
              onClick={onApply}
              className="bg-white border border-[#0091AE] text-[#0091AE] hover:bg-sky-50 px-3 py-1 rounded text-xs font-semibold shadow-sm transition-colors"
            >
              Review options
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Email Body Components ---------- */

function ReEngagementEmailBody() {
  return (
    <>
      <p className="mb-4">Hi {"{{first_name}}"},</p>
      <p className="mb-4 bg-rose-50 ring-1 ring-rose-100 rounded px-1">
        It&apos;s been a while since we&apos;ve seen you around. We wanted to
        reach out and let you know that we&apos;ve been busy making things
        better for you.
      </p>
      <p className="mb-2">Here&apos;s what you&apos;ve missed:</p>
      <ul className="list-disc pl-5 mb-4 space-y-1 text-[#516F90]">
        <li>New dashboard redesign</li>
        <li>Improved reporting tools</li>
        <li>Faster load times across the platform</li>
      </ul>
      <p className="mb-4">
        As a special welcome back offer, use code{" "}
        <span className="bg-gray-100 px-2 py-0.5 font-mono text-xs rounded border border-gray-200">
          COMEBACK20
        </span>{" "}
        for 20% off your next month.
      </p>
      <p className="mb-2">But that&apos;s not all! We&apos;ve also launched:</p>
      <ul className="list-disc pl-5 mb-6 space-y-1 text-[#516F90]">
        <li>AI-powered insights</li>
        <li>Custom workflow builder</li>
        <li>Advanced segmentation</li>
      </ul>
      <p className="mb-6 font-medium bg-amber-50 ring-1 ring-amber-100 rounded px-1">
        Don&apos;t miss out on these amazing updates. Come back and see
        what&apos;s new!
      </p>
      <div className="flex flex-wrap gap-3 mb-8 p-3 border-2 border-dashed border-rose-300 bg-rose-50/30 rounded-lg relative">
        <span className="absolute -top-2.5 left-3 bg-white px-1 text-[10px] font-bold text-rose-500 uppercase tracking-wider">
          Warning: 4 Competing CTAs
        </span>
        <span className="bg-[#FF7A59] text-white px-4 py-2 rounded text-xs font-semibold shadow-sm">
          Come Back Now
        </span>
        <span className="bg-gray-100 border border-gray-200 text-[#33475B] px-4 py-2 rounded text-xs font-semibold">
          View Updates
        </span>
        <span className="bg-gray-100 border border-gray-200 text-[#33475B] px-4 py-2 rounded text-xs font-semibold">
          Upgrade Plan
        </span>
        <span className="text-[#0091AE] px-2 py-2 text-xs font-semibold">
          Talk to Sales
        </span>
      </div>
      <p className="mb-1">Best,</p>
      <p className="mb-6 font-medium">The HubSpot Team</p>
      <p className="text-xs text-[#516F90] italic">
        P.S. This offer expires in 48 hours!
      </p>
    </>
  );
}

function WelcomeDripEmailBody() {
  return (
    <>
      <p className="mb-4">Hi {"{{first_name}}"},</p>
      <p className="mb-4">
        Welcome to the platform. You signed up yesterday — let&apos;s get you
        set up.
      </p>
      <p className="mb-4">
        The quickest way to see value is to connect your first data source. It
        takes about 3 minutes.
      </p>
      <div className="mb-6">
        <span className="bg-[#FF7A59] text-white px-4 py-2 rounded text-xs font-semibold shadow-sm inline-block">
          Connect a data source →
        </span>
      </div>
      <p className="mb-4">
        If you need help, reply to this email. A real person will answer.
      </p>
      <p className="text-[#516F90]">— The onboarding team</p>
    </>
  );
}

function FebruaryUpdateEmailBody() {
  return (
    <>
      <p className="mb-4">Hi {"{{first_name}}"},</p>
      <p className="mb-4">
        We shipped 3 features this quarter based on your feedback:
      </p>
      <ol className="list-decimal pl-5 mb-6 space-y-2 text-[#33475B]">
        <li>
          <strong>Faster reports</strong> — dashboards now load 2x faster
        </li>
        <li>
          <strong>Custom fields</strong> — add any data point to your contacts
        </li>
        <li>
          <strong>Slack integration</strong> — get notifications where you work
        </li>
      </ol>
      <p className="mb-6">See all updates in your account.</p>
      <div className="mb-6">
        <span className="bg-[#FF7A59] text-white px-4 py-2 rounded text-xs font-semibold shadow-sm inline-block">
          See what&apos;s new →
        </span>
      </div>
      <p className="mb-1">Best,</p>
      <p className="font-medium">The Product Team</p>
    </>
  );
}

function FeatureAdoptionEmailBody() {
  return (
    <>
      <p className="mb-4">Hi {"{{first_name}}"},</p>
      <p className="mb-4">
        You&apos;ve been using the platform for a few days now — nice work
        getting started! But there are a few powerful features you
        haven&apos;t tried yet.
      </p>
      <p className="mb-2 font-semibold">
        Here are 3 features that could save you hours:
      </p>
      <div className="mb-4 p-3 border-2 border-dashed border-amber-300 bg-amber-50/30 rounded-lg relative">
        <span className="absolute -top-2.5 left-3 bg-white px-1 text-[10px] font-bold text-amber-600 uppercase tracking-wider">
          Long content block
        </span>
        <div className="space-y-4 mt-1">
          <div>
            <p className="font-semibold mb-1">1. Automated Workflows</p>
            <p className="text-[#516F90] text-sm">
              Set up triggers that automatically move contacts through your
              pipeline. Our users save an average of 4 hours per week with
              automation. You can create your first workflow in under 5
              minutes using our templates. Choose from over 50 pre-built
              workflow templates designed for different use cases.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1">2. Custom Reports</p>
            <p className="text-[#516F90] text-sm">
              Build dashboards that show exactly what matters to your
              business. Drag and drop metrics, filter by any property, and
              share with your team. Reports update in real-time so you
              always have the latest data at your fingertips.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1">3. Email Sequences</p>
            <p className="text-[#516F90] text-sm">
              Create multi-step email campaigns that nurture leads
              automatically. Personalize each step based on engagement and
              behavior. Track opens, clicks, and replies all in one place.
            </p>
          </div>
        </div>
      </div>
      <p className="mb-4">
        Ready to explore? Click below to try any of these features.
      </p>
      <div className="flex flex-wrap gap-3 mb-6">
        <span className="bg-[#FF7A59] text-white px-4 py-2 rounded text-xs font-semibold shadow-sm">
          Try Workflows
        </span>
        <span className="bg-gray-100 border border-gray-200 text-[#33475B] px-4 py-2 rounded text-xs font-semibold">
          Build a Report
        </span>
        <span className="bg-gray-100 border border-gray-200 text-[#33475B] px-4 py-2 rounded text-xs font-semibold">
          Create a Sequence
        </span>
      </div>
      <p className="mb-1">Best,</p>
      <p className="font-medium">The Product Team</p>
    </>
  );
}

function TrialExpiryEmailBody() {
  return (
    <>
      <p className="mb-4">Hi {"{{first_name}}"},</p>
      <p className="mb-4 font-semibold text-base">
        Your trial ends in 3 days.
      </p>
      <p className="mb-4">
        In the last 11 days, you&apos;ve been building something great.
        Here&apos;s a snapshot of what you&apos;ll lose access to:
      </p>
      <div className="mb-4 p-3 bg-[#F5F8FA] border border-[#EAF0F6] rounded-lg">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-[#516F90]">Contacts added</span>
            <span className="font-semibold text-[#33475B]">142</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#516F90]">Dashboards created</span>
            <span className="font-semibold text-[#33475B]">3</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#516F90]">Reports built</span>
            <span className="font-semibold text-[#33475B]">7</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#516F90]">Emails sent</span>
            <span className="font-semibold text-[#33475B]">1,204</span>
          </div>
        </div>
      </div>
      <div className="mb-4 p-3 border-2 border-dashed border-amber-300 bg-amber-50/30 rounded-lg relative">
        <span className="absolute -top-2.5 left-3 bg-white px-1 text-[10px] font-bold text-amber-600 uppercase tracking-wider">
          Loss-aversion framing
        </span>
        <p className="text-sm mt-1">
          When your trial expires, all of this data will be archived and
          you&apos;ll lose access to your dashboards, reports, and
          automation workflows. Don&apos;t let your hard work go to waste.
        </p>
      </div>
      <p className="mb-6">
        Upgrade now to keep everything you&apos;ve built — plans start at
        $20/month.
      </p>
      <div className="mb-6">
        <span className="bg-[#FF7A59] text-white px-5 py-2.5 rounded text-sm font-semibold shadow-sm inline-block">
          Upgrade now →
        </span>
      </div>
      <p className="text-xs text-[#516F90]">
        Questions? Reply to this email or{" "}
        <span className="text-[#0091AE] underline cursor-pointer">
          schedule a call
        </span>{" "}
        with our team.
      </p>
      <p className="mt-4 mb-1">Best,</p>
      <p className="font-medium">The HubSpot Team</p>
    </>
  );
}

function GenericEmailBody({ subject }: { subject: string }) {
  return (
    <>
      <p className="mb-4">Hi {"{{first_name}}"},</p>
      <p className="mb-4 text-[#516F90]">
        [Email preview for &ldquo;{subject}&rdquo;]
      </p>
      <p className="text-[#516F90] text-xs italic">
        Full email content will be available when this campaign is selected for
        optimization.
      </p>
    </>
  );
}
