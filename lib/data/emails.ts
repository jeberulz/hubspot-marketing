import { Email } from "@/lib/types";

export interface EmailNavItem {
  id: string;
  name: string;
  score: number;
  status: "Sent" | "Active";
  statusDetail: string;
}

export const emailNavItems: EmailNavItem[] = [
  {
    id: "re-engagement-inactive-trials",
    name: "Re-engagement: Inactive Trials",
    score: 38,
    status: "Sent",
    statusDetail: "1.2k recipients",
  },
  {
    id: "feature-adoption-nudges",
    name: "Feature Adoption Nudges",
    score: 61,
    status: "Active",
    statusDetail: "3x/week",
  },
  {
    id: "february-product-update",
    name: "February Product Update",
    score: 72,
    status: "Sent",
    statusDetail: "8.4k recipients",
  },
  {
    id: "trial-expiry-countdown",
    name: "Trial Expiry Countdown",
    score: 74,
    status: "Active",
    statusDetail: "Daily",
  },
  {
    id: "welcome-drip-day-1",
    name: "Welcome Drip — Day 1",
    score: 82,
    status: "Active",
    statusDetail: "Daily",
  },
];

export const emails: Record<string, Email> = {
  "re-engagement-inactive-trials": {
    id: "re-engagement-inactive-trials",
    name: "Re-engagement: Inactive Trials",
    subject: "We miss you! Here's 20% off",
    body: "",
    status: "Sent",
    sentDate: "March 4, 2026",
    recipients: 1240,
    channel: "Email",
    segment: "New Trial Users",
    metrics: {
      openRate: 12.4,
      clickRate: 2.1,
      unsubscribeRate: 1.8,
      bounceRate: 0.3,
    },
    score: {
      overall: 38,
      subjectLine: 32,
      contentQuality: 45,
      sendTiming: 28,
      audienceMatch: 48,
    },
    verdicts: {
      subjectLine: "Spam-trigger language detected",
      contentQuality: "Too many competing calls to action",
      sendTiming: "Sent outside peak engagement window",
      audienceMatch: "Generic content for a specific segment",
    },
  },
  "feature-adoption-nudges": {
    id: "feature-adoption-nudges",
    name: "Feature Adoption Nudges",
    subject: "Have you tried these 3 features?",
    body: "",
    status: "Active",
    sentDate: "Ongoing",
    recipients: 2340,
    channel: "Email",
    segment: "New Trial Users",
    metrics: {
      openRate: 22.4,
      clickRate: 3.1,
      unsubscribeRate: 0.8,
      bounceRate: 0.2,
    },
    score: {
      overall: 61,
      subjectLine: 68,
      contentQuality: 55,
      sendTiming: 62,
      audienceMatch: 59,
    },
    verdicts: {
      subjectLine: "Decent but could be more specific",
      contentQuality: "Content is relevant but too long",
      sendTiming: "Good timing alignment",
      audienceMatch: "Moderate personalization",
    },
  },
  "february-product-update": {
    id: "february-product-update",
    name: "February Product Update",
    subject: "What's new in Q1: 3 features you'll love",
    body: "",
    status: "Sent",
    sentDate: "February 15, 2026",
    recipients: 8400,
    channel: "Email",
    segment: "All Segments",
    metrics: {
      openRate: 24.3,
      clickRate: 3.1,
      unsubscribeRate: 0.5,
      bounceRate: 0.2,
    },
    score: {
      overall: 72,
      subjectLine: 78,
      contentQuality: 74,
      sendTiming: 65,
      audienceMatch: 71,
    },
    verdicts: {
      subjectLine: "Clear and specific",
      contentQuality: "Well structured with clear CTA",
      sendTiming: "Slightly off-peak",
      audienceMatch: "Good general relevance",
    },
  },
  "trial-expiry-countdown": {
    id: "trial-expiry-countdown",
    name: "Trial Expiry Countdown",
    subject: "Your trial ends in 3 days — here's what you'll lose",
    body: "",
    status: "Active",
    sentDate: "Ongoing",
    recipients: 2340,
    channel: "Email",
    segment: "New Trial Users",
    metrics: {
      openRate: 35.6,
      clickRate: 5.7,
      unsubscribeRate: 0.6,
      bounceRate: 0.1,
    },
    score: {
      overall: 74,
      subjectLine: 72,
      contentQuality: 78,
      sendTiming: 70,
      audienceMatch: 76,
    },
    verdicts: {
      subjectLine: "Creates urgency but could be softer",
      contentQuality: "Focused single CTA",
      sendTiming: "Well-timed for engagement",
      audienceMatch: "Highly relevant to audience",
    },
  },
  "welcome-drip-day-1": {
    id: "welcome-drip-day-1",
    name: "Welcome Drip — Day 1",
    subject: "Your first step: set up your dashboard",
    body: "",
    status: "Active",
    sentDate: "Ongoing",
    recipients: 2340,
    channel: "Email",
    segment: "New Trial Users",
    metrics: {
      openRate: 42.1,
      clickRate: 8.3,
      unsubscribeRate: 0.2,
      bounceRate: 0.1,
    },
    score: {
      overall: 82,
      subjectLine: 85,
      contentQuality: 88,
      sendTiming: 78,
      audienceMatch: 77,
    },
    verdicts: {
      subjectLine: "Clear and action-oriented",
      contentQuality: "Concise with single clear CTA",
      sendTiming: "Good delivery window",
      audienceMatch: "Well-matched to new users",
    },
  },
};

export interface Suggestion {
  id: string;
  category: string;
  categoryLabel: string;
  categoryColorClasses: string;
  priority: "high" | "medium" | "low";
  priorityDot: string;
  title: string;
  body: string;
  estimatedImpact?: string;
  alternatives?: string[];
  actionType: "apply" | "review" | "none";
  numberBadge?: number;
}

export const suggestionsByEmail: Record<string, Suggestion[]> = {
  "re-engagement-inactive-trials": [
    {
      id: "s1",
      category: "subject_line",
      categoryLabel: "Subject Line",
      categoryColorClasses:
        "text-orange-700 bg-orange-50 border-orange-100",
      priority: "high",
      priorityDot: "bg-rose-500",
      title: "Rewrite spam-trigger subject",
      body: '"We miss you! Here\'s 20% off" relies on a discount-first approach that triggers promo tabs. Try a value-driven approach instead.',
      estimatedImpact: "+12% est. open rate",
      alternatives: [
        "Quick question about your trial setup",
        "3 tools to save you 4 hours this week",
      ],
      actionType: "apply",
      numberBadge: 1,
    },
    {
      id: "s2",
      category: "content",
      categoryLabel: "Content / CTA",
      categoryColorClasses:
        "text-blue-700 bg-blue-50 border-blue-100",
      priority: "high",
      priorityDot: "bg-rose-500",
      title: "Consolidate competing CTAs",
      body: 'Email contains 4 separate calls to action. Focus on one primary goal (e.g., "Log back in") to reduce decision fatigue.',
      estimatedImpact: "+8% est. click rate",
      actionType: "apply",
    },
    {
      id: "s3",
      category: "tone",
      categoryLabel: "Tone",
      categoryColorClasses:
        "text-purple-700 bg-purple-50 border-purple-100",
      priority: "medium",
      priorityDot: "bg-amber-500",
      title: "Remove artificial urgency",
      body: 'Phrases like "Don\'t miss out" and a generic 48-hour expiry feel inauthentic. Tie urgency to their specific trial expiration date instead.',
      estimatedImpact: "-1.2% est. unsubscribes",
      actionType: "review",
    },
    {
      id: "s4",
      category: "timing",
      categoryLabel: "Timing",
      categoryColorClasses:
        "text-teal-700 bg-teal-50 border-teal-100",
      priority: "low",
      priorityDot: "bg-gray-400",
      title: "Adjust send schedule",
      body: "This segment historically engages most on Tuesdays at 10 AM. Current send is immediate.",
      actionType: "none",
    },
  ],
};
