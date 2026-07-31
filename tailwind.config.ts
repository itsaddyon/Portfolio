import type { Config } from "tailwindcss";

// Design tokens for the portfolio. Palette is intentionally restrained:
// one neutral base + one accent per case study, never a global neon accent.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Tailwind's opacity-callback color pattern (lets `bg-canvas/60`
        // etc. work) is a documented, working runtime feature — the
        // installed `Config` type just doesn't model the function form,
        // so the value is cast past that one gap rather than typed away
        // for the whole file.
        canvas: (({ opacityValue }: { opacityValue: string | undefined }) =>
          opacityValue !== undefined
            ? `rgba(10, 10, 11, ${opacityValue})`
            : "#0A0A0B") as unknown as string,

        "canvas-raised": "#111113",
        ink: "#F5F4F1",
        "ink-muted": "#8C8B87",
        "ink-faint": "#5A5A58",
        line: "#1D1D1F",
        gold: "#c5a880",
        "gold-bright": "#e8d5b5",
        project: {
          iris: "#E8A33D",
          medibridge: "#3FA796",
          sidekick: "#E8735A",
          aegis: "#5B7FB3",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
        editorial: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      maxWidth: {
        editorial: "72rem",
        prose: "38rem",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
    },
  },
  plugins: [],
};

export default config;
