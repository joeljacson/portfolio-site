import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";

// Royalty-free lo-fi loop (Pixabay CDN)
const LOFI_URL = "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3";

export const MusicToggle = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const a = new Audio(LOFI_URL);
    a.loop = true;
    a.volume = 0.35;
    a.preload = "none";
    a.addEventListener("canplay", () => setReady(true));
    audioRef.current = a;
    return () => {
      a.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      try {
        await a.play();
        setPlaying(true);
      } catch (e) {
        console.error("Audio play failed", e);
      }
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause ambient music" : "Play ambient music"}
      title={playing ? "Pause lo-fi" : "Play lo-fi"}
      className="fixed bottom-6 right-24 z-50 group flex items-center justify-center w-14 h-14 rounded-full font-code text-primary-foreground shadow-[0_0_30px_hsl(210_100%_35%/0.6)] border border-primary/40 hover:scale-110 transition-transform"
      style={{ background: "#185FA5" }}
    >
      {/* pulsing ring when playing */}
      <span
        className={`absolute inset-0 rounded-full border border-primary/60 ${playing ? "animate-pulse-ring" : ""}`}
        aria-hidden
      />

      {playing ? (
        <span className="flex items-end gap-[3px] h-5" aria-hidden>
          <span className="w-[3px] bg-primary-foreground rounded-sm animate-music-bar-1" />
          <span className="w-[3px] bg-primary-foreground rounded-sm animate-music-bar-2" />
          <span className="w-[3px] bg-primary-foreground rounded-sm animate-music-bar-3" />
        </span>
      ) : ready ? (
        <Music className="w-5 h-5" />
      ) : (
        <VolumeX className="w-5 h-5 opacity-80" />
      )}
    </button>
  );
};
