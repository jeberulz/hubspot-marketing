"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Megaphone,
  Rocket,
  Building2,
  User,
  UserPlus,
  TrendingUp,
  ShieldCheck,
  Upload,
  Link2,
  Database,
  Mail,
  MessageSquare,
  Smartphone,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Check,
} from "lucide-react";
import { useOnboarding } from "@/lib/onboarding/context";
import type {
  UserRole,
  UserGoal,
  ExperienceLevel,
} from "@/lib/onboarding/types";
import { SETUP_STEPS } from "@/lib/onboarding/constants";

// ─── Progress Dots ────────────────────────────────────────

function ProgressDots({
  current,
  total,
  completedSteps,
}: {
  current: number;
  total: number;
  completedSteps: number[];
}) {
  return (
    <div className="flex items-center gap-0">
      {Array.from({ length: total }, (_, i) => {
        const isComplete = completedSteps.includes(i);
        const isCurrent = i === current;
        return (
          <div key={i} className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                isComplete
                  ? "bg-[#FF7A59] border-[#FF7A59]"
                  : isCurrent
                    ? "border-[#FF7A59] bg-white"
                    : "border-[#cbd6e2] bg-white"
              }`}
            >
              {isComplete && (
                <Check size={8} className="text-white m-auto mt-px" />
              )}
            </div>
            {i < total - 1 && (
              <div
                className={`w-8 h-0.5 transition-colors duration-300 ${
                  isComplete ? "bg-[#FF7A59]" : "bg-[#EAF0F6]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Step 1: About You ────────────────────────────────────

function StepProfile({
  firstName,
  companyName,
  role,
  experienceLevel,
  onChange,
}: {
  firstName: string;
  companyName: string;
  role: UserRole | null;
  experienceLevel: ExperienceLevel | null;
  onChange: (field: string, value: string) => void;
}) {
  const roles: { value: UserRole; label: string; icon: typeof Megaphone }[] = [
    { value: "marketer", label: "Marketer", icon: Megaphone },
    { value: "founder", label: "Founder / CEO", icon: Rocket },
    { value: "agency", label: "Agency", icon: Building2 },
    { value: "other", label: "Other", icon: User },
  ];

  const levels: { value: ExperienceLevel; label: string }[] = [
    { value: "beginner", label: "Just starting out" },
    { value: "intermediate", label: "Some experience" },
    { value: "advanced", label: "Advanced" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-[#33475B] mb-1.5">
          First name
        </label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => onChange("firstName", e.target.value)}
          placeholder="Enter your first name"
          className="w-full bg-white border border-[#cbd6e2] rounded-lg px-4 py-2.5 text-sm text-[#33475B] placeholder:text-[#cbd6e2] focus:border-[#00A4BD] focus:ring-1 focus:ring-[#00A4BD]/20 outline-none transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#33475B] mb-1.5">
          Company name
        </label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => onChange("companyName", e.target.value)}
          placeholder="Your company or brand"
          className="w-full bg-white border border-[#cbd6e2] rounded-lg px-4 py-2.5 text-sm text-[#33475B] placeholder:text-[#cbd6e2] focus:border-[#00A4BD] focus:ring-1 focus:ring-[#00A4BD]/20 outline-none transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#33475B] mb-2">
          Your role
        </label>
        <div className="grid grid-cols-2 gap-3">
          {roles.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => onChange("role", value)}
              className={`flex items-center gap-3 p-3.5 rounded-lg border-2 text-left transition-all ${
                role === value
                  ? "border-[#00A4BD] bg-[#00A4BD]/5"
                  : "border-[#EAF0F6] bg-white hover:border-[#cbd6e2]"
              }`}
            >
              <Icon
                size={20}
                strokeWidth={1.5}
                className={
                  role === value ? "text-[#00A4BD]" : "text-[#516F90]"
                }
              />
              <span
                className={`text-sm font-medium ${role === value ? "text-[#00A4BD]" : "text-[#33475B]"}`}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#33475B] mb-2">
          Experience with email marketing
        </label>
        <div className="flex gap-3">
          {levels.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onChange("experienceLevel", value)}
              className={`flex-1 py-2.5 px-3 rounded-lg border-2 text-sm font-medium transition-all ${
                experienceLevel === value
                  ? "border-[#00A4BD] bg-[#00A4BD]/5 text-[#00A4BD]"
                  : "border-[#EAF0F6] bg-white text-[#33475B] hover:border-[#cbd6e2]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Step 1 Preview ───────────────────────────────────────

function PreviewProfile({
  firstName,
  companyName,
}: {
  firstName: string;
  companyName: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF7A59] to-[#FF957A] flex items-center justify-center mb-6 animate-scale-in">
        <span className="text-3xl font-semibold text-white">
          {firstName ? firstName[0].toUpperCase() : "?"}
        </span>
      </div>
      <p className="text-xl font-semibold text-[#33475B] mb-2">
        {firstName ? `Hi ${firstName}!` : "Hello there!"}
      </p>
      <p className="text-sm text-[#516F90]">
        {companyName
          ? `Let's set up ${companyName}'s message strategy.`
          : "Let's get your message strategy set up."}
      </p>
    </div>
  );
}

// ─── Step 2: Goal ─────────────────────────────────────────

function StepGoal({
  goal,
  onChange,
}: {
  goal: UserGoal | null;
  onChange: (goal: UserGoal) => void;
}) {
  const goals: {
    value: UserGoal;
    label: string;
    desc: string;
    icon: typeof UserPlus;
  }[] = [
    {
      value: "grow-list",
      label: "Grow my list",
      desc: "Attract new subscribers and expand your reach.",
      icon: UserPlus,
    },
    {
      value: "improve-engagement",
      label: "Improve engagement",
      desc: "Boost open rates, clicks, and conversions.",
      icon: TrendingUp,
    },
    {
      value: "reduce-churn",
      label: "Reduce churn",
      desc: "Prevent unsubscribes and re-engage dormant users.",
      icon: ShieldCheck,
    },
    {
      value: "launch-product",
      label: "Launch a product",
      desc: "Build hype and drive signups for something new.",
      icon: Rocket,
    },
  ];

  return (
    <div>
      <p className="text-sm text-[#516F90] mb-5">
        This helps us tailor your dashboard and AI suggestions.
      </p>
      <div className="grid grid-cols-1 gap-3">
        {goals.map(({ value, label, desc, icon: Icon }) => (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={`flex items-start gap-4 p-4 rounded-lg border-2 text-left transition-all ${
              goal === value
                ? "border-[#00A4BD] bg-[#00A4BD]/5"
                : "border-[#EAF0F6] bg-white hover:border-[#cbd6e2]"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                goal === value ? "bg-[#00A4BD]/10" : "bg-[#F5F8FA]"
              }`}
            >
              <Icon
                size={20}
                strokeWidth={1.5}
                className={
                  goal === value ? "text-[#00A4BD]" : "text-[#516F90]"
                }
              />
            </div>
            <div>
              <div
                className={`text-sm font-semibold mb-0.5 ${goal === value ? "text-[#00A4BD]" : "text-[#33475B]"}`}
              >
                {label}
              </div>
              <div className="text-xs text-[#516F90]">{desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Step 2 Preview ───────────────────────────────────────

function PreviewGoal({ goal }: { goal: UserGoal | null }) {
  const metrics: Record<
    UserGoal,
    { highlight: string; label: string; value: string }
  > = {
    "grow-list": {
      highlight: "text-[#00A4BD]",
      label: "Subscriber growth",
      value: "+24%",
    },
    "improve-engagement": {
      highlight: "text-emerald-600",
      label: "Open rate",
      value: "38.2%",
    },
    "reduce-churn": {
      highlight: "text-amber-600",
      label: "Unsubscribe rate",
      value: "0.4%",
    },
    "launch-product": {
      highlight: "text-[#FF7A59]",
      label: "Signups",
      value: "1,240",
    },
  };

  const m = goal ? metrics[goal] : null;

  return (
    <div className="flex flex-col items-center justify-center h-full px-8">
      <div className="w-full max-w-[280px] bg-white rounded-xl border border-[#EAF0F6] shadow-sm p-5">
        <div className="text-xs text-[#516F90] mb-1">Key metric</div>
        {m ? (
          <div className="animate-fade-in">
            <div className={`text-3xl font-semibold tracking-tight ${m.highlight}`}>
              {m.value}
            </div>
            <div className="text-sm text-[#516F90] mt-1">{m.label}</div>
          </div>
        ) : (
          <div className="text-2xl font-semibold text-[#cbd6e2]">--</div>
        )}
      </div>
    </div>
  );
}

// ─── Step 3: Import Contacts ──────────────────────────────

function StepImport({
  importMethod,
  isImporting,
  importComplete,
  onSelect,
}: {
  importMethod: string | null;
  isImporting: boolean;
  importComplete: boolean;
  onSelect: (method: string) => void;
}) {
  return (
    <div>
      <p className="text-sm text-[#516F90] mb-5">
        Add your contacts to start tracking messaging health across segments.
      </p>
      <div className="space-y-3">
        {/* Upload CSV */}
        <button
          onClick={() => onSelect("csv")}
          disabled={isImporting}
          className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 text-left transition-all ${
            importMethod === "csv"
              ? "border-[#00A4BD] bg-[#00A4BD]/5"
              : "border-[#EAF0F6] bg-white hover:border-[#cbd6e2]"
          } ${isImporting ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          <div className="w-10 h-10 rounded-lg bg-[#F5F8FA] flex items-center justify-center">
            <Upload size={20} strokeWidth={1.5} className="text-[#516F90]" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-[#33475B]">
              Upload a CSV
            </div>
            <div className="text-xs text-[#516F90]">
              Import contacts from a spreadsheet
            </div>
          </div>
          {importMethod === "csv" && importComplete && (
            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center animate-check-bounce">
              <Check size={14} className="text-white" />
            </div>
          )}
        </button>

        {/* Connect tool (disabled) */}
        <div className="w-full flex items-center gap-4 p-4 rounded-lg border-2 border-[#EAF0F6] bg-[#F5F8FA]/50 opacity-60">
          <div className="w-10 h-10 rounded-lg bg-[#F5F8FA] flex items-center justify-center">
            <Link2 size={20} strokeWidth={1.5} className="text-[#516F90]" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-[#33475B]">
              Connect from another tool
            </div>
            <div className="text-xs text-[#516F90]">
              Mailchimp, Gmail, Salesforce
            </div>
          </div>
          <span className="text-[10px] font-medium text-[#516F90] bg-[#EAF0F6] px-2 py-0.5 rounded-full">
            Coming soon
          </span>
        </div>

        {/* Sample data */}
        <button
          onClick={() => onSelect("sample")}
          disabled={isImporting}
          className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 text-left transition-all ${
            importMethod === "sample"
              ? "border-[#00A4BD] bg-[#00A4BD]/5"
              : "border-[#EAF0F6] bg-white hover:border-[#cbd6e2]"
          } ${isImporting ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          <div className="w-10 h-10 rounded-lg bg-[#F5F8FA] flex items-center justify-center">
            <Database size={20} strokeWidth={1.5} className="text-[#516F90]" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-[#33475B]">
              Use sample data
            </div>
            <div className="text-xs text-[#516F90]">
              Explore with demo contacts first
            </div>
          </div>
          {importMethod === "sample" && importComplete && (
            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center animate-check-bounce">
              <Check size={14} className="text-white" />
            </div>
          )}
        </button>
      </div>

      {isImporting && (
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs text-[#516F90] mb-2">
            <span>Importing contacts...</span>
            <span>Please wait</span>
          </div>
          <div className="h-2 bg-[#EAF0F6] rounded-full overflow-hidden">
            <div className="h-full bg-[#00A4BD] rounded-full animate-progress-bar transition-all duration-2000" />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Step 3 Preview ───────────────────────────────────────

function PreviewImport({
  importComplete,
  contactCount,
}: {
  importComplete: boolean;
  contactCount: number;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8">
      {importComplete ? (
        <div className="text-center animate-fade-in">
          <div className="text-5xl font-semibold tracking-tight text-[#00A4BD] mb-2">
            {contactCount.toLocaleString()}
          </div>
          <div className="text-sm text-[#516F90]">contacts imported</div>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-5xl font-semibold tracking-tight text-[#cbd6e2] mb-2">
            0
          </div>
          <div className="text-sm text-[#cbd6e2]">contacts</div>
        </div>
      )}
    </div>
  );
}

// ─── Step 4: Guardrails ───────────────────────────────────

function StepGuardrails({
  emailLimit,
  smsLimit,
  whatsappLimit,
  onChange,
}: {
  emailLimit: number;
  smsLimit: number;
  whatsappLimit: number;
  onChange: (field: string, value: number) => void;
}) {
  const channels = [
    {
      key: "emailLimit",
      label: "Email",
      icon: Mail,
      value: emailLimit,
      color: "#00A4BD",
    },
    {
      key: "smsLimit",
      label: "SMS",
      icon: MessageSquare,
      value: smsLimit,
      color: "#00BDA5",
    },
    {
      key: "whatsappLimit",
      label: "WhatsApp",
      icon: Smartphone,
      value: whatsappLimit,
      color: "#00C853",
    },
  ];

  return (
    <div>
      <p className="text-sm text-[#516F90] mb-3">
        Guardrails automatically prevent your contacts from being
        over-messaged. Set a maximum per channel per week.
      </p>

      {/* AI recommendation */}
      <div className="bg-[#F0F1FA] rounded-lg p-4 mb-6 flex items-start gap-3">
        <Sparkles size={16} className="text-[#6C63FF] mt-0.5 shrink-0" />
        <div className="text-xs text-[#33475B]">
          <span className="font-semibold">AI recommendation:</span> Based on
          industry averages, we suggest starting with 4 emails, 2 SMS, and 2
          WhatsApp messages per contact per week.
        </div>
      </div>

      <div className="space-y-5">
        {channels.map(({ key, label, icon: Icon, value, color }) => (
          <div key={key}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Icon size={16} strokeWidth={1.5} style={{ color }} />
                <span className="text-sm font-medium text-[#33475B]">
                  {label}
                </span>
              </div>
              <span className="text-xs text-[#516F90]">
                max {value} / week
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={10}
              value={value}
              onChange={(e) => onChange(key, Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${color} ${value * 10}%, #EAF0F6 ${value * 10}%)`,
              }}
            />
            <div className="flex justify-between text-[10px] text-[#cbd6e2] mt-1">
              <span>0</span>
              <span>10</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Step 4 Preview ───────────────────────────────────────

function PreviewGuardrails({
  emailLimit,
  smsLimit,
  whatsappLimit,
}: {
  emailLimit: number;
  smsLimit: number;
  whatsappLimit: number;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8">
      <div className="w-full max-w-[280px] bg-white rounded-xl border border-[#EAF0F6] shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck size={16} strokeWidth={1.5} className="text-[#00A4BD]" />
          <span className="text-sm font-semibold text-[#33475B]">
            Your Guardrails
          </span>
        </div>
        <div className="space-y-3">
          {[
            { label: "Email", value: emailLimit, color: "#00A4BD" },
            { label: "SMS", value: smsLimit, color: "#00BDA5" },
            { label: "WhatsApp", value: whatsappLimit, color: "#00C853" },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-xs text-[#516F90]">{label}</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-1.5 bg-[#EAF0F6] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${value * 10}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
                <span className="text-xs font-semibold text-[#33475B] w-8 text-right">
                  {value}/wk
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Step 5: AI Demo ──────────────────────────────────────

function StepAiDemo({
  typedText,
  showSuggestions,
}: {
  typedText: string;
  showSuggestions: boolean;
}) {
  return (
    <div>
      <p className="text-sm text-[#516F90] mb-5">
        Every email you create gets AI-powered analysis and optimization
        suggestions in real time.
      </p>

      {/* Mock email */}
      <div className="bg-[#F5F8FA] rounded-lg p-4 mb-5 border border-[#EAF0F6]">
        <div className="text-[10px] text-[#516F90] mb-1">SUBJECT LINE</div>
        <div className="text-sm font-medium text-[#33475B]">
          We miss you! Here&apos;s 20% off everything
        </div>
        <div className="mt-2 text-[10px] text-[#516F90]">AI SCORE</div>
        <div className="flex items-center gap-2 mt-0.5">
          <div className="text-lg font-semibold text-rose-600">38</div>
          <div className="text-xs text-rose-600">Needs revision</div>
        </div>
      </div>

      {/* AI response */}
      <div className="bg-white rounded-lg border border-[#EAF0F6] p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-[#F0F1FA] flex items-center justify-center">
            <Sparkles size={12} className="text-[#6C63FF]" />
          </div>
          <span className="text-xs font-semibold text-[#33475B]">
            AI Assistant
          </span>
        </div>
        <div className="text-sm text-[#33475B] leading-relaxed min-h-[60px]">
          {typedText}
          <span className="inline-block w-0.5 h-4 bg-[#33475B] ml-0.5 animate-cursor-blink" />
        </div>

        {showSuggestions && (
          <div className="mt-4 space-y-2">
            <div className="text-[10px] text-[#516F90] font-medium">
              SUGGESTED ALTERNATIVES
            </div>
            <div
              className="bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 text-sm text-emerald-800 animate-slide-in-right"
              style={{ animationDelay: "0ms" }}
            >
              &ldquo;Quick question about your trial setup&rdquo;
            </div>
            <div
              className="bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 text-sm text-emerald-800 animate-slide-in-right"
              style={{ animationDelay: "150ms" }}
            >
              &ldquo;3 tools to save you 4 hours this week&rdquo;
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Step 5 Preview ───────────────────────────────────────

function PreviewAiDemo({ showSuggestions }: { showSuggestions: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8">
      <div className="text-center">
        <div
          className={`text-5xl font-semibold tracking-tight mb-2 transition-all duration-700 ${
            showSuggestions ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {showSuggestions ? "82" : "38"}
        </div>
        <div className="text-sm text-[#516F90]">
          {showSuggestions ? "After AI optimization" : "Before AI optimization"}
        </div>
      </div>
    </div>
  );
}

// ─── Confetti ─────────────────────────────────────────────

function Confetti() {
  const colors = [
    "#FF7A59",
    "#00A4BD",
    "#00BDA5",
    "#6C63FF",
    "#FFD700",
    "#FF6B9D",
  ];
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: 40 }, (_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: colors[i % colors.length],
            animation: `confettiFall ${2 + Math.random() * 2}s ease-out forwards`,
            animationDelay: `${Math.random() * 500}ms`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Completion Screen ────────────────────────────────────

function CompletionScreen({
  firstName,
  onFinish,
}: {
  firstName: string;
  onFinish: () => void;
}) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#F5F8FA] to-white relative">
      <Confetti />
      <div className="relative z-10 text-center max-w-md px-6 animate-scale-in">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
          <Check size={32} strokeWidth={2} className="text-emerald-600" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-[#33475B] mb-3">
          You&apos;re all set{firstName ? `, ${firstName}` : ""}!
        </h1>
        <p className="text-base text-[#516F90] mb-8 leading-relaxed">
          Your message strategy is ready. We&apos;ve set up your guardrails, imported
          your contacts, and your AI assistant is standing by.
        </p>
        <button
          onClick={onFinish}
          className="px-8 py-3 bg-[#FF7A59] hover:bg-[#e86c4f] text-white text-base font-medium rounded-lg transition-colors shadow-sm"
        >
          Go to your dashboard
        </button>
      </div>
    </div>
  );
}

// ─── Main Setup Page ──────────────────────────────────────

export default function SetupPage() {
  const router = useRouter();
  const { state, updateOnboarding, setPhase, completeMilestone } =
    useOnboarding();

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);

  // Profile state
  const [firstName, setFirstName] = useState(state.profile.firstName);
  const [companyName, setCompanyName] = useState(state.profile.companyName);
  const [role, setRole] = useState<UserRole | null>(state.profile.role);
  const [experienceLevel, setExperienceLevel] =
    useState<ExperienceLevel | null>(state.profile.experienceLevel);

  // Goal state
  const [goal, setGoal] = useState<UserGoal | null>(state.profile.goal);

  // Import state
  const [importMethod, setImportMethod] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importComplete, setImportComplete] = useState(false);

  // Guardrails state
  const [emailLimit, setEmailLimit] = useState(4);
  const [smsLimit, setSmsLimit] = useState(2);
  const [whatsappLimit, setWhatsappLimit] = useState(2);

  // AI demo state
  const [typedText, setTypedText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const aiDemoText =
    "I noticed this subject line might trigger spam filters. The phrase \"20% off\" and exclamation patterns reduce deliverability. Here are two alternatives that could improve your open rate by ~12%...";

  // Typing effect for AI demo
  useEffect(() => {
    if (currentStep !== 4) return;
    setTypedText("");
    setShowSuggestions(false);

    let i = 0;
    const interval = setInterval(() => {
      if (i < aiDemoText.length) {
        setTypedText(aiDemoText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowSuggestions(true), 300);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [currentStep]);

  // Import simulation
  const handleImportSelect = useCallback((method: string) => {
    setImportMethod(method);
    setIsImporting(true);
    setImportComplete(false);
    setTimeout(() => {
      setIsImporting(false);
      setImportComplete(true);
    }, 2000);
  }, []);

  const handleProfileChange = useCallback(
    (field: string, value: string) => {
      switch (field) {
        case "firstName":
          setFirstName(value);
          break;
        case "companyName":
          setCompanyName(value);
          break;
        case "role":
          setRole(value as UserRole);
          break;
        case "experienceLevel":
          setExperienceLevel(value as ExperienceLevel);
          break;
      }
    },
    []
  );

  const handleGuardrailChange = useCallback(
    (field: string, value: number) => {
      switch (field) {
        case "emailLimit":
          setEmailLimit(value);
          break;
        case "smsLimit":
          setSmsLimit(value);
          break;
        case "whatsappLimit":
          setWhatsappLimit(value);
          break;
      }
    },
    []
  );

  const canAdvance = () => {
    switch (currentStep) {
      case 0:
        return firstName.trim().length > 0;
      case 1:
        return goal !== null;
      case 2:
        return importComplete;
      case 3:
        return true; // guardrails are optional
      case 4:
        return true; // AI demo auto-completes
      default:
        return false;
    }
  };

  const handleNext = () => {
    const newCompleted = [...completedSteps, currentStep];
    setCompletedSteps(newCompleted);

    if (currentStep === SETUP_STEPS.length - 1) {
      // Save everything and show completion
      updateOnboarding({
        phase: "first-actions",
        profile: {
          firstName,
          companyName,
          role,
          goal,
          experienceLevel,
        },
        completedSetupSteps: newCompleted,
        setupCompletedAt: new Date().toISOString(),
        hasSeenAiDemo: true,
      });
      completeMilestone("importedContacts");
      completeMilestone("setGuardrails");
      setShowCompletion(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleFinish = () => {
    setPhase("first-actions");
    router.push("/marketing/messages");
  };

  if (showCompletion) {
    return <CompletionScreen firstName={firstName} onFinish={handleFinish} />;
  }

  const stepTitles = [
    "Tell us about you",
    "What's your primary goal?",
    "Import your contacts",
    "Set your first guardrail",
    "Your AI assistant is ready",
  ];

  return (
    <div className="h-full w-full flex bg-gradient-to-b from-[#F5F8FA] to-white">
      {/* Left Preview Panel */}
      <div className="hidden lg:flex w-[40%] bg-[#F5F8FA] border-r border-[#EAF0F6] items-center justify-center p-8">
        {currentStep === 0 && (
          <PreviewProfile firstName={firstName} companyName={companyName} />
        )}
        {currentStep === 1 && <PreviewGoal goal={goal} />}
        {currentStep === 2 && (
          <PreviewImport
            importComplete={importComplete}
            contactCount={2340}
          />
        )}
        {currentStep === 3 && (
          <PreviewGuardrails
            emailLimit={emailLimit}
            smsLimit={smsLimit}
            whatsappLimit={whatsappLimit}
          />
        )}
        {currentStep === 4 && (
          <PreviewAiDemo showSuggestions={showSuggestions} />
        )}
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <div className="px-8 pt-8 pb-0">
          <div className="flex items-center justify-between mb-6">
            <div className="text-xs text-[#516F90]">
              Step {currentStep + 1} of {SETUP_STEPS.length}
            </div>
            <ProgressDots
              current={currentStep}
              total={SETUP_STEPS.length}
              completedSteps={completedSteps}
            />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#33475B] mb-6">
            {stepTitles[currentStep]}
          </h2>
        </div>

        {/* Form Content (scrollable) */}
        <div className="flex-1 overflow-y-auto px-8 pb-4">
          <div className="max-w-md animate-fade-in" key={currentStep}>
            {currentStep === 0 && (
              <StepProfile
                firstName={firstName}
                companyName={companyName}
                role={role}
                experienceLevel={experienceLevel}
                onChange={handleProfileChange}
              />
            )}
            {currentStep === 1 && (
              <StepGoal goal={goal} onChange={setGoal} />
            )}
            {currentStep === 2 && (
              <StepImport
                importMethod={importMethod}
                isImporting={isImporting}
                importComplete={importComplete}
                onSelect={handleImportSelect}
              />
            )}
            {currentStep === 3 && (
              <StepGuardrails
                emailLimit={emailLimit}
                smsLimit={smsLimit}
                whatsappLimit={whatsappLimit}
                onChange={handleGuardrailChange}
              />
            )}
            {currentStep === 4 && (
              <StepAiDemo
                typedText={typedText}
                showSuggestions={showSuggestions}
              />
            )}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="px-8 py-5 border-t border-[#EAF0F6] flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              currentStep === 0
                ? "text-[#cbd6e2] cursor-not-allowed"
                : "text-[#516F90] hover:text-[#33475B]"
            }`}
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!canAdvance()}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              canAdvance()
                ? "bg-[#FF7A59] hover:bg-[#e86c4f] text-white"
                : "bg-[#EAF0F6] text-[#cbd6e2] cursor-not-allowed"
            }`}
          >
            {currentStep === SETUP_STEPS.length - 1 ? "Finish" : "Continue"}
            {currentStep < SETUP_STEPS.length - 1 && <ArrowRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
