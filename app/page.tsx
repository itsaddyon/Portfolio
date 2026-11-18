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
import { ExperienceIndex, type ExperienceItem } from "@/components/home/ExperienceIndex";
import { projects } from "@/lib/projects";

const capabilities = [
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "Java", "C"] },
  { group: "Frameworks", items: ["React", "Next.js", "Node.js", "Flask", "Tailwind CSS"] },
  { group: "Systems & Data", items: ["Firebase", "REST APIs", "WebSockets / Real-time", "SQLite", "Embedded Systems"] },
  { group: "Applied ML & Security", items: ["Computer Vision (YOLOv8)", "Penetration Testing", "Network Security", "Cloud Computing"] },
];

const recognition = [
  {
    title: "Best Paper Award — IIRA 6.0 International Conference",
    detail: "Awarded Best Paper for research paper 'IRIS: Intelligent Road Inspection System — A Real-Time Edge-AI Platform for Pothole Detection, Severity Classification, and Human-in-the-Loop Municipal Reporting' at IIRA 6.0 (MIT Moradabad).",
    link: "https://www.linkedin.com/posts/itsaddyon_iira60-research-edgeai-ugcPost-7518270230821830656-Ln78/",
    image: "/images/rec-iira.png",
  },
  {
    title: "Project IRIS Showcase — Hon'ble CM Shri Pushkar Singh Dhami Ji",
    detail: "Demonstrated IRIS's real-time edge AI pothole detection and automated municipal road inspection system directly to the Chief Minister of Uttarakhand, Shri Pushkar Singh Dhami Ji, at the CII 7th Industrial Expo in Haridwar.",
    link: "https://www.facebook.com/share/v/1EWzQgTE8Y/",
    image: "/images/rec-cm-dhami.png",
  },
  {
    title: "AI Manthan Champion — Team Grey Hats",
    detail: "First place and champion trophy at AI Manthan with IRIS, organized collaboratively by GDGoC, AWS SBG, IEEE Student Branch, and Dept of CSE at RIT Roorkee.",
    link: "https://www.linkedin.com/posts/itsaddyon_aimanthan-greyhats-ritroorkee-ugcPost-7511485993393381376-2FIa/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFYr2oEBK7FdxJfbkTgnmDF8w3Fd7KRsuUQ",
    image: "/images/rec-aimanthan.png",
  },
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

const experience: ExperienceItem[] = [
  {
    role: "Google Student Ambassador",
    org: "Google",
    period: "Nov 2026 - Present",
    detail: "I have been appointed as Google Student Ambassador in November 2026. Selected among highly competitive candidates and been managing the responsibilities for the Google Student Ambassador. GID: 15562",
    link: "https://www.linkedin.com/posts/itsaddyon_teamgemini-googlestudentambassador-gsa2026-share-7526252797575487488-Yk90/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFYr2oEBK7FdxJfbkTgnmDF8w3Fd7KRsuUQ",
    image: "/images/gsa.png",
    badge: { label: "Google Student Ambassador", text: "🏆", bg: "#eea239ff" },
    subLinks: [
      {
        label: "GSA Post",
        link: "https://www.linkedin.com/posts/itsaddyon_teamgemini-googlestudentambassador-gsa2026-share-7526252797575487488-Yk90/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFYr2oEBK7FdxJfbkTgnmDF8w3Fd7KRsuUQ",
      },
    ],
  },
  {
    role: "Lead Researcher & Paper Author",
    org: "IRIS Project · IIRA 6.0",
    period: "Sep 2026",
    detail: "Authored and presented peer-reviewed research on 'IRIS: Intelligent Road Inspection System — A Real-Time Edge-AI Platform for Pothole Detection, Severity Classification, and Human-in-the-Loop Municipal Reporting' at the IIRA 6.0 International Conference (MIT Moradabad), winning the Best Paper Award. Research published on Zenodo.",
    link: "https://www.linkedin.com/posts/itsaddyon_iira60-research-edgeai-ugcPost-7518270230821830656-Ln78/",
    image: "/images/rec-iira.png",
    badge: { label: "Best Paper Award", text: "🏆", bg: "#C5A880" },
    subLinks: [
      {
        label: "Best Paper Award Post",
        link: "https://www.linkedin.com/posts/itsaddyon_iira60-research-edgeai-ugcPost-7518270230821830656-Ln78/",
      },
      {
        label: "Zenodo Publication",
        link: "https://doi.org/10.5281/zenodo.20868862",
      },
    ],
  },
  {
    role: "Front-End AI Engineering Intern",
    org: "FlyRank AI",
    period: "July 2026 — Sep 2026",
    detail: "Completed an intensive Front-End AI Engineering program for a US-based startup. Built scalable React.js architectures across 10 production assignments covering site foundations, responsive storefront patterns, AI implementation QA, and a capstone AI product. Awarded completion certificate and Letter of Recommendation from Founder & CEO Alen Malkoč.",
    link: "https://www.linkedin.com/posts/itsaddyon_flyrank-ai-internship-completion-certificate-ugcPost-7502807383627173888-0uDe/",
    image: "/images/exp-flyrank.png",
    badge: { label: "FlyRank AI", text: "in", bg: "#0A66C2" },
    subLinks: [
      {
        label: "Completion Certificate",
        link: "https://www.linkedin.com/posts/itsaddyon_flyrank-ai-internship-completion-certificate-ugcPost-7502807383627173888-0uDe/",
      },
      {
        label: "Recommendation Letter",
        link: "https://www.linkedin.com/posts/itsaddyon_recommendation-letter-ugcPost-7506775642198208512-kVCD/",
      },
    ],
  },
  {
    role: "Tech Lead",
    org: "GDGoC RIT (Google Developer Groups on Campus)",
    period: "Jan 2026 — Present",
    detail: "Organizing and hosting technical events, leading developer tracks, and architecting community web infrastructure under Google Developers Group.",
    link: "https://gdg.community.dev/u/mzwsvd/#/about",
    image: "/images/rec-gdg.png",
    subLinks: [
      {
        label: "GDGoC RIT Platform",
        link: "https://gdgrit.vercel.app",
      },
    ],
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
    title: "Best Paper Award at IIRA 6.0",
    issuer: "6th International Conference on \"Innovation in IoT, Research and Automations (IIRA 6.0)\" (MIT Moradabad)",
    link: "https://www.linkedin.com/in/itsaddyon/overlay/Certifications/1860882622/treasury/?profileId=ACoAAFYr2oEBK7FdxJfbkTgnmDF8w3Fd7KRsuUQ&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B1ACTlEODQ1mtn6L1MYj%2BqQ%3D%3D",
    pdf: "/certs/cert-bp.pdf",
  },
  {
    title: "Internship Completion Certificate",
    issuer: "FlyRank AI",
    link: "https://www.linkedin.com/in/itsaddyon/overlay/Certifications/2102964816/treasury/?profileId=ACoAAFYr2oEBK7FdxJfbkTgnmDF8w3Fd7KRsuUQ&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BrTqvYtYRT3uaR4NpOha7Hw%3D%3D",
    pdf: "/certs/flyrank-completion-certificate.pdf",
  },
  {
    title: "Letter of Recommendation",
    issuer: "FlyRank AI",
    link: "https://www.linkedin.com/in/itsaddyon/overlay/Certifications/901129827/treasury/?profileId=ACoAAFYr2oEBK7FdxJfbkTgnmDF8w3Fd7KRsuUQ&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BrTqvYtYRT3uaR4NpOha7Hw%3D%3D",
    pdf: "/certs/recommendation.pdf",
  },
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
    title: "First paper published while in 2nd year on IRIS",
    issuer: "6th International Conference on \"Innovation in IoT, Research and Automations (IIRA 6.0)\" (MIT Moradabad)",
    link: "https://www.linkedin.com/in/itsaddyon/overlay/Certifications/1860882622/treasury/?profileId=ACoAAFYr2oEBK7FdxJfbkTgnmDF8w3Fd7KRsuUQ&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BrTqvYtYRT3uaR4NpOha7Hw%3D%3D",
    pdf: "/certs/research-paper.pdf",
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
                <span className="type-label text-gold-bright font-semibold tracking-widest uppercase text-[10px]">Active Focus & Research</span>
              </div>
              <RevealText as="p" className="type-subhead text-lg md:text-xl leading-relaxed text-ink-muted">
                Recently presented and published research for <strong className="text-ink font-semibold">IRIS</strong> (Intelligent Road Inspection System) at the <strong className="text-ink font-semibold">IIRA 6.0</strong> International Conference (MIT Moradabad), winning the <span className="text-gold font-medium">Best Paper Award</span> for real-time edge computer vision and human-in-the-loop municipal reporting (<a href="https://doi.org/10.5281/zenodo.20868862" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-bright transition-colors duration-300 border-b border-gold/40 pb-0.5">Zenodo</a> · <a href="https://www.linkedin.com/posts/itsaddyon_iira60-research-edgeai-ugcPost-7518270230821830656-Ln78/" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-bright transition-colors duration-300 border-b border-gold/40 pb-0.5">Paper Award</a>).
              </RevealText>
              <RevealText as="p" delay={0.08} className="type-subhead text-lg md:text-xl leading-relaxed text-ink-muted">
                Currently engineering a brand-new, scaled architecture of <strong className="text-ink font-semibold">Sidechicks</strong> (SidekickAI v2) to support expanding user scale with distributed real-time sync. Concurrently developing <strong className="text-ink font-semibold">UNVEIL-AI</strong> (<em>Unified Network for Veiled-actor Evidence & Identity Linking</em>) for Smart India Hackathon (<span className="text-gold">PS: SIH26151</span> / NTRO) — an intelligence graph and probabilistic attribution platform for dark-web threat actors (<a href="https://github.com/itsaddyon/UNVEIL-AI" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-bright transition-colors duration-300 border-b border-gold/40 pb-0.5">GitHub</a>).
              </RevealText>
              <RevealText as="p" delay={0.14} className="type-subhead text-lg md:text-xl leading-relaxed text-ink-muted">
                Also actively researching cognitive architectures, developmental thought processes, and psychological dynamics in AI and AGI — with daily observations and reflections synthesized and published autonomously by an AI agent on <a href="https://itsaddyon.github.io/human-nature" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-bright transition-colors duration-300 border-b border-gold/40 pb-0.5">Human Nature</a>.
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

