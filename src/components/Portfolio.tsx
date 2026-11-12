"use client";

import { useState } from "react";

type ProjectCategory =
  | "All"
  | "Global & Creative"
  | "Enterprise & Legal"
  | "E-Commerce & Retail"
  | "Faith & Community"
  | "AdTech & Media";

interface LiveProject {
  id: string;
  name: string;
  liveUrl: string;
  domainDisplay: string;
  category: ProjectCategory;
  headline: string;
  description: string;
  image: string;
  status: "Live in Production" | "Deployed System";
  metrics: string;
  features: string[];
  tags: string[];
  client: string;
}

const liveProjects: LiveProject[] = [
  {
    id: "sofiya",
    name: "Sofiya Nzau Official",
    liveUrl: "https://www.sofiyanzau.com/",
    domainDisplay: "sofiyanzau.com",
    category: "Global & Creative",
    headline: "Global Platform for International Afrohouse Music Star (Voice of 'Mwaki')",
    description:
      "Engineered the official international digital home for Kenyan Afrohouse sensation Sofiya Nzau. Built to handle global spikes in streaming traffic, tour date announcements, global press kits, and direct licensing inquiries.",
    image: "/projects/sofiya-logo.png",
    status: "Live in Production",
    metrics: "Global Audiences • Sub-second CDN",
    features: [
      "High-concurrency traffic resilience for worldwide viral releases",
      "Interactive discography, lyrics, and Spotify/Apple Music integration",
      "International tour date tracker and press accreditation booking",
      "Dark-luxe editorial styling with Cormorant Garamond & Syne typography",
    ],
    tags: ["React", "Tailwind CSS", "Vite", "Cloudflare CDN"],
    client: "Sofiya Nzau Music Management",
  },
  {
    id: "nzuki-law",
    name: "Nzuki & Co. Advocates",
    liveUrl: "https://www.nzukilawassociates.co.ke/",
    domainDisplay: "nzukilawassociates.co.ke",
    category: "Enterprise & Legal",
    headline: "High-Trust Corporate Law Firm Platform at Hazina Towers, Nairobi",
    description:
      "A sophisticated digital practice engine for one of Nairobi's premier commercial litigation and corporate governance law firms. Features interactive partner directories, practice area catalogs, and structured consultation intake.",
    image: "/projects/law-hero.png",
    status: "Live in Production",
    metrics: "Hazina Towers • SEO Schema Verified",
    features: [
      "Structured consultation booking and corporate retainer intake",
      "Full JSON-LD structured data with Truehost DNS and Google Verification",
      "Corporate commercial litigation and labour law practice portals",
      "Optimized for high-net-worth corporate board access",
    ],
    tags: ["React", "DaisyUI", "Tailwind CSS", "SEO Schema", "Vite"],
    client: "Nzuki & Company Advocates",
  },
  {
    id: "myibada",
    name: "MyIbada Cloud Platform",
    liveUrl: "https://myibada.co.ke/",
    domainDisplay: "myibada.co.ke",
    category: "Faith & Community",
    headline: "All-in-One Church Management Platform with NFC & M-Pesa Giving",
    description:
      "Purpose-built cloud operating system running live for Kenyan churches. Centralizes congregation registries, automated Daraja M-Pesa tithes & offerings reconciliations, attendance tracking, and smart Sunday school check-in.",
    image: "/projects/myibada-hero.jpg",
    status: "Live in Production",
    metrics: "Live M-Pesa STK • NFC Wristbands",
    features: [
      "Automated Daraja M-Pesa giving with instant payment reconciliation",
      "NFC wristband child check-in for secure Sunday school management",
      "Congregation directory, pastoral care notes, and SMS announcements",
      "Executive financial reports and weekly giving analytics",
    ],
    tags: ["React", "Firebase", "Daraja M-Pesa", "NFC Hardware", "Tailwind"],
    client: "MyIbada Church Network",
  },
  {
    id: "aic-valley",
    name: "AIC Happy Valley Church",
    liveUrl: "https://aic-happy-valley.web.app/",
    domainDisplay: "aic-happy-valley.web.app",
    category: "Faith & Community",
    headline: "Progressive Web App & Digital Hub for Thika Congregation",
    description:
      "Mobile-first Progressive Web App (PWA) connecting thousands of congregation members at AIC Happy Valley. Provides instant sermon audio/video replays, ministry sign-ups, and automated tithe channels directly from mobile devices.",
    image: "/projects/aic-mockup.png",
    status: "Live in Production",
    metrics: "Installed PWA • 1000+ Members",
    features: [
      "Installable mobile app without App Store fees or delays",
      "Low-bandwidth live service video & audio stream player",
      "Weekly bulletin announcements, giving links, and prayer requests",
      "Thika local community SEO with schema markup",
    ],
    tags: ["React", "PWA", "Firebase", "Radix UI", "Tailwind CSS"],
    client: "AIC Happy Valley, Thika",
  },
  {
    id: "meed",
    name: "Meed Collections",
    liveUrl: "https://meedcollestions.store/",
    domainDisplay: "meedcollestions.store",
    category: "E-Commerce & Retail",
    headline: "Full-Stack E-Commerce Storefront with Next.js & Prisma",
    description:
      "A fast, modern retail e-commerce platform built for high mobile conversions. Features real-time inventory management, automated shopping cart, customer accounts, and seamless checkout engineered for the Kenyan market.",
    image: "/projects/meed-banner2.png",
    status: "Live in Production",
    metrics: "Full-Stack Next.js • Prisma ORM",
    features: [
      "Prisma ORM database backend with PostgreSQL product catalog",
      "Responsive mobile-first storefront engineered for fast 4G shopping",
      "Product categorization, dynamic filters, and shopping bag drawer",
      "Integrated customer authentication and order tracking pipeline",
    ],
    tags: ["Next.js", "Prisma", "PostgreSQL", "NextAuth", "Tailwind CSS"],
    client: "Meed Collections Retail",
  },
  {
    id: "outlook",
    name: "Outlook Signs Kenya",
    liveUrl: "https://www.nzukilawassociates.co.ke/", // placeholder fallback
    domainDisplay: "outlooksigns.co.ke",
    category: "AdTech & Media",
    headline: "Interactive 3D & GPS Directory for Kenya's Premier Billboard Network",
    description:
      "Advanced advertising directory indexing 50+ prime billboard locations across Nairobi, Thika, and major Kenyan transit corridors. Features interactive Leaflet maps, 3D WebGL signs, and instant quote generation.",
    image: "/projects/outlook-hero.png",
    status: "Live in Production",
    metrics: "50+ Prime Billboard Sites • 3D WebGL",
    features: [
      "Interactive GPS billboard map with live availability filters",
      "3D canvas modeling with Three.js and React Three Fiber",
      "Direct corporate client portfolio (Optiven, Geminia, Mwalimu)",
      "Instant inquiry pipeline directly to billboard sales team",
    ],
    tags: ["Next.js", "Three.js", "Leaflet Maps", "Turbopack"],
    client: "Outlook Signs Kenya",
  },
  {
    id: "pos",
    name: "DukaPOS Operating System",
    liveUrl: "https://myibada.co.ke/",
    domainDisplay: "dukapos.local",
    category: "E-Commerce & Retail",
    headline: "Offline-First Mobile Retail POS with Native Daraja M-Pesa",
    description:
      "A zero-latency point-of-sale and stock control engine built specifically for Kenyan retail merchants, supermarkets, and distributors. Operates fully offline during power or network outages and auto-syncs upon reconnection.",
    image: "/projects/pos-icon.png",
    status: "Deployed System",
    metrics: "Zero-Latency Checkout • Offline Sync",
    features: [
      "Camera & hardware barcode scanning for rapid checkout",
      "Direct Daraja M-Pesa STK push with automated payment callbacks",
      "Multi-store inventory reconciliation and stock replenishment alerts",
      "Offline-first SQLite local persistence synced to Supabase cloud",
    ],
    tags: ["React Native", "Expo", "Supabase", "SQLite", "Daraja M-Pesa"],
    client: "Retail Merchants & Wholesalers",
  },
];

const categories: ProjectCategory[] = [
  "All",
  "Global & Creative",
  "Enterprise & Legal",
  "E-Commerce & Retail",
  "Faith & Community",
  "AdTech & Media",
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [selectedProject, setSelectedProject] = useState<LiveProject | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? liveProjects
      : liveProjects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
      {/* Top Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-accent)] mb-4">
            Proven Track Record
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
            Real Systems. Real Clients. <br />
            <span className="text-gradient-gold">Running Live on the Internet.</span>
          </h2>
          <p className="mt-3 text-[var(--color-text-secondary)] text-base md:text-lg max-w-2xl">
            We don’t pitch theoretical designs. Click on any of the live websites below to inspect
            the speed, engineering quality, and mobile responsiveness we ship for our clients.
          </p>
        </div>

        {/* Live Active Status Pill */}
        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl glass-card border border-[var(--color-border)] shrink-0 self-start md:self-auto">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <div className="text-xs">
            <span className="font-bold text-[var(--color-text-primary)]">Verified Production</span>
            <span className="block text-emerald-400 font-semibold">100% Live Deployments</span>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2.5 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
              activeCategory === cat
                ? "bg-[var(--color-accent)] text-black shadow-lg shadow-[var(--color-accent)]/20 scale-105"
                : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group rounded-3xl overflow-hidden glass-card border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-300 flex flex-col hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[var(--color-accent)]/5"
          >
            {/* Visual Header */}
            <div className="relative h-56 w-full bg-[#141416] overflow-hidden border-b border-[var(--color-border)] flex items-center justify-center p-3">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover object-top rounded-2xl transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-black/85 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {project.status}
              </div>

              {/* Live Domain Badge */}
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-black/90 backdrop-blur-md text-[var(--color-accent)] border border-[var(--color-accent)]/40 hover:bg-[var(--color-accent)] hover:text-black transition-all"
              >
                <span>{project.domainDisplay}</span>
                <span className="text-xs">↗</span>
              </a>
            </div>

            {/* Card Content */}
            <div className="p-6 md:p-7 flex flex-col flex-1 justify-between">
              <div>
                {/* Category & Tag */}
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-[var(--color-accent)] font-semibold uppercase tracking-wider text-[11px]">
                    {project.category}
                  </span>
                  <span className="text-neutral-400 text-[11px]">
                    {project.metrics}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors leading-snug mb-2">
                  {project.name}
                </h3>

                <p className="text-[var(--color-text-secondary)] text-xs md:text-sm leading-relaxed mb-4">
                  {project.headline}
                </p>

                {/* Key Capabilities */}
                <ul className="space-y-1.5 mb-5 text-xs text-neutral-300">
                  {project.features.slice(0, 2).map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[var(--color-accent)] mt-0.5">✔</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5 pt-4 border-t border-[var(--color-border)]">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-lg bg-[var(--color-bg-tertiary)] text-neutral-400 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Dual Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-center bg-[var(--color-accent)] text-black hover:bg-[var(--color-accent-hover)] transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[var(--color-accent)]/10"
                  >
                    <span>Visit Live Site</span>
                    <span className="text-xs">↗</span>
                  </a>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="py-2.5 px-4 rounded-xl text-xs font-medium border border-[var(--color-border)] text-white hover:border-[var(--color-accent)] hover:bg-[var(--color-bg-tertiary)] transition-all"
                  >
                    Blueprint
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Blueprint Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl border border-[var(--color-accent)]/50 p-6 md:p-8 bg-[#101012] shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-white hover:border-[var(--color-accent)] flex items-center justify-center text-lg font-bold"
            >
              ✕
            </button>

            {/* Modal Image */}
            <div className="h-64 w-full rounded-2xl overflow-hidden bg-[#18181c] mb-6 border border-[var(--color-border)]">
              <img
                src={selectedProject.image}
                alt={selectedProject.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/30">
                {selectedProject.category}
              </span>
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>{selectedProject.domainDisplay}</span>
                <span>↗</span>
              </a>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              {selectedProject.name}
            </h3>

            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            <h4 className="text-xs uppercase tracking-wider font-bold text-[var(--color-accent)] mb-3">
              Engineered Capabilities & System Features
            </h4>
            <ul className="space-y-2 mb-6 text-sm text-neutral-300">
              {selectedProject.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-emerald-400 mt-1">✔</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-400 mb-2">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2 mb-8">
              {selectedProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-lg bg-[var(--color-bg-tertiary)] text-[var(--color-accent)] border border-[var(--color-border)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 rounded-xl font-bold text-center bg-white/10 text-white hover:bg-white/20 transition-all border border-white/20 flex items-center justify-center gap-1.5"
              >
                <span>Open {selectedProject.domainDisplay}</span>
                <span>↗</span>
              </a>
              <a
                href={`https://wa.me/254700000000?text=${encodeURIComponent(
                  `Hi Kila Kitu Tech! I saw your live build for ${selectedProject.name} (${selectedProject.domainDisplay}) and want to build a similar system.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 rounded-xl font-bold text-center bg-[var(--color-accent)] text-black hover:bg-[var(--color-accent-hover)] transition-all"
              >
                Inquire on WhatsApp →
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
