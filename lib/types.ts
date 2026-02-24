export type SegmentStatus = "risk" | "healthy" | "warning" | "opportunity";

export interface SegmentChannelBreakdown {
  email: number;
  sms: number;
  whatsapp: number;
}

export interface Segment {
  id: string;
  name: string;
  contactCount: number;
  messagesPerWeek: number;
  channelBreakdown: SegmentChannelBreakdown;
  /** Bar widths as percentages (should sum to 100) */
  barWidths: { email: number; sms: number; whatsapp: number };
  status: SegmentStatus;
  statusLabel: string;
  openRate: number;
  clickRate: number;
  unsubscribeRate: number;
  unsubscribeHighlight: boolean;
  activeCampaigns: number;
}

export interface Campaign {
  id: string;
  name: string;
  channel: "Email" | "SMS" | "WhatsApp";
  type: "Automated" | "One-time";
  status: "Active" | "Sent" | "Paused";
  frequency: string;
  msgsPerWeek: number;
  openRate: number | null;
  clickRate: number;
  aiScore: number;
  emailId?: string;
  isClickable: boolean;
}

export type MessageType = "email" | "sms" | "whatsapp";

export interface FrequencyDay {
  label: string;
  summary?: string;
  summaryHighlight?: boolean;
  messages: MessageType[];
}

export interface Email {
  id: string;
  name: string;
  subject: string;
  body: string;
  status: "Sent" | "Draft" | "Active";
  sentDate: string;
  recipients: number;
  channel: "Email";
  segment: string;
  metrics: {
    openRate: number;
    clickRate: number;
    unsubscribeRate: number;
    bounceRate: number;
  };
  score: {
    overall: number;
    subjectLine: number;
    contentQuality: number;
    sendTiming: number;
    audienceMatch: number;
  };
  verdicts: {
    subjectLine: string;
    contentQuality: string;
    sendTiming: string;
    audienceMatch: string;
  };
}

export interface AISuggestion {
  category:
    | "subject_line"
    | "content"
    | "timing"
    | "cta"
    | "audience"
    | "deliverability";
  priority: "high" | "medium" | "low";
  title: string;
  body: string;
  estimated_impact: string;
  impact_metric: "open_rate" | "click_rate" | "conversion";
  current_issue: string;
}
