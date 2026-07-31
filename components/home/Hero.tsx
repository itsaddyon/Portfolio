"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { RevealText } from "@/components/ui/RevealText";
import { Tilt } from "@/components/ui/Tilt";
import { KineticText } from "@/components/ui/KineticText";
import { useHeroStage } from "@/components/ui/HeroStage";

/**
 * The hero: bigger, more confident type than the first pass, with a
 * line-by-line kinetic reveal on load, scroll-tied recede, and a
 * premium vertical portrait aligned to the right side on desktop.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scale, opacity, y } = useHeroStage(sectionRef as React.RefObject<HTMLElement>);
  const [imgError, setImgError] = useState(false);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] flex flex-col justify-center px-6 md:px-10 pt-20 md:pt-0 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full opacity-[0.08] blur-[120px]"
        style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)" }}
      />

      <motion.div style={{ scale, opacity, y }}>
        <Tilt>
          <div className="mx-auto max-w-editorial w-full grid md:grid-cols-[1fr_320px] items-center gap-12 md:gap-16">
            {/* Left Column: Text Content */}
            <div>
              <RevealText as="p" className="type-label mb-8">
                Computer Science — Roorkee Institute of Technology
              </RevealText>

              {/* Bigger and split across two lines */}
              <KineticText
                lines={["Adarsh", "Arya"]}
                delayStart={0.1}
                className="type-headline text-ink text-[19vw] md:text-[10vw] leading-[0.86]"
              />

              <RevealText
                as="p"
                delay={0.55}
                className="type-subhead text-xl md:text-2xl mt-12 max-w-prose leading-relaxed"
              >
                &ldquo;Curious enough to break things.<br></br>
                Patient enough to rebuild them better.&rdquo;<br></br><br></br>
                A Computer Science student, hackathon builder, and developer creating AI-powered products that make a real difference.
              </RevealText>
            </div>

            {/* Right Column: Portrait Photo */}
            {!imgError && (
              <RevealText delay={0.4} className="w-full">
                <div className="relative aspect-[3/4] w-full max-w-[280px] md:max-w-none mx-auto group">
                  {/* Subtle portrait hover ambient glow (disabled to keep cutout pure) */}
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-canvas/40 to-transparent z-10 pointer-events-none" /> */}
                  <Image
                    src="/images/portrait.png"
                    alt="Adarsh Arya Portrait"
                    fill
                    sizes="(max-width: 768px) 280px, 320px"
                    priority
                    onError={() => setImgError(true)}
                    className="object-contain group-hover:scale-[1.04] transition-transform duration-700 ease-premium"
                  />
                </div>
              </RevealText>
            )}
          </div>
        </Tilt>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-px h-14 bg-gradient-to-b from-ink-faint to-transparent" />
      </div>
    </section>
  );
}

