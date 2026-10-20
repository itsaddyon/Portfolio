"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  detail: string;
  link?: string;
  image?: string;
  badge?: { label: string; text?: string; bg?: string };
  subLinks?: { label: string; link: string }[];
};

/**
 * Interactive Experience section. Renders items, and for items with links
 * (like GDG Tech Lead or FlyRank Internship), enables interactive hovers,
 * cursor-follow previews, sub-links, and click navigation.
 */
export function ExperienceIndex({ items }: { items: ExperienceItem[] }) {
  const [active, setActive] = useState<ExperienceItem | null>(null);
  const [mounted, setMounted] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset image error state when active item changes
  useEffect(() => {
    setImageError(false);
  }, [active]);

  const onMouseMove = (e: React.MouseEvent) => {
    x.set(e.clientX + 24);
    y.set(e.clientY - (active?.image && !imageError ? 90 : 70));
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
        <div className="w-64 rounded-lg overflow-hidden border border-line shadow-2xl bg-canvas-raised p-4">
          {active.image && !imageError ? (
            <div className="w-full h-36 rounded-md overflow-hidden mb-3 relative bg-canvas">
              <Image
                src={active.image}
                alt={`${active.role} at ${active.org}`}
                width={256}
                height={144}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
                priority
              />
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-3">
              {active.badge ? (
                <>
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: active.badge.bg || "#0A66C2" }}
                  >
                    {active.badge.text || "in"}
                  </div>
                  <span className="type-label text-ink-faint">{active.badge.label}</span>
                </>
              ) : active.link?.includes("linkedin.com") ? (
                <>
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: "#0A66C2" }}
                  >
                    in
                  </div>
                  <span className="type-label text-ink-faint">LinkedIn Post</span>
                </>
              ) : (
                <>
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold text-white bg-accent"
                    style={{ background: "#4285F4" }}
                  >
                    G
                  </div>
                  <span className="type-label text-ink-faint">GDG Community</span>
                </>
              )}
            </div>
          )}

          <p className="type-subhead text-ink text-sm leading-snug line-clamp-2">
            {active.role}
          </p>
          <p className="type-label text-ink-faint text-xs mt-1">{active.org}</p>
          <p className="type-label text-ink-faint mt-3">
            {active.link?.includes("linkedin.com") ? "View Post →" : "View Profile →"}
          </p>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="border-t border-line" onMouseMove={onMouseMove}>
      {items.map((item) => {
        const isInteractive = !!item.link;

        if (isInteractive) {
          return (
            <div
              key={item.role}
              className="border-b border-line py-8 group transition-colors duration-300 hover:bg-canvas-raised/30 px-2 -mx-2"
              onMouseEnter={() => setActive(item)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-10">
                <span className="type-label text-ink-faint w-32 shrink-0 group-hover:text-ink transition-colors duration-300">
                  {item.period}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-4">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="Open"
                      className="type-subhead text-ink text-lg md:text-xl group-hover:text-accent transition-colors duration-300 hover:underline"
                    >
                      {item.role} <span className="text-ink-faint">— {item.org}</span>
                    </a>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="type-label text-ink-faint group-hover:text-ink transition-colors duration-300 shrink-0 hidden md:block hover:text-gold"
                    >
                      {item.link?.includes("linkedin.com") ? "LinkedIn →" : "Profile →"}
                    </a>
                  </div>
                  <p className="type-subhead text-ink-muted text-sm mt-1 max-w-prose group-hover:text-ink transition-colors duration-300">
                    {item.detail}
                  </p>
                  {item.subLinks && item.subLinks.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-4">
                      {item.subLinks.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.link}
                          target="_blank"
                          rel="noreferrer"
                          data-cursor="Open"
                          className="type-label text-xs text-gold hover:text-gold-bright transition-colors border-b border-gold/40 pb-0.5"
                        >
                          {sub.label} ↗
                        </a>
                      ))}
                    </div>
                  )}
                  {item.image && (
                    <div className="mt-4 w-full aspect-[16/9] max-w-sm rounded-lg overflow-hidden border border-line bg-canvas md:hidden relative">
                      <Image
                        src={item.image}
                        alt={`${item.role} at ${item.org}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                        className="object-cover"
                        priority
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        }

        // Static item
        return (
          <div
            key={item.role}
            className="border-b border-line py-8 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-10 px-2 -mx-2"
          >
            <span className="type-label text-ink-faint w-32 shrink-0">{item.period}</span>
            <div>
              <p className="type-subhead text-ink text-lg md:text-xl">
                {item.role} <span className="text-ink-faint">— {item.org}</span>
              </p>
              <p className="type-subhead text-ink-muted text-sm mt-1 max-w-prose">{item.detail}</p>
            </div>
          </div>
        );
      })}

      {mounted && createPortal(portalContent, document.body)}
    </div>
  );
}
