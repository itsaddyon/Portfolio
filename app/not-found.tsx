"use client";

import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { RevealText } from "@/components/ui/RevealText";
import { Magnetic } from "@/components/ui/Magnetic";

export default function NotFound() {
  return (
    <PageShell>
      <section className="relative min-h-[85vh] flex flex-col justify-center px-6 md:px-10 overflow-hidden">
        {/* Atmospheric glow behind 404 message */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vw] max-w-[900px] rounded-full opacity-[0.05] blur-[150px]"
          style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)" }}
        />

        <div className="mx-auto max-w-editorial w-full relative z-10 flex flex-col items-start">
          <RevealText as="p" className="type-label mb-8 text-ink-muted">
            Error 404 — Void
          </RevealText>

          <RevealText
            as="h1"
            delay={0.06}
            className="type-headline text-ink text-[12vw] md:text-[6.5vw] leading-[0.9] mb-12 max-w-3xl"
          >
            Lost in the constellation.
          </RevealText>

          <RevealText
            as="p"
            delay={0.12}
            className="type-subhead text-lg md:text-xl leading-relaxed max-w-prose mb-14"
          >
            The link you followed might have expired, or the node was shifted to a different address. Let&apos;s get you back on track.
          </RevealText>

          <RevealText delay={0.18}>
            <Magnetic strength={8}>
              <Link
                href="/"
                className="group inline-flex items-center gap-3 type-label text-ink border border-line px-8 py-4 rounded-full hover:bg-ink hover:text-canvas transition-all duration-300"
              >
                Return to Index →
              </Link>
            </Magnetic>
          </RevealText>
        </div>
      </section>
    </PageShell>
  );
}
