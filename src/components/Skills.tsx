import { useReveal } from "@/hooks/useReveal";
import { SectionHeader } from "./SectionHeader";

const GROUPS = [
  {
    title: "Languages",
    shade: "hsl(var(--cloud))",
    items: [
      { name: "Python", level: 95 },
      { name: "JavaScript", level: 80 },
      { name: "Java", level: 55 },
      { name: "SQL", level: 88 },
    ],
  },
  {
    title: "Frontend",
    shade: "hsl(var(--sky))",
    items: [
      { name: "HTML / CSS", level: 90 },
      { name: "JavaScript", level: 80 },
      { name: "Streamlit", level: 85 },
      { name: "Figma", level: 75 },
    ],
  },
  {
    title: "Backend & DB",
    shade: "hsl(var(--primary))",
    items: [
      { name: "Django", level: 88 },
      { name: "Flask", level: 85 },
      { name: "Spring Boot", level: 70 },
      { name: "MySQL / SQLite", level: 90 },
    ],
  },
  {
    title: "Data & AI",
    shade: "hsl(var(--deep))",
    items: [
      { name: "Pandas / ETL", level: 92 },
      { name: "Playwright", level: 90 },
      { name: "OpenAI / LangChain", level: 80 },
      { name: "OpenCV / DeepFace", level: 75 },
    ],
  },
];

const Bar = ({ name, level, shade, delay }: { name: string; level: number; shade: string; delay: number }) => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref}>
      <div className="flex justify-between font-code text-xs mb-1.5">
        <span className="text-cloud">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-1.5 bg-surface-elevated rounded-sm overflow-hidden">
        <div
          className="h-full rounded-sm transition-all duration-[1400ms] ease-out"
          style={{
            width: visible ? `${level}%` : "0%",
            background: `linear-gradient(90deg, ${shade}, hsl(var(--primary-glow)))`,
            boxShadow: visible ? `0 0 12px ${shade}` : "none",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
};

export const Skills = () => {
  return (
    <section id="skills" className="relative py-24 md:py-32 bg-surface/30">
      <div className="container">
        <SectionHeader index="02" caption="// stack.json" title="Skills" />

        <div className="grid md:grid-cols-2 gap-6">
          {GROUPS.map((g, gi) => (
            <div key={g.title} className="panel p-6 md:p-8 hover:border-primary/50 transition-colors">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-tech text-xl text-cloud">{g.title}</h3>
                <span className="font-code text-[10px] tracking-widest text-muted-foreground">
                  GROUP_{String(gi + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="space-y-4">
                {g.items.map((s, i) => (
                  <Bar key={s.name} {...s} shade={g.shade} delay={i * 120} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tools chip row */}
        <div className="mt-12 flex flex-wrap gap-2">
          {["Git", "GitHub", "Jupyter", "REST APIs", "ETL", "Task Scheduler", "BeautifulSoup", "Cuelinks API", "Prompt Eng."].map(
            (t) => (
              <span key={t} className="px-3 py-1.5 border border-border bg-surface/50 font-code text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                {t}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
};
