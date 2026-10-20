"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/lib/projects";
import { ProjectRow } from "./ProjectRow";

/**
 * Wraps the work list and adds a floating preview thumbnail that
 * follows the cursor while a row is hovered.
 * Escapes transformed parents by using React Portals to attach to body.
 */
export function WorkIndex({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });

  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setImgError(false);
  }, [active]);

  const previewSrc = active?.logo ?? null;

  const onMouseMove = (e: React.MouseEvent) => {
    x.set(e.clientX + 24);
    y.set(e.clientY - 90);
  };

  const portalContent = mounted && (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ x: springX, y: springY }}
      initial={false}
      animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.92 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {active && (
        <div className="w-64 h-40 rounded-lg overflow-hidden border border-line shadow-2xl bg-canvas-raised flex items-center justify-center p-6">
          {previewSrc && !imgError ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={previewSrc}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full flex items-center justify-center"
              >
                <Image
                  src={previewSrc}
                  alt={`${active.name} logo`}
                  width={256}
                  height={160}
                  className="w-full h-full object-contain"
                  onError={() => setImgError(true)}
                  priority
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-4">
              <span className="font-display text-2xl text-gold mb-1 font-semibold">
                {active.name}
              </span>
              <span className="type-label text-ink-faint text-[10px] tracking-wider uppercase">
                {active.tagline}
              </span>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="border-b border-line" onMouseMove={onMouseMove}>
      {projects.map((project, i) => (
        <ProjectRow key={project.slug} project={project} index={i} onHover={setActive} />
      ))}

      {mounted && createPortal(portalContent, document.body)}
    </div>
  );
}

