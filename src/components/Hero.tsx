import { Typewriter } from "./Typewriter";
import { ParticleGrid } from "./ParticleGrid";
import { ChevronDown } from "lucide-react";

const TICKER = [
  "PYTHON FULL STACK",
  "DATA ENGINEERING",
  "AI / ML",
  "AUTOMATION",
  "REST APIs",
  "DJANGO · FLASK · SPRING",
  "PLAYWRIGHT · PANDAS",
];

export const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-12">
      {/* grid + particles */}
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
      <div className="absolute inset-0">
        <ParticleGrid />
      </div>
      <div className="absolute inset-x-0 top-0 h-[60vh]" style={{ background: "var(--gradient-radial)" }} aria-hidden />

      <div className="container relative z-10">
        {/* terminal status line */}
        <div className="font-code text-xs text-primary/80 mb-6 flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-success animate-live" />
            SYSTEM_ONLINE
          </span>
          <span className="text-muted-foreground">//</span>
          <span className="text-muted-foreground">CHENNAI · IN · UTC+5:30</span>
          <span className="text-muted-foreground">//</span>
          <span className="text-cloud">BOOT_SEQUENCE_COMPLETE</span>
        </div>

        {/* Name */}
        <h1 className="font-tech text-[clamp(2.6rem,9vw,7rem)] leading-[0.95] tracking-tight">
          <span className="block text-cloud/70 text-base md:text-lg mb-3 font-code tracking-[0.3em]">
            &gt; INITIALIZE_USER --
          </span>
          <Typewriter text="JOEL JACSON" speed={120} delay={300} className="text-gradient" />
          <span className="block text-primary mt-1">
            <Typewriter text="J." speed={150} delay={1700} />
          </span>
        </h1>

        {/* Subline */}
        <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground font-code animate-fade-up" style={{ animationDelay: "2.2s" }}>
          <span className="text-primary">[ROLE]</span> Python Full Stack Developer · Building end-to-end data pipelines, AI systems &amp; scalable web apps.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "2.6s" }}>
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-3 px-7 py-4 bg-primary text-primary-foreground font-code text-sm tracking-[0.2em] uppercase rounded-sm animate-pulse-ring hover:bg-primary-glow transition-colors"
          >
            View My Work
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-7 py-4 border border-primary/50 text-primary font-code text-sm tracking-[0.2em] uppercase rounded-sm hover:bg-primary/10 hover:border-primary transition-colors"
          >
            Establish_Contact()
          </a>
        </div>
      </div>

      {/* Ticker */}
      <div className="relative z-10 mt-16 border-y border-border/60 bg-background/50 backdrop-blur-sm py-3 overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap font-tech text-primary/80 text-sm">
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="px-8 flex items-center gap-8">
              {t}
              <span className="text-primary/40">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
