import { useEffect } from "react";

/**
 * Global click SFX — plays a short, crisp synth blip on every <button>, <a>,
 * and [role="button"] click using the Web Audio API. Zero network, zero assets.
 *
 * - Lazily creates the AudioContext on the FIRST user gesture (autoplay-safe).
 * - Two flavors: "tap" (default) for normal buttons, "confirm" for primary CTAs
 *   (any element with [data-sfx="confirm"] or .bg-primary).
 * - Honors prefers-reduced-motion (no sound).
 * - Skip with [data-sfx="off"] on the element or any ancestor.
 */
export const useClickSfx = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let ctx: AudioContext | null = null;

    const getCtx = () => {
      if (!ctx) {
        const Ctor =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!Ctor) return null;
        ctx = new Ctor();
      }
      if (ctx.state === "suspended") ctx.resume().catch(() => {});
      return ctx;
    };

    const blip = (variant: "tap" | "confirm") => {
      const ac = getCtx();
      if (!ac) return;
      const now = ac.currentTime;

      const osc = ac.createOscillator();
      const gain = ac.createGain();

      if (variant === "confirm") {
        // Two-tone rising chirp
        osc.type = "triangle";
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.09);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.18, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
        osc.connect(gain).connect(ac.destination);
        osc.start(now);
        osc.stop(now + 0.16);
      } else {
        // Sharp digital tap
        osc.type = "square";
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(700, now + 0.05);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.08, now + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
        osc.connect(gain).connect(ac.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      }
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest<HTMLElement>(
        'button, a, [role="button"], input[type="submit"], input[type="button"]'
      );
      if (!el) return;

      // opt-out
      if (el.closest('[data-sfx="off"]')) return;

      // Don't fire on disabled controls
      if ((el as HTMLButtonElement).disabled) return;

      const explicit = el.closest<HTMLElement>('[data-sfx="confirm"], [data-sfx="tap"]');
      let variant: "tap" | "confirm" = "tap";
      if (explicit?.dataset.sfx === "confirm") variant = "confirm";
      else if (el.classList.contains("bg-primary")) variant = "confirm";

      blip(variant);
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => {
      document.removeEventListener("click", onClick, { capture: true } as EventListenerOptions);
      ctx?.close().catch(() => {});
    };
  }, []);
};
