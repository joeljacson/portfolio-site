import { useEffect } from "react";

/**
 * Global UI sound design — smooth, soft sine-based tones via Web Audio API.
 * No assets, no network. Lazily inits on first user gesture.
 *
 * Variants:
 *  - "tap"     → soft low blip for generic clicks
 *  - "confirm" → warmer two-note chord for primary CTAs
 *  - "hover"   → ultra-subtle high tick for hover affordance
 *
 * Opt-out: any element/ancestor with [data-sfx="off"].
 * Honors prefers-reduced-motion.
 */
export const useClickSfx = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let ctx: AudioContext | null = null;
    let masterGain: GainNode | null = null;
    let lastHover = 0;

    const getCtx = () => {
      if (!ctx) {
        const Ctor =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!Ctor) return null;
        ctx = new Ctor();
        masterGain = ctx.createGain();
        masterGain.gain.value = 0.5; // overall headroom
        masterGain.connect(ctx.destination);
      }
      if (ctx.state === "suspended") ctx.resume().catch(() => {});
      return ctx;
    };

    // Single soft sine tone with gentle ADSR
    const tone = (freq: number, dur: number, peak: number, delay = 0, type: OscillatorType = "sine") => {
      const ac = getCtx();
      if (!ac || !masterGain) return;
      const t0 = ac.currentTime + delay;
      const osc = ac.createOscillator();
      const g = ac.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t0);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(peak, t0 + 0.012); // soft attack
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur); // smooth decay
      osc.connect(g).connect(masterGain);
      osc.start(t0);
      osc.stop(t0 + dur + 0.02);
    };

    const play = (variant: "tap" | "confirm" | "hover") => {
      if (variant === "hover") {
        // Ultra-subtle high tick, throttled
        const now = performance.now();
        if (now - lastHover < 60) return;
        lastHover = now;
        tone(1320, 0.07, 0.025);
      } else if (variant === "confirm") {
        // Warm rising two-note (perfect fifth-ish)
        tone(523.25, 0.22, 0.12); // C5
        tone(783.99, 0.26, 0.09, 0.05); // G5
      } else {
        // Soft mellow tap
        tone(660, 0.13, 0.08);
        tone(990, 0.1, 0.04, 0.005, "triangle");
      }
    };

    const variantFor = (el: HTMLElement, fallback: "tap" | "hover"): "tap" | "confirm" | "hover" => {
      const explicit = el.closest<HTMLElement>('[data-sfx="confirm"], [data-sfx="tap"], [data-sfx="hover"]');
      if (explicit?.dataset.sfx === "confirm") return "confirm";
      if (explicit?.dataset.sfx === "tap") return "tap";
      if (explicit?.dataset.sfx === "hover") return "hover";
      if (fallback === "tap" && el.classList.contains("bg-primary")) return "confirm";
      return fallback;
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest<HTMLElement>(
        'button, a, [role="button"], input[type="submit"], input[type="button"]'
      );
      if (!el) return;
      if (el.closest('[data-sfx="off"]')) return;
      if ((el as HTMLButtonElement).disabled) return;
      play(variantFor(el, "tap"));
    };

    const onPointerOver = (e: PointerEvent) => {
      // Only real mice — skip touch devices to avoid double-firing on tap
      if (e.pointerType !== "mouse") return;
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest<HTMLElement>(
        'a, button, [role="button"], [data-sfx-hover], #projects article'
      );
      if (!el) return;
      if (el.closest('[data-sfx="off"]')) return;
      if ((el as HTMLButtonElement).disabled) return;

      // Limit hover sound to nav links, project cards, and explicit opt-ins
      const isNavLink = !!el.closest("header") && el.tagName === "A";
      const isProjectCard = el.tagName === "ARTICLE" && !!el.closest("#projects");
      const isExplicit = el.hasAttribute("data-sfx-hover");
      if (!isNavLink && !isProjectCard && !isExplicit) return;

      play("hover");
    };

    document.addEventListener("click", onClick, { capture: true });
    document.addEventListener("pointerover", onPointerOver, { capture: true });
    return () => {
      document.removeEventListener("click", onClick, { capture: true } as EventListenerOptions);
      document.removeEventListener("pointerover", onPointerOver, { capture: true } as EventListenerOptions);
      ctx?.close().catch(() => {});
    };
  }, []);
};
