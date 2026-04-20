import { useEffect, useState } from "react";
import { useReveal } from "@/hooks/useReveal";

interface Props {
  end: number;
  suffix?: string;
  duration?: number;
  label: string;
}

export const StatCounter = ({ end, suffix = "", duration = 1600, label }: Props) => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * end));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, end, duration]);

  return (
    <div ref={ref} className="panel p-6 text-center group hover:border-primary/60 transition-colors">
      <div className="font-tech text-4xl md:text-5xl text-gradient">
        {val}
        {suffix}
      </div>
      <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground font-code">{label}</div>
    </div>
  );
};
