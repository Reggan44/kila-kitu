"use client";

import { useState } from "react";

type ProjectCategory = "All" | "Enterprise & Legal" | "Retail & Commerce" | "AdTech & Media" | "Community & Faith";

interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  headline: string;
  description: string;
  image: string;
  imageType: "screenshot" | "cover" | "mockup";
  status: "Live in Production" | "Deployed System" | "Active Platform";
  metrics: string;
  features: string[];
  tags: string[];
  client: string;
}

const projects: Project[] = [
  {
    id: "outlook",
    name: "Outlook Signs & OOH Media Platform",
    category: "AdTech & Media",
    headline: "Interactive Outdoor Billboard Directory & Discovery Engine",
    description:
      "A high-performance directory for Kenya's leading billboard and out-of-home advertising network. Features interactive Leaflet maps, 3D WebGL visualizations, real-time availability filters, and automated advertiser quotation requests.",
    image: "/projects/outlook-hero.png",
    imageType: "screenshot",
    status: "Live in Production",
    metrics: "50+ Prime Locations • 3D Canvas",
    features: [
      "Interactive GPS map of prime Kenyan billboard locations",
      "Dynamic lead generation form routing straight to sales team",
      "Integrated corporate client showcase (Optiven, Geminia, Mwalimu)",
      "Next.js Turbopack engine with instant image delivery",
    ],
    tags: ["Next.js", "Three.js", "Leaflet Maps", "Tailwind CSS"],
    client: "Outlook Signs Kenya",
  },
  {
    id: "law-done",
    name: "LawDone Practice & Client Portal",
    category: "Enterprise & Legal",
    headline: "Automated Legal Intake & Case Tracking Infrastructure",
    description:
      "A bespoke web platform engineered for East African legal advocates and corporate firms. Replaces fragmented emails with an organized consultation intake pipeline, verified practice areas, and responsive retainer booking.",
    image: "/projects/law-hero.png",
    imageType: "screenshot",
    status: "Deployed System",
    metrics: "< 800ms Load Time • Legal Intake CRM",
    features: [
      "Secure client consultation intake and calendar booking",
      "Litigation & corporate commercial practice showcase",
      "Automated document preparation workflow",
      "Mobile-optimized for high-net-worth client access",
    ],
    tags: ["React", "DaisyUI", "Vite", "Tailwind CSS", "PDF Generation"],
    client: "Corporate Legal Practice",
  },
  {
    id: "pos",
    name: "DukaPOS Operating System",
    category: "Retail & Commerce",
    headline: "Offline-First Mobile Retail POS with Native M-Pesa",
    description:
      "Full point-of-sale and inventory control engine built specifically for retail shops, supermarkets, and distributors. Works offline during internet outages and auto-syncs with cloud databases once connected.",
    image: "/projects/pos-icon.png",
    imageType: "mockup",
    status: "Active Platform",
    metrics: "Zero-Latency Checkout • Offline Sync",
    features: [
      "Barcode scanning and instantaneous receipt generation",
      "Daraja M-Pesa STK push with automated payment confirmation",
      "Multi-store inventory reconciliation and reorder threshold alerts",
      "Offline-first SQLite storage with cloud backup to Supabase",
    ],
    tags: ["React Native", "Expo", "Supabase", "M-Pesa Daraja", "SQLite"],
    client: "Retail Merchants & Wholesalers",
  },
  {
    id: "myibada",
    name: "MyIbada Community & Giving Platform",
    category: "Community & Faith",
    headline: "Livestream, Member Directory & Instant M-Pesa Tithe/Giving",
    description:
      "Digital operating hub built for Kenyan faith communities, churches, and fellowships. Centralizes weekly service broadcasts, sermon archives, member databases, and automated M-Pesa payment tracking.",
    image: "/projects/myibada-hero.jpg",
    imageType: "screenshot",
    status: "Live in Production",
    metrics: "Instant Giving Reconciliations • Realtime",
    features: [
      "Direct Daraja M-Pesa integration with instant SMS receipts",
      "Low-bandwidth live service audio/video streaming",
      "Departmental announcements and member directory management",
      "Automated financial reporting dashboard for church leadership",
    ],
    tags: ["React", "Firebase", "M-Pesa API", "Cloud Storage"],
    client: "Faith Institutions & Ministries",
  },
  {
    id: "aic",
    name: "AIC & Community Portal Suite",
    category: "Community & Faith",
    headline: "Mobile-First Organization Hub & Event Ticketing",
    description:
      "Multi-device portal and cross-platform mobile application suite built for faith assemblies (including AIC Happy Valley and Zion Baptist). Connects thousands of members across youth ministries, regional fellowships, and donor drives.",
    image: "/projects/aic-mockup.png",
    imageType: "mockup",
    status: "Deployed System",
    metrics: "Cross-Platform • 1000+ Members",
    features: [
      "Cross-platform iOS and Android mobile app interface",
      "Integrated youth & ministry event registration",
      "Digital resource center and community newsletter broadcast",
      "Fast admin dashboard for executive committee approvals",
    ],
    tags: ["React", "Radix UI", "GSAP Animations", "Tailwind CSS"],
    client: "Regional Assembly Network",
  },
  {
    id: "vertex",
    name: "Vertex Enterprise Platform",
    category: "Enterprise & Legal",
    headline: "Corporate Operations, Logistics & Supply Chain System",
    description:
      "An end-to-end enterprise platform built to handle complex corporate workflows, fleet operations, boardroom approvals, and executive communications with enterprise-grade security and role-based access.",
    image: "/projects/vertex-boardroom.jpeg",
    imageType: "cover",
    status: "Active Platform",
    metrics: "Role-Based Security • Multi-Department",
    features: [
      "Executive boardroom tracking and operational documentation",
      "Fleet logistics tracking and supplier contract management",
      "Granular role-based permissions (Admin, Manager, Field Agent)",
      "Automated PDF export and internal communication pipeline",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Enterprise Auth"],
    client: "Commercial Logistics & Enterprise",
  },
];

const categories: ProjectCategory[] = [
  "All",
  "Enterprise & Legal",
  "Retail & Commerce",
  "AdTech & Media",
  "Community & Faith",
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-accent)] mb-4">
            Production Track Record
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
            Systems We’ve Engineered. <br />
            <span className="text-gradient-gold">Running Live Across Kenya.</span>
          </h2>
          <p className="mt-3 text-[var(--color-text-secondary)] text-base md:text-lg max-w-2xl">
            We don’t show fake Figma templates or mock concepts. These are actual platforms,
            point-of-sale engines, directories, and corporate portals we designed and built.
          </p>
        </div>

        {/* Live counter badge */}
        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl glass-card border border-[var(--color-border)] shrink-0 self-start md:self-auto">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <div className="text-xs">
            <span className="font-bold text-[var(--color-text-primary)]">6 Enterprise Platforms</span>
            <span className="block text-[var(--color-text-secondary)]">Live in Active Use</span>
          </div>
        </div>
      </div>

      {/* Category Pills */}
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
            {/* Visual Image Container */}
            <div className="relative h-56 w-full bg-[#161619] overflow-hidden border-b border-[var(--color-border)] flex items-center justify-center p-2">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover object-top rounded-2xl transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-black/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {project.status}
              </div>

              {/* Client Tag */}
              <div className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-full text-[10px] font-medium bg-black/85 backdrop-blur-md text-neutral-300 border border-white/10">
                {project.client}
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 md:p-7 flex flex-col flex-1 justify-between">
              <div>
                {/* Category & Metrics */}
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

                <p className="text-[var(--color-text-secondary)] text-xs md:text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Key Capabilities */}
                <ul className="space-y-1.5 mb-6 text-xs text-neutral-300">
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
                <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-[var(--color-border)]">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-lg bg-[var(--color-bg-tertiary)] text-neutral-400 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-semibold text-[var(--color-accent)] hover:underline flex items-center gap-1"
                  >
                    Inspect Blueprint & Details →
                  </button>
                  <a
                    href={`https://wa.me/254700000000?text=${encodeURIComponent(
                      `Hi Kila Kitu Tech! I saw your ${project.name} build on kilakitutech.co.ke and want a similar system for my business.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-[var(--color-accent)] hover:text-black transition-all border border-white/10"
                  >
                    Request Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Inspector Dialog */}
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

            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/30 mb-2">
              {selectedProject.category}
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
                href={`https://wa.me/254700000000?text=${encodeURIComponent(
                  `Hi Kila Kitu Tech! I want to build a system like ${selectedProject.name}. Let's discuss pricing and specs.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 rounded-xl font-bold text-center bg-[var(--color-accent)] text-black hover:bg-[var(--color-accent-hover)] transition-all"
              >
                Inquire on WhatsApp for Similar Build →
              </a>
              <button
                onClick={() => setSelectedProject(null)}
                className="px-6 py-3.5 rounded-xl border border-[var(--color-border)] text-sm font-medium text-white hover:bg-[var(--color-bg-tertiary)]"
              >
                Close Blueprint
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
