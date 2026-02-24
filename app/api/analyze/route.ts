import { NextRequest, NextResponse } from "next/server";
import { anthropic } from "@/lib/anthropic";
import { suggestionsByEmail } from "@/lib/data/emails";

export async function POST(req: NextRequest) {
  try {
    const { emailId, subject, body, segment, metrics, score } = await req.json();

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      system: `You are an expert email marketing optimization AI built into HubSpot's Marketing Hub.

Analyze the provided marketing email and return specific, actionable suggestions.

Rules:
- Be SPECIFIC. Reference actual words, phrases, and patterns from the email.
- Each suggestion must explain WHAT is wrong, WHY it matters, and WHAT to do instead.
- Include a realistic estimated improvement percentage (conservative, not hype).
- Consider the audience segment context.
- Limit to 4 suggestions, ordered by estimated impact (highest first).
- Professional, direct tone. No fluff.

Return ONLY a JSON array (no markdown, no wrapping) of objects with this exact structure:
[
  {
    "id": "unique-id",
    "category": "subject_line" | "content" | "timing" | "audience" | "tone",
    "categoryLabel": "Subject Line" | "Content / CTA" | "Timing" | "Audience" | "Tone",
    "categoryColorClasses": use these mappings: subject_line="text-orange-700 bg-orange-50 border-orange-100", content="text-blue-700 bg-blue-50 border-blue-100", timing="text-teal-700 bg-teal-50 border-teal-100", audience="text-purple-700 bg-purple-50 border-purple-100", tone="text-purple-700 bg-purple-50 border-purple-100",
    "priority": "high" | "medium" | "low",
    "priorityDot": "bg-rose-500" for high, "bg-amber-500" for medium, "bg-gray-400" for low,
    "title": "Short summary under 10 words",
    "body": "2-3 sentence actionable advice referencing specific email content.",
    "estimatedImpact": "+X% est. open rate" or "+X% est. click rate" or "-X% est. unsubscribes",
    "alternatives": ["alternative 1", "alternative 2"] (only for subject_line category, otherwise omit),
    "actionType": "apply" for high priority, "review" for medium, "none" for low
  }
]`,
      messages: [
        {
          role: "user",
          content: `Analyze this email:

Subject: ${subject}
Audience Segment: ${segment}

Email Body:
${body || "[No body content provided]"}

Current Metrics:
- Open Rate: ${metrics?.openRate ?? "N/A"}%
- Click Rate: ${metrics?.clickRate ?? "N/A"}%
- Unsubscribe Rate: ${metrics?.unsubscribeRate ?? "N/A"}%
- Bounce Rate: ${metrics?.bounceRate ?? "N/A"}%

Current AI Scores:
- Overall: ${score?.overall ?? "N/A"}
- Subject Line: ${score?.subjectLine ?? "N/A"}
- Content Quality: ${score?.contentQuality ?? "N/A"}
- Send Timing: ${score?.sendTiming ?? "N/A"}
- Audience Match: ${score?.audienceMatch ?? "N/A"}

Return the JSON array of suggestions.`,
        },
      ],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";

    const cleaned = text.replace(/```json\n?|\n?```/g, "").trim();
    const suggestions = JSON.parse(cleaned);

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("Analyze API error:", error);

    const { emailId } = await req.json().catch(() => ({ emailId: "" }));
    const fallback = suggestionsByEmail[emailId] || suggestionsByEmail["re-engagement-inactive-trials"] || [];

    return NextResponse.json({ suggestions: fallback });
  }
}
