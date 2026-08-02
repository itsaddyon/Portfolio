"use client";

import { useState, useEffect } from "react";
import { useScroll, useTransform } from "framer-motion";
import type { RefObject } from "react";

/**
 * The hero doesn't just sit there while you scroll past it — it recedes,
 * like a camera pulling back from a subject. Scale/opacity/y are tied to
 * scroll progress within the hero section only.
 *
 * Disables the effect on mobile screens to prevent the stacked portrait photo
 * from fading out before it is fully scrolled into view.
 */
export function useHeroStage(ref: RefObject<HTMLElement>) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 0.92] : [1, 0.88]);
  const opacity = useTransform(scrollYProgress, isMobile ? [0.5, 0.9] : [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], isMobile ? [0, -25] : [0, -40]);

  return { scale, opacity, y };
}
