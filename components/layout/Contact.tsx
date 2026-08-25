"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RevealText } from "@/components/ui/RevealText";
import { Magnetic } from "@/components/ui/Magnetic";

const EMAIL = "itsaddyon@gmail.com";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Full-bleed contact section — headline CTA + working Telegram-backed form.
 * Copy-email interaction on the address below the headline.
 */
export function Contact() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  // Prevents AnimatePresence server/client HTML mismatch (hydration error).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-transparent border-b border-line py-4 text-ink type-subhead text-base placeholder:text-ink-faint focus:outline-none focus:border-ink-muted transition-colors duration-300 resize-none";

  return (
    <section
      id="contact"
      className="relative px-6 md:px-10 py-32 md:py-48 border-t border-line overflow-hidden"
    >
      {/* Subtle ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vw] max-w-[800px] rounded-full opacity-[0.05] blur-[120px]"
        style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)" }}
      />

      <div className="mx-auto max-w-editorial relative">
        <RevealText as="p" className="type-label mb-10">
          Start a conversation
        </RevealText>

        <RevealText
          as="h2"
          delay={0.06}
          className="type-headline text-ink text-[10vw] md:text-[5vw] leading-[0.92] mb-6 max-w-3xl"
        >
          Let&apos;s build something.
        </RevealText>

        {/* Copyable email */}
        <RevealText delay={0.12} className="mb-20">
          <button
            onClick={handleCopy}
            data-cursor="Copy"
            className="relative type-label text-ink-faint border-b border-ink-faint pb-0.5 hover:text-ink hover:border-ink transition-colors duration-300 focus-visible:outline-none"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.18 }}
                  className="text-ink"
                >
                  Copied ✓
                </motion.span>
              ) : (
                <motion.span
                  key="email"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.18 }}
                >
                  {EMAIL} — click to copy
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </RevealText>

        {/* ── Form (client-only to avoid hydration mismatch) ──────── */}
        {!mounted ? (
          // SSR placeholder — same height so no layout shift
          <div className="border-t border-line py-4 min-h-[320px]" />
        ) : (
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="py-16 border-t border-line"
              >
                <p className="type-headline text-ink text-3xl md:text-5xl mb-4">Message received.</p>
                <p className="type-subhead text-ink-muted text-lg">I&apos;ll get back to you within 24 hours.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 type-label text-ink-faint border-b border-ink-faint pb-0.5 hover:text-ink hover:border-ink transition-colors duration-300"
                >
                  Send another →
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border-t border-line"
              >
                {/* Row 1 — Name + Email */}
                <div className="grid md:grid-cols-2 gap-0 md:gap-8">
                  <div className="border-b border-line md:border-b-0">
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name *"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Your email *"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Row 2 — Subject */}
                <div className="border-t border-line">
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Subject — what&apos;s this about?"
                    className={inputClass}
                  />
                </div>

                {/* Row 3 — Message */}
                <div className="border-t border-line">
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about it *"
                    required
                    rows={5}
                    className={inputClass}
                  />
                </div>

                {/* Row 4 — Submit */}
                <div className="border-t border-line pt-8 flex items-center justify-between gap-6">
                  <Magnetic strength={6}>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      data-cursor={status === "sending" ? undefined : "Send"}
                      className="type-label text-ink border border-line px-8 py-4 rounded-full hover:bg-ink hover:text-canvas transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none"
                    >
                      {status === "sending" ? "Sending…" : "Send message →"}
                    </button>
                  </Magnetic>

                  {status === "error" && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="type-label text-red-400"
                    >
                      Something went wrong — try emailing directly.
                    </motion.p>
                  )}

                  <p className="type-label text-ink-faint hidden md:block">
                    Response within 24 h · IST
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        )}

        {/* Bottom links */}
        <div className="mt-16 flex flex-wrap gap-8">
          <Magnetic strength={8}>
            <a
              href="https://linkedin.com/in/itsaddyon"
              target="_blank"
              rel="noreferrer"
              data-cursor="Open"
              className="type-label text-ink-faint border-b border-ink-faint pb-0.5 hover:text-ink hover:border-ink transition-colors duration-300"
            >
              LinkedIn →
            </a>
          </Magnetic>
          <Magnetic strength={8}>
            <a
              href="https://github.com/itsaddyon"
              target="_blank"
              rel="noreferrer"
              data-cursor="Open"
              className="type-label text-ink-faint border-b border-ink-faint pb-0.5 hover:text-ink hover:border-ink transition-colors duration-300"
            >
              GitHub →
            </a>
          </Magnetic>
          <Magnetic strength={8}>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              data-cursor="Open"
              className="type-label text-ink-faint border-b border-ink-faint pb-0.5 hover:text-ink hover:border-ink transition-colors duration-300"
            >
              Download Résumé →
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
