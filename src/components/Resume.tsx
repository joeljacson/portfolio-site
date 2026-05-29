import { useEffect } from "react";
import { X, Download, Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";

interface ResumeProps {
  open: boolean;
  onClose: () => void;
}

export const Resume = ({ open, onClose }: ResumeProps) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-sm p-4 md:p-8 print:p-0 print:bg-white print:static print:overflow-visible">
      {/* Toolbar (hidden on print) */}
      <div className="fixed top-4 right-4 z-[101] flex gap-2 print:hidden">
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-code text-xs tracking-widest uppercase rounded-sm hover:bg-primary-glow transition-colors"
        >
          <Download className="w-3.5 h-3.5" /> Download PDF
        </button>
        <button
          onClick={onClose}
          aria-label="Close resume"
          className="w-10 h-10 grid place-items-center bg-background border border-border text-cloud hover:text-primary hover:border-primary transition-colors rounded-sm"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* A4 sheet */}
      <article
        id="resume-sheet"
        className="resume-sheet relative bg-white text-[#1a1a1a] shadow-2xl mx-auto my-4 print:my-0 print:shadow-none"
      >
        {/* Header */}
        <header className="border-b-2 border-[#185FA5] pb-3 mb-4">
          <h1 className="text-[26px] font-bold tracking-tight text-[#185FA5] leading-tight">
            JOEL JACSON J
          </h1>
          <p className="text-[11.5px] font-medium text-[#333] mt-0.5 tracking-wide">
            Python Full Stack Developer · Data Engineering · AI/ML
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[10px] text-[#444]">
            <span className="inline-flex items-center gap-1"><Mail className="w-3 h-3 text-[#185FA5]" />jamesjoel7114@gmail.com</span>
            <span className="inline-flex items-center gap-1"><Phone className="w-3 h-3 text-[#185FA5]" />+91 93636 74032</span>
            <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3 text-[#185FA5]" />Chennai, India</span>
            <span className="inline-flex items-center gap-1"><Linkedin className="w-3 h-3 text-[#185FA5]" />linkedin.com/in/joeljacsonj</span>
            <span className="inline-flex items-center gap-1"><Github className="w-3 h-3 text-[#185FA5]" />github.com/joeljacson</span>
          </div>
        </header>

        {/* Summary */}
        <Section title="Professional Summary">
          <p className="text-[10.5px] leading-snug text-[#222]">
            Python Full Stack Developer with hands-on experience building multi-platform data pipelines,
            REST APIs, and AI-powered automation. Authored <strong>2 IEEE research papers</strong> and shipped
            10+ production projects spanning web apps, scraping engines, and LLM systems. Strong in
            Python, Django/Flask, Playwright, Pandas, and modern data engineering practices.
          </p>
        </Section>

        {/* Skills */}
        <Section title="Technical Skills">
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-[10px]">
            <SkillRow label="Languages" value="Python, JavaScript, Java, SQL" />
            <SkillRow label="Backend" value="Django, Flask, Spring Boot, REST APIs" />
            <SkillRow label="Data & AI" value="Pandas, Playwright, LangChain, OpenAI, OpenCV, DeepFace" />
            <SkillRow label="Databases" value="MySQL, SQLite, PostgreSQL" />
            <SkillRow label="Frontend" value="HTML/CSS, JavaScript, Streamlit, Figma" />
            <SkillRow label="Tools" value="Git, GitHub, Jupyter, BeautifulSoup, Task Scheduler" />
          </div>
        </Section>

        {/* Experience */}
        <Section title="Experience">
          <Entry
            role="SQL Programming Intern"
            org="Hyperlynx Infotech"
            date="Mar 2025 – May 2025"
            bullets={[
              "Optimized complex SQL queries, improving database performance and query response time.",
              "Implemented real-world joins, filtering, and indexing strategies on production datasets.",
            ]}
          />
          <Entry
            role="Full Stack Web Development Intern"
            org="Hyperlynx Infotech"
            date="Nov 2024 – Feb 2025"
            bullets={[
              "Built an Online Exam Portal with Spring Boot, MySQL, and JavaScript supporting timed auto-evaluation.",
              "Designed secure REST APIs for assessment workflows handling concurrent user sessions.",
            ]}
          />
        </Section>

        {/* Projects */}
        <Section title="Key Projects">
          <Entry
            role="Quick Commerce Price Intelligence"
            org="Python · Playwright · Pandas · Streamlit"
            bullets={[
              "Built multi-platform scrapers (Zepto, Blinkit, JioMart, BigBasket) feeding a unified dashboard.",
              "Processed thousands of products daily through a fault-tolerant ETL pipeline.",
            ]}
          />
          <Entry
            role="Multi-Source Deal Aggregation Engine"
            org="Python · REST APIs · Cuelinks · Playwright"
            bullets={[
              "Hybrid scraping + Cuelinks API pipeline computing best effective price across discounts, coupons, and cashback.",
            ]}
          />
          <Entry
            role="LLM Prediction System (Ongoing)"
            org="Qwen · LangChain · Python"
            bullets={[
              "Domain-specific LLM for e-commerce trend analysis and predictive insights.",
            ]}
          />
        </Section>

        {/* Education */}
        <Section title="Education">
          <Entry
            role="B.Tech in Information Technology"
            org="Kings Engineering College"
            date="2022 – 2026"
            bullets={["Mentored juniors in AI/ML · SIH 2024 agriculture AI participant."]}
          />
        </Section>

        {/* Achievements */}
        <Section title="Publications & Achievements">
          <ul className="text-[10.5px] leading-snug text-[#222] list-disc pl-4 space-y-0.5">
            <li>IEEE Author · ICECA — Telecom Churn Prediction (2024).</li>
            <li>Contributing Author — IGI Global book chapter on AI &amp; IoT.</li>
            <li>10+ shipped projects across data, AI, and full stack web.</li>
          </ul>
        </Section>
      </article>

      {/* Print styles */}
      <style>{`
        .resume-sheet {
          width: 210mm;
          min-height: 297mm;
          padding: 14mm 16mm;
          box-sizing: border-box;
          font-family: 'Helvetica Neue', Arial, sans-serif;
        }
        @media print {
          @page { size: A4; margin: 0; }
          body * { visibility: hidden !important; }
          #resume-sheet, #resume-sheet * { visibility: visible !important; }
          #resume-sheet {
            position: absolute;
            left: 0; top: 0;
            margin: 0;
            box-shadow: none;
          }
        }
      `}</style>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-3">
    <h2 className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#185FA5] border-b border-[#185FA5]/30 pb-0.5 mb-1.5">
      {title}
    </h2>
    {children}
  </section>
);

const SkillRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex gap-1.5">
    <span className="font-semibold text-[#185FA5] min-w-[70px]">{label}:</span>
    <span className="text-[#222]">{value}</span>
  </div>
);

const Entry = ({
  role,
  org,
  date,
  bullets,
}: {
  role: string;
  org: string;
  date?: string;
  bullets: string[];
}) => (
  <div className="mb-2 last:mb-0">
    <div className="flex justify-between items-baseline gap-2">
      <div>
        <span className="text-[11px] font-bold text-[#1a1a1a]">{role}</span>
        <span className="text-[10.5px] text-[#444]"> · {org}</span>
      </div>
      {date && <span className="text-[9.5px] text-[#666] font-medium whitespace-nowrap">{date}</span>}
    </div>
    <ul className="list-disc pl-4 mt-0.5 space-y-0.5">
      {bullets.map((b, i) => (
        <li key={i} className="text-[10.5px] leading-snug text-[#222]">{b}</li>
      ))}
    </ul>
  </div>
);
