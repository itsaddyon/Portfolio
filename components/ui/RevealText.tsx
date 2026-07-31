"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

/**
 * Wraps a block of text so it arrives once, on entry into view — a single
 * purposeful reveal, not a per-letter animation. Used for headlines and
 * section intros; never for body copy the visitor needs to read immediately.
 */
// Narrowed on purpose: `keyof JSX.IntrinsicElements` includes tags like
// <object> that have required props, which broke type-checking on a
// generic <Tag>. This union covers every tag actually used as `as`.
type AllowedTag = "div" | "p" | "span" | "h1" | "h2" | "h3";

export function RevealText({
  children,
  as: Tag = "div",
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  as?: AllowedTag;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
    >
      <Tag>{children}</Tag>
    </motion.div>
  );
}
