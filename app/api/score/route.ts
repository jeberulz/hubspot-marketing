import { NextRequest, NextResponse } from "next/server";

const SPAM_WORDS = [
  "free",
  "discount",
  "miss out",
  "don't miss",
  "limited time",
  "act now",
  "buy now",
  "we miss you",
  "congratulations",
  "winner",
  "urgent",
  "expires",
  "hurry",
  "last chance",
  "click here",
];

function scoreSubjectLine(subject: string): { score: number; verdict: string } {
  let score = 75;

  const lower = subject.toLowerCase();
  const spamCount = SPAM_WORDS.filter((w) => lower.includes(w)).length;
  score -= spamCount * 12;

  if (subject.includes("{{") || subject.includes("first_name")) score += 8;

  const len = subject.length;
  if (len >= 30 && len <= 60) score += 5;
  else if (len < 20 || len > 80) score -= 10;

  if (subject.includes("!")) score -= 5;
  if (subject.includes("%") || lower.includes("off")) score -= 8;

  score = Math.max(10, Math.min(100, score));

  let verdict = "Well-crafted subject line";
  if (score < 40) verdict = "Spam-trigger language detected";
  else if (score < 60) verdict = "Could be more specific";
  else if (score < 75) verdict = "Decent but room for improvement";

  return { score, verdict };
}

function scoreContentQuality(body: string): {
  score: number;
  verdict: string;
} {
  let score = 70;

  const ctaPatterns = /\[.*?\]|<button|click here|learn more|get started|sign up|upgrade|buy now/gi;
  const ctaCount = (body.match(ctaPatterns) || []).length;
  if (ctaCount === 1) score += 10;
  else if (ctaCount === 0) score -= 5;
  else if (ctaCount >= 3) score -= 15;
  else if (ctaCount === 2) score -= 5;

  const wordCount = body.split(/\s+/).length;
  if (wordCount >= 50 && wordCount <= 150) score += 5;
  else if (wordCount > 300) score -= 10;
  else if (wordCount < 30) score -= 5;

  if (body.includes("{{") || body.includes("first_name")) score += 5;

  score = Math.max(10, Math.min(100, score));

  let verdict = "Well structured with clear CTA";
  if (score < 40) verdict = "Too many competing calls to action";
  else if (score < 60) verdict = "Content needs focus and trimming";
  else if (score < 75) verdict = "Good content, minor improvements possible";

  return { score, verdict };
}

function scoreSendTiming(segment: string): {
  score: number;
  verdict: string;
} {
  const segmentTimingScores: Record<string, number> = {
    "New Trial Users": 55,
    "High-Value Customers": 72,
    "Onboarding — Week 1": 68,
    "Dormant Users": 45,
    "Enterprise Accounts": 70,
    "Free Plan Users": 50,
    "All Segments": 65,
  };

  const score = segmentTimingScores[segment] || 60;

  let verdict = "Well-timed for engagement";
  if (score < 50) verdict = "Sent outside peak engagement window";
  else if (score < 65) verdict = "Timing could be optimized";
  else if (score < 75) verdict = "Good delivery window";

  return { score, verdict };
}

function scoreAudienceMatch(
  body: string,
  segment: string
): { score: number; verdict: string } {
  let score = 65;

  if (body.includes("{{") || body.includes("first_name")) score += 10;
  if (segment !== "All Segments") score += 5;

  const wordCount = body.split(/\s+/).length;
  if (wordCount > 200) score -= 5;

  const genericPhrases = [
    "dear customer",
    "valued customer",
    "dear user",
    "to whom",
  ];
  const lower = body.toLowerCase();
  if (genericPhrases.some((p) => lower.includes(p))) score -= 15;

  score = Math.max(10, Math.min(100, score));

  let verdict = "Well-matched to audience";
  if (score < 50) verdict = "Generic content for a specific segment";
  else if (score < 65) verdict = "Moderate personalization";
  else if (score < 80) verdict = "Good audience alignment";

  return { score, verdict };
}

export async function POST(req: NextRequest) {
  try {
    const { subject, body, segment } = await req.json();

    const subjectResult = scoreSubjectLine(subject || "");
    const contentResult = scoreContentQuality(body || "");
    const timingResult = scoreSendTiming(segment || "");
    const audienceResult = scoreAudienceMatch(body || "", segment || "");

    const overall = Math.round(
      subjectResult.score * 0.3 +
        contentResult.score * 0.3 +
        timingResult.score * 0.2 +
        audienceResult.score * 0.2
    );

    return NextResponse.json({
      score: {
        overall,
        subjectLine: subjectResult.score,
        contentQuality: contentResult.score,
        sendTiming: timingResult.score,
        audienceMatch: audienceResult.score,
      },
      verdicts: {
        subjectLine: subjectResult.verdict,
        contentQuality: contentResult.verdict,
        sendTiming: timingResult.verdict,
        audienceMatch: audienceResult.verdict,
      },
    });
  } catch (error) {
    console.error("Score API error:", error);
    return NextResponse.json(
      { error: "Failed to score email" },
      { status: 500 }
    );
  }
}
