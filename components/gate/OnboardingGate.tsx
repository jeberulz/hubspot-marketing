"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  ChevronLeft,
  Lock,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Eye,
  EyeOff,
  Mail,
  BarChart3,
  Shield,
} from "lucide-react";

const DEMO_PASSCODE = "hubspot2025";

function HubSpotLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={cn("w-7 h-7", className)} fill="#FF7A59">
      <path d="M267.4 211.6c-25.1 23.7-40.8 57.3-40.8 94.6 0 29.3 9.7 56.3 26 78L203.1 434c-4.4-1.6-9.1-2.5-14-2.5-10.8 0-20.9 4.2-28.5 11.8-7.6 7.6-11.8 17.8-11.8 28.6s4.2 20.9 11.8 28.5c7.6 7.6 17.8 11.8 28.5 11.8 10.8 0 20.9-4.2 28.6-11.8 7.6-7.6 11.8-17.8 11.8-28.5 0-4.2-.6-8.2-1.9-12.1l50-50.2c22 16.9 49.4 26.9 79.3 26.9 71.9 0 130-58.3 130-130.2 0-65.2-47.7-119.2-110.2-128.7V116c17.6-7.3 29.9-24.7 29.9-44.9 0-26.8-21.7-48.5-48.5-48.5-26.8 0-48.5 21.7-48.5 48.5 0 20.2 12.3 37.6 29.9 44.9v51.3c-29.6 4.5-55.9 18.4-75.8 38.3zM357.9 306.2c0 37.4-30.4 67.8-67.8 67.8-37.4 0-67.8-30.4-67.8-67.8 0-37.4 30.4-67.8 67.8-67.8 37.4 0 67.8 30.4 67.8 67.8z" />
    </svg>
  );
}

interface SlideData {
  icon: React.ElementType;
  iconBg: string;
  label: string;
  title: string;
  subtitle: string;
  bullets?: { icon: React.ElementType; text: string }[];
  stats?: { value: string; label: string; color: string }[];
}

const slides: SlideData[] = [
  {
    icon: Sparkles,
    iconBg: "bg-[#00A4BD]/20 text-[#00A4BD]",
    label: "Concept Overview",
    title: "Message Strategy & Optimizer",
    subtitle:
      "A concept feature for HubSpot's Marketing Hub — a single command center to monitor, optimize, and protect messaging strategy across every channel.",
    bullets: [
      { icon: Mail, text: "Cross-channel message frequency dashboard with per-segment health monitoring" },
      { icon: Sparkles, text: "AI-powered email scoring across subject line, content, timing, and audience match" },
      { icon: Shield, text: "Smart frequency guardrails to prevent over-messaging and protect engagement" },
    ],
  },
  {
    icon: AlertTriangle,
    iconBg: "bg-[#FF7A59]/20 text-[#FF7A59]",
    label: "The Problem",
    title: "Over-Messaging Is Killing Engagement",
    subtitle:
      "Marketers today lack visibility into how combined campaigns impact individual contacts. Without cross-campaign coordination:",
    bullets: [
      { icon: Mail, text: "Contacts receive 5–8+ messages per week across overlapping campaigns" },
      { icon: AlertTriangle, text: "Unsubscribe rates spike when there's no frequency coordination" },
      { icon: Sparkles, text: "No AI layer exists to score and improve email quality before hitting send" },
    ],
    stats: [
      { value: "67%", label: "unsubscribe due to volume", color: "#FF7A59" },
    ],
  },
  {
    icon: TrendingUp,
    iconBg: "bg-emerald-500/20 text-emerald-400",
    label: "Business Impact",
    title: "Measurable Results Through AI",
    subtitle:
      "This concept demonstrates how AI-driven messaging optimization could transform marketing outcomes:",
    bullets: [
      { icon: Shield, text: "Identify at-risk segments before damage occurs and enforce smart guardrails" },
      { icon: BarChart3, text: "Improve open and click rates with AI-scored content suggestions" },
      { icon: TrendingUp, text: "Drive revenue by keeping contacts engaged longer with optimized send patterns" },
    ],
    stats: [
      { value: "-40%", label: "Unsubscribes", color: "#00BDA5" },
      { value: "+18%", label: "Open Rate", color: "#00A4BD" },
      { value: "92", label: "AI Confidence", color: "#FF7A59" },
    ],
  },
];

export function OnboardingGate() {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);

  const totalSlides = slides.length + 1; // +1 for the passcode slide

  useEffect(() => {
    const stored = sessionStorage.getItem("demo-unlocked");
    setUnlocked(stored === "true");
  }, []);

  const handleUnlock = useCallback(() => {
    if (passcode.trim().toLowerCase() === DEMO_PASSCODE) {
      sessionStorage.setItem("demo-unlocked", "true");
      setIsExiting(true);
      setTimeout(() => setUnlocked(true), 500);
    } else {
      setError("Incorrect passcode. Try again.");
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
    }
  }, [passcode]);

  const goNext = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide((s) => s + 1);
    }
  }, [currentSlide, totalSlides]);

  const goBack = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide((s) => s - 1);
    }
  }, [currentSlide]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (unlocked) return;
      if (e.key === "ArrowRight" && currentSlide < totalSlides - 1) goNext();
      if (e.key === "ArrowLeft" && currentSlide > 0) goBack();
      if (e.key === "Enter" && currentSlide === totalSlides - 1) handleUnlock();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [unlocked, currentSlide, totalSlides, goNext, goBack, handleUnlock]);

  // Loading state — solid background to prevent flash
  if (unlocked === null) {
    return <div className="fixed inset-0 z-50 bg-[#2D3E50]" />;
  }

  // Already unlocked — render nothing
  if (unlocked) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        isExiting ? "animate-gate-exit" : "animate-gate-in"
      )}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2D3E50] via-[#1e2a38] to-[#2D3E50]" />

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Main card */}
      <div className="relative z-10 w-[calc(100%-2rem)] max-w-[720px] bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="px-10 pt-8 pb-2 flex items-center gap-3">
          <HubSpotLogo className="w-8 h-8" />
          <div>
            <span className="text-white/90 font-semibold text-sm tracking-wide">
              Marketing Hub
            </span>
            <span className="text-white/30 text-xs ml-2">Demo</span>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {/* Content slides */}
            {slides.map((slide, i) => (
              <ContentSlide
                key={i}
                slide={slide}
                isActive={currentSlide === i}
              />
            ))}

            {/* Passcode slide */}
            <div className="w-full flex-shrink-0 px-10 py-8">
              <PasscodeSlide
                isActive={currentSlide === totalSlides - 1}
                passcode={passcode}
                showPasscode={showPasscode}
                error={error}
                shaking={shaking}
                onPasscodeChange={(v) => {
                  setPasscode(v);
                  setError("");
                }}
                onToggleVisibility={() => setShowPasscode((s) => !s)}
                onSubmit={handleUnlock}
              />
            </div>
          </div>
        </div>

        {/* Footer — dots + navigation */}
        <div className="px-10 pb-8 pt-2 flex items-center justify-between">
          {/* Stepper dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1} of ${totalSlides}`}
                className={cn(
                  "rounded-full transition-all duration-300 h-2",
                  currentSlide === i
                    ? "bg-[#FF7A59] w-8"
                    : "bg-white/20 w-2 hover:bg-white/30"
                )}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center gap-3">
            {currentSlide > 0 && (
              <button
                onClick={goBack}
                className="flex items-center gap-1 text-[#cbd6e2] hover:text-white text-sm font-medium transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} />
                Back
              </button>
            )}
            {currentSlide < totalSlides - 1 && (
              <button
                onClick={goNext}
                className="flex items-center gap-1 bg-[#FF7A59] hover:bg-[#e86c4f] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Next
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentSlide({
  slide,
  isActive,
}: {
  slide: SlideData;
  isActive: boolean;
}) {
  const Icon = slide.icon;

  return (
    <div className="w-full flex-shrink-0 px-10 py-8">
      {/* Label + icon */}
      <div
        className={cn("flex items-center gap-3 mb-5", isActive && "animate-slide-up")}
        style={isActive ? { animationDelay: "100ms" } : undefined}
      >
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", slide.iconBg)}>
          <Icon size={20} />
        </div>
        <span className="text-white/40 text-xs font-medium uppercase tracking-widest">
          {slide.label}
        </span>
      </div>

      {/* Title */}
      <h2
        className={cn(
          "text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3",
          isActive && "animate-slide-up"
        )}
        style={isActive ? { animationDelay: "200ms" } : undefined}
      >
        {slide.title}
      </h2>

      {/* Subtitle */}
      <p
        className={cn(
          "text-[#cbd6e2] text-sm sm:text-base leading-relaxed mb-6 max-w-[560px]",
          isActive && "animate-slide-up"
        )}
        style={isActive ? { animationDelay: "300ms" } : undefined}
      >
        {slide.subtitle}
      </p>

      {/* Bullets */}
      {slide.bullets && (
        <div
          className={cn("space-y-3 mb-6", isActive && "animate-slide-up")}
          style={isActive ? { animationDelay: "400ms" } : undefined}
        >
          {slide.bullets.map((bullet, j) => {
            const BIcon = bullet.icon;
            return (
              <div key={j} className="flex items-start gap-3">
                <BIcon
                  size={16}
                  className="text-[#00A4BD] mt-0.5 shrink-0"
                />
                <span className="text-white/70 text-sm leading-relaxed">
                  {bullet.text}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Stats row */}
      {slide.stats && (
        <div
          className={cn("flex gap-4 mt-2", isActive && "animate-slide-up")}
          style={isActive ? { animationDelay: "500ms" } : undefined}
        >
          {slide.stats.map((stat, j) => (
            <div
              key={j}
              className="bg-white/[0.06] border border-white/10 rounded-xl px-5 py-3 text-center"
            >
              <div
                className="text-xl font-semibold"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-white/40 text-xs mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PasscodeSlide({
  isActive,
  passcode,
  showPasscode,
  error,
  shaking,
  onPasscodeChange,
  onToggleVisibility,
  onSubmit,
}: {
  isActive: boolean;
  passcode: string;
  showPasscode: boolean;
  error: string;
  shaking: boolean;
  onPasscodeChange: (v: string) => void;
  onToggleVisibility: () => void;
  onSubmit: () => void;
}) {
  return (
    <>
      {/* Icon + label */}
      <div
        className={cn("flex items-center gap-3 mb-5", isActive && "animate-slide-up")}
        style={isActive ? { animationDelay: "100ms" } : undefined}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/10 text-white/60">
          <Lock size={20} />
        </div>
        <span className="text-white/40 text-xs font-medium uppercase tracking-widest">
          Access
        </span>
      </div>

      {/* Title */}
      <h2
        className={cn(
          "text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3",
          isActive && "animate-slide-up"
        )}
        style={isActive ? { animationDelay: "200ms" } : undefined}
      >
        Ready to Explore?
      </h2>

      {/* Subtitle */}
      <p
        className={cn(
          "text-[#cbd6e2] text-sm sm:text-base leading-relaxed mb-8 max-w-[480px]",
          isActive && "animate-slide-up"
        )}
        style={isActive ? { animationDelay: "300ms" } : undefined}
      >
        Enter the passcode shared with you to access the interactive demo.
      </p>

      {/* Input + button */}
      <div
        className={cn("max-w-[360px]", isActive && "animate-slide-up")}
        style={isActive ? { animationDelay: "400ms" } : undefined}
      >
        <div className={cn("relative", shaking && "animate-shake")}>
          <input
            type={showPasscode ? "text" : "password"}
            value={passcode}
            onChange={(e) => onPasscodeChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSubmit();
            }}
            placeholder="Enter passcode"
            aria-label="Demo passcode"
            autoFocus={isActive}
            className={cn(
              "w-full bg-white/10 border rounded-xl px-4 py-3.5 pr-12 text-white text-sm",
              "placeholder-white/30 outline-none transition-all",
              error
                ? "border-[#FF7A59]/50 focus:border-[#FF7A59] focus:ring-2 focus:ring-[#FF7A59]/20"
                : "border-white/20 focus:border-[#FF7A59]/50 focus:ring-2 focus:ring-[#FF7A59]/20"
            )}
          />
          <button
            type="button"
            onClick={onToggleVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors cursor-pointer"
            aria-label={showPasscode ? "Hide passcode" : "Show passcode"}
          >
            {showPasscode ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {error && (
          <p className="text-[#FF7A59] text-xs mt-2">{error}</p>
        )}

        <button
          onClick={onSubmit}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-[#FF7A59] hover:bg-[#e86c4f] text-white font-medium px-6 py-3 rounded-xl transition-colors cursor-pointer"
        >
          Enter Demo
          <ArrowRight size={18} />
        </button>
      </div>
    </>
  );
}
