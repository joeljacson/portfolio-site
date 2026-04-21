import { useEffect, useRef, useState } from "react";
import { Music, VolumeX, Loader2 } from "lucide-react";
import { toast } from "sonner";

// Royalty-free lo-fi loop. Multiple fallbacks in case a CDN blocks hotlinking.
const TRACKS = [
  "https://cdn.pixabay.com/download/audio/2022/10/25/audio_864e1f05ab.mp3?filename=lofi-study-112191.mp3",
  "https://cdn.pixabay.com/download/audio/2023/06/23/audio_652f4e3aaf.mp3?filename=lofi-chill-medium-version-159456.mp3",
  "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3",
];

export const MusicToggle = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const trackIdxRef = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  // Build the audio element lazily on first click (better autoplay-policy compliance)
  const ensureAudio = () => {
    if (audioRef.current) return audioRef.current;
    const a = new Audio();
    a.loop = true;
    a.volume = 0.35;
    a.crossOrigin = "anonymous";
    a.preload = "auto";
    a.src = TRACKS[trackIdxRef.current];
    a.addEventListener("ended", () => setPlaying(false));
    a.addEventListener("pause", () => {
      // Only flip state if it was a real pause (not part of swap)
      if (!a.ended && a.currentTime > 0) setPlaying(false);
    });
    audioRef.current = a;
    return a;
  };

  useEffect(() => {
    return () => {
      const a = audioRef.current;
      if (a) {
        a.pause();
        a.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  const tryPlayWithFallback = async (a: HTMLAudioElement): Promise<boolean> => {
    for (let i = trackIdxRef.current; i < TRACKS.length; i++) {
      try {
        if (a.src !== TRACKS[i]) {
          a.src = TRACKS[i];
          a.load();
        }
        await a.play();
        trackIdxRef.current = i;
        return true;
      } catch (err) {
        console.warn(`[MusicToggle] track ${i} failed`, err);
        trackIdxRef.current = i + 1;
      }
    }
    return false;
  };

  const toggle = async () => {
    const a = ensureAudio();
    if (playing) {
      a.pause();
      setPlaying(false);
      return;
    }
    setLoading(true);
    const ok = await tryPlayWithFallback(a);
    setLoading(false);
    if (ok) {
      setPlaying(true);
    } else {
      toast.error("Couldn't load lo-fi audio. Your network may be blocking it.");
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
      <span
        className={`absolute inset-0 rounded-full border border-primary/60 ${playing ? "animate-pulse-ring" : ""}`}
        aria-hidden
      />

      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : playing ? (
        <span className="flex items-end gap-[3px] h-5" aria-hidden>
          <span className="w-[3px] bg-primary-foreground rounded-sm animate-music-bar-1" />
          <span className="w-[3px] bg-primary-foreground rounded-sm animate-music-bar-2" />
          <span className="w-[3px] bg-primary-foreground rounded-sm animate-music-bar-3" />
        </span>
      ) : (
        <Music className="w-5 h-5" />
      )}
    </button>
  );
};
