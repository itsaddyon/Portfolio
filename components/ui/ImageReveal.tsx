"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

/**
 * Case-study screenshots don't just fade in — they scale down from
 * slightly zoomed-in to their resting size as they scroll into view,
 * scrubbed directly to scroll position (not a fixed-duration animation).
 * That scroll-linked scale is what reads as "deliberate" rather than
 * "a fade-in someone added."
 */
export function ImageReveal({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.4"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative rounded-lg overflow-hidden border border-line">
      <motion.div style={{ scale, opacity }}>
        <Image src={src} alt={alt} width={1920} height={1080} className="w-full h-auto" />
      </motion.div>
    </div>
  );
}
