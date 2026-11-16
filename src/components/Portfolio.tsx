"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";

interface ShowcaseProject {
  id: string;
  name: string;
  domain: string;
  url: string;
  category: string;
  headline: string;
  description: string;
  metrics: string;
  image: string;
  tags: string[];
  problem: string;
  solution: string;
  outcome: string;
  features: string[];
}

const projects: ShowcaseProject[] = [
  {
    id: "sofiya",
    name: "Sofiya Nzau Official",
    domain: "sofiyanzau.com",
    url: "https://www.sofiyanzau.com/",
    category: "Global Music & Creative Platform",
    headline: "Worldwide Edge Platform for Afrohouse Music Sensation",
    description:
      "When the global hit 'Mwaki' exploded across international dance charts with hundreds of millions of streams, Sofiya Nzau's management needed a bulletproof digital home. We engineered a high-concurrency headless platform deployed across Cloudflare Edge CDN with zero downtime during viral drops.",
    metrics: "Global Reach • Cloudflare Edge CDN • Zero Downtime",
    image: "/projects/sofiya-logo.png",
    tags: ["Next.js", "Tailwind CSS", "Cloudflare CDN", "Spotify API", "Press Kit Portal"],
    problem:
      "Sudden multi-million global traffic spikes from international festival bookings, press inquiries, and music releases were crashing standard hosting and causing unacceptable media latency.",
    solution:
      "Engineered a lightweight edge-cached web architecture with embedded streaming discography, tour schedules, and a high-security VIP booking pipeline.",
    outcome:
      "Sub-second global load times across London, New York, and Nairobi, with streamlined management routing for international festival contracts.",
    features: [
      "Edge CDN caching handling millions of global hits with sub-50ms TTFB",
      "Interactive discography with embedded Spotify & Apple Music streams",
      "VIP press kit accreditation and international booking inquiry pipeline",
      "Mobile-first responsive interface optimized for global music agents",
    ],
  },
  {
    id: "nzuki",
    name: "Nzuki & Co. Advocates",
    domain: "nzukilawassociates.co.ke",
    url: "https://www.nzukilawassociates.co.ke/",
    category: "Corporate Legal Practice Portal",
    headline: "High-Trust Corporate Practice Platform at Hazina Towers, Nairobi",
    description:
      "An authoritative digital presence for a prestigious commercial litigation and corporate governance law firm in the heart of Nairobi. Engineered with institutional precision, verified Schema.org legal metadata, and structured corporate retainer intake.",
    metrics: "Hazina Towers • JSON-LD Schema • Google Business Verified",
    image: "/projects/law-hero.png",
    tags: ["React", "Tailwind CSS", "Legal Schema", "Corporate Intake", "Vite"],
    problem:
      "Prospective corporate boards and enterprise clients were lost in disorganized email exchanges, and the firm lacked organic first-page search dominance in Nairobi for dispute resolution.",
    solution:
      "Built a high-trust legal practice platform with practice catalogs, attorney credentials, and a structured intake system that qualifies retainers before consultation.",
    outcome:
      "Dominant corporate visibility in Nairobi legal search and elimination of repetitive administrative back-and-forth for senior partners.",
    features: [
      "Structured corporate retainer intake & dispute consultation scheduler",
      "Full JSON-LD legal practice structured data for Google Rich Results",
      "Interactive practice catalogs for Commercial Litigation, Labour Law & Governance",
      "Executive dark aesthetic matching top-tier Commonwealth corporate firms",
    ],
  },
  {
    id: "myibada",
    name: "MyIbada Cloud Platform",
    domain: "myibada.co.ke",
    url: "https://myibada.co.ke/",
    category: "Cloud Church Operating System",
    headline: "All-in-One Church Management with NFC Attendance & Daraja M-Pesa",
    description:
      "A complete cloud operating system built for Kenyan congregations. Replaces chaotic manual registers with instant NFC wristband attendance for Sunday school and automates 100% of tithes and offerings via Safaricom Daraja STK Push.",
    metrics: "NFC Check-in • Daraja STK Push • Instant SMS Receipts",
    image: "/projects/myibada-hero.jpg",
    tags: ["Cloud ERP", "M-Pesa Daraja API", "NFC Hardware", "SMS Gateway", "PostgreSQL"],
    problem:
      "End-of-month manual Paybill reconciliations took days of clerical work, Sunday school child check-in caused safety bottlenecks, and members rarely received confirmation receipts.",
    solution:
      "Engineered an automated cloud platform combining physical NFC wristband check-in hardware with real-time Daraja STK Push reconciliation and instant SMS receipts.",
    outcome:
      "Drop-off time slashed to under 5 seconds per family, 100% automated accounting ledger updates, and zero manual spreadsheet calculations.",
    features: [
      "Automated Daraja M-Pesa STK Push with instant ledger reconciliation",
      "NFC wristband child attendance for high-speed, secure Sunday school entry",
      "Automated bulk SMS receipts and financial transparency reports for trustees",
      "Multi-campus member directory and ministry group management",
    ],
  },
  {
    id: "meed",
    name: "Meed Collections",
    domain: "meedcollections.store",
    url: "https://www.meedcollections.store/",
    category: "Full-Stack Retail E-Commerce",
    headline: "Luxury Apparel E-Commerce with Native Kenyan Payments",
    description:
      "A lightning-fast, modern e-commerce storefront engineered with Next.js, Prisma ORM, and PostgreSQL. Integrated directly with IntaSend and M-Pesa to give fashion shoppers a sub-second checkout experience with instant order dispatch alerts.",
    metrics: "Next.js + Prisma • IntaSend & M-Pesa • Sub-Second Checkout",
    image: "/projects/meed-banner2.png",
    tags: ["Next.js", "Prisma ORM", "PostgreSQL", "IntaSend API", "M-Pesa STK"],
    problem:
      "Slow, bloated WordPress/WooCommerce plugins were causing cart abandonment on Kenyan mobile networks and failing during peak Instagram ad traffic bursts.",
    solution:
      "Engineered a custom headless Next.js storefront backed by relational PostgreSQL and optimized payment gateway webhooks for instant order confirmation.",
    outcome:
      "Cart checkout completed in 3 taps, zero server crashes during promotional campaigns, and seamless mobile payments via M-Pesa and cards.",
    features: [
      "Sub-second catalog browsing and instant client-side cart updates",
      "Direct IntaSend & M-Pesa STK Push integration with automated order receipts",
      "Prisma ORM database layer tracking real-time stock and branch inventory",
      "Mobile-optimized luxury fashion aesthetic engineered for Instagram traffic",
    ],
  },
];

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState<ShowcaseProject | null>(null);

  return (
    <section id="work" className="py-24 md:py-32 bg-[#FAFAFC] relative border-t border-black/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-600 uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
              <span>Proven Track Record</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-black leading-tight">
              Built for real <span className="editorial-italic text-neutral-500 font-normal">businesses.</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-neutral-600 max-w-md font-light leading-relaxed">
            We don't showcase generic Figma mockups. Every platform below is engineered, tested, and actively generating revenue on the internet right now.
          </p>
        </div>

        {/* 2x2 Large Flagship Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((p) => (
            <div
              key={p.id}
              className="studio-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group border border-black/10 bg-white hover:border-black/30 shadow-sm hover:shadow-xl"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-neutral-100 border border-black/10 text-neutral-800">
                    {p.category}
                  </span>
                  
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-mono text-neutral-600 hover:text-black transition group/link"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                    <span className="underline decoration-black/30 underline-offset-4">{p.domain}</span>
                    <span className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform">&rarr;</span>
                  </a>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight mb-2 group-hover:text-neutral-700 transition-colors duration-200">
                  {p.name}
                </h3>
                
                <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed mb-6">
                  {p.headline}
                </p>
              </div>

              {/* Large Image Preview with Browser Chrome Bar */}
              <div className="rounded-2xl overflow-hidden bg-neutral-900 border border-black/10 mb-6 relative group-hover:border-black/20 transition duration-300">
                {/* Browser Mockup Chrome Header */}
                <div className="h-8 bg-neutral-100 px-3.5 flex items-center justify-between border-b border-black/10">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                  </div>
                  <div className="text-[10px] font-mono text-neutral-600 truncate max-w-[200px]">
                    https://{p.domain}
                  </div>
                  <div className="text-[10px] text-neutral-400 font-mono">200 OK</div>
                </div>

                {/* Platform Screenshot Container */}
                <div className="h-64 sm:h-72 w-full relative overflow-hidden bg-neutral-900">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
                </div>
              </div>

              {/* Tags & Actions */}
              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md bg-neutral-100 border border-black/5 text-[11px] font-mono text-neutral-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-black/10">
                  <button
                    onClick={() => setActiveProject(p)}
                    className="flex-1 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-black/10 text-black font-semibold text-xs tracking-wide transition text-center uppercase cursor-pointer"
                  >
                    View System Blueprint &rarr;
                  </button>

                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs tracking-wide transition shadow-md shadow-black/10 flex items-center gap-1.5 uppercase"
                  >
                    <span>Visit Live Site</span>
                    <span>&rarr;</span>
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Deep Architectural Case Study Modal */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="bg-white border border-black/15 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-neutral-100 border border-black/10 text-neutral-600 hover:text-black hover:bg-neutral-200 flex items-center justify-center transition cursor-pointer"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-neutral-100 border border-black/10 text-neutral-800">
                {activeProject.category}
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-black mt-3">
                {activeProject.name}
              </h3>
              <p className="text-sm text-neutral-500 mt-1 font-mono">
                Live URL: <a href={activeProject.url} target="_blank" rel="noopener noreferrer" className="text-black underline">{activeProject.domain}</a>
              </p>
            </div>

            {/* Problem / Solution / Outcome Cards */}
            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-2xl bg-neutral-50 border border-black/10">
                <div className="text-xs font-mono font-bold text-neutral-600 uppercase tracking-wider mb-1">
                  1. The Business Challenge
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed font-light">
                  {activeProject.problem}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-black/10">
                <div className="text-xs font-mono font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  2. Engineered Solution & Architecture
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed font-light">
                  {activeProject.solution}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-black/10">
                <div className="text-xs font-mono font-bold text-black uppercase tracking-wider mb-1">
                  3. Measurable Result
                </div>
                <p className="text-sm text-black font-medium leading-relaxed">
                  {activeProject.outcome}
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-8">
              <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-black mb-3">
                Key Engineered Capabilities
              </h4>
              <ul className="space-y-2">
                {activeProject.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 font-light">
                    <span className="text-black font-bold">&check;</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-black/10">
              <a
                href={activeProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-center bg-neutral-100 hover:bg-neutral-200 text-black transition border border-black/10"
              >
                Visit {activeProject.domain} &rarr;
              </a>
              <a
                href={siteConfig.whatsappUrl(
                  `Hi Kila Kitu Technologies! I reviewed your system blueprint for ${activeProject.name} (${activeProject.domain}) and want to scope a similar project.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-center bg-black hover:bg-neutral-800 text-white transition shadow-lg shadow-black/10"
              >
                Scope Similar Project on WhatsApp &rarr;
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
