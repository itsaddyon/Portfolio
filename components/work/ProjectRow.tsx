"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { accentClasses } from "./accentColors";
import { Magnetic } from "@/components/ui/Magnetic";
import { setHoverAccent } from "@/lib/interactionState";

/**
 * One row in the work index. Editorial list, not a card grid — the
 * project's accent only shows up on hover, as a low, soft wash behind
 * the row. Nothing about the row is "AI dashboard"; it's closer to a
 * printed index with a light turned on when you point at an entry.
 */
export function ProjectRow({
  project,
  index,
  onHover,
}: {
  project: Project;
  index: number;
  onHover?: (project: Project | null) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const accent = accentClasses[project.accent];

  const enter = () => {
    if (isMobile) return;
    setHovered(true);
    onHover?.(project);
    setHoverAccent(accent.glow);
  };
  const leave = () => {
    if (isMobile) return;
    setHovered(false);
    onHover?.(null);
    setHoverAccent(null);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => {
      setHoverAccent(null);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <Link href={`/work/${project.slug}`} className="block" data-cursor="View">
      <div
        onMouseEnter={enter}
        onMouseLeave={leave}
        className="relative border-t border-line py-10 md:py-12"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 -z-10"
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: `radial-gradient(60% 100% at 0% 50%, ${accent.glow}14, transparent)`,
          }}
        />

        <Magnetic strength={6}>
          <div className="flex items-center justify-between gap-4 md:gap-10">
            <div className="flex items-baseline gap-6 md:gap-10 flex-1 min-w-0">
              <span className="type-label text-ink-faint hidden md:block w-8">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                  <h3 className="type-headline text-3xl md:text-6xl text-ink">
                    {project.name}
                  </h3>
                  <span className={`type-label ${accent.text}`}>{project.tagline}</span>
                </div>
                <motion.p
                  className="type-subhead mt-3 max-w-prose overflow-hidden text-sm md:text-base"
                  initial={false}
                  animate={{ opacity: isMobile ? 0.95 : (hovered ? 1 : 0.55) }}
                  transition={{ duration: 0.4 }}
                >
                  {project.summary}
                </motion.p>
              </div>
            </div>

            {project.logo && (
              <div className="w-14 h-14 rounded-lg border border-line bg-canvas-raised flex items-center justify-center p-2 md:hidden shrink-0">
                <img
                  src={project.logo}
                  alt={project.name}
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            <motion.span
              className="type-label text-ink hidden md:block"
              initial={false}
              animate={{ x: hovered ? 0 : -8, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              View →
            </motion.span>
          </div>
        </Magnetic>
      </div>
    </Link>
  );
}
