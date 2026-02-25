"use client";

import { useState, useEffect, useRef } from "react";
import {
  Layers,
  Users,
  Sparkles,
  Database,
  Puzzle,
  Eye,
  Shield,
  Server,
  Swords,
  Map,
  FileText,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Brain,
  Target,
  GitMerge,
  Workflow,
  Lock,
  Globe,
  BarChart2,
  TrendingUp,
  Clock,
  MessageSquare,
  Mail,
  Cpu,
  Bot,
  Gauge,
  Lightbulb,
  CircleDot,
} from "lucide-react";

/* ─────────────────────── Table of Contents config ─────────────────────── */

const sections = [
  { id: "executive", label: "Executive Summary", icon: FileText },
  { id: "architecture", label: "Systems Architecture", icon: Layers },
  { id: "integration", label: "Integration Map", icon: GitMerge },
  { id: "teams", label: "Teams & Stakeholders", icon: Users },
  { id: "agentic", label: "Agentic AI Roadmap", icon: Bot },
  { id: "ml", label: "Data & ML Infrastructure", icon: Database },
  { id: "platform", label: "Platform Thinking", icon: Puzzle },
  { id: "observability", label: "Observability & Loops", icon: Eye },
  { id: "ethics", label: "Ethics & Compliance", icon: Shield },
  { id: "scaling", label: "Scaling & Reliability", icon: Server },
  { id: "competitive", label: "Competitive Landscape", icon: Swords },
  { id: "roadmap", label: "Phased Roadmap", icon: Map },
  { id: "adrs", label: "Architecture Decisions", icon: Lightbulb },
];

/* ─────────────────────── Collapsible Section ─────────────────────── */

function Section({
  id,
  icon: Icon,
  title,
  subtitle,
  children,
  defaultOpen = true,
  accentColor = "#00A4BD",
}: {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  accentColor?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section id={id} className="scroll-mt-24 strategy-section">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 group cursor-pointer py-2"
      >
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
          style={{ backgroundColor: `${accentColor}12` }}
        >
          <Icon size={22} strokeWidth={1.5} style={{ color: accentColor }} />
        </div>
        <div className="flex-1 text-left">
          <h2 className="text-xl font-semibold tracking-tight text-[#33475B] group-hover:text-[#00A4BD] transition-colors">
            {title}
          </h2>
          <p className="text-sm text-[#516F90] mt-0.5">{subtitle}</p>
        </div>
        <div className="text-[#516F90] transition-transform duration-200">
          {open ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[8000px] opacity-100 mt-6" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <div className="pl-[60px]">{children}</div>
      </div>
      <div className="border-b border-[#EAF0F6] mt-8 mb-8" />
    </section>
  );
}

/* ─────────────────────── Sub-components ─────────────────────── */

function InfoCard({
  title,
  children,
  accent = "#00A4BD",
}: {
  title: string;
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <div
      className="bg-white border border-[#EAF0F6] rounded-lg p-5 shadow-sm"
      style={{ borderLeftColor: accent, borderLeftWidth: 3 }}
    >
      <h4 className="text-sm font-semibold text-[#33475B] mb-2">{title}</h4>
      <div className="text-sm text-[#516F90] leading-relaxed">{children}</div>
    </div>
  );
}

function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto custom-scrollbar rounded-lg border border-[#EAF0F6]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#F5F8FA] border-b border-[#EAF0F6]">
            {headers.map((h, i) => (
              <th
                key={i}
                className="text-left px-4 py-3 font-semibold text-[#33475B] whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-[#EAF0F6] last:border-0 hover:bg-[#F9FBFC] transition-colors"
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 text-[#516F90] ${
                    j === 0 ? "font-medium text-[#33475B]" : ""
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MetricBox({
  value,
  label,
  color = "#00A4BD",
}: {
  value: string;
  label: string;
  color?: string;
}) {
  return (
    <div className="bg-white border border-[#EAF0F6] rounded-lg p-4 shadow-sm text-center">
      <div
        className="text-2xl font-semibold tracking-tight"
        style={{ color }}
      >
        {value}
      </div>
      <div className="text-xs text-[#516F90] mt-1">{label}</div>
    </div>
  );
}

function ArchBox({
  label,
  sub,
  color = "#00A4BD",
}: {
  label: string;
  sub: string;
  color?: string;
}) {
  return (
    <div
      className="rounded-lg px-4 py-3 text-center border"
      style={{
        borderColor: `${color}30`,
        backgroundColor: `${color}08`,
      }}
    >
      <div className="text-sm font-semibold" style={{ color }}>
        {label}
      </div>
      <div className="text-xs text-[#516F90] mt-0.5">{sub}</div>
    </div>
  );
}

function TimelinePhase({
  phase,
  title,
  months,
  color,
  items,
  active = false,
}: {
  phase: string;
  title: string;
  months: string;
  color: string;
  items: string[];
  active?: boolean;
}) {
  return (
    <div className="relative flex gap-5">
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 z-10"
          style={{ backgroundColor: color }}
        >
          {phase}
        </div>
        <div className="w-0.5 flex-1 bg-[#EAF0F6] -mt-px" />
      </div>
      {/* Content */}
      <div className={`pb-10 flex-1 ${active ? "" : ""}`}>
        <div className="flex items-baseline gap-3 mb-1">
          <h4 className="text-base font-semibold text-[#33475B]">{title}</h4>
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{
              color,
              backgroundColor: `${color}12`,
            }}
          >
            {months}
          </span>
        </div>
        <ul className="space-y-2 mt-3">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-[#516F90]">
              <CheckCircle2
                size={16}
                strokeWidth={1.5}
                className="shrink-0 mt-0.5"
                style={{ color }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ADRCard({
  number,
  title,
  decision,
  rationale,
  consequence,
}: {
  number: string;
  title: string;
  decision: string;
  rationale: string;
  consequence: string;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white border border-[#EAF0F6] rounded-lg shadow-sm overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 p-4 hover:bg-[#F9FBFC] transition-colors cursor-pointer"
      >
        <span className="text-xs font-semibold text-white bg-[#33475B] rounded px-2 py-0.5 shrink-0">
          {number}
        </span>
        <span className="text-sm font-semibold text-[#33475B] flex-1 text-left">
          {title}
        </span>
        <ChevronDown
          size={16}
          className={`text-[#516F90] transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          expanded ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        <div className="px-4 pb-4 space-y-3 border-t border-[#EAF0F6] pt-3">
          <div>
            <span className="text-xs font-semibold text-[#00A4BD] uppercase tracking-wider">
              Decision
            </span>
            <p className="text-sm text-[#516F90] mt-1 leading-relaxed">{decision}</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-[#FF7A59] uppercase tracking-wider">
              Rationale
            </span>
            <p className="text-sm text-[#516F90] mt-1 leading-relaxed">{rationale}</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-[#516F90] uppercase tracking-wider">
              Consequence
            </span>
            <p className="text-sm text-[#516F90] mt-1 leading-relaxed">{consequence}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AgentLevelCard({
  level,
  title,
  description,
  capabilities,
  color,
}: {
  level: string;
  title: string;
  description: string;
  capabilities: string[];
  color: string;
}) {
  return (
    <div
      className="bg-white border border-[#EAF0F6] rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
      style={{ borderTopColor: color, borderTopWidth: 3 }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ color, backgroundColor: `${color}12` }}
        >
          {level}
        </span>
        <h4 className="text-sm font-semibold text-[#33475B]">{title}</h4>
      </div>
      <p className="text-xs text-[#516F90] leading-relaxed mb-3">{description}</p>
      <div className="space-y-1.5">
        {capabilities.map((cap, i) => (
          <div key={i} className="flex items-start gap-2 text-xs text-[#516F90]">
            <Zap size={12} className="shrink-0 mt-0.5" style={{ color }} />
            <span>{cap}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────── Flow Diagram ─────────────────────── */

function FlowDiagram() {
  return (
    <div className="bg-[#F9FBFC] border border-[#EAF0F6] rounded-xl p-6 overflow-x-auto custom-scrollbar">
      <div className="flex items-center gap-3 min-w-[900px]">
        {/* Event Sources */}
        <div className="flex flex-col gap-2">
          <ArchBox label="Email Sends" sub="Event" color="#00A4BD" />
          <ArchBox label="SMS Sends" sub="Event" color="#00BDA5" />
          <ArchBox label="WhatsApp" sub="Event" color="#00C853" />
        </div>
        <ArrowRight size={20} className="text-[#cbd6e2] shrink-0" />
        {/* Event Bus */}
        <div className="flex flex-col items-center">
          <ArchBox label="Kafka Event Bus" sub="Message Broker" color="#FF7A59" />
        </div>
        <ArrowRight size={20} className="text-[#cbd6e2] shrink-0" />
        {/* Processing */}
        <div className="flex flex-col gap-2">
          <ArchBox label="Flink: Frequency Counter" sub="Real-time" color="#9333EA" />
          <ArchBox label="Flink: Segment Health" sub="Micro-batch" color="#9333EA" />
          <ArchBox label="Spark: Feature Extraction" sub="Daily batch" color="#9333EA" />
        </div>
        <ArrowRight size={20} className="text-[#cbd6e2] shrink-0" />
        {/* Storage */}
        <div className="flex flex-col gap-2">
          <ArchBox label="Redis" sub="Hot counters" color="#DC2626" />
          <ArchBox label="PostgreSQL" sub="Snapshots" color="#2563EB" />
          <ArchBox label="Feature Store" sub="ML features" color="#059669" />
        </div>
        <ArrowRight size={20} className="text-[#cbd6e2] shrink-0" />
        {/* Services */}
        <div className="flex flex-col gap-2">
          <ArchBox label="Guardrails Service" sub="<5ms p99" color="#00A4BD" />
          <ArchBox label="Scoring Service" sub="<500ms" color="#00A4BD" />
          <ArchBox label="AI Suggestions" sub="Async 2-10s" color="#00A4BD" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── Microservice Diagram ─────────────────────── */

function MicroserviceDiagram() {
  const services = [
    {
      name: "Segment Health Service",
      owns: "Real-time segment health computation",
      store: "Redis + PostgreSQL",
      scale: "Hourly recalculation for 1M segments",
      color: "#00A4BD",
    },
    {
      name: "Frequency Guardrails Service",
      owns: "Per-contact, per-channel messaging caps",
      store: "Redis sorted sets (sliding window)",
      scale: "In hot path: <5ms p99",
      color: "#FF7A59",
    },
    {
      name: "Email Scoring Service",
      owns: "4-dimension scoring algorithms + ML",
      store: "Feature Store + Redis cache",
      scale: "Millions of scores/day",
      color: "#9333EA",
    },
    {
      name: "AI Suggestions Service",
      owns: "LLM-powered optimization suggestions",
      store: "Prompt templates + RAG pipeline",
      scale: "Async, queued via SQS/Kafka",
      color: "#059669",
    },
    {
      name: "AI Chat Service",
      owns: "Streaming conversational co-pilot",
      store: "Redis session store",
      scale: "SSE streaming, tool-augmented",
      color: "#2563EB",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {services.map((s, i) => (
        <div
          key={i}
          className="bg-white border border-[#EAF0F6] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          style={{ borderTopColor: s.color, borderTopWidth: 3 }}
        >
          <h4 className="text-sm font-semibold text-[#33475B] mb-3">{s.name}</h4>
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-xs">
              <span className="font-semibold text-[#516F90] shrink-0 w-12">Owns</span>
              <span className="text-[#516F90]">{s.owns}</span>
            </div>
            <div className="flex items-start gap-2 text-xs">
              <span className="font-semibold text-[#516F90] shrink-0 w-12">Store</span>
              <span className="text-[#516F90]">{s.store}</span>
            </div>
            <div className="flex items-start gap-2 text-xs">
              <span className="font-semibold text-[#516F90] shrink-0 w-12">Scale</span>
              <span className="text-[#516F90]">{s.scale}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────── Main Page ─────────────────────── */

export default function SystemsStrategyPage() {
  const [activeSection, setActiveSection] = useState("executive");
  const [tocCollapsed, setTocCollapsed] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  /* Scroll spy – uses the scrollable content div as root */
  useEffect(() => {
    const scrollRoot = mainRef.current;
    if (!scrollRoot) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: scrollRoot, rootMargin: "-100px 0px -60% 0px", threshold: 0 }
    );

    const sectionEls = scrollRoot.querySelectorAll(".strategy-section");
    sectionEls.forEach((el) => {
      const sectionEl = el.querySelector("[id]");
      if (sectionEl) observer.observe(sectionEl);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-1 min-h-0 overflow-hidden">
      {/* ──────── Floating TOC Sidebar ──────── */}
      <aside
        className={`shrink-0 border-r border-[#EAF0F6] bg-white transition-all duration-300 hidden lg:flex flex-col ${
          tocCollapsed ? "w-[56px]" : "w-[260px]"
        }`}
      >
        <div className="px-4 py-5 border-b border-[#EAF0F6] flex items-center justify-between">
          {!tocCollapsed && (
            <div>
              <div className="text-xs font-semibold text-[#00A4BD] uppercase tracking-widest">
                Strategy
              </div>
              <div className="text-sm font-semibold text-[#33475B] mt-0.5">
                Table of Contents
              </div>
            </div>
          )}
          <button
            onClick={() => setTocCollapsed(!tocCollapsed)}
            className="w-7 h-7 rounded-md border border-[#EAF0F6] flex items-center justify-center hover:bg-[#F5F8FA] transition-colors"
          >
            <ChevronRight
              size={14}
              className={`text-[#516F90] transition-transform duration-200 ${
                tocCollapsed ? "" : "rotate-180"
              }`}
            />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 custom-scrollbar">
          {sections.map((s) => {
            const Icon = s.icon;
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#00A4BD]/5 text-[#00A4BD] border-r-2 border-[#00A4BD]"
                    : "text-[#516F90] hover:bg-[#F5F8FA] hover:text-[#33475B]"
                }`}
              >
                <Icon size={16} strokeWidth={1.5} className="shrink-0" />
                {!tocCollapsed && (
                  <span className="text-sm font-medium truncate">{s.label}</span>
                )}
              </button>
            );
          })}
        </nav>
        {!tocCollapsed && (
          <div className="p-4 border-t border-[#EAF0F6]">
            <div className="text-xs text-[#516F90] leading-relaxed">
              13 sections &middot; Systems-level thinking
              <br />
              for production at scale
            </div>
          </div>
        )}
      </aside>

      {/* ──────── Main Content ──────── */}
      <div ref={mainRef} className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Hero Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#2D3E50] via-[#33475B] to-[#1e2a38]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }} />
          <div className="relative z-10 max-w-[1100px] mx-auto px-10 py-14">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[#FF7A59] flex items-center justify-center">
                <Layers size={18} strokeWidth={1.5} className="text-white" />
              </div>
              <span className="text-xs font-semibold text-[#FF7A59] uppercase tracking-widest">
                Systems-Level Strategy
              </span>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white mb-3 leading-tight max-w-3xl">
              Message Strategy & Optimizer
              <span className="text-[#00A4BD]"> at Scale</span>
            </h1>
            <p className="text-base text-[#cbd6e2] leading-relaxed max-w-2xl mb-8">
              From prototype to platform. A principal-level systems document covering
              architecture, team engagement, agentic AI, ML infrastructure, and the
              phased roadmap to ship this feature inside HubSpot.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "5 Microservices", icon: Server },
                { label: "6 AI Agent Levels", icon: Bot },
                { label: "5 ML Models", icon: Brain },
                { label: "4-Phase Roadmap", icon: Map },
                { label: "200K+ Portals", icon: Globe },
              ].map((tag, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-3.5 py-1.5 text-sm text-[#cbd6e2]"
                >
                  <tag.icon size={14} strokeWidth={1.5} />
                  <span className="font-medium">{tag.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content sections */}
        <div className="max-w-[1100px] mx-auto px-10 py-12">
          {/* ═══════════════ 1. Executive Summary ═══════════════ */}
          <Section
            id="executive"
            icon={FileText}
            title="Executive Summary"
            subtitle="What we built and the systems lens we're applying"
          >
            <div className="space-y-5">
              <p className="text-sm text-[#516F90] leading-relaxed">
                This document takes the <strong className="text-[#33475B]">AI-powered Message Strategy & Optimizer</strong> prototype
                and designs the systems, teams, data infrastructure, and phased roadmap required to ship it as a production
                feature inside HubSpot at scale. Every section is opinionated, specific, and grounded in what was actually built.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricBox value="6" label="Audience Segments" color="#00A4BD" />
                <MetricBox value="23" label="Campaigns Modeled" color="#FF7A59" />
                <MetricBox value="3" label="AI API Routes" color="#9333EA" />
                <MetricBox value="4" label="Scoring Dimensions" color="#059669" />
              </div>

              <div className="bg-[#F0F1FA] border border-purple-200/60 rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <Sparkles size={18} className="text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#33475B] mb-1">The Core Insight</h4>
                    <p className="text-sm text-[#516F90] leading-relaxed">
                      No competitor monitors messaging health at the <strong className="text-[#33475B]">segment level</strong> across
                      all channels simultaneously. HubSpot&apos;s CRM-native advantage means this feature can correlate messaging
                      patterns with deal outcomes, customer success, and product usage &mdash; a signal no standalone email tool can provide.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InfoCard title="What the Demo Proves" accent="#00A4BD">
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2"><CircleDot size={10} className="shrink-0 mt-1.5 text-[#00A4BD]" /> Cross-channel frequency intelligence</li>
                    <li className="flex items-start gap-2"><CircleDot size={10} className="shrink-0 mt-1.5 text-[#00A4BD]" /> AI scoring with explainability</li>
                    <li className="flex items-start gap-2"><CircleDot size={10} className="shrink-0 mt-1.5 text-[#00A4BD]" /> Streaming chat co-pilot</li>
                    <li className="flex items-start gap-2"><CircleDot size={10} className="shrink-0 mt-1.5 text-[#00A4BD]" /> Graceful AI degradation pattern</li>
                  </ul>
                </InfoCard>
                <InfoCard title="What Production Requires" accent="#FF7A59">
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2"><CircleDot size={10} className="shrink-0 mt-1.5 text-[#FF7A59]" /> Real-time data pipeline integration</li>
                    <li className="flex items-start gap-2"><CircleDot size={10} className="shrink-0 mt-1.5 text-[#FF7A59]" /> ML model training infrastructure</li>
                    <li className="flex items-start gap-2"><CircleDot size={10} className="shrink-0 mt-1.5 text-[#FF7A59]" /> Multi-tenant isolation (200K+ portals)</li>
                    <li className="flex items-start gap-2"><CircleDot size={10} className="shrink-0 mt-1.5 text-[#FF7A59]" /> Closed-loop measurement system</li>
                  </ul>
                </InfoCard>
                <InfoCard title="Key Demo Files" accent="#9333EA">
                  <ul className="space-y-1.5 font-mono text-xs">
                    <li className="flex items-start gap-2"><CircleDot size={10} className="shrink-0 mt-1.5 text-[#9333EA]" /> lib/types.ts</li>
                    <li className="flex items-start gap-2"><CircleDot size={10} className="shrink-0 mt-1.5 text-[#9333EA]" /> api/score/route.ts</li>
                    <li className="flex items-start gap-2"><CircleDot size={10} className="shrink-0 mt-1.5 text-[#9333EA]" /> api/analyze/route.ts</li>
                    <li className="flex items-start gap-2"><CircleDot size={10} className="shrink-0 mt-1.5 text-[#9333EA]" /> api/chat/route.ts</li>
                  </ul>
                </InfoCard>
              </div>
            </div>
          </Section>

          {/* ═══════════════ 2. Systems Architecture ═══════════════ */}
          <Section
            id="architecture"
            icon={Layers}
            title="Systems Architecture at Scale"
            subtitle="Microservice decomposition, data pipelines, event-driven design, multi-tenancy"
            accentColor="#00A4BD"
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-base font-semibold text-[#33475B] mb-3">Microservice Decomposition</h3>
                <p className="text-sm text-[#516F90] leading-relaxed mb-5">
                  The demo has 3 API routes (<code className="text-xs bg-[#F5F8FA] px-1.5 py-0.5 rounded border border-[#EAF0F6]">/api/score</code>,{" "}
                  <code className="text-xs bg-[#F5F8FA] px-1.5 py-0.5 rounded border border-[#EAF0F6]">/api/analyze</code>,{" "}
                  <code className="text-xs bg-[#F5F8FA] px-1.5 py-0.5 rounded border border-[#EAF0F6]">/api/chat</code>) and 4 data modules.
                  At scale, these decompose into 5 services:
                </p>
                <MicroserviceDiagram />
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#33475B] mb-3">Data Pipeline Architecture</h3>
                <p className="text-sm text-[#516F90] leading-relaxed mb-5">
                  The demo&apos;s frequency timeline shows per-day, per-channel message counts. Building this from real data
                  requires a streaming pipeline with three processing tiers:
                </p>
                <FlowDiagram />
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#33475B] mb-3">Event-Driven Frequency Tracking</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard title="Event Types" accent="#00A4BD">
                    <ul className="space-y-1.5 font-mono text-xs">
                      <li>message.scheduled</li>
                      <li>message.sent</li>
                      <li>message.opened / clicked / unsubscribed</li>
                      <li>guardrail.configured</li>
                      <li>guardrail.enforced</li>
                      <li>guardrail.overridden</li>
                    </ul>
                  </InfoCard>
                  <InfoCard title="Critical Decision" accent="#FF7A59">
                    <p>Evaluate guardrails at <strong className="text-[#33475B]">both</strong> schedule time and send time.</p>
                    <p className="mt-2"><strong className="text-[#33475B]">Schedule time:</strong> Warn the marketer in the UI.</p>
                    <p className="mt-1"><strong className="text-[#33475B]">Send time:</strong> Hard block if contact hit the cap in the current sliding window.</p>
                  </InfoCard>
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#33475B] mb-3">Multi-Tenancy at Scale</h3>
                <div className="bg-[#F9FBFC] border border-[#EAF0F6] rounded-lg p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#516F90]">
                    <div className="flex items-start gap-2">
                      <Lock size={16} className="shrink-0 mt-0.5 text-[#FF7A59]" />
                      <div>
                        <strong className="text-[#33475B]">Redis keys:</strong>
                        <code className="block text-xs mt-1 bg-[#33475B] text-[#cbd6e2] px-2 py-1 rounded">frequency:&#123;portalId&#125;:&#123;contactId&#125;:&#123;channel&#125;:window</code>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Lock size={16} className="shrink-0 mt-0.5 text-[#FF7A59]" />
                      <div>
                        <strong className="text-[#33475B]">Database:</strong>
                        <span className="block text-xs mt-1">Partitioned by portal_id with row-level security</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Lock size={16} className="shrink-0 mt-0.5 text-[#FF7A59]" />
                      <div>
                        <strong className="text-[#33475B]">AI inference:</strong>
                        <span className="block text-xs mt-1">Per-portal content isolation. Never mix data across portals.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Lock size={16} className="shrink-0 mt-0.5 text-[#FF7A59]" />
                      <div>
                        <strong className="text-[#33475B]">Rate limiting:</strong>
                        <span className="block text-xs mt-1">Per-portal AI budgets proportional to plan tier.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* ═══════════════ 3. Integration Map ═══════════════ */}
          <Section
            id="integration"
            icon={GitMerge}
            title="Integration Map"
            subtitle="How each demo data source maps to real HubSpot systems"
            accentColor="#059669"
          >
            <DataTable
              headers={["Demo Data Source", "Production HubSpot System", "Integration Method"]}
              rows={[
                ["segments.ts (6 segments)", "CRM Contact Lists + Smart Lists", "gRPC to list segmentation service; subscribe to list membership change events"],
                ["campaigns.ts (23 campaigns)", "Marketing Hub Campaign objects + Email Send Service", "Join campaign metadata with send-event stream; metrics from analytics pipeline"],
                ["emails.ts (5 emails)", "Email Content Service + Email Analytics", "Content from email editor DB; metrics from open/click tracking pipeline"],
                ["frequency.ts (14-day grids)", "Contact Timeline / Activity Service", "Aggregate from contact activity stream tracking every email/SMS/WhatsApp touch"],
                ["anthropic.ts (Claude SDK)", "HubSpot AI Platform (internal LLM gateway)", "Centralized AI gateway for model routing, rate limiting, prompt management, cost attribution"],
              ]}
            />
          </Section>

          {/* ═══════════════ 4. Teams & Stakeholders ═══════════════ */}
          <Section
            id="teams"
            icon={Users}
            title="Teams & Stakeholders"
            subtitle="Cross-functional dependencies, ownership model, RFC process"
            accentColor="#FF7A59"
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-base font-semibold text-[#33475B] mb-3">Ownership Model</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard title="Primary Owner" accent="#FF7A59">
                    <strong className="text-[#33475B]">Marketing Hub &mdash; Messaging Team.</strong> Owns email, SMS, and WhatsApp sending tools. The Message Strategy & Optimizer is a natural extension of their surface area.
                  </InfoCard>
                  <InfoCard title="Co-Owner" accent="#9333EA">
                    <strong className="text-[#33475B]">AI Platform Team.</strong> AI features depend on centralized AI infrastructure. Owns LLM gateway, prompt management, model serving, and cost attribution.
                  </InfoCard>
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#33475B] mb-3">Cross-Functional Dependencies</h3>
                <DataTable
                  headers={["Team", "Why Needed", "What They Provide"]}
                  rows={[
                    ["CRM Platform", "Segments are CRM lists. Contact counts and membership come from here.", "List membership change events, contact property access, smart list evaluation"],
                    ["Data Platform / Analytics", "Metrics (open rate, click rate, unsubscribes) come from the analytics pipeline.", "Email engagement event stream, aggregated metrics APIs, data warehouse access"],
                    ["Email Deliverability", "Scoring algorithm checks for spam triggers. Production needs sender reputation.", "Domain reputation scores, spam complaint rates, deliverability signals"],
                    ["Workflows / Automation", "Guardrails must integrate with HubSpot's workflow engine.", "Workflow action extension points, workflow trigger APIs"],
                    ["Design System (Canvas)", "Custom Tailwind UI must be migrated to internal component library.", "Canvas components, design tokens, accessibility review"],
                    ["Data Science", "ML model development for scoring, churn prediction, send-time optimization.", "Model training, feature engineering, offline evaluation"],
                    ["Trust & Security", "Multi-tenant data isolation, AI safety review, PII handling.", "Security review, threat modeling, data classification"],
                    ["Legal / Compliance", "GDPR, CAN-SPAM, AI transparency requirements.", "Compliance review, data retention policies"],
                  ]}
                />
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#33475B] mb-3">RFC / Design Review Process</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { step: "1", title: "Pre-RFC", desc: "Socialize with 1-pagers to PM, Engineering Director, AI Platform Lead. The demo itself is a powerful artifact.", color: "#00A4BD" },
                    { step: "2", title: "Architecture RFC", desc: "Formal design covering 5 microservices, data pipeline, integration points. Review: Eng Directors from Messaging, CRM, Data, AI.", color: "#FF7A59" },
                    { step: "3", title: "AI Safety Review", desc: "Prompt injection risks, bias in scoring, hallucination risks. Review: AI Platform + Trust & Security.", color: "#9333EA" },
                    { step: "4", title: "Design Review", desc: "Map demo UI to Canvas equivalents. SegmentCard, score gauge, frequency timeline may need new Canvas components.", color: "#059669" },
                    { step: "5", title: "Data Review", desc: "Event schema, pipeline requirements, data warehouse impact. Review: Data Platform team.", color: "#DC2626" },
                  ].map((r, i) => (
                    <div key={i} className="bg-white border border-[#EAF0F6] rounded-lg p-4 shadow-sm" style={{ borderTopColor: r.color, borderTopWidth: 3 }}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-6 h-6 rounded-full text-white text-xs font-semibold flex items-center justify-center" style={{ backgroundColor: r.color }}>{r.step}</span>
                        <h4 className="text-sm font-semibold text-[#33475B]">{r.title}</h4>
                      </div>
                      <p className="text-xs text-[#516F90] leading-relaxed">{r.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* ═══════════════ 5. Agentic AI Roadmap ═══════════════ */}
          <Section
            id="agentic"
            icon={Bot}
            title="Agentic AI Features & Automation"
            subtitle="6 levels from tool-assisted to fully autonomous agents"
            accentColor="#9333EA"
          >
            <div className="space-y-8">
              <div className="bg-[#F0F1FA] border border-purple-200/60 rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <Brain size={18} className="text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#33475B] mb-1">Current State in the Demo</h4>
                    <p className="text-sm text-[#516F90] leading-relaxed">
                      The demo implements three AI patterns: <strong className="text-[#33475B]">algorithmic scoring</strong> (rule-based, no LLM),{" "}
                      <strong className="text-[#33475B]">single-shot suggestions</strong> (Claude Sonnet 4, stateless), and{" "}
                      <strong className="text-[#33475B]">streaming chat</strong> (conversational but cannot take actions).
                      The path to a true co-pilot requires six progressive levels of autonomy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AgentLevelCard
                  level="L1"
                  title="Suggestion Application"
                  description="Suggestions have 'Apply' buttons that actually modify email content, schedule changes, and campaign settings."
                  capabilities={[
                    "Opens email editor with new subject pre-filled",
                    "Proposes schedule change in campaign settings",
                    "Side-by-side comparison for content suggestions",
                  ]}
                  color="#00A4BD"
                />
                <AgentLevelCard
                  level="L2"
                  title="Autonomous Guardrails"
                  description="AI detects guardrail breaches, generates proposed actions, and notifies the marketer for approval."
                  capabilities={[
                    "Auto-detect guardrail breach -> propose action",
                    "Human-in-the-loop approval workflow",
                    "Escalation if marketer doesn't respond in 4h",
                  ]}
                  color="#FF7A59"
                />
                <AgentLevelCard
                  level="L3"
                  title="Predictive Prevention"
                  description="ML model predicts unsubscribe probability per contact per send. Suppresses high-risk sends automatically."
                  capabilities={[
                    "P(unsubscribe | this message, this contact)",
                    "Suppress sends above risk threshold",
                    "\"We held back 342 sends\" notification",
                  ]}
                  color="#9333EA"
                />
                <AgentLevelCard
                  level="L4"
                  title="AI-Driven A/B Testing"
                  description="Converts AI suggestions into automated A/B tests, runs them with holdouts, and promotes winners."
                  capabilities={[
                    "Generate 2-3 subject line variants from suggestions",
                    "Auto-configure A/B test with 10% holdout",
                    "Auto-promote winning variant at significance",
                  ]}
                  color="#059669"
                />
                <AgentLevelCard
                  level="L5"
                  title="Multi-Step Agent Workflows"
                  description="Full agentic loop: analyze -> suggest -> apply -> monitor -> learn -> adapt. Continuous optimization."
                  capabilities={[
                    "Score < 60: flag for review + generate alternatives",
                    "Score 60-80: suggest + auto-create A/B test",
                    "Score > 80: approve for send",
                    "Feed outcomes back into scoring model",
                  ]}
                  color="#2563EB"
                />
                <AgentLevelCard
                  level="L6"
                  title="Anomaly Detection Agents"
                  description="Always-running agents monitoring for real-time anomalies across campaigns and segments."
                  capabilities={[
                    "Spike in unsubscribe rate mid-campaign -> auto-pause",
                    "Deliverability drop detection (IP reputation)",
                    "Cross-campaign conflict detection",
                    "Engagement pattern anomaly alerts",
                  ]}
                  color="#DC2626"
                />
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#33475B] mb-3">From Chat to Co-Pilot: Three Additions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InfoCard title="1. Tool Use / Function Calling" accent="#00A4BD">
                    Give the AI access to tools: <code className="text-xs">get_segment_health()</code>,{" "}
                    <code className="text-xs">simulate_frequency_change()</code>,{" "}
                    <code className="text-xs">generate_ab_test()</code>. Transforms chat from advice-only to advice + action.
                  </InfoCard>
                  <InfoCard title="2. Memory & Context Management" accent="#FF7A59">
                    Conversation summaries, cross-session memory (&ldquo;last week you improved the trial email &mdash; here&apos;s how it performed&rdquo;),
                    and portal-level knowledge base (brand voice, audience preferences).
                  </InfoCard>
                  <InfoCard title="3. Proactive Notifications" accent="#9333EA">
                    AI is proactive, not reactive. &ldquo;Your re-engagement email has been live 2 weeks. Open rate is 12.4%, 53% below average. I have 3 suggestions ready.&rdquo;
                  </InfoCard>
                </div>
              </div>
            </div>
          </Section>

          {/* ═══════════════ 6. Data & ML Infrastructure ═══════════════ */}
          <Section
            id="ml"
            icon={Database}
            title="Data & ML Infrastructure"
            subtitle="5 ML models, feature store, real-time vs batch, A/B testing"
            accentColor="#2563EB"
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-base font-semibold text-[#33475B] mb-3">ML Models to Train</h3>
                <p className="text-sm text-[#516F90] leading-relaxed mb-5">
                  The demo uses rule-based scoring in <code className="text-xs bg-[#F5F8FA] px-1.5 py-0.5 rounded border border-[#EAF0F6]">/api/score/route.ts</code>.
                  Here&apos;s the migration path to ML-based scoring:
                </p>
                <DataTable
                  headers={["Model", "Training Data", "Architecture", "Replaces"]}
                  rows={[
                    ["Subject Line Quality", "Historical subjects + open rates, controlling for segment and time", "Fine-tuned transformer or gradient-boosted tree on extracted features", "Demo's scoreSubjectLine() with SPAM_WORDS array"],
                    ["Content Quality", "Email body content + click rates + conversion rates", "Gradient-boosted tree with LLM feature extractor for semantic signals", "Demo's scoreContentQuality() with CTA counting"],
                    ["Send-Time Optimization", "Historical send events + open/click timestamps per contact", "Per-segment model; gradient-boosted tree over 168 hourly buckets", "Demo's hardcoded per-segment timing scores"],
                    ["Audience Match", "Email content + segment definitions + engagement rates", "Collaborative filtering or content-based recommendation", "Demo's scoreAudienceMatch() with personalization checks"],
                    ["Unsubscribe Risk", "Contact features at send time + binary unsubscribe outcome", "XGBoost/LightGBM binary classifier", "No demo equivalent (new capability)"],
                  ]}
                />
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#33475B] mb-3">Feature Store Design</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InfoCard title="Contact-Level (Near Real-Time)" accent="#00A4BD">
                    <ul className="space-y-1 font-mono text-xs">
                      <li>msgs_received_last_7d / 14d / 30d</li>
                      <li>opens_last_7d / clicks_last_7d</li>
                      <li>time_since_last_open / click</li>
                      <li>preferred_send_hour</li>
                      <li>channel_preference_score</li>
                    </ul>
                  </InfoCard>
                  <InfoCard title="Segment-Level (Hourly)" accent="#FF7A59">
                    <ul className="space-y-1 font-mono text-xs">
                      <li>avg_msgs_per_contact_per_week</li>
                      <li>avg_open_rate / click_rate / unsub_rate</li>
                      <li>active_campaign_count</li>
                      <li>channel_mix (email/sms/whatsapp)</li>
                      <li>health_status (risk/warning/...)</li>
                    </ul>
                  </InfoCard>
                  <InfoCard title="Email-Level (On Content Change)" accent="#9333EA">
                    <ul className="space-y-1 font-mono text-xs">
                      <li>subject_length / spam_word_count</li>
                      <li>body_word_count / cta_count / link_count</li>
                      <li>readability_score / sentiment_score</li>
                      <li>content_embedding (768-dim vector)</li>
                    </ul>
                  </InfoCard>
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#33475B] mb-3">Processing Trade-Offs</h3>
                <DataTable
                  headers={["Computation", "Latency", "Mode", "Rationale"]}
                  rows={[
                    ["Guardrail enforcement", "<5ms p99", "Real-time (Redis)", "Hot path of every message send"],
                    ["Contact frequency counters", "<100ms", "Real-time (Flink -> Redis)", "Must reflect the most recent send"],
                    ["Segment health status", "<1hr staleness", "Micro-batch (15-min windows)", "Dashboard refresh is acceptable"],
                    ["Email scoring (rule-based)", "<200ms", "Real-time", "Score gauge needs instant display"],
                    ["Email scoring (ML)", "<500ms", "Real-time w/ feature cache", "Acceptable for optimizer page"],
                    ["AI suggestions (LLM)", "2-10s", "Async with loading state", "Demo already has this pattern"],
                    ["Feature engineering", "Hourly", "Micro-batch (Spark/Flink)", "Features need to be fresh, not real-time"],
                  ]}
                />
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#33475B] mb-3">A/B Testing Infrastructure for AI</h3>
                <div className="flex flex-col gap-3">
                  {[
                    { step: "Shadow Mode", desc: "Run ML model alongside rule-based. Compare scores. Do not show ML scores to users.", color: "#00A4BD" },
                    { step: "Holdout Test", desc: "10% of portals get ML scoring, 90% get rule-based. Measure: do marketers make better emails?", color: "#FF7A59" },
                    { step: "Sequential Rollout", desc: "10% -> 25% -> 50% -> 100%, with automated rollback if engagement metrics degrade.", color: "#059669" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white border border-[#EAF0F6] rounded-lg p-4 shadow-sm">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0" style={{ color: item.color, backgroundColor: `${item.color}12` }}>
                        Step {i + 1}
                      </span>
                      <div>
                        <strong className="text-sm text-[#33475B]">{item.step}:</strong>{" "}
                        <span className="text-sm text-[#516F90]">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* ═══════════════ 7. Platform Thinking ═══════════════ */}
          <Section
            id="platform"
            icon={Puzzle}
            title="Platform Thinking"
            subtitle="Extension points, public APIs, webhooks, workflow integration"
            accentColor="#FF7A59"
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-base font-semibold text-[#33475B] mb-3">Extension Points</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InfoCard title="Custom Scoring Dimensions" accent="#00A4BD">
                    Allow customers/partners to add: &ldquo;Brand voice consistency&rdquo;, &ldquo;Legal compliance&rdquo;, &ldquo;Accessibility score&rdquo; &mdash; beyond the 4 built-in dimensions.
                  </InfoCard>
                  <InfoCard title="Custom Guardrail Rules" accent="#FF7A59">
                    &ldquo;Never send same day as billing email&rdquo;, &ldquo;Suppress marketing for 48h after support ticket&rdquo;, &ldquo;Different guardrails for EMEA vs. NA.&rdquo;
                  </InfoCard>
                  <InfoCard title="Pluggable AI Providers" accent="#9333EA">
                    Enterprise customers may require Azure OpenAI or their own fine-tuned models. The AI gateway should support pluggable providers.
                  </InfoCard>
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#33475B] mb-3">Public API Design</h3>
                <div className="bg-[#1e2a38] rounded-lg p-5 overflow-x-auto custom-scrollbar">
                  <pre className="text-sm text-[#cbd6e2] font-mono leading-relaxed">
{`POST   /v3/marketing/emails/{emailId}/score
       → { overall, subjectLine, contentQuality, sendTiming, audienceMatch }

POST   /v3/marketing/emails/{emailId}/suggestions
       → { suggestions: AISuggestion[] }

GET    /v3/marketing/segments/{segmentId}/health
       → { status, messagesPerWeek, channelBreakdown, metrics }

GET    /v3/marketing/segments/{segmentId}/frequency?days=14
       → { timeline: FrequencyDay[] }

PUT    /v3/marketing/segments/{segmentId}/guardrails
       → { email: { maxPerWeek: 4 }, sms: { maxPerWeek: 2 }, ... }

GET    /v3/marketing/contacts/{contactId}/message-load
       → { messagesThisWeek: 3, guardrailStatus: "within_limits" }`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#33475B] mb-3">Webhook Events</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { event: "segment.health.changed", payload: "segmentId, previousStatus, newStatus, metrics" },
                    { event: "guardrail.breached", payload: "segmentId, channel, actualRate, limit, severity" },
                    { event: "email.score.changed", payload: "emailId, previousScore, newScore, changedDimension" },
                    { event: "unsubscribe.risk.detected", payload: "contactId, riskScore, contributingFactors" },
                  ].map((w, i) => (
                    <div key={i} className="bg-white border border-[#EAF0F6] rounded-lg p-4 shadow-sm">
                      <code className="text-xs font-semibold text-[#00A4BD]">{w.event}</code>
                      <p className="text-xs text-[#516F90] mt-1 font-mono">{w.payload}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#33475B] mb-3">Workflow Engine Integration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard title="Workflow Triggers" accent="#00A4BD">
                    <ul className="space-y-1.5 text-xs">
                      <li>&ldquo;When segment health changes to &apos;risk&apos;&rdquo;</li>
                      <li>&ldquo;When a contact exceeds frequency guardrail&rdquo;</li>
                      <li>&ldquo;When an email&apos;s AI score drops below X&rdquo;</li>
                    </ul>
                  </InfoCard>
                  <InfoCard title="Workflow Actions" accent="#FF7A59">
                    <ul className="space-y-1.5 text-xs">
                      <li>&ldquo;Pause campaign for this segment&rdquo;</li>
                      <li>&ldquo;Reduce frequency to X/week&rdquo;</li>
                      <li>&ldquo;Move contact to a cooling off list&rdquo;</li>
                      <li>&ldquo;Send internal notification to marketing team&rdquo;</li>
                    </ul>
                  </InfoCard>
                </div>
              </div>
            </div>
          </Section>

          {/* ═══════════════ 8. Observability & Feedback Loops ═══════════════ */}
          <Section
            id="observability"
            icon={Eye}
            title="Observability & Feedback Loops"
            subtitle="Closed-loop measurement, KPIs, building marketer trust"
            accentColor="#059669"
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-base font-semibold text-[#33475B] mb-3">Closed-Loop Measurement System</h3>
                <div className="bg-[#F9FBFC] border border-[#EAF0F6] rounded-xl p-6 overflow-x-auto custom-scrollbar">
                  <div className="flex items-center gap-2 min-w-[700px] text-sm">
                    {[
                      { label: "Suggestion Generated", color: "#9333EA" },
                      { label: "Shown to Marketer", color: "#2563EB" },
                      { label: "Applied / Ignored", color: "#FF7A59" },
                      { label: "Email Sent", color: "#00A4BD" },
                      { label: "Performance Measured", color: "#059669" },
                      { label: "Model Updated", color: "#DC2626" },
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div
                          className="rounded-lg px-3 py-2 text-center font-medium text-white whitespace-nowrap"
                          style={{ backgroundColor: step.color }}
                        >
                          {step.label}
                        </div>
                        {i < 5 && <ArrowRight size={16} className="text-[#cbd6e2] shrink-0" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#33475B] mb-3">Feature-Level KPIs</h3>
                <DataTable
                  headers={["KPI", "Target", "Measurement"]}
                  rows={[
                    ["Dashboard adoption", "60% weekly active marketers", "Page view tracking"],
                    ["Over-messaging alerts acted upon", "40% lead to guardrail changes within 48h", "Guardrail change event tracking"],
                    ["AI score viewed before send", "30% of emails scored before sending", "Score API calls / total sends"],
                    ["Suggestion apply rate", "25% of high-priority suggestions", "Apply clicks / suggestions shown"],
                    ["Chat engagement", "15% of optimizer page views include chat", "Chat message events"],
                    ["Post-suggestion performance lift", "+5% avg open rate with applied suggestions", "Causal analysis with matched cohorts"],
                    ["Guardrail-prevented unsubscribes", "10% reduction in unsub rate", "A/B test: guardrails on vs. off"],
                  ]}
                />
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#33475B] mb-3">Building Trust with Marketers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: "Confidence Indicators", desc: "\"Based on 1,200 similar emails\" vs. \"General best practice\"", icon: Target },
                    { title: "Track Record", desc: "\"6 of 8 applied suggestions led to measurable improvements\"", icon: TrendingUp },
                    { title: "Undo Capability", desc: "Every applied suggestion is reversible. The demo's appliedSuggestions Set is the right start.", icon: Clock },
                    { title: "Explanation on Demand", desc: "\"Why did this score 38?\" shows specific words and comparisons, not just sub-scores.", icon: MessageSquare },
                    { title: "Gradual Autonomy", desc: "Suggestions-only -> auto-apply with notification -> fully autonomous. Marketer controls the level.", icon: Gauge },
                  ].map((t, i) => (
                    <div key={i} className="bg-white border border-[#EAF0F6] rounded-lg p-4 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <t.icon size={16} strokeWidth={1.5} className="text-[#059669]" />
                        <h4 className="text-sm font-semibold text-[#33475B]">{t.title}</h4>
                      </div>
                      <p className="text-xs text-[#516F90] leading-relaxed">{t.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* ═══════════════ 9. Ethics & Compliance ═══════════════ */}
          <Section
            id="ethics"
            icon={Shield}
            title="Ethical & Compliance Considerations"
            subtitle="GDPR, CAN-SPAM, bias, transparency, data isolation"
            accentColor="#DC2626"
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-base font-semibold text-[#33475B] mb-3">Regulatory Implications</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InfoCard title="GDPR Article 21" accent="#DC2626">
                    Right to object to marketing. Guardrails must respect per-contact opt-out preferences, not just segment-level caps.
                  </InfoCard>
                  <InfoCard title="Frequency as Consent" accent="#DC2626">
                    If a contact signed up for &ldquo;weekly updates&rdquo; and receives daily emails, guardrails must enforce the consented frequency.
                  </InfoCard>
                  <InfoCard title="GDPR Article 22" accent="#DC2626">
                    AI send-suppression is an automated decision affecting the data subject. Requires explainability and human review option.
                  </InfoCard>
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#33475B] mb-3">Bias in Scoring</h3>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                    <div className="space-y-2 text-sm text-[#516F90]">
                      <p><strong className="text-[#33475B]">Cultural bias:</strong> The SPAM_WORDS list includes &ldquo;free&rdquo; &mdash; but &ldquo;free trial&rdquo; is effective for SaaS. Different industries have different norms.</p>
                      <p><strong className="text-[#33475B]">Language bias:</strong> Algorithm only works for English. Production must handle multilingual content.</p>
                      <p><strong className="text-[#33475B]">Historical bias:</strong> ML models trained on past performance will replicate past biases. If content was bad (not audience disengaged), the model penalizes the segment unfairly.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#33475B] mb-3">Data Isolation & Customer Trust</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard title="What the AI Sees" accent="#DC2626">
                    The demo sends full email content to Claude. Enterprise customers may require data never leaves HubSpot infrastructure. Offer self-hosted inference for strict data residency requirements.
                  </InfoCard>
                  <InfoCard title="Training Data Policy" accent="#DC2626">
                    Never use one customer&apos;s email content to train models serving another customer. Aggregate anonymized patterns only. Individual content remains isolated per-portal.
                  </InfoCard>
                </div>
              </div>
            </div>
          </Section>

          {/* ═══════════════ 10. Scaling & Reliability ═══════════════ */}
          <Section
            id="scaling"
            icon={Server}
            title="Scaling & Reliability"
            subtitle="200K+ portals, rate limiting, caching, graceful degradation"
            accentColor="#33475B"
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-base font-semibold text-[#33475B] mb-3">Scale Numbers</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <MetricBox value="200K+" label="Customer Portals" color="#00A4BD" />
                  <MetricBox value="10B+" label="Total Contacts" color="#FF7A59" />
                  <MetricBox value="30-50B" label="Sends / Week" color="#9333EA" />
                  <MetricBox value="5-7B" label="Guardrail Checks / Week" color="#059669" />
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#33475B] mb-3">Tiered Inference Strategy</h3>
                <DataTable
                  headers={["Tier", "Method", "Latency", "Use Case"]}
                  rows={[
                    ["Tier 1", "Rule-based scoring (no LLM)", "<100ms", "Score gauge on optimizer page"],
                    ["Tier 2", "ML model inference (no LLM)", "<500ms", "Improved scoring after ML deployment"],
                    ["Tier 3", "LLM-based suggestions (async)", "2-10s", "AI suggestions with loading state"],
                    ["Tier 4", "Batch scoring (background)", "Nightly", "Score all emails on content change"],
                  ]}
                />
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#33475B] mb-3">Caching Strategy</h3>
                <DataTable
                  headers={["What", "Cache Key Pattern", "TTL", "Invalidation"]}
                  rows={[
                    ["Email scores (rule)", "score:{portal}:{email}:{hash}", "Infinite", "Content change webhook"],
                    ["Email scores (ML)", "score:{portal}:{email}:{hash}:{model}", "24 hours", "Content change + model deploy"],
                    ["AI suggestions", "suggestions:{portal}:{email}:{hash}", "1 hour", "Content change + manual refresh"],
                    ["Segment health", "segment-health:{portal}:{segment}", "15 minutes", "Recalculated on schedule"],
                    ["Contact frequency", "freq:{portal}:{contact}:{channel}", "7 days (sliding)", "Appended on each send"],
                  ]}
                />
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#33475B] mb-3">Graceful Degradation</h3>
                <div className="bg-[#F9FBFC] border border-[#EAF0F6] rounded-lg p-5">
                  <p className="text-sm text-[#516F90] mb-4">
                    The demo already implements the right pattern &mdash; catch blocks in <code className="text-xs bg-white px-1.5 py-0.5 rounded border border-[#EAF0F6]">/api/analyze</code> fall back to hardcoded suggestions. Production extends this:
                  </p>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: "LLM available?", yes: "Return LLM-generated suggestions", color: "#059669" },
                      { label: "ML model available?", yes: "Return ML-generated suggestions (less contextual)", color: "#2563EB" },
                      { label: "Rule-based available?", yes: "Return template-driven suggestions", color: "#FF7A59" },
                      { label: "All down?", yes: "\"AI temporarily unavailable. Score still available.\"", color: "#DC2626" },
                    ].map((tier, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white border border-[#EAF0F6] rounded-lg px-4 py-3">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: tier.color }}>
                          {i === 3 ? "Fallback" : `Tier ${i + 1}`}
                        </span>
                        <span className="text-sm text-[#33475B] font-medium">{tier.label}</span>
                        <ArrowRight size={14} className="text-[#cbd6e2]" />
                        <span className="text-sm text-[#516F90]">{tier.yes}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* ═══════════════ 11. Competitive Landscape ═══════════════ */}
          <Section
            id="competitive"
            icon={Swords}
            title="Competitive Landscape"
            subtitle="How this compares and where the gaps are"
            accentColor="#00A4BD"
          >
            <div className="space-y-8">
              <DataTable
                headers={["Competitor", "Email Scoring", "AI Optimization", "Frequency Mgmt", "Agentic Features"]}
                rows={[
                  ["Mailchimp", "Basic send checklist", "Content Optimizer (subject variants)", "Manual frequency settings", "None"],
                  ["Klaviyo", "Deliverability score", "Subject line AI, SMS content AI", "Smart sending (time throttling)", "Limited (send-time)"],
                  ["Braze", "Channel health monitoring", "Copywriting assistant", "Frequency capping (basic)", "Journey orchestration AI"],
                  ["Iterable", "Campaign health dashboard", "Brand Affinity scoring", "Frequency optimization tool", "Experiment automation"],
                  ["Salesforce MC", "Einstein Content Testing", "Einstein Send Time Opt.", "Frequency controls", "Einstein Engagement Scoring"],
                  ["HubSpot (ours)", "4-dimension scoring + explainability", "Contextual suggestions + streaming chat", "Segment-level, per-channel guardrails + AI recs", "Roadmap: 6 levels to full autonomy"],
                ]}
              />

              <div>
                <h3 className="text-base font-semibold text-[#33475B] mb-3">Unique Differentiation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Cross-Channel Frequency Intelligence",
                      desc: "No competitor shows unified frequency across email + SMS + WhatsApp. Our frequency timeline is a genuinely novel UI pattern.",
                      color: "#00A4BD",
                    },
                    {
                      title: "Segment-Level Health Monitoring",
                      desc: "Competitors focus on campaign-level metrics. Monitoring at the segment level matches how marketers actually think.",
                      color: "#FF7A59",
                    },
                    {
                      title: "AI That Explains Itself",
                      desc: "Scoring verdicts and structured suggestions are far more transparent than \"Einstein says send at 10 AM\" with no explanation.",
                      color: "#9333EA",
                    },
                    {
                      title: "CRM-Native Advantage",
                      desc: "HubSpot can correlate messaging with deal outcomes, customer success, and product usage. \"This email contributed to 12 deal closings this quarter.\"",
                      color: "#059669",
                    },
                  ].map((d, i) => (
                    <InfoCard key={i} title={d.title} accent={d.color}>
                      {d.desc}
                    </InfoCard>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#33475B] mb-3">Gaps No One Has Filled</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Proactive over-messaging prevention (alert BEFORE damage)",
                    "Cross-campaign conflict detection (same segment, same week, similar content)",
                    "AI-native A/B testing (generate, test, promote automatically)",
                    "Context-aware co-pilot that remembers past optimizations and their outcomes",
                  ].map((gap, i) => (
                    <div key={i} className="flex items-start gap-2.5 bg-white border border-[#EAF0F6] rounded-lg p-3.5 shadow-sm">
                      <ArrowUpRight size={16} className="text-[#00A4BD] shrink-0 mt-0.5" />
                      <span className="text-sm text-[#516F90]">{gap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* ═══════════════ 12. Phased Roadmap ═══════════════ */}
          <Section
            id="roadmap"
            icon={Map}
            title="Phased Roadmap"
            subtitle="From Visibility to Platform in 18 months"
            accentColor="#00A4BD"
          >
            <div className="space-y-2">
              <TimelinePhase
                phase="P1"
                title="Visibility"
                months="Months 1-3"
                color="#00A4BD"
                active
                items={[
                  "Segment Health Dashboard with real CRM data integration",
                  "Rule-based email scoring (the demo's /api/score algorithm) for all emails",
                  "Frequency guardrails enforced at send time (per-segment, per-channel)",
                  "Over-messaging alerts in dashboard and in-app notifications",
                  "Data collection begins: every email scored, every guardrail enforced = Phase 2 training data",
                ]}
              />
              <TimelinePhase
                phase="P2"
                title="Intelligence"
                months="Months 4-8"
                color="#FF7A59"
                items={[
                  "ML scoring models trained on Phase 1 data, replacing rule-based scoring",
                  "LLM-powered AI suggestions (matching /api/analyze pattern) with fallback tiers",
                  "AI Chat Assistant (matching /api/chat streaming pattern) embedded in optimizer",
                  "Closed-loop measurement system tracking suggestion apply rates and outcomes",
                  "A/B testing infrastructure: shadow mode, holdout tests, sequential rollout",
                ]}
              />
              <TimelinePhase
                phase="P3"
                title="Autonomy"
                months="Months 9-14"
                color="#9333EA"
                items={[
                  "Predictive unsubscribe prevention (suppress sends to at-risk contacts)",
                  "Autonomous guardrail enforcement with human approval workflow",
                  "AI-driven A/B test generation: auto-generate variants, auto-promote winners",
                  "Multi-step agent workflows: analyze -> suggest -> apply -> monitor -> learn",
                  "Proactive notifications and workflow engine integration",
                ]}
              />
              <TimelinePhase
                phase="P4"
                title="Platform"
                months="Months 15-18"
                color="#059669"
                items={[
                  "Public APIs for scoring, suggestions, segment health, and frequency",
                  "Webhook events for automation triggers (segment.health.changed, guardrail.breached)",
                  "Custom scoring dimensions and guardrail rules for partners",
                  "App Marketplace integrations (Zapier, Segment, external AI tools)",
                  "Self-serve analytics dashboard for AI feature performance",
                ]}
              />
            </div>

            <div className="mt-4 bg-[#F0F1FA] border border-purple-200/60 rounded-lg p-5">
              <div className="flex items-start gap-3">
                <Lightbulb size={18} className="text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#33475B] mb-1">Why This Sequence</h4>
                  <p className="text-sm text-[#516F90] leading-relaxed">
                    Each phase builds on the last. Phase 1&apos;s data collection feeds Phase 2&apos;s ML training.
                    Phase 2&apos;s measurement system proves suggestions work, justifying Phase 3&apos;s autonomy.
                    Phase 3&apos;s stable infrastructure enables Phase 4&apos;s platform opening. Skip a phase and the next one fails.
                  </p>
                </div>
              </div>
            </div>
          </Section>

          {/* ═══════════════ 13. Architecture Decision Records ═══════════════ */}
          <Section
            id="adrs"
            icon={Lightbulb}
            title="Architecture Decision Records"
            subtitle="5 key decisions with rationale and consequences"
            accentColor="#33475B"
          >
            <div className="space-y-3">
              <ADRCard
                number="ADR-001"
                title="Rule-Based Scoring as Permanent Fallback"
                decision="Keep the rule-based scoring algorithm from the demo's /api/score/route.ts as a permanent, non-removable fallback tier, even after ML models are deployed."
                rationale="ML models can fail, degrade, or produce nonsensical results. The rule-based scorer is deterministic, fast, and good enough. It should always be available."
                consequence="Two scoring codepaths to maintain. Worth it for reliability."
              />
              <ADRCard
                number="ADR-002"
                title="LLM Suggestions are Always Async"
                decision="Never make the user wait for an LLM call in a synchronous request path. Always show a loading state and stream results."
                rationale="The demo already does this correctly — the score gauge shows immediately (rule-based, fast) while suggestions load separately. This is the right pattern at scale."
                consequence="More complex frontend state management. Worth it for UX."
              />
              <ADRCard
                number="ADR-003"
                title="Guardrails are Hard Enforcement, Not Soft Warnings"
                decision="When a contact hits a frequency cap, the send is BLOCKED, not just flagged."
                rationale="Soft warnings get ignored. The whole point of guardrails is to prevent over-messaging. Marketers can adjust the limits if they disagree."
                consequence="Marketers may be frustrated when sends are blocked. Mitigate with clear UI and one-click limit adjustment."
              />
              <ADRCard
                number="ADR-004"
                title="Per-Portal AI Isolation"
                decision="No customer's email content is ever used to train models that serve another customer. Aggregate anonymized patterns only."
                rationale="Trust and compliance. One customer's competitive email strategy should never leak to another customer via AI."
                consequence="Slower model improvement (less training data per model). Worth it for trust."
              />
              <ADRCard
                number="ADR-005"
                title="Human-in-the-Loop for All Autonomous Actions in Year 1"
                decision="For the first year, all autonomous actions (campaign pauses, send suppressions, A/B test promotions) require explicit human approval."
                rationale="Trust must be earned. One bad autonomous decision that pauses a critical campaign will destroy marketer confidence in the feature."
                consequence="Slower time-to-value for autonomous features. Worth it for trust-building."
              />
            </div>
          </Section>

          {/* ──────── Footer ──────── */}
          <div className="text-center py-10 border-t border-[#EAF0F6] mt-4">
            <p className="text-xs text-[#516F90]">
              Systems-Level Strategy &middot; Message Strategy & Optimizer &middot; HubSpot Marketing Hub
            </p>
            <p className="text-xs text-[#cbd6e2] mt-1">
              From prototype to platform &mdash; designed for scale, built with intention.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
