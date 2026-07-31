"use client";

import { useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

/**
 * Wraps an interactive element (project card, link) and pulls it gently
 * toward the cursor within a small radius. Communicates "this is
 * clickable" through physical response instead of a hover-color change
 * alone. Strength is deliberately subtle — a few pixels, not a jump.
 *
 * The approach and the release use different spring curves on purpose:
 * following the cursor should feel weighted and a little reluctant, but
 * letting go should feel like an actual release — snappier, slightly
 * overshooting — rather than the exact same motion in reverse.
 */
export function Magnetic({
  children,
  strength = 14,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    // Heavier spring than a typical UI hover — the point is that it
    // should feel like it has mass, settling rather than snapping to place.
    animate(x, (relX / rect.width) * strength, { type: "spring", stiffness: 110, damping: 16, mass: 0.45 });
    animate(y, (relY / rect.height) * strength, { type: "spring", stiffness: 110, damping: 16, mass: 0.45 });
  };

  const onMouseLeave = () => {
    // Snappier and slightly underdamped — a real "let go", not the
    // approach spring played backwards.
    animate(x, 0, { type: "spring", stiffness: 260, damping: 14, mass: 0.4 });
    animate(y, 0, { type: "spring", stiffness: 260, damping: 14, mass: 0.4 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x, y }}
    >
      {children}
    </motion.div>
  );
}
