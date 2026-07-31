"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import clsx from "clsx";

const NAV = [
  { href: "/", label: "Index" },
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#contact", label: "Contact" },
];

const MOBILE_NAV = [
  { href: "/", label: "Index" },
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#recognition", label: "Recognition" },
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/#contact", label: "Contact" },
];

/**
 * Fixed top bar — auto-hides on scroll down, reappears on scroll up.
 * Frosted glass kicks in once the user has scrolled past the hero.
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.2 });



  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Only hide after the user has scrolled past the top area
      if (y > 80) {
        setHidden(y > lastY.current);
      } else {
        setHidden(false);
      }
      setScrolled(y > 20);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      {/* Reading progress — a thin line under the header, always visible
          regardless of the header's own hide/show state. Reinforces the
          "editorial index" feel: you always know where you are in the page. */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 inset-x-0 z-30 h-px bg-gold origin-left"
        style={{ scaleX: progress }}
      />

      <motion.header
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={clsx(
          "fixed top-0 inset-x-0 z-20",
          scrolled && "backdrop-blur-sm bg-canvas/60 border-b border-line/40"
        )}
      >
        <div className="mx-auto max-w-editorial px-6 md:px-10 py-5 flex items-center justify-between gap-6">
          {/* Wordmark */}
          <Link href="/" className="type-label text-ink hover:text-ink-muted transition-colors duration-300 shrink-0">
            Adarsh Arya
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "type-label transition-colors duration-300",
                  pathname === item.href ? "text-ink" : "text-ink-faint hover:text-gold"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: Resume + hamburger */}
          <div className="flex items-center gap-5">


            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              data-cursor="Open"
              className="hidden md:inline-block type-label text-ink-faint border border-line px-4 py-2 rounded-full hover:text-gold hover:border-gold/40 transition-colors duration-300"
            >
              Résumé ↗
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="md:hidden flex flex-col justify-center gap-[5px] w-6 h-6 shrink-0"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block h-px w-full bg-ink origin-center"
              />
              <motion.span
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block h-px w-full bg-ink"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block h-px w-full bg-ink origin-center"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-30 bg-canvas/80 backdrop-blur-sm md:hidden"
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-40 w-72 bg-canvas border-l border-line flex flex-col px-8 pt-24 pb-12 md:hidden"
            >
              <nav className="flex flex-col gap-5 flex-1 overflow-y-auto pr-2 scrollbar-thin">
                {MOBILE_NAV.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.04, ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="type-headline text-2xl text-ink hover:text-gold transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Social Links in mobile drawer */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="border-t border-line/45 pt-5 mt-5 mb-5"
              >
                <p className="type-label text-gold mb-3">Socials</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <a
                    href="https://github.com/itsaddyon"
                    target="_blank"
                    rel="noreferrer"
                    className="type-label text-ink-muted hover:text-gold transition-colors duration-300 normal-case tracking-normal text-xs"
                  >
                    GitHub ↗
                  </a>
                  <a
                    href="https://linkedin.com/in/itsaddyon"
                    target="_blank"
                    rel="noreferrer"
                    className="type-label text-ink-muted hover:text-gold transition-colors duration-300 normal-case tracking-normal text-xs"
                  >
                    LinkedIn ↗
                  </a>
                  <a
                    href="https://x.com/itsaddyon"
                    target="_blank"
                    rel="noreferrer"
                    className="type-label text-ink-muted hover:text-gold transition-colors duration-300 normal-case tracking-normal text-xs"
                  >
                    X ↗
                  </a>
                  <a
                    href="https://instagram.com/itsaddyon"
                    target="_blank"
                    rel="noreferrer"
                    className="type-label text-ink-muted hover:text-gold transition-colors duration-300 normal-case tracking-normal text-xs"
                  >
                    Instagram ↗
                  </a>
                </div>
              </motion.div>

              {/* Resume in drawer */}
              <motion.a
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="type-label text-ink-faint border border-line px-5 py-3 rounded-full hover:text-gold hover:border-gold/45 transition-colors duration-300 text-center"
              >
                Download Résumé ↗
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
