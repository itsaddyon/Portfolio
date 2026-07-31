import { Fraunces, Inter } from "next/font/google";

// Fraunces: a warm, editorial serif for headlines — confident without
// tipping into "luxury brand cliché". Variable weight keeps file size low.
export const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// Inter: a plain, neutral workhorse for body copy and UI labels.
export const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});
