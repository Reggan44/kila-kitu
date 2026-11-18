"use client";

import { useState, useRef } from "react";
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

/* Duplicate the array for seamless infinite loop */
const marqueeProjects = [...projects, ...projects];

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState<ShowcaseProject | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  /* Pause marquee on hover / touch */
  const pauseMarquee = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
  };
  const resumeMarquee = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running";
  };

  return (
    <section
      id="work"
      className="py-24 md:py-32 bg-[#FAFAFC] relative border-t border-black/10 overflow-x-hidden"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#0284C7] uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
              <span>Proven Track Record</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-black leading-tight">
              Built for real{" "}
              <span className="editorial-italic text-[#0284C7] font-normal">
                businesses.
              </span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-neutral-600 max-w-md font-light leading-relaxed">
            We don&apos;t showcase generic Figma mockups. Every platform below is
            engineered, tested, and actively generating revenue on the internet
            right now.
          </p>
        </div>
      </div>

      {/* ─── Infinite Marquee Track ─── */}
      <div className="relative w-full">
        {/* Left edge fade mask */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none bg-gradient-to-r from-[#FAFAFC] to-transparent" />
        {/* Right edge fade mask */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none bg-gradient-to-l from-[#FAFAFC] to-transparent" />

        <div className="overflow-hidden w-full">
          <div
            ref={trackRef}
            className="marquee-track flex gap-6 sm:gap-8 w-max"
            onMouseEnter={pauseMarquee}
            onMouseLeave={resumeMarquee}
            onTouchStart={pauseMarquee}
            onTouchEnd={resumeMarquee}
          >
            {marqueeProjects.map((p, idx) => {
              const uniqueKey = `${p.id}-${idx}`;
              const isHovered = hoveredId === uniqueKey;

              return (
                <a
                  key={uniqueKey}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`marquee-card group flex-shrink-0 w-[340px] sm:w-[400px] rounded-2xl sm:rounded-3xl bg-white border overflow-hidden flex flex-col transition-all duration-300 cursor-pointer select-none ${
                    isHovered
                      ? "border-[#0284C7]/60 shadow-[0_0_30px_rgba(2,132,199,0.15)] scale-[1.02]"
                      : "border-black/10 shadow-sm hover:shadow-xl"
                  }`}
                  onMouseEnter={() => setHoveredId(uniqueKey)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={(e) => {
                    /* Allow cmd/ctrl click for new tab, prevent default for case study */
                    if (e.metaKey || e.ctrlKey) return;
                    /* Normal click opens in new tab via the <a> tag */
                  }}
                >
                  {/* Image with Browser Chrome */}
                  <div className="relative overflow-hidden bg-neutral-900">
                    {/* Browser Mockup Chrome Header */}
                    <div className="h-7 sm:h-8 bg-neutral-100 px-3 flex items-center justify-between border-b border-black/10">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-neutral-300" />
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-neutral-300" />
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-neutral-300" />
                      </div>
                      <div className="text-[9px] sm:text-[10px] font-mono text-neutral-500 truncate max-w-[160px] sm:max-w-[200px]">
                        https://{p.domain}
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-neutral-400 font-mono">
                        200 OK
                      </div>
                    </div>

                    {/* Screenshot */}
                    <div className="h-48 sm:h-56 w-full relative overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-30" />

                      {/* "Open Project" hover overlay */}
                      <div
                        className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                          isHovered ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <span className="px-4 py-2 rounded-xl bg-white/95 text-black text-xs font-bold tracking-wide uppercase flex items-center gap-2 shadow-lg">
                          Open Project
                          <span className="text-[#0284C7]">↗</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    {/* Category Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200/80 truncate">
                        {p.category}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-mono text-[#0284C7]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] animate-pulse" />
                        LIVE
                      </span>
                    </div>

                    {/* Title & Headline */}
                    <h3 className="text-lg sm:text-xl font-extrabold text-black tracking-tight mb-1.5 group-hover:text-[#0284C7] transition-colors duration-200 line-clamp-1">
                      {p.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed mb-4 line-clamp-2">
                      {p.headline}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {p.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-neutral-100 border border-black/5 text-[10px] font-mono text-neutral-600"
                        >
                          {t}
                        </span>
                      ))}
                      {p.tags.length > 3 && (
                        <span className="px-2 py-0.5 rounded-md bg-neutral-100 border border-black/5 text-[10px] font-mono text-neutral-400">
                          +{p.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Marquee CSS animation */}
      <style jsx>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-track {
          animation: marquee-scroll 40s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>

      {/* Case Study Modal (kept intact) */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
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
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200/80">
                {activeProject.category}
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-black mt-3">
                {activeProject.name}
              </h3>
              <p className="text-sm text-neutral-500 mt-1 font-mono">
                Live URL:{" "}
                <a
                  href={activeProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0066CC] underline"
                >
                  {activeProject.domain}
                </a>
              </p>
            </div>

            {/* Problem / Solution / Outcome */}
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

              <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-200">
                <div className="text-xs font-mono font-bold text-[#0284C7] uppercase tracking-wider mb-1">
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
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 font-light"
                  >
                    <span className="text-[#0284C7] font-bold">&check;</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Footer */}
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
                className="flex-1 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-center bg-black hover:bg-[#0284C7] text-white transition shadow-lg shadow-black/10"
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
