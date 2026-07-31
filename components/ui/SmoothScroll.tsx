"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Real smooth scroll, not CSS `scroll-behavior: smooth` (which is
 * inconsistent across browsers and doesn't touch trackpad/wheel feel).
 * Lenis intercepts wheel input and eases it over several frames — that's
 * the "weighted" scroll feel most award-tier sites actually use.
 *
 * It still drives the real `window.scrollTo`, so everything already
 * reading native scroll position (the background's scrollRef, the
 * hero's useScroll) keeps working with zero changes.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    let raf: number;
    function tick(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
