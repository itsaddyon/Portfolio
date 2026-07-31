"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";


export function MobileNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {

    const isMobile = window.innerWidth < 768;
    const dismissed = sessionStorage.getItem("mobile-notice-dismissed");
    const isDev = process.env.NODE_ENV === "development";
    if (isMobile && (!dismissed || isDev)) {
      // Delay showing so it doesn't compete with the loader
      const timer = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem("mobile-notice-dismissed", "1");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-4 right-4 z-50 md:hidden"
        >
          <div className="bg-canvas-raised border border-line rounded-2xl p-4 flex items-start gap-4 shadow-2xl backdrop-blur-sm">
            {/* Animated desktop icon */}
            <div className="shrink-0 relative w-10 h-10 flex items-center justify-center">
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gold"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </motion.div>
              {/* Sparkle dots */}
              <motion.div
                className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-gold"
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
              />
              <motion.div
                className="absolute bottom-1 left-0 w-1 h-1 rounded-full bg-gold/60"
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.8, delay: 0.8 }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-ink text-sm font-medium leading-snug">
                Best on desktop
              </p>
              <p className="text-ink-faint text-xs mt-1 leading-relaxed">
                This portfolio has interactive 3D visuals and hover effects best experienced on a larger screen.
              </p>
            </div>

            <button
              onClick={dismiss}
              className="shrink-0 text-ink-faint hover:text-ink transition-colors p-1"
              aria-label="Dismiss"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
