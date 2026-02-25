"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles, X, Send } from "lucide-react";
import { useOnboarding } from "@/lib/onboarding/context";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function AiOnboardingChat() {
  const { state } = useOnboarding();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const shouldShow =
    state.phase === "first-actions" || state.phase === "exploring";

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Add greeting when opened for first time
  useEffect(() => {
    if (isOpen && !hasGreeted) {
      const greeting = state.profile.firstName
        ? `Hi ${state.profile.firstName}! I'm your AI assistant. I can help you set up campaigns, understand segments, or optimize emails. What would you like to do first?`
        : `Hi there! I'm your AI assistant. I can help you set up campaigns, understand segments, or optimize emails. What would you like to do first?`;

      setMessages([{ role: "assistant", content: greeting }]);
      setHasGreeted(true);
    }
  }, [isOpen, hasGreeted, state.profile.firstName]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isStreaming) return;

    const userMessage = input.trim();
    setInput("");
    const newMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: userMessage },
    ];
    setMessages(newMessages);
    setIsStreaming(true);

    try {
      const response = await fetch("/api/onboarding-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          profile: state.profile,
          milestones: state.milestones,
          history: messages,
        }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      setMessages([
        ...newMessages,
        { role: "assistant", content: "" },
      ]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          assistantContent += decoder.decode(value, { stream: true });
          setMessages([
            ...newMessages,
            { role: "assistant", content: assistantContent },
          ]);
        }
      }
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "I'd suggest checking out the Getting Started checklist on your dashboard — it'll guide you through the most important setup steps!",
        },
      ]);
    } finally {
      setIsStreaming(false);
    }
  }, [input, isStreaming, messages, state.profile, state.milestones]);

  if (!shouldShow) return null;

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[#6C63FF] hover:bg-[#5A52E0] text-white shadow-lg flex items-center justify-center transition-all hover:scale-105 z-40"
          title="AI Assistant"
        >
          <Sparkles size={20} strokeWidth={1.5} />
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[380px] h-[500px] bg-white rounded-xl shadow-2xl border border-[#EAF0F6] flex flex-col z-50 animate-scale-in overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#EAF0F6] bg-[#F0F1FA]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#6C63FF] flex items-center justify-center">
                <Sparkles size={14} className="text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#33475B]">
                  AI Assistant
                </div>
                <div className="text-[10px] text-[#516F90]">
                  Here to help you get started
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#516F90] hover:text-[#33475B] transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#00A4BD] text-white"
                      : "bg-[#F5F8FA] text-[#33475B]"
                  }`}
                >
                  {msg.content}
                  {msg.role === "assistant" &&
                    isStreaming &&
                    i === messages.length - 1 && (
                      <span className="inline-block w-0.5 h-3.5 bg-[#33475B] ml-0.5 animate-cursor-blink" />
                    )}
                </div>
              </div>
            ))}

            {isStreaming && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex justify-start">
                <div className="bg-[#F5F8FA] rounded-lg px-3 py-2 flex gap-1">
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-[#EAF0F6]">
            <div className="flex items-center gap-2 bg-[#F5F8FA] rounded-lg px-3 py-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-[#33475B] placeholder:text-[#cbd6e2]"
                disabled={isStreaming}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isStreaming}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                  input.trim() && !isStreaming
                    ? "bg-[#00A4BD] text-white hover:bg-[#00899e]"
                    : "bg-[#EAF0F6] text-[#cbd6e2]"
                }`}
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
