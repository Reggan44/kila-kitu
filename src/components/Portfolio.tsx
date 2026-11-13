"use client";

import { useState } from "react";

type ProjectCategory =
  | "All"
  | "Global & Creative"
  | "Corporate & Legal"
  | "E-Commerce & Retail"
  | "Faith & Community";

interface CaseStudy {
  id: string;
  name: string;
  liveUrl: string;
  domainDisplay: string;
  category: ProjectCategory;
  tagline: string;
  image: string;
  status: "Live in Production";
  metrics: string;
  problem: string;
  whatWeBuilt: string;
  result: string;
  features: string[];
  tags: string[];
  client: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "sofiya",
    name: "Sofiya Nzau Official",
    liveUrl: "https://www.sofiyanzau.com/",
    domainDisplay: "sofiyanzau.com",
    category: "Global & Creative",
    tagline: "Global Platform for International Afrohouse Music Sensation (Voice of 'Mwaki')",
    image: "/projects/sofiya-logo.png",
    status: "Live in Production",
    metrics: "Global Reach • Zero Downtime Edge CDN",
    problem:
      "When the global hit 'Mwaki' went viral worldwide, the artist needed a bulletproof international digital home capable of absorbing sudden multi-million global traffic spikes without latency, server crashes, or degraded media streams.",
    whatWeBuilt:
      "A high-concurrency headless architecture deployed across a global edge CDN. Built with interactive discography, synchronized lyrics, international tour schedule, press kit accreditation, and direct VIP booking pipelines.",
    result:
      "Sub-second global page loads worldwide, zero downtime during high-profile music releases, and streamlined press/licensing inquiries directly to management.",
    features: [
      "High-concurrency global traffic caching via Cloudflare Edge",
      "Interactive discography with embedded Spotify & Apple Music",
      "Tour date announcements & VIP press kit accreditation portal",
      "Editorial styling with Cormorant Garamond & Syne typography",
    ],
    tags: ["React", "Tailwind CSS", "Vite", "Cloudflare CDN", "REST APIs"],
    client: "Sofiya Nzau Music Management",
  },
  {
    id: "nzuki-law",
    name: "Nzuki & Co. Advocates",
    liveUrl: "https://www.nzukilawassociates.co.ke/",
    domainDisplay: "nzukilawassociates.co.ke",
    category: "Corporate & Legal",
    tagline: "High-Trust Corporate Legal Practice Platform at Hazina Towers, Nairobi",
    image: "/projects/law-hero.png",
    status: "Live in Production",
    metrics: "Hazina Towers • Google Schema Verified",
    problem:
      "An established commercial law firm in Nairobi was losing prospective high-value corporate clients to fragmented email exchanges and lacked an authoritative online footprint to dominate local search for dispute resolution and employment law.",
    whatWeBuilt:
      "A high-trust corporate legal practice portal featuring attorney directories, practice catalogs, and structured consultation intake, backed by extensive JSON-LD Schema markup and verified Google business integration.",
    result:
      "Strong first-page visibility for commercial litigation in Nairobi, elimination of manual back-and-forth emails, and an immediate professional trust anchor for corporate boards.",
    features: [
      "Structured retainer intake & consultation scheduling engine",
      "Full JSON-LD structured data with Truehost DNS and Google Verification",
      "Practice area catalogs for Commercial Litigation, Labour Law & Governance",
      "Mobile-optimized interface designed for corporate executives",
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
    tagline: "All-in-One Church Management Platform with NFC Attendance & M-Pesa Giving",
    image: "/projects/myibada-hero.jpg",
    status: "Live in Production",
    metrics: "Instant Giving • NFC Check-in",
    problem:
      "Kenyan churches were crippled by manual pen-and-paper registers, slow Sunday school child drop-offs with safety concerns, and tedious end-of-month manual M-Pesa Paybill reconciliations that wasted days of administrative time.",
    whatWeBuilt:
      "A purpose-engineered cloud operating system for Kenyan churches. Features automated Daraja M-Pesa tithes & offerings reconciliations, attendance tracking, member directories, and physical NFC wristband check-in for children's ministry.",
    result:
      "Child check-in reduced to under 5 seconds per family, 100% automated tithe tracking with instant SMS receipts, and real-time financial reporting for church leadership.",
    features: [
      "Direct Daraja M-Pesa STK push with automated ledger reconciliation",
      "NFC wristband child check-in for bulletproof Sunday school security",
      "Congregation directory, pastoral notes, and automated SMS announcements",
      "Real-time giving dashboards & weekly audit-ready financial reports",
    ],
    tags: ["React", "Firebase", "Daraja M-Pesa", "NFC Hardware", "Tailwind CSS"],
    client: "MyIbada Church Network",
  },
  {
    id: "meed",
    name: "Meed Collections",
    liveUrl: "https://www.meedcollections.store/",
    domainDisplay: "meedcollections.store",
    category: "E-Commerce & Retail",
    tagline: "Full-Stack Retail E-Commerce Storefront with Next.js & IntaSend",
    image: "/projects/meed-banner2.png",
    status: "Live in Production",
    metrics: "Next.js + Prisma • IntaSend Payments",
    problem:
      "Relying on manual WhatsApp & Instagram DM orders caused massive checkout drop-offs, inventory double-booking, and lost sales from shoppers who couldn't purchase instantly after hours.",
    whatWeBuilt:
      "A modern, full-stack Next.js and Prisma ORM e-commerce platform with real-time PostgreSQL product inventory, interactive shopping bag drawer, and seamless IntaSend payment gateway integration for automated M-Pesa and card checkout.",
    result:
      "24/7 automated order capture, zero manual payment confirmation delays, and a frictionless mobile shopping experience built specifically for Kenyan shoppers.",
    features: [
      "Prisma ORM database backend with PostgreSQL product catalog",
      "Instant IntaSend checkout with Daraja M-Pesa & card support",
      "Interactive shopping bag drawer and category product filtering",
      "Mobile-first responsive architecture optimized for fast 4G shopping",
    ],
    tags: ["Next.js", "Prisma", "PostgreSQL", "IntaSend Payments", "Tailwind CSS"],
    client: "Meed Collections Retail",
  },
];

const categories: ProjectCategory[] = [
  "All",
  "Global & Creative",
  "Corporate & Legal",
  "E-Commerce & Retail",
  "Faith & Community",
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const filtered =
    activeCategory === "All"
      ? caseStudies
      : caseStudies.filter((c) => c.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#111827] border border-neutral-800 text-[#F59E0B] mb-4">
            Proof Over Promises
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Selected Case Studies. <br />
            <span className="text-gradient-gold">Problem → What We Built → Result.</span>
          </h2>
          <p className="mt-3 text-neutral-400 text-base md:text-lg max-w-2xl">
            We don’t pitch Figma mockups or theoretical templates. Every system below was
            custom engineered, deployed, and is actively running live on the internet.
          </p>
        </div>

        {/* Live Active Status Pill */}
        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl glass-card border border-neutral-800 shrink-0 self-start md:self-auto bg-[#111827]/80">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <div className="text-xs">
            <span className="font-bold text-white">Verified Production</span>
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
                ? "bg-[#F59E0B] text-black shadow-lg shadow-[#F59E0B]/20 scale-105"
                : "bg-[#111827] text-neutral-400 border border-neutral-800 hover:border-[#F59E0B] hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Case Study Cards Grid - 2x2 Format with Problem / Built / Result */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((study) => (
          <div
            key={study.id}
            className="group rounded-3xl overflow-hidden glass-card border border-neutral-800 hover:border-[#F59E0B] transition-all duration-300 flex flex-col hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#F59E0B]/5 bg-[#0F172A]/40"
          >
            {/* Visual Header with Real Image */}
            <div className="relative h-64 w-full bg-[#111827] overflow-hidden border-b border-neutral-800 flex items-center justify-center p-3">
              <img
                src={study.image}
                alt={study.name}
                className="w-full h-full object-cover object-top rounded-2xl transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-black/85 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {study.status}
              </div>

              {/* Live Domain External Link */}
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-black/90 backdrop-blur-md text-[#F59E0B] border border-[#F59E0B]/40 hover:bg-[#F59E0B] hover:text-black transition-all"
              >
                <span>{study.domainDisplay}</span>
                <span className="text-xs">↗</span>
              </a>
            </div>

            {/* Case Study Body */}
            <div className="p-7 md:p-8 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-[#F59E0B] font-semibold uppercase tracking-wider text-[11px]">
                    {study.category}
                  </span>
                  <span className="text-neutral-400 text-[11px]">
                    {study.metrics}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white group-hover:text-[#F59E0B] transition-colors leading-snug mb-2">
                  {study.name}
                </h3>

                <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-medium">
                  {study.tagline}
                </p>

                {/* The 3-Step Outcome Framework: Problem → Solution → Result */}
                <div className="space-y-3 mb-6 p-4 rounded-2xl bg-black/40 border border-white/5 text-xs">
                  <div>
                    <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block mb-1">
                      The Problem:
                    </span>
                    <p className="text-neutral-400 leading-relaxed">
                      {study.problem}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5">
                    <span className="font-bold text-cyan-400 uppercase tracking-wider text-[10px] block mb-1">
                      What We Engineered:
                    </span>
                    <p className="text-neutral-400 leading-relaxed">
                      {study.whatWeBuilt}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5">
                    <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block mb-1">
                      The Result:
                    </span>
                    <p className="text-neutral-200 font-medium leading-relaxed">
                      {study.result}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-neutral-800">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-lg bg-[#111827] text-neutral-400 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Dual Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={study.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-center bg-[#F59E0B] text-black hover:bg-[#d97706] transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#F59E0B]/10 hover:scale-105"
                  >
                    <span>Visit Live Website</span>
                    <span className="text-xs">↗</span>
                  </a>

                  <button
                    onClick={() => setSelectedCase(study)}
                    className="py-3 px-5 rounded-xl text-xs font-semibold border border-neutral-700 text-white hover:border-[#F59E0B] hover:bg-neutral-800 transition-all"
                  >
                    Case Study Blueprint
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Blueprint Detail Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl border border-[#F59E0B]/50 p-6 md:p-8 bg-[#0B0F19] shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCase(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-neutral-800 border border-neutral-700 text-white hover:border-[#F59E0B] flex items-center justify-center text-lg font-bold"
            >
              ✕
            </button>

            {/* Modal Image */}
            <div className="h-64 w-full rounded-2xl overflow-hidden bg-[#111827] mb-6 border border-neutral-800">
              <img
                src={selectedCase.image}
                alt={selectedCase.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/30">
                {selectedCase.category}
              </span>
              <a
                href={selectedCase.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>{selectedCase.domainDisplay}</span>
                <span>↗</span>
              </a>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              {selectedCase.name}
            </h3>

            <p className="text-sm text-neutral-300 leading-relaxed mb-6">
              {selectedCase.tagline}
            </p>

            {/* Detailed Problem -> Built -> Result */}
            <div className="space-y-4 mb-6 p-5 rounded-2xl bg-[#111827] border border-neutral-800 text-xs">
              <div>
                <span className="font-bold text-rose-400 uppercase tracking-wider text-[11px] block mb-1">
                  1. The Business Challenge
                </span>
                <p className="text-neutral-300 leading-relaxed">
                  {selectedCase.problem}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5">
                <span className="font-bold text-cyan-400 uppercase tracking-wider text-[11px] block mb-1">
                  2. Engineered Solution & Architecture
                </span>
                <p className="text-neutral-300 leading-relaxed">
                  {selectedCase.whatWeBuilt}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5">
                <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px] block mb-1">
                  3. Measurable Business Outcome
                </span>
                <p className="text-white font-medium leading-relaxed">
                  {selectedCase.result}
                </p>
              </div>
            </div>

            <h4 className="text-xs uppercase tracking-wider font-bold text-[#F59E0B] mb-3">
              Engineered Capabilities & System Features
            </h4>
            <ul className="space-y-2 mb-6 text-sm text-neutral-300">
              {selectedCase.features.map((feat, i) => (
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
              {selectedCase.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-lg bg-[#111827] text-[#F59E0B] border border-neutral-800"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={selectedCase.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 rounded-xl font-bold text-center bg-white/10 text-white hover:bg-white/20 transition-all border border-white/20 flex items-center justify-center gap-1.5"
              >
                <span>Visit {selectedCase.domainDisplay}</span>
                <span>↗</span>
              </a>
              <a
                href={`https://wa.me/254700000000?text=${encodeURIComponent(
                  `Hi Kila Kitu Tech! I read your case study for ${selectedCase.name} (${selectedCase.domainDisplay}) and want to build a similar system.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 rounded-xl font-bold text-center bg-[#F59E0B] text-black hover:bg-[#d97706] transition-all"
              >
                Scope Similar Project on WhatsApp →
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
