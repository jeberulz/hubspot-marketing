import { NextRequest } from "next/server";
import { anthropic } from "@/lib/anthropic";

export async function POST(req: NextRequest) {
  try {
    const { message, profile, milestones, history } = await req.json();

    const goalDescriptions: Record<string, string> = {
      "grow-list": "grow their subscriber list",
      "improve-engagement": "improve email engagement rates",
      "reduce-churn": "reduce unsubscribes and re-engage dormant users",
      "launch-product": "launch a new product with email campaigns",
    };

    const goalDesc = profile?.goal
      ? goalDescriptions[profile.goal] || "optimize their marketing"
      : "get started with email marketing";

    const completedCount = milestones
      ? Object.values(milestones).filter(Boolean).length
      : 0;

    const systemPrompt = `You are HubSpot's friendly AI onboarding assistant. The user just signed up and is setting up their message strategy dashboard.

User context:
- Name: ${profile?.firstName || "there"}
- Company: ${profile?.companyName || "their company"}
- Role: ${profile?.role || "unknown"}
- Goal: ${goalDesc}
- Experience: ${profile?.experienceLevel || "unknown"}
- Progress: ${completedCount}/5 setup milestones complete

Your personality: Warm, concise, action-oriented. You're like a helpful colleague, not a chatbot.

Rules:
- Keep responses to 2-3 sentences max
- Always suggest a specific next action they can take in the dashboard
- Reference their goal when relevant
- If they ask about features, explain them simply
- Don't use markdown headers or bullet lists — just conversational text
- If they seem stuck, guide them to the Getting Started checklist`;

    const messages = [
      ...(history || []).map((msg: { role: string; content: string }) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      { role: "user" as const, content: message },
    ];

    const stream = await anthropic.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 512,
      system: systemPrompt,
      messages,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch {
    const fallback =
      "Welcome! I'd suggest starting with the Getting Started checklist on your dashboard. Creating your first segment is a great next step — it helps you target the right contacts with the right messages.";

    return new Response(fallback, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
