import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";

// Fraunces: a warm, editorial serif for headlines — confident without
// tipping into "luxury brand cliché". Variable weight keeps file size low.
export const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// Plus Jakarta Sans: a premium, modern, warm geometric sans-serif
// that gives the body copy an elegant, high-end editorial feel.
export const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
