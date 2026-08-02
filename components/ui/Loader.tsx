"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE_PREMIUM } from "@/lib/motion";

type Phase = "show" | "exit" | "done";

/**
 * A branded arrival curtain — shows the initials "AA" with a gold
 * accent line sweeping underneath, then slides away to reveal the site.
 * Shows once per browser session.
 */
export function Loader() {
  const [phase, setPhase] = useState<Phase>("show");

  useEffect(() => {
    if (sessionStorage.getItem("visited")) {
      setPhase("done");
      return;
    }
    sessionStorage.setItem("visited", "1");
    const exitTimer = setTimeout(() => setPhase("exit"), 1400);
    const doneTimer = setTimeout(() => setPhase("done"), 2200);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <motion.div
      className="fixed inset-0 z-[999] bg-canvas flex flex-col items-center justify-center gap-6"
      initial={{ y: 0 }}
      animate={{ y: phase === "exit" ? "-100%" : 0 }}
      transition={{ duration: 0.8, ease: EASE_PREMIUM }}
    >
      {/* Initials */}
      <motion.h1
        className="font-display text-ink text-7xl md:text-9xl tracking-tighter flex items-start select-none"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{
          opacity: phase === "exit" ? 0 : 1,
          y: 0,
          scale: 1,
        }}
        transition={{ duration: 0.8, ease: EASE_PREMIUM }}
      >
        A
        <span className="text-gold text-4xl md:text-6xl relative -top-3 md:-top-5 ml-0.5 select-none font-normal">
          2
        </span>
      </motion.h1>

      {/* Gold accent sweep line */}
      <motion.div
        className="h-px bg-gold rounded-full"
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: phase === "exit" ? 0 : 64,
          opacity: phase === "exit" ? 0 : 1,
        }}
        transition={{ duration: 0.6, delay: 0.3, ease: EASE_PREMIUM }}
      />

      {/* Subtle tagline */}
      <motion.p
        className="type-label text-ink-faint text-[0.65rem] tracking-[0.2em]"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "exit" ? 0 : 0.5 }}
        transition={{ duration: 0.5, delay: 0.5, ease: EASE_PREMIUM }}
      >
        Portfolio
      </motion.p>
    </motion.div>
  );
}
