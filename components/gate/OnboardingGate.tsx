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

const DEMO_PASSCODE = "123456";

function HubSpotLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 550 654" className={cn("w-7 h-7", className)} fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="onboarding-logo-mask" style={{ maskType: "luminance" as const }} maskUnits="userSpaceOnUse" x="0" y="0" width="550" height="654">
        <path d="M549.199 0H0V653.258H549.199V0Z" fill="white"/>
      </mask>
      <g mask="url(#onboarding-logo-mask)">
        <path fillRule="evenodd" clipRule="evenodd" d="M420.095 168.427V235.518H419.989C481.441 244.907 530.53 291.034 543.123 351.222C555.716 411.409 529.164 472.996 476.521 505.707C423.879 538.418 356.216 535.37 306.8 498.064L251.547 552.676C252.976 557.108 253.738 561.724 253.803 566.375C253.803 592.841 232.096 614.296 205.319 614.296C178.542 614.296 156.835 592.841 156.835 566.375C156.835 539.908 178.542 518.451 205.319 518.451C210.024 518.518 214.693 519.27 219.176 520.682L275.031 465.476C239.815 415.957 238.906 350.166 272.737 299.717L89.2038 158.494C64.5777 172.465 33.398 167.31 14.7129 146.178C-3.97232 125.046 -4.9661 93.8151 12.3387 71.5644C29.6435 49.3136 60.4338 42.2321 85.8993 54.6457C111.365 67.0596 124.422 95.5161 117.095 122.631L303.767 266.328C324.131 250.142 348.46 239.562 374.291 235.658V168.427C355.952 159.961 344.196 141.8 344.106 121.794V120.226C344.184 91.7121 367.55 68.6162 396.399 68.5395H397.987C426.833 68.6162 450.2 91.7121 450.278 120.226V121.794C450.19 141.8 438.434 159.961 420.095 168.427ZM320.832 380.867C320.762 422.577 354.902 456.456 397.103 456.554L397.278 456.59C439.499 456.59 473.725 422.758 473.725 381.028C473.745 339.315 439.564 305.478 397.361 305.433C355.161 305.388 320.905 339.154 320.832 380.867Z" fill="#FF4800"/>
      </g>
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
