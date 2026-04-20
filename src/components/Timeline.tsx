import { SectionHeader } from "./SectionHeader";
import { useReveal } from "@/hooks/useReveal";

const ENTRIES = [
  {
    year: "2025",
    title: "SQL Programming Intern",
    org: "Hyperlynx Infotech",
    period: "Mar 2025 – May 2025",
    bullets: [
      "Optimized SQL queries; improved DB performance.",
      "Worked on real-world joins, filtering & indexing.",
    ],
  },
  {
    year: "2024",
    title: "Full Stack Web Dev Intern",
    org: "Hyperlynx Infotech",
    period: "Nov 2024 – Feb 2025",
    bullets: [
      "Built an Online Exam Portal (Spring Boot + MySQL).",
      "Designed secure REST APIs for timed auto-eval.",
    ],
  },
  {
    year: "2024",
    title: "IEEE Author · ICECA",
    org: "Research",
    period: "2024",
    bullets: [
      "Published Telecom Churn Prediction paper.",
      "Contributing author — IGI Global (AI & IoT).",
    ],
  },
  {
    year: "2022",
    title: "B.Tech in Information Technology",
    org: "Kings Engineering College",
    period: "2022 – 2026",
    bullets: ["Mentored juniors in AI/ML.", "SIH 2024 — agriculture AI participant."],
  },
];

const Entry = ({ e, i }: { e: (typeof ENTRIES)[number]; i: number }) => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const left = i % 2 === 0;
  return (
    <div
      ref={ref}
      className={`relative md:grid md:grid-cols-2 md:gap-12 mb-12 transition-all duration-700 ${
        visible ? "opacity-100 translate-x-0" : `opacity-0 ${left ? "-translate-x-8" : "translate-x-8"}`
      }`}
    >
      {/* dot */}
      <span className="hidden md:block absolute left-1/2 top-6 -translate-x-1/2 w-3 h-3 rounded-full bg-primary glow-soft ring-4 ring-background" />

      <div className={`${left ? "md:text-right md:pr-8" : "md:col-start-2 md:pl-8"} pl-8 md:pl-0 relative`}>
        {/* mobile dot */}
        <span className="md:hidden absolute left-0 top-2 w-2.5 h-2.5 rounded-full bg-primary" />
        <div className="font-tech text-3xl md:text-4xl text-primary mb-1">{e.year}</div>
        <div className="font-code text-xs text-muted-foreground tracking-widest mb-3">{e.period}</div>
        <div className="panel p-5 inline-block text-left w-full md:w-auto">
          <h4 className="font-tech text-lg text-cloud">{e.title}</h4>
          <div className="font-code text-xs text-primary mb-3">{e.org}</div>
          <ul className="text-sm text-muted-foreground space-y-1">
            {e.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="text-primary">›</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const Timeline = () => {
  return (
    <section id="timeline" className="relative py-24 md:py-32 bg-surface/30">
      <div className="container">
        <SectionHeader index="04" caption="// chronology.log" title="Timeline" />

        <div className="relative">
          {/* center line */}
          <span className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
          <span className="md:hidden absolute left-1 top-0 bottom-0 w-px bg-primary/30" />

          {ENTRIES.map((e, i) => (
            <Entry key={e.year + e.title} e={e} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
