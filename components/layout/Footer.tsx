"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { RevealText } from "@/components/ui/RevealText";
import { Magnetic } from "@/components/ui/Magnetic";



/**
 * Footer: quiet identity bar.
 * The heavy CTA contact section lives in the Contact component above it.
 */
export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleEmailClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    await navigator.clipboard.writeText("itsaddyon@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative z-10 border-t border-line">
      <div className="mx-auto max-w-editorial px-6 md:px-10 pt-16 pb-12 flex flex-col gap-12">
        {/* Quote Block — centered editorial quote by Adarsh Arya */}
        <div className="mx-auto text-center max-w-2xl flex flex-col items-center">
          <p className="type-headline text-ink text-xl md:text-2xl italic leading-relaxed font-light text-center">
            &ldquo;If it doesn&apos;t improve someone&apos;s life, it&apos;s just software.&rdquo;
          </p>
          <p className="type-label text-ink-faint mt-3 tracking-wider normal-case">
            — Adarsh Arya
          </p>
        </div>

        {/* Links & Attribution row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-line/45 pt-10">
          <p className="type-label text-ink-faint">Adarsh Arya — Roorkee, India · {new Date().getFullYear()}</p>
          <div className="flex flex-wrap gap-6">
            <a
              href="https://github.com/itsaddyon"
              target="_blank"
              rel="noreferrer"
              data-cursor="Open"
              className="type-label text-ink-muted hover:text-gold transition-colors duration-300"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/itsaddyon"
              target="_blank"
              rel="noreferrer"
              data-cursor="Open"
              className="type-label text-ink-muted hover:text-gold transition-colors duration-300"
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/itsaddyon"
              target="_blank"
              rel="noreferrer"
              data-cursor="Open"
              className="type-label text-ink-muted hover:text-gold transition-colors duration-300"
            >
              X
            </a>
            <a
              href="https://instagram.com/itsaddyon"
              target="_blank"
              rel="noreferrer"
              data-cursor="Open"
              className="type-label text-ink-muted hover:text-gold transition-colors duration-300"
            >
              Instagram
            </a>
            <button
              onClick={handleEmailClick}
              data-cursor="Copy"
              className="type-label text-ink-muted hover:text-gold transition-colors duration-300 text-left focus:outline-none"
            >
              {copied ? "Copied ✓" : "itsaddyon@gmail.com"}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
