import { RevealText } from "@/components/ui/RevealText";

/**
 * One editorial block within a case study: a small numbered label, a
 * short heading, a paragraph. Reused four times per project (problem,
 * architecture, challenges, result) so every case study has the same
 * rhythm — the content changes, the structure doesn't.
 *
 * The whole block reveals as one unit (not just the body text) with an
 * optional stagger delay, so the four blocks arrive in reading order
 * instead of all snapping in at once when they enter the viewport.
 */
export function CaseStudySection({
  index,
  heading,
  body,
  delay = 0,
}: {
  index: string;
  heading: string;
  body: string;
  delay?: number;
}) {
  return (
    <RevealText as="div" delay={delay} className="border-t border-line py-12 md:py-16">
      <div className="grid md:grid-cols-[auto_1fr] gap-4 md:gap-16">
        <div className="flex md:block gap-4 items-baseline">
          <span className="type-label text-ink-faint">{index}</span>
          <h3 className="type-headline text-2xl md:text-3xl text-ink md:mt-3 md:max-w-[14rem]">
            {heading}
          </h3>
        </div>
        <p className="type-subhead text-lg md:text-xl max-w-prose leading-relaxed">
          {body}
        </p>
      </div>
    </RevealText>
  );
}
