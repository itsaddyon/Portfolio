"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { RevealText } from "@/components/ui/RevealText";

type ContributionDay = {
  date: string;
  count: number;
  level: number; // 0-4
};

type ContributionWeek = {
  days: ContributionDay[];
};

/**
 * Fetches and renders a GitHub-style contribution heatmap for the
 * given username. Uses the public GitHub contribution calendar scraping
 * approach (no API key required). Falls back gracefully if fetch fails.
 */
export function GitHubActivity({ username }: { username: string }) {
  const [weeks, setWeeks] = useState<ContributionWeek[]>([]);
  const [totalContribs, setTotalContribs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchContributions() {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        // Transform flat contributions array into weeks
        const contributions: { date: string; count: number; level: number }[] =
          data.contributions || [];
        
        const total = contributions.reduce((sum: number, d: { count: number }) => sum + d.count, 0);
        setTotalContribs(total);

        // Group by week (7 days each)
        const grouped: ContributionWeek[] = [];
        for (let i = 0; i < contributions.length; i += 7) {
          grouped.push({ days: contributions.slice(i, i + 7) });
        }
        setWeeks(grouped);
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    }

    fetchContributions();
  }, [username]);

  if (error) return null;

  // Gold intensity levels matching the constellation theme — defined as hex codes for inline styling to bypass JIT compilation issues
  const levelColors = [
    "#2A2A2A",              // level 0 — clearly visible charcoal grey (won't blend into black)
    "#5F5440",              // level 1 — warm low-gold
    "#8D7650",              // level 2 — warm mid-gold
    "#C6A36A",              // level 3 — bright gold
    "#F0D39A",              // level 4 — glowing champagne gold
  ];

  return (
    <div>
      <div className="flex items-baseline justify-between mb-8 border-b border-line pb-4">
        <RevealText as="h2" className="type-headline text-lg md:text-xl font-light text-ink uppercase tracking-wider">
          GitHub Activity
        </RevealText>
        {!loading && totalContribs > 0 && (
          <RevealText delay={0.1}>
            <span className="type-label font-semibold" style={{ color: "#F0D39A" }}>
              {totalContribs.toLocaleString()} contributions this year
            </span>
          </RevealText>
        )}
      </div>

      {loading ? (
        <div className="h-[120px] flex items-center justify-center">
          <div className="w-6 h-6 border border-gold/30 border-t-gold rounded-full animate-spin" />
        </div>
      ) : (
        <RevealText delay={0.15}>
          <div
            ref={containerRef}
            className="overflow-x-auto pb-2 -mx-2 px-2 scrollbar-thin"
          >
            <div className="flex gap-[3px] min-w-max">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.days.map((day, di) => (
                    <motion.div
                      key={day.date}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: wi * 0.008 + di * 0.002,
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{
                        scale: 1.25,
                        zIndex: 10,
                        boxShadow: day.level > 0
                          ? "0 0 12px rgba(240, 211, 154, 0.6), 0 0 24px rgba(240, 211, 154, 0.3)"
                          : "0 0 8px rgba(255, 255, 255, 0.15)",
                      }}
                      title={`${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`}
                      style={{
                        backgroundColor: levelColors[day.level],
                        boxShadow: day.level > 0 ? "0 0 6px rgba(240, 211, 154, 0.2)" : "none",
                      }}
                      className="w-[11px] h-[11px] rounded-[2px] transition-colors duration-200 relative cursor-pointer"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-4 justify-end">
            <span className="type-label text-ink-faint text-[0.6rem]">Less</span>
            {levelColors.map((color, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: color,
                  boxShadow: i > 0 ? "0 0 6px rgba(240, 211, 154, 0.2)" : "none",
                }}
                className="w-[11px] h-[11px] rounded-[2px]"
              />
            ))}
            <span className="type-label text-ink-faint text-[0.6rem]">More</span>
          </div>
        </RevealText>
      )}
    </div>
  );
}
