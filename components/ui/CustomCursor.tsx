"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMotionValue, useSpring } from "framer-motion";

/**
 * The cursor: a small solid dot by default, that morphs into a labeled
 * pill ("View", "Send", "Open", "Copy") near anything carrying a
 * `data-cursor="Label"` attribute. The label IS the affordance — no
 * separate hover ring, no guessing what a click will do.
 *
 * Reserved for the highest-value actions (project rows, form submit,
 * external links) — not every link, or it stops meaning anything.
 * Desktop only; falls back to the native cursor on touch devices.
 */
const DOT = 10;
const RING = 40;
const PILL_W = 68;
const PILL_H = 34;

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  // null = resting dot, "" = generic interactive (ring, no text),
  // any other string = labeled pill
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 400, damping: 35, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 400, damping: 35, mass: 0.4 });

  useEffect(() => {
    const checkFinePointer = () =>
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (checkFinePointer()) setEnabled(true);

    const move = (e: PointerEvent) => {
      if (e.pointerType === "mouse" || e.pointerType === "pen") setEnabled(true);
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const el = e.target as HTMLElement;
      const labeled = el.closest<HTMLElement>("[data-cursor]");
      if (labeled) {
        setLabel(labeled.dataset.cursor || "");
        return;
      }
      const interactive = el.closest("a, button, [role='button']");
      setLabel(interactive ? "" : null);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [x, y]);

  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add("custom-cursor-enabled");
    } else {
      document.documentElement.classList.remove("custom-cursor-enabled");
    }
    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
    };
  }, [enabled]);

  if (!enabled) return null;


  const active = label !== null;
  const hasText = Boolean(label);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-[9999] top-0 left-0 flex items-center justify-center"
      style={{ left: springX, top: springY, x: "-50%", y: "-50%" }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full"
        style={{
          background: "#F5F4F1",
          mixBlendMode: hasText ? "normal" : "difference",
        }}
        animate={{
          width: hasText ? PILL_W : active ? RING : DOT,
          height: hasText ? PILL_H : active ? RING : DOT,
          boxShadow: hasText
            ? "0 4px 24px rgba(0,0,0,0.35)"
            : active
              ? "0 0 24px 6px rgba(245,244,241,0.3)"
              : "0 0 10px 2px rgba(245,244,241,0.22)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {hasText && (
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.16 }}
              className="text-[11px] font-medium tracking-wide whitespace-nowrap"
              style={{ color: "#0A0A0B" }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
