"use client";

import { siteConfig } from "@/config/site";

export default function Hero() {
  const liveSites = [
    {
      name: "Sofiya Nzau",
      domain: "sofiyanzau.com",
      url: "https://www.sofiyanzau.com/",
      tag: "Global Afrohouse Artist ('Mwaki')",
      img: "/projects/sofiya-logo.png",
    },
    {
      name: "Nzuki & Co. Advocates",
      domain: "nzukilawassociates.co.ke",
      url: "https://www.nzukilawassociates.co.ke/",
      tag: "Nairobi Corporate Law Firm",
      img: "/projects/law-hero.png",
    },
    {
      name: "MyIbada",
      domain: "myibada.co.ke",
      url: "https://myibada.co.ke/",
      tag: "Church Platform & M-Pesa Giving",
      img: "/projects/myibada-hero.jpg",
    },
    {
      name: "Meed Collections",
      domain: "meedcollections.store",
      url: "https://www.meedcollections.store/",
      tag: "Next.js + Prisma E-Commerce",
      img: "/projects/meed-banner2.png",
    },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 pb-16">
      {/* Ambient Radial Gradient Background */}
      <div className="absolute inset-0 bg-[#0B0F19]" aria-hidden="true">
        <div className="hero-gradient-orb absolute inset-0 opacity-40 pointer-events-none" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center flex flex-col items-center gap-7">
        {/* Studio Positioning Pill */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#F59E0B]/40 bg-[#F59E0B]/10 px-5 py-2 text-xs md:text-sm text-[#F59E0B] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold tracking-wide">
            Digital Solutions Studio • One Roof. Zero Finger-Pointing.
          </span>
        </div>

        {/* Poster Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black leading-[1.1] tracking-tight text-white max-w-5xl">
          Outgrow the Manual. <br />
          <span className="hero-gold-text">Build Systems That Scale.</span>
        </h1>

        {/* Outcome-Driven Subheadline */}
        <p className="max-w-3xl text-base md:text-xl text-neutral-300 leading-relaxed font-normal">
          Stop juggling five different freelancers for design, code, M-Pesa, and hosting.
          <strong className="text-white"> Kila Kitu Tech</strong> engineers websites that bring qualified leads,
          custom systems that plug revenue leaks, and automated workflows that eliminate paperwork.
        </p>

        {/* Dual High-Conversion CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto">
          <a
            href={siteConfig.whatsappUrl("Hi Kila Kitu Tech! I want to discuss building a custom digital system for my business.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-[#F59E0B] px-8 py-4 text-base font-bold text-black transition-all hover:bg-[#d97706] hover:scale-105 active:scale-95 shadow-xl shadow-[#F59E0B]/20"
          >
            Chat on WhatsApp / Book Discovery Call →
          </a>
          <a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("portfolio")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-neutral-700 hover:border-[#F59E0B] px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/5 hover:scale-105 active:scale-95"
          >
            Inspect Proven Track Record ↓
          </a>
        </div>

        {/* Value Proposition Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-xs md:text-sm text-neutral-400 pt-2">
          <span className="flex items-center gap-2">
            <span className="text-[#F59E0B]">⚡</span> Sub-Second Turbopack Speed
          </span>
          <span className="text-neutral-700">•</span>
          <span className="flex items-center gap-2">
            <span className="text-emerald-400">📱</span> 100% Mobile &amp; 3G/4G Optimized
          </span>
          <span className="text-neutral-700">•</span>
          <span className="flex items-center gap-2">
            <span className="text-[#F59E0B]">💳</span> Daraja M-Pesa Native Integrations
          </span>
          <span className="text-neutral-700">•</span>
          <span className="flex items-center gap-2">
            <span className="text-cyan-400">🛡️</span> Zero Plugin Bloatware
          </span>
        </div>

        {/* Live Client Sites Quick-Strip */}
        <div className="w-full mt-10 pt-8 border-t border-white/5">
          <div className="flex items-center justify-between max-w-5xl mx-auto mb-4 px-1">
            <div className="text-[11px] uppercase tracking-widest text-neutral-400 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Live Client Deployments Running on the Internet
            </div>
            <a
              href="#portfolio"
              className="text-xs text-[#F59E0B] hover:underline font-semibold"
            >
              View Full Case Studies →
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {liveSites.map((p, idx) => (
              <a
                key={idx}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#111827] p-2 hover:border-[#F59E0B] transition-all duration-300 text-left block hover:-translate-y-1 hover:shadow-xl hover:shadow-[#F59E0B]/10"
              >
                <div className="h-24 w-full rounded-xl overflow-hidden bg-black/60 mb-2 relative flex items-center justify-center">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/70 flex items-center justify-center text-[10px] text-white/80 group-hover:text-[#F59E0B]">
                    ↗
                  </div>
                </div>
                <div className="px-1">
                  <div className="text-xs font-bold text-white group-hover:text-[#F59E0B] truncate">
                    {p.name}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono truncate">
                    {p.domain}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-gradient-orb {
          background: radial-gradient(
              ellipse 80% 60% at 50% 30%,
              rgba(245, 158, 11, 0.16) 0%,
              transparent 65%
            ),
            radial-gradient(
              ellipse 60% 80% at 20% 70%,
              rgba(245, 158, 11, 0.08) 0%,
              transparent 55%
            ),
            radial-gradient(
              ellipse 50% 50% at 85% 40%,
              rgba(245, 158, 11, 0.06) 0%,
              transparent 50%
            );
          animation: hero-gradient-shift 12s ease-in-out infinite alternate;
        }

        @keyframes hero-gradient-shift {
          0% {
            transform: scale(1) translate(0%, 0%);
            opacity: 0.35;
          }
          50% {
            transform: scale(1.04) translate(1.5%, -2%);
            opacity: 0.42;
          }
          100% {
            transform: scale(0.98) translate(-2%, 1%);
            opacity: 0.32;
          }
        }

        .hero-gold-text {
          background: linear-gradient(135deg, #F59E0B 0%, #FDE68A 50%, #F59E0B 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </section>
  );
}
