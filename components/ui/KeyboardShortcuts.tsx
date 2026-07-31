"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

/**
 * Handles global keyboard shortcuts for a premium engineering portfolio feel:
 *   - 'G' then 'W' -> navigate to Selected Work
 *   - 'G' then 'A' -> navigate to About
 *   - 'C'          -> copy email with toast feedback
 *
 * Prevents shortcuts from firing when the user is typing inside form elements (like the contact form).
 */
export function KeyboardShortcuts() {
  const router = useRouter();
  const [toast, setToast] = useState<string | null>(null);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [lastKeyTime, setLastKeyTime] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't fire shortcuts if the user is typing in inputs or textareas
      const activeEl = document.activeElement as HTMLElement | null;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.isContentEditable)
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      const now = Date.now();

      // Handle 'c' -> copy email
      if (key === "c") {
        e.preventDefault();
        navigator.clipboard.writeText("itsaddyon@gmail.com").then(() => {
          setToast("Email copied to clipboard");
          setTimeout(() => setToast(null), 2500);
        });
        return;
      }

      // Handle sequential shortcuts starting with 'g'
      if (key === "g") {
        setLastKey("g");
        setLastKeyTime(now);
        return;
      }

      // If 'g' was pressed less than 1 second ago
      if (lastKey === "g" && now - lastKeyTime < 1000) {
        if (key === "w") {
          e.preventDefault();
          router.push("/#work");
          setToast("Navigating to Work [G + W]");
          setTimeout(() => setToast(null), 2000);
        } else if (key === "a") {
          e.preventDefault();
          router.push("/#about");
          setToast("Navigating to About [G + A]");
          setTimeout(() => setToast(null), 2000);
        }
      }

      // Reset sequence
      if (key !== "g") {
        setLastKey(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lastKey, lastKeyTime, router]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-8 right-8 z-[10000] pointer-events-none"
        >
          <div className="bg-canvas-raised border border-line rounded-lg px-5 py-3 shadow-2xl flex items-center gap-3">
            <span className="type-label text-ink text-xs normal-case tracking-normal">
              {toast}
            </span>
            <span className="type-label text-ink-faint text-[10px] border border-line px-1.5 py-0.5 rounded uppercase font-mono">
              Shortcuts
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
