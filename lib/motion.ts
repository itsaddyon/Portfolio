import type { Variants } from "framer-motion";

/**
 * Shared motion language for the site.
 *
 * Rule: every export here exists because it communicates something
 * (arrival, hierarchy, causality) — not because it "looks cool".
 * If a new animation can't be described in one sentence of intent,
 * it doesn't belong here.
 */

// The one easing curve used for anything entering the screen.
// Fast start, long soft settle — feels considered, never bouncy.
export const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_PREMIUM },
  },
};

// For groups of siblings (nav items, project list) — reveals in order,
// implying a reading sequence rather than a simultaneous pop-in.
export const stagger = (staggerMs = 0.08): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: staggerMs, delayChildren: 0.1 },
  },
});
