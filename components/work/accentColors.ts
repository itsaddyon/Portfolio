import type { Project } from "@/lib/projects";

/**
 * Tailwind can't resolve `text-project-${accent}` template strings at
 * build time, so every class is spelled out literally here — this is
 * the one file that has to enumerate all four accents by hand.
 */
export const accentClasses: Record<
  Project["accent"],
  { text: string; hoverText: string; bgSoft: string; border: string; glow: string }
> = {
  iris: {
    text: "text-project-iris",
    hoverText: "hover:text-project-iris",
    bgSoft: "bg-project-iris/10",
    border: "border-project-iris/40",
    glow: "#E8A33D",
  },
  medibridge: {
    text: "text-project-medibridge",
    hoverText: "hover:text-project-medibridge",
    bgSoft: "bg-project-medibridge/10",
    border: "border-project-medibridge/40",
    glow: "#3FA796",
  },
  sidekick: {
    text: "text-project-sidekick",
    hoverText: "hover:text-project-sidekick",
    bgSoft: "bg-project-sidekick/10",
    border: "border-project-sidekick/40",
    glow: "#E8735A",
  },
  aegis: {
    text: "text-project-aegis",
    hoverText: "hover:text-project-aegis",
    bgSoft: "bg-project-aegis/10",
    border: "border-project-aegis/40",
    glow: "#5B7FB3",
  },
};
