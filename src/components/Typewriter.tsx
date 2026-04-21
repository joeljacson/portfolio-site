import { useEffect, useState } from "react";

interface Props {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

export const Typewriter = ({ text, speed = 90, delay = 200, className = "" }: Props) => {
  const [progress, setProgress] = useState(0); // 0 → 1
  const [done, setDone] = useState(false);

  useEffect(() => {
    const total = text.length * speed;
    let raf = 0;
    let startTs = 0;
    const startTimer = setTimeout(() => {
      const tick = (ts: number) => {
        if (!startTs) startTs = ts;
        const p = Math.min(1, (ts - startTs) / total);
        setProgress(p);
        if (p < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          setDone(true);
        }
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(startTimer);
      cancelAnimationFrame(raf);
    };
  }, [text, speed, delay]);

  const blur = (1 - progress) * 14;
  const reveal = progress * 100;

  return (
    <span className={`relative inline-block ${className}`}>
      <span
        className="inline-block"
        style={{
          filter: `blur(${blur}px)`,
          clipPath: `inset(0 ${100 - reveal}% 0 0)`,
          WebkitClipPath: `inset(0 ${100 - reveal}% 0 0)`,
          transition: "filter 80ms linear",
          willChange: "filter, clip-path",
        }}
      >
        {text}
      </span>
      <span
        className={`inline-block w-[0.6ch] -mb-1 bg-primary ml-1 align-baseline ${done ? "animate-blink" : ""}`}
        style={{ height: "0.9em" }}
      />
    </span>
  );
};
