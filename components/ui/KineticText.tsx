"use client";

import { motion } from "framer-motion";
import { EASE_PREMIUM } from "@/lib/motion";

/**
 * Line-by-line kinetic reveal: each line is masked inside an overflow-
 * hidden wrapper and rises into place, rather than simply fading in.
 * This is the "confident, oversized, theatrical" headline treatment —
 * used once, for the hero name, not scattered across every heading.
 */
export function KineticText({
  lines,
  className,
  delayStart = 0,
}: {
  lines: string[];
  className?: string;
  delayStart?: number;
}) {
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <div key={line} className="overflow-hidden">
          <motion.div
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 1.1,
              ease: EASE_PREMIUM,
              delay: delayStart + i * 0.1,
            }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
