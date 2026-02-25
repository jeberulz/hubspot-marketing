"use client";

import { useRouter } from "next/navigation";
import { useOnboarding } from "@/lib/onboarding/context";

function HubSpotSprocket({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} fill="#FF7A59">
      <path d="M267.4 211.6c-25.1 23.7-40.8 57.3-40.8 94.6 0 29.3 9.7 56.3 26 78L203.1 434c-4.4-1.6-9.1-2.5-14-2.5-10.8 0-20.9 4.2-28.5 11.8-7.6 7.6-11.8 17.8-11.8 28.6s4.2 20.9 11.8 28.5c7.6 7.6 17.8 11.8 28.5 11.8 10.8 0 20.9-4.2 28.6-11.8 7.6-7.6 11.8-17.8 11.8-28.5 0-4.2-.6-8.2-1.9-12.1l50-50.2c22 16.9 49.4 26.9 79.3 26.9 71.9 0 130-58.3 130-130.2 0-65.2-47.7-119.2-110.2-128.7V116c17.6-7.3 29.9-24.7 29.9-44.9 0-26.8-21.7-48.5-48.5-48.5-26.8 0-48.5 21.7-48.5 48.5 0 20.2 12.3 37.6 29.9 44.9v51.3c-29.6 4.5-55.9 18.4-75.8 38.3zM357.9 306.2c0 37.4-30.4 67.8-67.8 67.8-37.4 0-67.8-30.4-67.8-67.8 0-37.4 30.4-67.8 67.8-67.8 37.4 0 67.8 30.4 67.8 67.8z" />
    </svg>
  );
}

function PreviewCard() {
  return (
    <div
      className="w-[340px] bg-white rounded-xl border border-[#EAF0F6] shadow-lg p-5 animate-stagger-fade-in"
      style={{ animationDelay: "800ms" }}
    >
      {/* Mini segment card preview */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-medium text-[#33475B]">
            High-Value Customers
          </span>
        </div>
        <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
          Healthy
        </span>
      </div>

      {/* Frequency bar preview */}
      <div className="mb-4">
        <div className="text-xs text-[#516F90] mb-1.5">3.1 msgs / week</div>
        <div className="h-2 bg-[#F5F8FA] rounded-full overflow-hidden flex">
          <div
            className="h-full bg-[#00A4BD] rounded-l-full transition-all duration-1000"
            style={{ width: "55%", animationDelay: "1.2s" }}
          />
          <div
            className="h-full bg-[#00BDA5] transition-all duration-1000"
            style={{ width: "25%" }}
          />
          <div
            className="h-full bg-[#00C853] rounded-r-full transition-all duration-1000"
            style={{ width: "10%" }}
          />
        </div>
      </div>

      {/* Mini metrics */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <div className="text-[10px] text-[#516F90] mb-0.5">Open rate</div>
          <div className="text-sm font-semibold text-[#33475B]">38.2%</div>
        </div>
        <div>
          <div className="text-[10px] text-[#516F90] mb-0.5">Click rate</div>
          <div className="text-sm font-semibold text-[#33475B]">6.1%</div>
        </div>
        <div>
          <div className="text-[10px] text-[#516F90] mb-0.5">Unsub rate</div>
          <div className="text-sm font-semibold text-emerald-600">0.4%</div>
        </div>
      </div>
    </div>
  );
}

export default function WelcomePage() {
  const router = useRouter();
  const { setPhase } = useOnboarding();

  const handleGetStarted = () => {
    setPhase("setup");
    router.push("/setup");
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#F5F8FA] to-white relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#33475B 1px, transparent 1px), linear-gradient(90deg, #33475B 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl px-6">
        {/* Logo */}
        <div className="animate-scale-in mb-8">
          <HubSpotSprocket className="w-16 h-16" />
        </div>

        {/* Headline */}
        <h1
          className="text-4xl font-semibold tracking-tight text-[#33475B] mb-3 animate-stagger-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          Welcome to Marketing Hub
        </h1>

        {/* Subheading */}
        <p
          className="text-lg text-[#516F90] mb-10 leading-relaxed animate-stagger-fade-in"
          style={{ animationDelay: "400ms" }}
        >
          AI-powered message strategy that protects your contacts and boosts
          engagement.
        </p>

        {/* Preview card */}
        <div className="mb-10">
          <PreviewCard />
        </div>

        {/* CTA */}
        <button
          onClick={handleGetStarted}
          className="px-8 py-3 bg-[#FF7A59] hover:bg-[#e86c4f] text-white text-base font-medium rounded-lg transition-colors shadow-sm animate-stagger-fade-in"
          style={{ animationDelay: "1000ms" }}
        >
          Get started
        </button>

        {/* Micro-copy */}
        <p
          className="text-xs text-[#516F90] mt-3 animate-stagger-fade-in"
          style={{ animationDelay: "1200ms" }}
        >
          Takes about 2 minutes
        </p>
      </div>
    </div>
  );
}
