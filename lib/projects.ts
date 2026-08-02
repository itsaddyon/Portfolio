/**
 * Case study content, sourced directly from each project's own documentation
 * (READMEs in D:\Btech Projects). No invented metrics or achievements —
 * anything quantitative here is the project's own documented figure.
 */

export type Project = {
  slug: string;
  name: string;
  accent: "iris" | "medibridge" | "sidekick" | "aegis";
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
      "Per IRIS's own benchmark documentation: 94.3% detection accuracy against 17,497 training images, sub-1-second response time, and a 5.7% false-positive rate — measured against a manual baseline of 60–80% accuracy and 10–30 minute response times. Currently drafting a research paper detailing the model architecture, published as a pre-print on Zenodo.",
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
    slug: "sidekick",
    name: "SidekickAI",
    accent: "sidekick",
    tagline: "Private Chat & Vibe Check",
    summary:
      "A real-time chat app built around a simple premise: the developer shouldn't be able to read your conversation either.",
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
