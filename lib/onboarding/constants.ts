import type { OnboardingState, MilestoneKey } from "./types";

export const STORAGE_KEY = "hubspot-nux-state";

export const MILESTONE_THRESHOLD_EXPLORING = 3;

export const DEFAULT_ONBOARDING_STATE: OnboardingState = {
  phase: "welcome",
  currentSetupStep: 0,
  completedSetupSteps: [],
  profile: {
    firstName: "",
    companyName: "",
    role: null,
    goal: null,
    experienceLevel: null,
  },
  milestones: {
    importedContacts: false,
    createdSegment: false,
    setGuardrails: false,
    createdCampaign: false,
    usedAiOptimizer: false,
  },
  dismissedTooltips: [],
  hasSeenAiDemo: false,
  setupCompletedAt: null,
  firstVisitAt: new Date().toISOString(),
};

export const MILESTONE_LABELS: Record<
  MilestoneKey,
  { title: string; description: string; cta: string; href: string }
> = {
  importedContacts: {
    title: "Import contacts",
    description: "Add your audience to start tracking messaging health.",
    cta: "Import",
    href: "/marketing/messages",
  },
  createdSegment: {
    title: "Create your first segment",
    description: "Group contacts by behavior or attributes.",
    cta: "Create segment",
    href: "/marketing/messages",
  },
  setGuardrails: {
    title: "Set frequency guardrails",
    description: "Protect contacts from over-messaging across channels.",
    cta: "Set guardrails",
    href: "/marketing/messages",
  },
  createdCampaign: {
    title: "Create a campaign",
    description: "Send your first email, SMS, or WhatsApp message.",
    cta: "Create campaign",
    href: "/marketing/messages",
  },
  usedAiOptimizer: {
    title: "Optimize an email with AI",
    description: "Get AI-powered suggestions to improve performance.",
    cta: "Try AI optimizer",
    href: "/marketing/messages/emails",
  },
};

export const SETUP_STEPS = [
  { id: 0, title: "About you", shortTitle: "Profile" },
  { id: 1, title: "Your goal", shortTitle: "Goal" },
  { id: 2, title: "Import contacts", shortTitle: "Contacts" },
  { id: 3, title: "Guardrails", shortTitle: "Guardrails" },
  { id: 4, title: "Meet your AI", shortTitle: "AI" },
] as const;

export const TOTAL_MILESTONES = 5;
