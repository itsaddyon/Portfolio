"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A whole-viewport tilt, applied to a content block. Extremely subtle by
 * design (a couple of degrees max) — its job is to make the hero feel
 * like an object sitting in the same 3D space as the background, not to
 * be noticed on its own.
 */
export function Tilt({ children }: { children: React.ReactNode }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 60, damping: 20, mass: 0.6 });
  const springY = useSpring(rotateY, { stiffness: 60, damping: 20, mass: 0.6 });
  const frame = useRef<number>(0);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      rotateY.set(nx * 2.2);
      rotateX.set(-ny * 1.6);
    });
  };

  return (
    <div onPointerMove={onPointerMove} style={{ perspective: 1200 }}>
      <motion.div style={{ rotateX: springX, rotateY: springY }}>{children}</motion.div>
    </div>
  );
}
