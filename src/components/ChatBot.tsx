import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { MessageSquare, Send, X, Sparkles } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What does Joel do?",
  "Show me his best projects",
  "Is he available for hire?",
  "What's his AI/ML stack?",
];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
const ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "**JOEL_AI online.** Ask me anything about Joel's work, skills, or how to reach him.",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Msg = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ANON_KEY}`,
        },
        body: JSON.stringify({
          // strip the welcome message from history sent to model
          messages: next.filter((_, i) => !(i === 0 && messages[0].role === "assistant")),
        }),
      });

      if (!resp.ok || !resp.body) {
        const errBody = await resp.json().catch(() => ({}));
        throw new Error(errBody.error || `Request failed (${resp.status})`);
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let assistant = "";
      let done = false;

      // create empty assistant bubble
      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buf += decoder.decode(value, { stream: true });

        let nl: number;
        while ((nl = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, nl);
          buf = buf.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line || line.startsWith(":")) continue;
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") {
            done = true;
            break;
          }
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              assistant += delta;
              setMessages((m) => {
                const copy = [...m];
                copy[copy.length - 1] = { role: "assistant", content: assistant };
                return copy;
              });
            }
          } catch {
            buf = line + "\n" + buf;
            break;
          }
        }
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      setMessages((m) => [
        ...m,
        { role: "assistant", content: `⚠️ ${msg}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground grid place-items-center glow-primary hover:bg-primary-glow transition-colors animate-pulse-ring"
      >
        {open ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed bottom-24 right-4 left-4 md:left-auto md:right-8 md:bottom-28 z-50 w-auto md:w-[400px] h-[min(560px,80vh)] panel rounded-md shadow-2xl flex flex-col overflow-hidden animate-fade-up"
          style={{ animationDuration: "0.35s" }}
        >
          {/* header */}
          <div className="px-4 py-3 border-b border-border flex items-center justify-between bg-surface-elevated/60">
            <div className="flex items-center gap-2 font-tech text-sm text-cloud">
              <Sparkles className="w-4 h-4 text-primary" />
              JOEL_AI
              <span className="text-[10px] px-1.5 py-0.5 ml-1 border border-success/40 text-success font-code rounded-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-live" />
                ONLINE
              </span>
            </div>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-primary" aria-label="Close">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-fade-up`}
                style={{ animationDuration: "0.3s" }}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2 text-sm rounded-md font-code leading-relaxed break-words ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-surface-elevated border border-border text-cloud"
                  }`}
                >
                  {m.role === "assistant" ? (
                    <div className="prose-chat">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <p className="m-0 mb-1 last:mb-0">{children}</p>,
                          strong: ({ children }) => <strong className="text-primary">{children}</strong>,
                          ul: ({ children }) => <ul className="list-disc pl-4 my-1">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal pl-4 my-1">{children}</ol>,
                          a: ({ href, children }) => (
                            <a href={href} target="_blank" rel="noreferrer" className="text-primary underline">
                              {children}
                            </a>
                          ),
                          code: ({ children }) => (
                            <code className="px-1 py-0.5 rounded bg-background/60 text-primary">{children}</code>
                          ),
                        }}
                      >
                        {m.content || "▍"}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            ))}
            {loading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="bg-surface-elevated border border-border px-3 py-2 rounded-md font-code text-xs text-muted-foreground flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            )}
          </div>

          {/* suggestions (only when conversation empty-ish) */}
          {messages.length <= 2 && !loading && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-[10px] font-code px-2 py-1 border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="p-3 border-t border-border flex gap-2 bg-surface-elevated/40"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about Joel..."
              className="flex-1 bg-transparent border border-border focus:border-primary outline-none px-3 py-2 font-code text-sm text-cloud rounded-sm transition-colors"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-10 h-10 grid place-items-center bg-primary text-primary-foreground rounded-sm hover:bg-primary-glow disabled:opacity-40 transition-colors"
              aria-label="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
