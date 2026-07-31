"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * SectionStage — gives any section the same scroll-scrubbed recede effect
 * as the hero: content scales down and fades out as you scroll past it,
 * then snaps back when you scroll up. Feels like a camera pulling back.
 *
 * Usage: wrap a section's inner content (not the <section> itself):
 *
 *   <section>
 *     <SectionStage>
 *       <p>content</p>
 *     </SectionStage>
 *   </section>
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

  const { scrollYProgress } = useScroll({
    target: ref,
    // "start end" = section bottom enters viewport
    // "end start" = section top leaves viewport (scrolled past)
    offset: ["start end", "end start"],
  });

  // Fade out + compress as the section exits upward
  const scale = useTransform(
    scrollYProgress,
    [0.6, 1],
    [1, 1 - 0.06 * intensity]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0.55, 0.9],
    [1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [0.6, 1],
    [0, -30 * intensity]
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ scale, opacity, y }}>
        {children}
      </motion.div>
    </div>
  );
}
