"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring, useTransform, motion } from "framer-motion";

interface StatCounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

/**
 * Animated stat counter — counts up smoothly from 0 to the target value
 * when the statistic scrolls into the viewport. Utilizes useSpring for
 * inertia-rich spring-based interpolation, and formats numbers with decimals or commas.
 */
export function StatCounter({ value, decimals = 0, prefix = "", suffix = "", label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const motionValue = useMotionValue(0);
  
  // Clean spring transition for a premium ease feel
  const springValue = useSpring(motionValue, {
    stiffness: 75,
    damping: 15,
    mass: 0.8,
  });

  const [displayValue, setDisplayValue] = useState(prefix + "0" + suffix);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      let formatted: string;
      if (decimals > 0) {
        formatted = latest.toFixed(decimals);
      } else {
        formatted = Math.floor(latest).toLocaleString();
      }
      setDisplayValue(prefix + formatted + suffix);
    });
  }, [springValue, prefix, suffix, decimals]);

  return (
    <div ref={ref} className="border-t border-line pt-8 pb-10 flex flex-col items-start justify-between min-h-[140px]">
      <motion.p 
        className="type-headline text-5xl md:text-7xl text-ink font-light tracking-tight tabular-nums"
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {displayValue}
      </motion.p>
      <p className="type-label text-ink-faint mt-4 uppercase tracking-wider text-xs">
        {label}
      </p>
    </div>
  );
}
