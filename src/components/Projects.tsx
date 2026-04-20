import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { ExternalLink, Github } from "lucide-react";

type Cat = "All" | "Data" | "AI" | "Web";

const PROJECTS = [
  {
    title: "Quick Commerce Price Intelligence",
    cat: "Data" as Cat,
    live: true,
    blurb: "Multi-platform scrapers (Zepto, Blinkit, JioMart, BigBasket) feeding a unified comparison dashboard.",
    tech: ["Python", "Playwright", "SQLite", "Pandas", "Streamlit"],
    sigil: "QC",
  },
  {
    title: "Multi-Source Deal Aggregation Engine",
    cat: "Data" as Cat,
    live: true,
    blurb: "Hybrid scraping + Cuelinks API pipeline computing the best effective price across discounts, coupons & cashback.",
    tech: ["Python", "REST APIs", "Pandas", "Playwright"],
    sigil: "DA",
  },
  {
    title: "EMOTISIGN",
    cat: "AI" as Cat,
    live: false,
    blurb: "Real-time gesture & emotion recognition with webcam input and voice feedback.",
    tech: ["OpenCV", "DeepFace", "Python"],
    sigil: "ES",
  },
  {
    title: "LLM Prediction System",
    cat: "AI" as Cat,
    live: true,
    blurb: "Domain-specific LLM (Qwen) for e-commerce trend analysis and predictive insights. (Ongoing)",
    tech: ["Qwen", "LangChain", "Python"],
    sigil: "LP",
  },
  {
    title: "Online Exam Portal",
    cat: "Web" as Cat,
    live: false,
    blurb: "Full-stack timed assessments with auto-evaluation and secure REST APIs.",
    tech: ["Spring Boot", "MySQL", "JS"],
    sigil: "EP",
  },
  {
    title: "Service Booking System",
    cat: "Web" as Cat,
    live: false,
    blurb: "Real-time booking with separate user and provider dashboards.",
    tech: ["Django", "MySQL"],
    sigil: "SB",
  },
  {
    title: "Rainfall Forecast — Smart City",
    cat: "Data" as Cat,
    live: false,
    blurb: "Predicting Chennai water levels from historical rainfall with visualization dashboards.",
    tech: ["Pandas", "Matplotlib"],
    sigil: "RF",
  },
];

const TABS: Cat[] = ["All", "Data", "AI", "Web"];

export const Projects = () => {
  const [tab, setTab] = useState<Cat>("All");
  const filtered = PROJECTS.filter((p) => tab === "All" || p.cat === tab);

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="container">
        <SectionHeader index="03" caption="// builds.log" title="Projects" />

        <div className="flex flex-wrap gap-2 mb-10">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 font-code text-xs tracking-widest border transition-all ${
                tab === t
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <article
              key={p.title}
              className="group relative panel p-6 hover:border-primary transition-all duration-500 hover:-translate-y-1 hover:glow-soft animate-fade-up"
            >
              {/* live badge */}
              {p.live && (
                <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-code tracking-widest text-success border border-success/40 bg-success/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-live" />
                  LIVE
                </span>
              )}

              {/* sigil */}
              <div className="font-tech text-5xl text-primary/20 group-hover:text-primary/60 transition-colors mb-4">
                {p.sigil}
              </div>

              <div className="font-code text-[10px] tracking-widest text-primary mb-2">
                CAT_{p.cat.toUpperCase()}
              </div>
              <h3 className="font-tech text-xl text-cloud mb-3 group-hover:text-primary transition-colors">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 min-h-[60px]">{p.blurb}</p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {p.tech.map((t) => (
                  <span key={t} className="px-2 py-0.5 text-[10px] font-code text-sky/80 bg-primary/10 border border-primary/20">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 pt-4 border-t border-border">
                <a
                  href="https://github.com/joeljacson"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-code text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="w-3.5 h-3.5" /> Code
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-code text-muted-foreground hover:text-primary transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Details
                </a>
              </div>

              {/* corner accents */}
              <span className="absolute top-0 left-0 w-3 h-3 border-l border-t border-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
