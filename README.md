# Portfolio — Foundation

Status: foundation complete (background, design system, layout, motion
language). Homepage is a proof-of-concept hero; full page content is next.

## Run it

```powershell
cd "D:\Btech Projects\portfolio"
npm install
npm run dev
```

Open http://localhost:3000

## What's here

- `app/` — Next.js App Router: root layout, global styles, placeholder homepage
- `lib/fonts.ts` — Fraunces (display) + Inter (body) via next/font
- `lib/motion.ts` — the single shared easing curve + fade/stagger variants.
  Every animation in the app should reuse these, not invent new ones.
- `lib/projects.ts` — case-study content for IRIS, MediBridge, SidekickAI,
  AEGIS, sourced from each project's own README. No invented metrics.
- `components/background/` — the neural constellation (signature element):
  `NeuralField.tsx` is the R3F scene, `NeuralBackground.tsx` is the fixed
  full-viewport wrapper with adaptive node count + reduced-motion support.
- `components/layout/` — Header, Footer, PageShell (the shared page frame)
- `components/ui/Magnetic.tsx` — cursor-following wrapper for interactive
  elements (project cards, links)
- `components/ui/RevealText.tsx` — the one entrance animation, used for
  headlines and section intros only
- `components/ui/CustomCursor.tsx` — replaces the system cursor on
  fine-pointer devices; glows and grows over anything clickable
- `components/work/` — `ProjectRow` (homepage index), `CaseStudySection`
  (case-study body blocks), `accentColors.ts` (literal Tailwind classes
  per project accent — Tailwind can't resolve template-string class names)
- `app/work/[slug]/page.tsx` — the four case-study routes, statically
  generated from `lib/projects.ts`
- `app/template.tsx` — the one route-change transition (a quiet fade)
- `components/ui/Loader.tsx` — arrival curtain, once per session
- `components/ui/SmoothScroll.tsx` — Lenis, drives real `window.scrollTo`
  so it needs no wiring into anything scroll-reading
- `components/ui/ImageReveal.tsx` — scroll-scrubbed scale-in for images
- `components/work/WorkIndex.tsx` — cursor-follow preview thumbnail
  wrapping the work list; falls back to nothing for projects with no
  screenshot/logo, never a placeholder box
- `.grain` (globals.css) — the film-grain overlay, applied once in
  `PageShell`

## Design tokens (tailwind.config.ts)

- `canvas` #0A0A0B / `ink` #F5F4F1 — base palette, intentionally restrained
- `project.iris` / `project.medibridge` / `project.sidekick` / `project.aegis`
  — one accent color per case study, never a global neon accent
- `ease-premium` — cubic-bezier(0.16, 1, 0.3, 1), the one entrance curve

## Next phase

1. Homepage copy pass — tighten the "how I work" framing if you want one
2. Project imagery — screenshots/demo captures for each case study (currently text-only)
3. A contact form or booking link, if you want more than email/GitHub/LinkedIn in the footer
