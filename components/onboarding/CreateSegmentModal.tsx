"use client";

import { useState } from "react";
import { X, Check, Users } from "lucide-react";

interface CreateSegmentModalProps {
  onClose: () => void;
  onComplete: () => void;
}

const CRITERIA_OPTIONS = [
  { id: "signed-up-14d", label: "Signed up in last 14 days" },
  { id: "mrr-500", label: "MRR > $500" },
  { id: "opened-email-7d", label: "Opened an email in last 7 days" },
  { id: "no-login-30d", label: "No login in last 30 days" },
  { id: "enterprise-plan", label: "Enterprise plan" },
  { id: "trial-user", label: "Currently on trial" },
];

export function CreateSegmentModal({
  onClose,
  onComplete,
}: CreateSegmentModalProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const toggleCriteria = (id: string) => {
    setSelectedCriteria((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleCreate = () => {
    setIsCreating(true);
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAF0F6]">
          <h2 className="text-lg font-semibold text-[#33475B]">
            Create a segment
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
            <div className="animate-fade-in">
              <label className="block text-sm font-medium text-[#33475B] mb-1.5">
                Segment name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Active Trial Users"
                className="w-full bg-white border border-[#cbd6e2] rounded-lg px-4 py-2.5 text-sm text-[#33475B] placeholder:text-[#cbd6e2] focus:border-[#00A4BD] focus:ring-1 focus:ring-[#00A4BD]/20 outline-none transition-colors"
                autoFocus
              />
            </div>
          )}

          {step === 1 && (
            <div className="animate-fade-in">
              <p className="text-sm text-[#516F90] mb-4">
                Select criteria for this segment:
              </p>
              <div className="space-y-2">
                {CRITERIA_OPTIONS.map((criteria) => (
                  <button
                    key={criteria.id}
                    onClick={() => toggleCriteria(criteria.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border-2 text-left transition-all ${
                      selectedCriteria.includes(criteria.id)
                        ? "border-[#00A4BD] bg-[#00A4BD]/5"
                        : "border-[#EAF0F6] hover:border-[#cbd6e2]"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                        selectedCriteria.includes(criteria.id)
                          ? "bg-[#00A4BD] border-[#00A4BD]"
                          : "border-[#cbd6e2]"
                      }`}
                    >
                      {selectedCriteria.includes(criteria.id) && (
                        <Check size={10} className="text-white" />
                      )}
                    </div>
                    <span className="text-sm text-[#33475B]">
                      {criteria.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in text-center py-4">
              {isCreating ? (
                <div>
                  <div className="w-10 h-10 border-2 border-[#00A4BD] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-sm text-[#516F90]">
                    Creating segment...
                  </p>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-[#00A4BD]/10 flex items-center justify-center mx-auto mb-4">
                    <Users
                      size={24}
                      strokeWidth={1.5}
                      className="text-[#00A4BD]"
                    />
                  </div>
                  <div className="text-3xl font-semibold tracking-tight text-[#00A4BD] mb-1">
                    ~2,340
                  </div>
                  <p className="text-sm text-[#516F90] mb-1">
                    contacts match &ldquo;{name || "Untitled"}&rdquo;
                  </p>
                  <p className="text-xs text-[#cbd6e2]">
                    {selectedCriteria.length} criteria selected
                  </p>
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
              disabled={step === 0 ? !name.trim() : selectedCriteria.length === 0}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                (step === 0 && name.trim()) || (step === 1 && selectedCriteria.length > 0)
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
                Create segment
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
