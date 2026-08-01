"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

type RecognitionItem = { title: string; detail: string; link: string; image?: string };

/**
 * Same cursor-follow-preview pattern as WorkIndex, applied to the
 * Recognition list. Supports displaying a local image screenshot of the event/post.
 * Escapes transformed parents by using React Portals to attach to body.
 */
export function RecognitionIndex({ items }: { items: RecognitionItem[] }) {
  const [active, setActive] = useState<RecognitionItem | null>(null);
  const [mounted, setMounted] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset image error state whenever active item changes
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
                alt={active.title}
                width={256}
                height={144}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
                priority
              />
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-6 h-6 rounded flex items-center justify-center text-[11px] font-bold text-white"
                style={{ background: "#0A66C2" }}
              >
                in
              </div>
              <span className="type-label text-ink-faint">LinkedIn post</span>
            </div>
          )}

          <p className="type-subhead text-ink text-sm leading-snug line-clamp-3">
            {active.title}
          </p>
          <p className="type-label text-ink-faint mt-3">View post →</p>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="border-t border-line" onMouseMove={onMouseMove}>
      {items.map((item) => (
        <a
          key={item.title}
          href={item.link}
          target="_blank"
          rel="noreferrer"
          data-cursor="Open"
          className="block border-b border-line py-8 group"
          onMouseEnter={() => setActive(item)}
          onMouseLeave={() => setActive(null)}
        >
          <div className="flex items-baseline justify-between gap-6">
            <div className="w-full">
              <p className="type-subhead text-ink text-lg md:text-xl">{item.title}</p>
              <p className="type-subhead text-ink-muted text-sm mt-1 max-w-prose">{item.detail}</p>
              {item.image && (
                <div className="mt-4 w-full aspect-[16/9] max-w-sm rounded-lg overflow-hidden border border-line bg-canvas md:hidden relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover"
                    priority
                  />
                </div>
              )}
            </div>
            <span className="type-label text-ink-faint group-hover:text-ink transition-colors duration-300 shrink-0 hidden md:block">
              LinkedIn →
            </span>
          </div>
        </a>
      ))}

      {mounted && createPortal(portalContent, document.body)}
    </div>
  );
}

