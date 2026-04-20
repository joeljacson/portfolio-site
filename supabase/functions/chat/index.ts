import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are JOEL_AI — a friendly, slightly playful command-center style assistant that answers questions about Joel Jacson J's portfolio. Speak in first-person plural ("we / Joel") sparingly; usually just answer naturally. Keep replies SHORT (1–4 sentences unless asked for detail). You can use light markdown (bold, lists). If asked something you don't know about Joel, say so honestly and suggest contacting him.

=== JOEL JACSON J — FACTS ===
LOCATION: Chennai, India
EMAIL: jamesjoel7114@gmail.com
PHONE: +91 93636 74032
LINKEDIN: linkedin.com/in/joeljacsonj
GITHUB: github.com/joeljacson

ROLE: Python Full Stack Developer with strong foundations in data engineering, AI/ML and scalable system design.

EDUCATION: B.Tech in Information Technology, Kings Engineering College (2022–2026).

EXPERIENCE:
- SQL Programming Intern @ Hyperlynx Infotech (Mar 2025 – May 2025): optimized SQL queries, improved DB performance, joins/filtering/indexing.
- Full Stack Web Dev Intern @ Hyperlynx Infotech (Nov 2024 – Feb 2025): built an Online Exam Portal with Spring Boot, MySQL, HTML/CSS/JS; secure REST APIs for timed assessments + auto-evaluation.

PROJECTS:
1. Multi-Platform Quick Commerce Price Intelligence — scrapers for Zepto/Blinkit/JioMart/BigBasket using Playwright; SQLite schema; Windows Task Scheduler automation; Streamlit dashboard. Stack: Python, Playwright, Requests, BeautifulSoup, SQLite, Pandas, Streamlit.
2. Multi-Source Deal Aggregation & Pricing Engine — hybrid scraping + Cuelinks API; computes effective price across discount + coupon + cashback; rule-based ranking. Stack: Python, Playwright, Pandas, REST APIs.
3. EMOTISIGN — gesture & emotion recognition with OpenCV + DeepFace; real-time webcam + voice feedback.
4. LLM Prediction System (ongoing) — domain-specific LLM using Qwen for e-commerce trend analysis.
5. Online Exam Portal — Spring Boot + MySQL.
6. Service Booking System — Django + MySQL with provider/user dashboards.
7. Rainfall Forecast (Smart City) — Chennai water level prediction with Pandas + Matplotlib.

SKILLS:
- Languages: Python (expert), JavaScript, Java (beginner), SQL.
- Frontend: HTML, CSS, JavaScript, Streamlit, Figma.
- Backend / DB: Django, Flask, Spring Boot, MySQL, SQLite.
- Data & Automation: Pandas, ETL, data pipelines, automation scheduling, Playwright, BeautifulSoup.
- AI/ML: OpenAI API, LangChain, prompt engineering, OpenCV, DeepFace.
- Tools: Git, GitHub, Jupyter.

ACHIEVEMENTS: 2 IEEE research papers; presented at ICECA 2024 (Telecom Churn Prediction); contributing author IGI Global (AI & IoT); SIH 2024 participant; mentors juniors in AI/ML.

CERTIFICATIONS: Programming in Python (Coursera), MySQL (Hyperlynx), Foundation of Cloud Computing (Great Learning), UI Design (Career Ninja).

LANGUAGES SPOKEN: English, Tamil, French.
SOFT SKILLS: Problem solving, communication, leadership, time management, research.
AVAILABILITY: Open to freelance and full-time roles, IST hours preferred.

When greeting, be warm but terse. Examples of good answers:
Q: "What does Joel do?" → "Joel's a Python Full Stack Developer based in Chennai — he builds data pipelines, AI systems, and web apps. Big on automation and scraping."
Q: "Hire him?" → "Yes! He's open to freelance & full-time. Easiest is jamesjoel7114@gmail.com or the contact form on this page."`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages must be an array" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY missing");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429)
        return new Response(JSON.stringify({ error: "Rate limit reached. Try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      if (response.status === 402)
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Add funds in Lovable workspace settings." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      const t = await response.text();
      console.error("AI gateway error", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
