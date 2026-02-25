"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { OnboardingState, OnboardingPhase, MilestoneKey } from "./types";
import {
  STORAGE_KEY,
  DEFAULT_ONBOARDING_STATE,
  MILESTONE_THRESHOLD_EXPLORING,
  TOTAL_MILESTONES,
} from "./constants";

interface OnboardingContextValue {
  state: OnboardingState;
  isLoaded: boolean;
  updateOnboarding: (updates: Partial<OnboardingState>) => void;
  setPhase: (phase: OnboardingPhase) => void;
  completeMilestone: (key: MilestoneKey) => void;
  dismissTooltip: (id: string) => void;
  shouldShowTooltip: (id: string) => boolean;
  resetOnboarding: () => void;
  completedMilestoneCount: number;
  progressPercentage: number;
  isNewUser: boolean;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

function loadState(): OnboardingState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as OnboardingState;
  } catch {
    return null;
  }
}

function saveState(state: OnboardingState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable
  }
}

function countMilestones(state: OnboardingState): number {
  return Object.values(state.milestones).filter(Boolean).length;
}

function computePhase(state: OnboardingState): OnboardingPhase {
  if (state.phase === "welcome" || state.phase === "setup") return state.phase;
  const count = countMilestones(state);
  if (count >= TOTAL_MILESTONES) return "proficient";
  if (count >= MILESTONE_THRESHOLD_EXPLORING) return "exploring";
  return "first-actions";
}

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OnboardingState>(
    DEFAULT_ONBOARDING_STATE
  );
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = loadState();
    if (saved) {
      setState(saved);
    }
    setIsLoaded(true);
  }, []);

  // Persist to localStorage on every state change (after initial load)
  useEffect(() => {
    if (isLoaded) {
      saveState(state);
    }
  }, [state, isLoaded]);

  const updateOnboarding = useCallback(
    (updates: Partial<OnboardingState>) => {
      setState((prev) => {
        const next = { ...prev, ...updates };
        next.phase = computePhase(next);
        return next;
      });
    },
    []
  );

  const setPhase = useCallback((phase: OnboardingPhase) => {
    setState((prev) => {
      const next = { ...prev, phase };
      return next;
    });
  }, []);

  const completeMilestone = useCallback((key: MilestoneKey) => {
    setState((prev) => {
      if (prev.milestones[key]) return prev;
      const next = {
        ...prev,
        milestones: { ...prev.milestones, [key]: true },
      };
      next.phase = computePhase(next);
      return next;
    });
  }, []);

  const dismissTooltip = useCallback((id: string) => {
    setState((prev) => {
      if (prev.dismissedTooltips.includes(id)) return prev;
      return {
        ...prev,
        dismissedTooltips: [...prev.dismissedTooltips, id],
      };
    });
  }, []);

  const shouldShowTooltip = useCallback(
    (id: string) => {
      if (state.phase === "proficient") return false;
      return !state.dismissedTooltips.includes(id);
    },
    [state.phase, state.dismissedTooltips]
  );

  const resetOnboarding = useCallback(() => {
    const fresh = {
      ...DEFAULT_ONBOARDING_STATE,
      firstVisitAt: new Date().toISOString(),
    };
    setState(fresh);
    saveState(fresh);
  }, []);

  const completedMilestoneCount = countMilestones(state);
  const progressPercentage = (completedMilestoneCount / TOTAL_MILESTONES) * 100;
  const isNewUser =
    state.phase === "welcome" ||
    state.phase === "setup" ||
    state.phase === "first-actions";

  return (
    <OnboardingContext.Provider
      value={{
        state,
        isLoaded,
        updateOnboarding,
        setPhase,
        completeMilestone,
        dismissTooltip,
        shouldShowTooltip,
        resetOnboarding,
        completedMilestoneCount,
        progressPercentage,
        isNewUser,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return ctx;
}
