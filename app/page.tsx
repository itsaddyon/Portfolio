import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { RevealText } from "@/components/ui/RevealText";
import { SectionStage } from "@/components/ui/SectionStage";
import { Hero } from "@/components/home/Hero";
import { WorkIndex } from "@/components/work/WorkIndex";
import { RecognitionIndex } from "@/components/home/RecognitionIndex";
import { CapabilitiesGrid } from "@/components/home/CapabilitiesGrid";
import { GitHubActivity } from "@/components/home/GitHubActivity";
import { CertificateCard } from "@/components/home/CertificateCard";
import { ExperienceIndex } from "@/components/home/ExperienceIndex";
import { projects } from "@/lib/projects";

const capabilities = [
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "Java", "C"] },
  { group: "Frameworks", items: ["React", "Next.js", "Node.js", "Flask", "Tailwind CSS"] },
  { group: "Systems & Data", items: ["Firebase", "REST APIs", "WebSockets / Real-time", "SQLite", "Embedded Systems"] },
  { group: "Applied ML & Security", items: ["Computer Vision (YOLOv8)", "Penetration Testing", "Network Security", "Cloud Computing"] },
];

const recognition = [
  {
    title: "IBM Best Project Award",
    detail: "Awarded 'Best Project' in a corporate industry training program with IBM, selected among all participants.",
    link: "https://www.linkedin.com/posts/itsaddyon_ibm-ritroorkee-greyhats-activity-7461032336206405632-oOh_",
    image: "/images/rec-ibm.png",
  },
  {
    title: "National-Level Project Competition — VIT Pune",
    detail: "IRIS selected and presented at a national-level competition hosted by VIT Pune.",
    link: "https://www.linkedin.com/posts/itsaddyon_teamgreyhats-iris-vitpune-activity-7475183234570559489-MpPt",
    image: "/images/rec-vit.png",
  },
  {
    title: "Institutional Hackathon Champion",
    detail: "24-hour format, first place among all competing teams, with Team Grey Hats.",
    link: "https://www.linkedin.com/posts/itsaddyon_24hourchallenge-teamgreyhats-medibridge-activity-7398280976780607488-bsrq",
    image: "/images/rec-hackathon.png",
  },
  {
    title: "GeeksforGeeks × RIT Hackathon Winner",
    detail: "First place, GFG x RIT hackathon, with Team Grey Hats.",
    link: "https://www.linkedin.com/posts/itsaddyon_hackathonjourney-gfgxrit-greyhats-activity-7398821844549656576-Ow0w",
    image: "/images/rec-gfg.png",
  },
  {
    title: "Google Developers Group Hackathon Winner",
    detail: "Recognized by Google Developer Groups for technical execution.",
    link: "https://www.linkedin.com/posts/itsaddyon_hackathon-techsprint-greyhats-activity-7452050847892668416-pYyJ",
    image: "/images/rec-gdg.png",
  },
  {
    title: "National Innovation Showcase — APNIRAIL",
    detail: "Contributed to APNIRAIL, showcased at a Prime Minister–level national platform.",
    link: "https://www.linkedin.com/posts/itsaddyon_apnirail-aioptimization-indianrailways-activity-7393475804258738176-lSGO",
    image: "/images/rec-apnirail.png",
  },
];

const experience = [
  {
    role: "Front-End AI Engineering Intern",
    org: "FlyRank AI",
    period: "2026 — Present",
    detail: "Applying my engineering skills to real AI products by building scalable React.js interfaces for a US-based startup.",
  },
  {
    role: "Tech Lead",
    org: "GDGoC RIT (Google Developer Groups on Campus)",
    period: "2025 — Present",
    detail: "Organizing and Hosting Technical Events under Google Developers Group",
    link: "https://gdg.community.dev/u/mzwsvd/#/about",
    image: "/images/rec-gdg.png",
  },
  {
    role: "Project Lead & Backend Developer",
    org: "Team Grey Hats",
    period: "2025 — Present",
    detail: "Led the team behind IRIS, MediBridge, AEGIS, and SidekickAI across national and institutional hackathons.",
  },
];

const certifications = [
  {
    title: "Certificate for the Completion of C Training",
    issuer: "IIT Bombay",
    link: "https://www.linkedin.com/in/itsaddyon/overlay/Certifications/1536176586/treasury/?profileId=ACoAAFYr2oEBK7FdxJfbkTgnmDF8w3Fd7KRsuUQ&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B7r1T%2FehSTtWFVr%2FVooEuDA%3D%3D",
    pdf: "/certs/cert-c-iitbombay.pdf",
  },
  {
    title: "Certificate of Completion in Cyber Security",
    issuer: "Google Developers Launchpad",
    link: "https://www.linkedin.com/in/itsaddyon/overlay/Certifications/1535917195/treasury/?profileId=ACoAAFYr2oEBK7FdxJfbkTgnmDF8w3Fd7KRsuUQ&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B7r1T%2FehSTtWFVr%2FVooEuDA%3D%3D",
    pdf: "/certs/cert-cyber-security.pdf",
  },
  {
    title: "Google Cloud Skills Badge",
    issuer: "Google Cloud Skills Boost",
    link: "https://www.skills.google/public_profiles/10446922-9a4b-45fa-9217-1132560e2c80",
    pdf: null,
    image: "/images/google-cloud-skills.png",
  },
  {
    title: "Certificate of Excellence in Advanced Hacking",
    issuer: "Google Developers Launchpad",
    link: "https://www.linkedin.com/in/itsaddyon/overlay/Certifications/1536028762/treasury/?profileId=ACoAAFYr2oEBK7FdxJfbkTgnmDF8w3Fd7KRsuUQ&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B7r1T%2FehSTtWFVr%2FVooEuDA%3D%3D",
    pdf: "/certs/cert-advanced-hacking.pdf",
  },
  {
    title: "Certificate of Completion in Python Programming",
    issuer: "Google Developers Launchpad",
    link: "https://www.linkedin.com/in/itsaddyon/overlay/Certifications/1535311154/treasury/?profileId=ACoAAFYr2oEBK7FdxJfbkTgnmDF8w3Fd7KRsuUQ&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B7r1T%2FehSTtWFVr%2FVooEuDA%3D%3D",
    pdf: "/certs/cert-python.pdf",
  },
  {
    title: "Certificate of Completion in Ethical Hacking",
    issuer: "Google Developers Launchpad",
    link: "https://www.linkedin.com/in/itsaddyon/overlay/Certifications/1535652524/treasury/?profileId=ACoAAFYr2oEBK7FdxJfbkTgnmDF8w3Fd7KRsuUQ&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B7r1T%2FehSTtWFVr%2FVooEuDA%3D%3D",
    pdf: "/certs/cert-ethical-hacking.pdf",
  },
  {
    title: "Certificate of Excellence in C Programming",
    issuer: "Google Developers Launchpad",
    link: "https://www.linkedin.com/in/itsaddyon/overlay/Certifications/1534539650/treasury/?profileId=ACoAAFYr2oEBK7FdxJfbkTgnmDF8w3Fd7KRsuUQ&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B7r1T%2FehSTtWFVr%2FVooEuDA%3D%3D",
    pdf: "/certs/cert-c-programming.pdf",
  },
] as const;

/**
 * Homepage: hero, then the work index. Each row in the index links to
 * its own case-study route under /work/[slug].
 */
export default function Home() {
  return (
    <PageShell>
      <Hero />

      <section id="about" className="px-6 md:px-10 pt-28 md:pt-40 pb-20 md:pb-28">
        <SectionStage>
          <div className="mx-auto max-w-editorial grid md:grid-cols-[auto_1fr] gap-6 md:gap-16">
            <h2 className="font-display text-2xl md:text-3xl text-gold font-normal tracking-wide">About</h2>
            <div className="space-y-8 max-w-prose">
              <RevealText as="p" className="type-subhead text-lg md:text-xl leading-relaxed">
                A résumé lists what I've done. This space exists to prove what I can actually build.<br></br><br></br>
                Hey! I'm a 2nd Year B.Tech Computer Science student at Roorkee Institute of Technology. My work sits at the intersection of applied machine learning, systems engineering, and real-world deployment — building infrastructure that operates under constraint: intermittent connectivity, embedded hardware, multi-role access control, and latency requirements that don&apos;t bend.
              </RevealText>
              <RevealText
                as="p"
                delay={0.1}
                className="type-subhead text-lg md:text-xl leading-relaxed"
              >
                I don't measure progress by the number of projects I've built, but by the problems they've solved.<br></br>

                <br></br>

                Outside of writing code, I lead developer communities, mentor teams, and spend an unhealthy amount of time asking one question:<br></br>

                <br></br><b>"Can this be built better?"</b><br></br><br></br>

                That's the question that drives everything I create.
              </RevealText>
            </div>
          </div>
        </SectionStage>
      </section>

      <section className="px-6 md:px-10 pb-28 md:pb-40">
        <SectionStage>
          <div className="mx-auto max-w-editorial grid md:grid-cols-[auto_1fr] gap-6 md:gap-16">
            <h2 className="font-display text-2xl md:text-3xl text-gold font-normal tracking-wide">Philosophy</h2>
            <div className="space-y-8 max-w-prose">
              <RevealText as="p" className="type-subhead text-lg md:text-xl leading-relaxed">
                I never start with a programming language.<br></br>

                <br></br>I start with a problem.<br></br>
                <br></br>
                Every project begins by understanding what's broken, why it matters, and who it affects. Only then do I decide what to build and which tools deserve a place in the solution.<br></br>

                <br></br>Whether it's designing AI that understands roads, improving healthcare accessibility, or building secure full-stack systems, I care more about solving the right problem than using the newest technology.<br></br>
                <br></br>
                I build software that people can trust, maintain, and grow—not software that's impressive for a single demonstration.<br></br><br></br>
              </RevealText>
              <RevealText
                as="p"
                delay={0.1}
                className="type-subhead text-lg md:text-xl leading-relaxed"
              >
                Each project here was independently architected, engineered, and shipped — spanning the full stack from ML pipeline tuning and real-time WebSocket infrastructure to PyInstaller packaging and Firebase security rule design. <br></br><br></br>
                <b>"I write software I intend to maintain, not prototypes staged for a demo."</b>

              </RevealText>
            </div>
          </div>
        </SectionStage>
      </section>

      <section id="status" className="px-6 md:px-10 pb-20 md:pb-28 border-t border-line pt-20 md:pt-28">
        <SectionStage>
          <div className="mx-auto max-w-editorial grid md:grid-cols-[auto_1fr] gap-6 md:gap-16">
            <h2 className="font-display text-2xl md:text-3xl text-gold font-normal tracking-wide">Status</h2>
            <div className="space-y-6 max-w-prose">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold/40 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
                </span>
                <span className="type-label text-gold-bright font-semibold tracking-widest uppercase text-[10px]">Currently working on</span>
              </div>
              <RevealText as="p" className="type-subhead text-lg md:text-xl leading-relaxed text-ink-muted">
                Currently drafting a research paper for <strong className="text-ink font-semibold">IRIS</strong> (Intelligent Road Inspection System), detailing its real-time computer vision pipeline and municipal review workflow. The project is open-access and published on Zenodo (<a href="https://doi.org/10.5281/zenodo.20868862" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-bright transition-colors duration-300 border-b border-gold/40 pb-0.5">doi.org/10.5281/zenodo.20868862</a>). Simultaneously, building user interfaces for AI products as a Front-End AI Engineering Intern at <strong className="text-ink font-semibold">FlyRank AI</strong>.
              </RevealText>
            </div>
          </div>
        </SectionStage>
      </section>

      <section id="work" className="px-6 md:px-10 pb-28 md:pb-40 border-t border-line pt-20 md:pt-28">
        <SectionStage>
          <div className="mx-auto max-w-editorial">
            <RevealText as="h2" className="font-display text-3xl md:text-4xl text-gold font-normal tracking-wide mb-16">
              Selected Work
            </RevealText>
            <WorkIndex projects={projects} />
          </div>
        </SectionStage>
      </section>

      <section id="experience" className="px-6 md:px-10 pb-28 md:pb-40 border-t border-line pt-20 md:pt-28">
        <SectionStage>
          <div className="mx-auto max-w-editorial">
            <RevealText as="h2" className="font-display text-3xl md:text-4xl text-gold font-normal tracking-wide mb-16">
              Experience
            </RevealText>
            <ExperienceIndex items={experience} />
          </div>
        </SectionStage>
      </section>

      <section id="recognition" className="px-6 md:px-10 pb-28 md:pb-40">
        <SectionStage>
          <div className="mx-auto max-w-editorial">
            <RevealText as="h2" className="font-display text-3xl md:text-4xl text-gold font-normal tracking-wide mb-16">
              Recognition
            </RevealText>
            <RecognitionIndex items={recognition} />
          </div>
        </SectionStage>
      </section>

      <section className="px-6 md:px-10 pb-28 md:pb-40 border-t border-line pt-20 md:pt-28">
        <SectionStage>
          <div className="mx-auto max-w-editorial">
            <RevealText as="h2" className="font-display text-3xl md:text-4xl text-gold font-normal tracking-wide mb-16">
              Certifications
            </RevealText>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {certifications.map((cert, i) => (
                <RevealText key={cert.title} delay={i * 0.06}>
                  <CertificateCard cert={cert} />
                </RevealText>
              ))}
            </div>
          </div>
        </SectionStage>
      </section>

      <section id="capabilities" className="px-6 md:px-10 pb-28 md:pb-40 border-t border-line pt-20 md:pt-28">
        <SectionStage>
          <div className="mx-auto max-w-editorial">
            <RevealText as="h2" className="font-display text-3xl md:text-4xl text-gold font-normal tracking-wide mb-16">
              Capabilities
            </RevealText>
            <CapabilitiesGrid capabilities={capabilities} />
          </div>
        </SectionStage>
      </section>

      <section className="px-6 md:px-10 pb-28 md:pb-40 border-t border-line pt-20 md:pt-28">
        <SectionStage>
          <div className="mx-auto max-w-editorial">
            <GitHubActivity username="itsaddyon" />
          </div>
        </SectionStage>
      </section>
    </PageShell>
  );
}

