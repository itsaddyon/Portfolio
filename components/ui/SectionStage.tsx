"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * SectionStage — gives any section the same scroll-scrubbed recede effect
 * as the hero: content scales down and fades out as you scroll past it,
 * then snaps back when you scroll up. Feels like a camera pulling back.
 *
 * Disables the effect on mobile screens where sections stack and become
 * taller than the viewport, preventing content from fading out prematurely.
 */
export function SectionStage({
  children,
  className,
  intensity = 1,
}: {
  children: React.ReactNode;
  className?: string;
  /** 0–1 multiplier on the recede strength. Default 1 = same as hero. */
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    // "start end" = section bottom enters viewport
    // "end start" = section top leaves viewport (scrolled past)
    offset: ["start end", "end start"],
  });

  // Fade out + compress as the section exits upward (gentler and later on mobile)
  const scale = useTransform(
    scrollYProgress,
    isMobile ? [0.85, 1] : [0.6, 1],
    isMobile ? [1, 1 - 0.04 * intensity] : [1, 1 - 0.06 * intensity]
  );
  const opacity = useTransform(
    scrollYProgress,
    isMobile ? [0.8, 0.98] : [0.55, 0.9],
    [1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    isMobile ? [0.85, 1] : [0.6, 1],
    isMobile ? [0, -20 * intensity] : [0, -30 * intensity]
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ scale, opacity, y }}>
        {children}
      </motion.div>
    </div>
  );
}
