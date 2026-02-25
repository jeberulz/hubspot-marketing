"use client";

import { useState } from "react";
import { X, Mail, MessageSquare, Smartphone, Check } from "lucide-react";

interface CreateCampaignModalProps {
  onClose: () => void;
  onComplete: () => void;
}

const SEGMENTS = [
  "New Trial Users",
  "High-Value Customers",
  "Onboarding — Week 1",
  "Dormant Users",
  "Enterprise Accounts",
  "Free Plan Users",
];

const TEMPLATES = [
  {
    id: "welcome",
    name: "Welcome Series",
    subject: "Welcome to [Company]! Here's how to get started",
    score: 85,
  },
  {
    id: "engagement",
    name: "Re-engagement",
    subject: "We noticed you haven't logged in recently",
    score: 72,
  },
  {
    id: "product-update",
    name: "Product Update",
    subject: "New feature: [Feature Name] is here",
    score: 78,
  },
  {
    id: "nurture",
    name: "Nurture Sequence",
    subject: "3 tips to get the most from your trial",
    score: 81,
  },
];

export function CreateCampaignModal({
  onClose,
  onComplete,
}: CreateCampaignModalProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [channel, setChannel] = useState<string | null>(null);
  const [segment, setSegment] = useState<string | null>(null);
  const [template, setTemplate] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const channels = [
    { value: "email", label: "Email", icon: Mail, color: "#00A4BD" },
    { value: "sms", label: "SMS", icon: MessageSquare, color: "#00BDA5" },
    {
      value: "whatsapp",
      label: "WhatsApp",
      icon: Smartphone,
      color: "#00C853",
    },
  ];

  const handleCreate = () => {
    setIsCreating(true);
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  const canAdvance = () => {
    switch (step) {
      case 0:
        return name.trim().length > 0 && channel !== null;
      case 1:
        return segment !== null;
      case 2:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAF0F6]">
          <h2 className="text-lg font-semibold text-[#33475B]">
            Create a campaign
          </h2>
          <button
            onClick={onClose}
            className="text-[#cbd6e2] hover:text-[#516F90] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          {step === 0 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <label className="block text-sm font-medium text-[#33475B] mb-1.5">
                  Campaign name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Welcome Drip Series"
                  className="w-full bg-white border border-[#cbd6e2] rounded-lg px-4 py-2.5 text-sm text-[#33475B] placeholder:text-[#cbd6e2] focus:border-[#00A4BD] focus:ring-1 focus:ring-[#00A4BD]/20 outline-none transition-colors"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#33475B] mb-2">
                  Channel
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {channels.map(({ value, label, icon: Icon, color }) => (
                    <button
                      key={value}
                      onClick={() => setChannel(value)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                        channel === value
                          ? "border-[#00A4BD] bg-[#00A4BD]/5"
                          : "border-[#EAF0F6] hover:border-[#cbd6e2]"
                      }`}
                    >
                      <Icon
                        size={20}
                        strokeWidth={1.5}
                        style={{
                          color: channel === value ? color : "#516F90",
                        }}
                      />
                      <span
                        className={`text-xs font-medium ${
                          channel === value
                            ? "text-[#00A4BD]"
                            : "text-[#33475B]"
                        }`}
                      >
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="animate-fade-in">
              <p className="text-sm text-[#516F90] mb-4">
                Which segment should this campaign target?
              </p>
              <div className="space-y-2">
                {SEGMENTS.map((seg) => (
                  <button
                    key={seg}
                    onClick={() => setSegment(seg)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border-2 text-left transition-all ${
                      segment === seg
                        ? "border-[#00A4BD] bg-[#00A4BD]/5"
                        : "border-[#EAF0F6] hover:border-[#cbd6e2]"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        segment === seg
                          ? "border-[#00A4BD] bg-[#00A4BD]"
                          : "border-[#cbd6e2]"
                      }`}
                    >
                      {segment === seg && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="text-sm text-[#33475B]">{seg}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              {isCreating ? (
                <div className="text-center py-6">
                  <div className="w-10 h-10 border-2 border-[#00A4BD] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-sm text-[#516F90]">
                    Creating campaign...
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-[#516F90] mb-4">
                    Start with a template or from scratch:
                  </p>
                  <div className="space-y-2">
                    {TEMPLATES.map((tmpl) => (
                      <button
                        key={tmpl.id}
                        onClick={() => setTemplate(tmpl.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border-2 text-left transition-all ${
                          template === tmpl.id
                            ? "border-[#00A4BD] bg-[#00A4BD]/5"
                            : "border-[#EAF0F6] hover:border-[#cbd6e2]"
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-[#33475B]">
                            {tmpl.name}
                          </div>
                          <div className="text-xs text-[#516F90] truncate">
                            {tmpl.subject}
                          </div>
                        </div>
                        <div
                          className={`text-xs font-semibold px-2 py-0.5 rounded ${
                            tmpl.score >= 80
                              ? "text-emerald-700 bg-emerald-50"
                              : "text-amber-700 bg-amber-50"
                          }`}
                        >
                          {tmpl.score}
                        </div>
                      </button>
                    ))}
                    <button
                      onClick={() => setTemplate("scratch")}
                      className={`w-full px-4 py-3 rounded-lg border-2 text-left transition-all ${
                        template === "scratch"
                          ? "border-[#00A4BD] bg-[#00A4BD]/5"
                          : "border-dashed border-[#cbd6e2] hover:border-[#00A4BD]"
                      }`}
                    >
                      <div className="text-sm font-medium text-[#33475B]">
                        Start from scratch
                      </div>
                      <div className="text-xs text-[#516F90]">
                        Build your own email from a blank canvas
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#EAF0F6] flex justify-between">
          <button
            onClick={step === 0 ? onClose : () => setStep(step - 1)}
            className="text-sm font-medium text-[#516F90] hover:text-[#33475B] transition-colors"
          >
            {step === 0 ? "Cancel" : "Back"}
          </button>
          {step < 2 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canAdvance()}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                canAdvance()
                  ? "bg-[#FF7A59] hover:bg-[#e86c4f] text-white"
                  : "bg-[#EAF0F6] text-[#cbd6e2] cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          ) : (
            !isCreating && (
              <button
                onClick={handleCreate}
                className="px-5 py-2 rounded-lg text-sm font-medium bg-[#FF7A59] hover:bg-[#e86c4f] text-white transition-colors"
              >
                Create campaign
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
