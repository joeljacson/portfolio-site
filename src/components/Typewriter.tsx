import { useEffect, useState } from "react";

interface Props {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

export const Typewriter = ({ text, speed = 90, delay = 200, className = "" }: Props) => {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(id);
          setDone(true);
        }
      }, speed);
    }, delay);
    return () => clearTimeout(start);
  }, [text, speed, delay]);

  return (
    <span className={className}>
      <span className="animate-flicker">{out}</span>
      <span className={`inline-block w-[0.6ch] -mb-1 bg-primary ml-1 ${done ? "animate-blink" : ""}`} style={{ height: "0.9em" }} />
    </span>
  );
};
