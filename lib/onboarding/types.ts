export type OnboardingPhase =
  | "welcome"
  | "setup"
  | "first-actions"
  | "exploring"
  | "proficient";

export type UserRole = "marketer" | "founder" | "agency" | "other";

export type UserGoal =
  | "grow-list"
  | "improve-engagement"
  | "reduce-churn"
  | "launch-product";

export type ExperienceLevel = "beginner" | "intermediate" | "advanced";

export interface UserProfile {
  firstName: string;
  companyName: string;
  role: UserRole | null;
  goal: UserGoal | null;
  experienceLevel: ExperienceLevel | null;
}

export interface Milestones {
  importedContacts: boolean;
  createdSegment: boolean;
  setGuardrails: boolean;
  createdCampaign: boolean;
  usedAiOptimizer: boolean;
}

export type MilestoneKey = keyof Milestones;

export interface OnboardingState {
  phase: OnboardingPhase;
  currentSetupStep: number;
  completedSetupSteps: number[];
  profile: UserProfile;
  milestones: Milestones;
  dismissedTooltips: string[];
  hasSeenAiDemo: boolean;
  setupCompletedAt: string | null;
  firstVisitAt: string;
}
