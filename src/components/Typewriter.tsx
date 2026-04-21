import { useEffect, useState } from "react";

interface Props {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

export const Typewriter = ({ text, speed = 90, delay = 200, className = "" }: Props) => {
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setRevealed(true), delay);
    const total = delay + text.length * speed + 400;
    const t2 = setTimeout(() => setDone(true), total);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [text, speed, delay]);

  return (
    <span className={className}>
      <span className="inline-flex">
        {text.split("").map((ch, i) => (
          <span
            key={i}
            className="inline-block transition-all duration-700 ease-out"
            style={{
              filter: revealed ? "blur(0px)" : "blur(14px)",
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(8px)",
              transitionDelay: `${i * speed}ms`,
              whiteSpace: ch === " " ? "pre" : "normal",
            }}
          >
            {ch}
          </span>
        ))}
      </span>
      <span
        className={`inline-block w-[0.6ch] -mb-1 bg-primary ml-1 ${done ? "animate-blink" : ""}`}
        style={{ height: "0.9em" }}
      />
    </span>
  );
};
