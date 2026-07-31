"use client";

import { motion } from "framer-motion";

/**
 * Next.js re-mounts this on every route change, giving each navigation
 * a smooth fade-and-rise entrance instead of a hard cut. The y-shift
 * is subtle enough to feel like momentum, not a slide.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
