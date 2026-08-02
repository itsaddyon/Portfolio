import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projects, getProject } from "@/lib/projects";
import { accentClasses } from "@/components/work/accentColors";
import { PageShell } from "@/components/layout/PageShell";
import { RevealText } from "@/components/ui/RevealText";
import { CaseStudySection } from "@/components/work/CaseStudySection";
import { Magnetic } from "@/components/ui/Magnetic";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { StatCounter } from "@/components/ui/StatCounter";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) return { title: "Not Found — Adarsh Arya" };
  return {
    title: `${project.name} | Adarsh Arya`,
    description: project.summary,
    openGraph: {
      title: `${project.name} | Adarsh Arya`,
      description: project.summary,
      type: "article",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${project.name} case study overview`,
        },
      ],
    },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const accent = accentClasses[project.accent];
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(currentIndex + 1) % projects.length] ?? projects[0];
  if (!next) notFound();

  return (
    <PageShell>
      <section className="relative px-6 md:px-10 pt-40 md:pt-48 pb-20 overflow-hidden">
        <div
          className="pointer-events-none absolute left-1/2 top-24 -translate-x-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full opacity-[0.09] blur-[110px]"
          style={{ background: `radial-gradient(circle, ${accent.glow} 0%, transparent 70%)` }}
        />
        <div className="mx-auto max-w-editorial">
          {project.logo && (
            <RevealText className="mb-8">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-canvas-raised border border-line p-2">
                <Image
                  src={project.logo}
                  alt={`${project.name} logo`}
                  width={64}
                  height={64}
                  unoptimized
                  className="w-full h-full object-contain"
                />
              </div>
            </RevealText>
          )}
          <RevealText as="p" className={`type-label mb-6 ${accent.text}`}>
            {project.tagline}
          </RevealText>
          <RevealText as="h1" delay={0.08} className="type-headline text-ink text-[13vw] md:text-[6vw] leading-[0.95]">
            {project.name}
          </RevealText>
          <RevealText as="p" delay={0.2} className="type-subhead text-xl md:text-2xl mt-10 max-w-prose">
            {project.summary}
          </RevealText>

          <div className="mt-10 flex flex-wrap gap-6">
            {project.link && (
              <RevealText delay={0.3}>
                <Magnetic strength={8}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-block type-label border-b pb-1 ${accent.border} text-ink ${accent.hoverText} transition-colors duration-300`}
                  >
                    View on GitHub →
                  </a>
                </Magnetic>
              </RevealText>
            )}

            {project.downloadUrl && (
              <RevealText delay={0.35}>
                <Magnetic strength={8}>
                  <a
                    href={project.downloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-block type-label border-b pb-1 ${accent.border} text-ink ${accent.hoverText} transition-colors duration-300`}
                  >
                    Download Launcher →
                  </a>
                </Magnetic>
              </RevealText>
            )}

            {project.paperUrl && (
              <RevealText delay={0.38}>
                <Magnetic strength={8}>
                  <a
                    href={project.paperUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-block type-label border-b pb-1 ${accent.border} text-ink ${accent.hoverText} transition-colors duration-300`}
                  >
                    Zenodo Publication →
                  </a>
                </Magnetic>
              </RevealText>
            )}

            {project.liveUrl && (
              <RevealText delay={0.4}>
                <Magnetic strength={8}>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-block type-label border-b pb-1 ${accent.border} text-ink ${accent.hoverText} transition-colors duration-300`}
                  >
                    Visit live site →
                  </a>
                </Magnetic>
              </RevealText>
            )}
          </div>
        </div>
      </section>

      {project.stats && project.stats.length > 0 && (
        <section className="px-6 md:px-10 pb-12">
          <div className="mx-auto max-w-editorial grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10 border-b border-line">
            {project.stats.map((s) => (
              <StatCounter
                key={s.label}
                value={s.value}
                decimals={s.decimals}
                prefix={s.prefix}
                suffix={s.suffix}
                label={s.label}
              />
            ))}
          </div>
        </section>
      )}

      <section className="px-6 md:px-10 pb-20">
        <div className="mx-auto max-w-editorial">
          <CaseStudySection index="01" heading="The problem" body={project.problem} delay={0} />
          <CaseStudySection index="02" heading="Architecture" body={project.architecture} delay={0.08} />
          <CaseStudySection index="03" heading="Hard parts" body={project.challenges} delay={0.16} />
          <CaseStudySection index="04" heading="Where it landed" body={project.result} delay={0.24} />

          <div className="border-t border-line py-12 md:py-16">
            <p className="type-label text-ink-faint mb-6">Built with</p>
            <p className="type-subhead text-lg md:text-xl max-w-prose leading-loose">
              {project.stack.join(" · ")}
            </p>
          </div>

          {project.screenshots && project.screenshots.length > 0 && (
            <div className="border-t border-line py-12 md:py-16">
              <p className="type-label text-ink-faint mb-10">In use</p>
              <div className="space-y-16">
                {project.screenshots.map((shot) => (
                  <RevealText key={shot.src}>
                    <ImageReveal src={shot.src} alt={shot.caption} />
                    <p className="type-label text-ink-faint mt-4">{shot.caption}</p>
                  </RevealText>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="px-6 md:px-10 pb-28">
        <div className="mx-auto max-w-editorial border-t border-line pt-12">
          <Link href={`/work/${next.slug}`} className="group block">
            <p className="type-label text-ink-faint mb-4">Next</p>
            <Magnetic strength={8}>
              <h2 className="type-headline text-4xl md:text-6xl text-ink group-hover:opacity-70 transition-opacity duration-500">
                {next.name} →
              </h2>
            </Magnetic>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
