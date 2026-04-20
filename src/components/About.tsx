import profile from "@/assets/joel-profile.jpeg";
import { SectionHeader } from "./SectionHeader";
import { StatCounter } from "./StatCounter";

export const About = () => {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container">
        <SectionHeader index="01" caption="// who_am_i.md" title="About" />

        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Bio */}
          <div className="lg:col-span-3 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              <span className="font-code text-primary">$ whoami →</span> I'm <span className="text-cloud">Joel</span>, a Python
              Full Stack Developer based in Chennai with a deep love for building things that run themselves — from
              multi-platform scrapers and pricing engines to AI-powered automation.
            </p>
            <p>
              Currently finishing my <span className="text-cloud">B.Tech in IT</span> at Kings Engineering College
              (2022–2026). I've shipped data pipelines processing thousands of products daily, built secure REST
              APIs for online assessments, and authored <span className="text-cloud">2 IEEE research papers</span>.
            </p>
            <p>
              My toolkit lives at the intersection of <span className="text-primary">Python</span>,{" "}
              <span className="text-primary">data engineering</span>, and{" "}
              <span className="text-primary">AI/ML</span> — Playwright, Pandas, Django, Flask, Spring Boot, and the LLM stack.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-6">
              <StatCounter end={3} suffix="+" label="Years coding" />
              <StatCounter end={10} suffix="+" label="Projects shipped" />
              <StatCounter end={2} label="IEEE papers" />
            </div>
          </div>

          {/* Photo / hex frame */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="relative group">
              {/* radar rings */}
              <div className="absolute -inset-8 rounded-full border border-primary/20" />
              <div className="absolute -inset-16 rounded-full border border-primary/10" />
              <div className="absolute inset-0 rounded-full border-2 border-primary/40 animate-pulse-ring" />

              {/* radar sweep */}
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                <div
                  className="absolute inset-0 origin-center animate-radar"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, hsl(var(--primary) / 0.35) 30deg, transparent 60deg)",
                  }}
                />
              </div>

              {/* photo */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-primary/60 glow-primary">
                <img
                  src={profile}
                  alt="Joel Jacson J — portrait"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>

              {/* corner brackets */}
              {[
                "top-0 left-0 border-l-2 border-t-2",
                "top-0 right-0 border-r-2 border-t-2",
                "bottom-0 left-0 border-l-2 border-b-2",
                "bottom-0 right-0 border-r-2 border-b-2",
              ].map((c, i) => (
                <span key={i} className={`absolute w-6 h-6 ${c} border-primary -translate-x-2 translate-y-2 first:-translate-y-2 last:translate-y-2`} style={{
                  top: i < 2 ? "-12px" : "auto",
                  bottom: i >= 2 ? "-12px" : "auto",
                  left: i % 2 === 0 ? "-12px" : "auto",
                  right: i % 2 === 1 ? "-12px" : "auto",
                  transform: "none",
                }} />
              ))}

              {/* tag */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-background border border-primary text-primary font-code text-xs tracking-widest">
                ID://JJ_001
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
