import { NextRequest } from "next/server";
import { anthropic } from "@/lib/anthropic";

export async function POST(req: NextRequest) {
  try {
    const { message, emailContext, history } = await req.json();

    const systemPrompt = `You are an AI email marketing assistant embedded in HubSpot's Marketing Hub. You're helping a marketer optimize a specific email campaign.

Email context:
- Name: ${emailContext?.name ?? "Unknown"}
- Subject: ${emailContext?.subject ?? "Unknown"}
- Audience: ${emailContext?.segment ?? "Unknown"}
- Open Rate: ${emailContext?.metrics?.openRate ?? "N/A"}%
- Click Rate: ${emailContext?.metrics?.clickRate ?? "N/A"}%
- Unsubscribe Rate: ${emailContext?.metrics?.unsubscribeRate ?? "N/A"}%
- AI Score: ${emailContext?.score?.overall ?? "N/A"}/100

Be concise (2-4 sentences unless they ask for a rewrite). Give actionable advice grounded in the email's content and audience. If asked to rewrite, provide the rewrite directly. Do not use markdown headers. Use plain text with line breaks.`;

    const messages = [
      ...(history || []).map((msg: { role: string; content: string }) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      { role: "user" as const, content: message },
    ];

    const stream = await anthropic.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
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
  } catch (error) {
    console.error("Chat API error:", error);

    const fallback =
      "I'd suggest focusing on the subject line first — it has the biggest impact on open rates for this segment. Try replacing discount-driven language with value-driven copy that speaks to what the user can achieve.";

    return new Response(fallback, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
