"use client";

import { useScroll, useTransform } from "framer-motion";
import type { RefObject } from "react";

/**
 * The hero doesn't just sit there while you scroll past it — it recedes,
 * like a camera pulling back from a subject. Scale/opacity/y are tied to
 * scroll progress within the hero section only (0 at the top, 1 after
 * exactly one viewport height of scroll), so the effect lasts exactly as
 * long as the hero itself and never fights later sections.
 *
 * A hook rather than a wrapper component so the ref can attach directly
 * to the real hero <section> — wrapping introduces layout/measurement
 * quirks that a hook avoids entirely.
 */
export function useHeroStage(ref: RefObject<HTMLElement>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return { scale, opacity, y };
}
