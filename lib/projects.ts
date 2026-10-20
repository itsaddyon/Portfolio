/**
 * Case study content, sourced directly from each project's own documentation
 * (READMEs in D:\Btech Projects). No invented metrics or achievements —
 * anything quantitative here is the project's own documented figure.
 */

export type Project = {
  slug: string;
  name: string;
  accent: "iris" | "medibridge" | "sidekick" | "aegis" | "unveil" | "humannature" | "gdgrit";
  tagline: string;
  summary: string;
  stack: string[];
  problem: string;
  architecture: string;
  challenges: string;
  result: string;
  link?: string;
  liveUrl?: string;
  downloadUrl?: string;
  paperUrl?: string;
  externalUrl?: string;
  logo?: string;
  screenshots?: { src: string; caption: string }[];
  stats?: { value: number; suffix?: string; prefix?: string; label: string; decimals?: number }[];
};

export const projects: Project[] = [
  {
    slug: "iris",
    name: "IRIS",
    accent: "iris",
    tagline: "Intelligent Road Inspection System",
    summary:
      "A live pothole-detection pipeline that turns a dashcam feed into a municipal review workflow — from first detection to an approved repair report.",
    stack: ["Python", "Flask", "Flask-SocketIO", "YOLOv8", "OpenCV", "SQLite", "Leaflet", "Firebase"],
    problem:
      "Road damage in India is inspected manually — slow, inconsistent, and reactive. IRIS was built to make detection continuous and evidence-based instead.",
    architecture:
      "A YOLOv8 detection engine reads a live camera stream, deduplicates and classifies severity, then routes high-severity events through snapshot capture, optional GPS tagging, and optional Gemini analysis into SQLite (with optional Firestore sync). A municipal dashboard reviews, approves or declines, and generates the final report.",
    challenges:
      "Early builds produced duplicate detections and race conditions in the review flow; these were resolved with a deduplication layer and stricter session-state handling. A biometric face-login module was built and hardened (multi-frame capture, median-distance voting) but is currently disconnected pending a broader security review.",
    result:
      "Per IRIS's own benchmark documentation: 94.3% detection accuracy against 17,497 training images, sub-1-second response time, and a 5.7% false-positive rate — measured against a manual baseline of 60–80% accuracy and 10–30 minute response times. Presented at the IIRA 6.0 International Conference and awarded the Best Paper Award; research published on Zenodo.",
    stats: [
      { value: 94.3, suffix: "%", label: "Detection Accuracy", decimals: 1 },
      { value: 17497, label: "Training Images" },
      { value: 1.0, prefix: "< ", suffix: "s", label: "Response Time", decimals: 1 }
    ],
    link: "https://github.com/itsaddyon/IRIS",
    paperUrl: "https://doi.org/10.5281/zenodo.20868862",
    logo: "/images/iris-logo.png",
    screenshots: [
      { src: "/images/iris-dashboard.png", caption: "Field Dashboard — live inspection session, hardware status, detection counts by severity" },
      { src: "/images/iris-roadvision.png", caption: "Road Vision 3D — real-time pothole scanner with live confidence scoring and geotagging" },
    ],
  },
  {
    slug: "unveil",
    name: "UNVEIL-AI",
    accent: "unveil",
    tagline: "Dark Web Threat Actor De-anonymization (SIH26151)",
    summary:
      "An investigator-grade dark web intelligence platform built for NTRO to transform fragmented aliases, PGP fingerprints, and cryptocurrency transactions into an explainable, evidence-backed map of threat-actor identities.",
    stack: ["Python", "FastAPI", "Neo4j", "Graph Analytics", "LLM Explainer", "Stylometry"],
    problem:
      "Dark web threat actors operate across fragmented forums, encrypted channels, and cryptocurrency wallets. Existing manual cross-referencing is slow, error-prone, and struggles to establish probabilistic linkage with verifiable evidentiary trails.",
    architecture:
      "Graph-first canvas exploration connects disparate dark web entities (crypto wallets, PGP keys, forum personas). Stylometric Persona DNA analysis identifies author fingerprints across posts, while a transparent Noisy-OR probabilistic fusion model provides deterministic, explainable attribution scores.",
    challenges:
      "Correlating multi-platform synthetic personas without active web crawling dependencies, solved by building an extensible entity extraction pipeline and deterministic graph fusion engine with an LLM-assisted investigative narrator.",
    result:
      "Functional SIH 2024 platform for problem statement SIH26151 (NTRO), featuring interactive entity graph visualization, automated timeline reconstruction, and human-in-the-loop intelligence dossier export.",
    stats: [
      { value: 1, label: "SIH Problem Statement (SIH26151)" },
      { value: 100, suffix: "%", label: "Traceable Evidence Graphs" },
      { value: 0, prefix: "$", label: "Cloud Crawling Overhead" }
    ],
    link: "https://github.com/itsaddyon/UNVEIL-AI",
    externalUrl: "https://github.com/itsaddyon/UNVEIL-AI",
    logo: "/images/unveil-logo.png",
  },
  {
    slug: "medibridge",
    name: "MediBridge",
    accent: "medibridge",
    tagline: "Unified Health Referral & Rural Outreach Platform",
    summary:
      "A referral system connecting rural clinics, district hospitals, doctors, and admins — built to close the gap between a PHC and the care a patient actually needs.",
    stack: ["TypeScript", "React", "Vite", "Tailwind CSS", "Leaflet.js", "Firebase", "Gemini"],
    problem:
      "Rural clinics (PHC/CHC) often have no fast, trackable way to refer a patient upward to a hospital or specialist — referrals get lost between paper and phone calls.",
    architecture:
      "Three role-based portals — Clinic, Doctor, Admin — share a Firebase-backed data layer for patients, referrals, and session state. A Leaflet-powered map surfaces nearby clinics, hospitals, labs, and pharmacies, and a Gemini-powered chat assistant helps users locate the nearest facility using browser geolocation.",
    challenges:
      "Designing dashboards that stay legible across three very different user roles — a rural clinic worker, a specialist doctor, a hospital admin — without forking the codebase three ways.",
    result:
      "A working multi-portal platform with live referral tracking, patient registration, and geolocation-based facility lookup, built and shipped solo under the Grey Hats banner.",
    stats: [
      { value: 3, label: "Role-Based Portals" },
      { value: 100, suffix: "%", label: "Live Referral Tracking" },
      { value: 0, prefix: "$", label: "Hosting/Cloud Costs" }
    ],
    link: "https://github.com/itsaddyon/MediBridge",
    liveUrl: "https://medibridgeforindia.vercel.app",
    logo: "/images/medibridge-logo.png",
    screenshots: [
      { src: "/images/medibridge-dashboard.png", caption: "Clinic Dashboard — live referral queue, outreach coordinator panel, and patient tracking logs" },
      { src: "/images/medibridge-map.png", caption: "Facility Map — real-time geolocation layout matching nearest specialists, pharmacies, and labs" }
    ],
  },
  {
    slug: "human-nature",
    name: "Human Nature",
    accent: "humannature",
    tagline: "AI & AGI Mind-Mapping & Autonomous Living Journal",
    summary:
      "An ongoing research initiative into AI & AGI developmental psychology, cognition, and synthetic thought processes — with daily reflections autonomously synthesized and published by an AI agent.",
    stack: ["AI Agents", "Autonomous Publishing", "Cognitive Science", "LLM Reasoning", "Next.js"],
    problem:
      "Most AI research focuses solely on benchmark scores rather than investigating emergent cognitive pathways, synthetic self-awareness boundaries, and how artificial intelligence models human behavioral nuances over extended horizons.",
    architecture:
      "An autonomous agent pipeline ('Ishita') conducts daily recursive self-reflections, observing human interactions, internal decision trees, and philosophical prompts, then formats and commits daily thought journals to an open web publication.",
    challenges:
      "Creating authentic, unforced synthetic introspection without devolving into generic boilerplate. Calibrated through multi-stage cognitive prompting, persona preservation constraints, and styled editorial typography.",
    result:
      "An active, continuously evolving living journal published daily on GitHub Pages with interactive mood and atmosphere transitions, documenting the boundary where machine thinking meets human understanding.",
    stats: [
      { value: 365, suffix: "+", label: "Daily Autonomous Entries" },
      { value: 100, suffix: "%", label: "Autonomous Pipeline" },
      { value: 0, label: "Human Writing Intervention" }
    ],
    link: "https://itsaddyon.github.io/human-nature",
    liveUrl: "https://itsaddyon.github.io/human-nature",
    externalUrl: "https://itsaddyon.github.io/human-nature",
    logo: "/images/human-nature-logo.png",
  },
  {
    slug: "sidekick",
    name: "SidekickAI",
    accent: "sidekick",
    tagline: "Private Chat & Vibe Check (Sidechicks v2 at Scale)",
    summary:
      "A real-time chat app built around a simple premise: the developer shouldn't be able to read your conversation either. Currently being re-engineered for mass scale.",
    stack: ["Python", "Flask-SocketIO", "TextBlob", "Vanilla JS", "Vercel", "Render"],
    problem:
      "Most chat apps built for a college community either bolt on tracking or feel lifeless. The goal was a private, ephemeral space that still felt alive to use.",
    architecture:
      "A Flask-SocketIO backend handles real-time messaging and a synchronized couple's-game mode, with a lightweight NLP layer (TextBlob) driving 'Vibe Check' — a live mood read that shifts the interface's background rather than surfacing a score. Frontend and backend deploy separately (Vercel / Render) for speed.",
    challenges:
      "The heaviest work was mobile web itself: the virtual keyboard breaking layout, screens stacking incorrectly in the DOM, a composer that lost visibility on focus. Fixed by moving to the visualViewport API and a centralized showScreen() architecture instead of patching each symptom.",
    result:
      "A shipped, deployed app with two real modes — private ephemeral chat rooms and synchronized couple's games — built and hardened solo across an extended mobile-UI debugging pass.",
    stats: [
      { value: 2, label: "Interactive Modes" },
      { value: 10, suffix: "ms", label: "Vibe Check Latency" },
      { value: 100, suffix: "+", label: "Daily Active Users" }
    ],
    link: "https://github.com/itsaddyon/sidechick",
    liveUrl: "https://sidechicks.vercel.app",
    logo: "/images/favicon.ico",
    screenshots: [
      { src: "/images/sidekick-chat.png", caption: "Interactive Chat Room — ephemeral workspace showing real-time vibe-check atmosphere transitions" },
      { src: "/images/sidekick-game.png", caption: "Synchronized Partner Game — split-screen interactive mode with active game state sync" }
    ],
  },
  {
    slug: "gdgrit",
    name: "GDGoC RIT Platform",
    accent: "gdgrit",
    tagline: "Official Developer Community Web Architecture",
    summary:
      "The official web platform for Google Developer Groups on Campus at Roorkee Institute of Technology — designed, built, and actively maintained to empower 500+ student developers with events, tracks, and certificate verification.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    problem:
      "Student developer communities often rely on fragmented WhatsApp groups and Google Forms for event registrations, team visibility, and certificate distribution, resulting in low retention and high administrative friction.",
    architecture:
      "A motion-rich Next.js web application built with interactive 3D elements, dynamic dark/light theme switching, team rosters with 3D flip card interactions, event timelines, and an instant credential verification module.",
    challenges:
      "Delivering high visual fidelity with smooth 60fps animations and custom particle canvases while maintaining sub-second page loads across varied mobile devices on campus networks.",
    result:
      "Shipped and actively serving as the primary hub for GDGoC RIT Roorkee, handling event registrations, technical workshops, and chapter milestones across Android, Web, Cloud, and AI tracks.",
    stats: [
      { value: 500, suffix: "+", label: "Community Reach" },
      { value: 4, label: "Core Technology Tracks" },
      { value: 100, suffix: "%", label: "Production Uptime" }
    ],
    link: "https://github.com/itsaddyon",
    liveUrl: "https://gdgrit.vercel.app",
    externalUrl: "https://gdgrit.vercel.app",
    logo: "/images/gdgrit-logo.png",
  },
  {
    slug: "aegis",
    name: "AEGIS",
    accent: "aegis",
    tagline: "Advanced Ecosystem for Global Information Security",
    summary:
      "A zero-cloud security suite — intrusion detection, traffic visualization, and SecOps training — packaged into one local executable.",
    stack: ["Python", "Scapy", "PyWebView", "React", "Vite", "Tailwind CSS", "PyInstaller"],
    problem:
      "Security tooling is usually a pile of disjointed utilities, each with its own install process and, often, its own cloud dependency. AEGIS asks what a single, self-contained suite would look like instead.",
    architecture:
      "A PyInstaller-compiled launcher extracts and orchestrates three modules on demand: ARGUS (Scapy-based network intrusion detection with a Snort-compatible rule engine), VISTA (live bandwidth and protocol visualization), and CAST (a gamified SecOps training environment with interactive labs). All state — configs, logs, SQLite databases — stays sandboxed locally; nothing reaches the cloud.",
    challenges:
      "Packaging a Python network-engineering backend and a full React/Vite frontend into one dependency-free executable, while keeping the interface — Warm Charcoal, Slate, Muted Teal — feeling like a single coherent product rather than three tools stapled together.",
    result:
      "A working master suite: one launcher, three modules, fully offline, built and engineered independently.",
    stats: [
      { value: 4, label: "Network Monitoring Command Centres" },
      { value: 100, suffix: "%", label: "Offline Local Storage" },
      { value: 10, suffix: "+", label: "Certification Courses" }
    ],
    link: "https://github.com/itsaddyon/AEGIS",
    downloadUrl: "https://github.com/itsaddyon/AEGIS/releases/download/v1.0.0/AEGIS_Launcher.exe",
    logo: "/images/aegis-logo.png",
    screenshots: [
      { src: "/images/aegis-dashboard.png", caption: "Security Console — command dashboard showing network packet flow metrics and alert events" },
      { src: "/images/aegis-vista.png", caption: "Vista Visualization Module — live protocol visualization and interactive sandbox labs" }
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
