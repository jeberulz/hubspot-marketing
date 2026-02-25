# HubSpot Marketing Hub — Message Strategy & Optimizer (Demo)

> **This is a demo application built for an interview.** All data is hardcoded/mock — no real HubSpot account or live marketing data is used.

## What Is This?

A concept prototype demonstrating what an AI-powered **Message Strategy & Optimizer** feature could look like inside HubSpot's Marketing Hub. The app helps marketers monitor messaging health, detect over-messaging risks, and optimize individual emails using AI-generated suggestions.

## Key Features

- **Segment Health Dashboard** — Overview of audience segments with frequency tracking, risk/warning/healthy status badges, and per-channel guardrails (email, SMS, WhatsApp)
- **Over-Messaging Detection** — Surfaces alerts when segments receive too many messages relative to configured guardrails
- **AI Email Scoring** — Algorithmic quality score (0–100) across four dimensions: subject line, content quality, send timing, and audience match
- **AI Optimization Suggestions** — Claude-powered recommendations with estimated impact, prioritized by category
- **AI Chat Assistant** — Real-time streaming chat to ask questions and get optimization advice for a specific email

## Demo Data

All marketing data is hardcoded in `/lib/data/`:

| File | Contents |
|---|---|
| `segments.ts` | 6 audience segments (New Trial Users, High-Value Customers, etc.) |
| `campaigns.ts` | Campaigns per segment with pre-set metrics and AI scores |
| `emails.ts` | 5 mock emails with scores, metrics, and fallback suggestions |
| `frequency.ts` | 14-day message frequency data per segment |

The AI features (`/api/analyze` and `/api/chat`) make real calls to Claude (`claude-sonnet-4-20250514`) when an `ANTHROPIC_API_KEY` is provided, with graceful fallback to hardcoded responses otherwise.

## Tech Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** — all UI is custom-built, no component library
- **Anthropic SDK** — powers the AI suggestions and chat assistant
- **Lucide React** — icons
- **Lexend Deca** — primary font via `next/font`

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment (optional — AI features fall back to hardcoded data without it)
echo "ANTHROPIC_API_KEY=your-key-here" > .env.local

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Pages

| Route | Description |
|---|---|
| `/marketing/messages` | Strategy dashboard — metrics, AI insights, segment health grid |
| `/marketing/messages/emails` | Searchable email table with AI scores |
| `/marketing/messages/segment/[id]` | Segment detail — frequency timeline, campaigns, guardrail editor |
| `/marketing/messages/email/[id]` | Email optimizer — score gauge, sub-scores, AI suggestions, chat |
