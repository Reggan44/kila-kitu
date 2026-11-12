"use client";

export default function Hero() {
  const whatsappUrl =
    "https://wa.me/254700000000?text=" +
    encodeURIComponent(
      "Hi Kila Kitu Tech! I'm interested in building a digital system for my business."
    );

  const previewProjects = [
    { name: "Outlook Signs OOH", tag: "Interactive 3D & Maps", img: "/projects/outlook-hero.png" },
    { name: "LawDone Legal Hub", tag: "Client Portal & Intake", img: "/projects/law-hero.png" },
    { name: "AIC Community Portal", tag: "Mobile App Suite", img: "/projects/aic-mockup.png" },
    { name: "MyIbada Platform", tag: "M-Pesa Giving & Stream", img: "/projects/myibada-hero.jpg" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 pb-16">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[#0a0a0b]" aria-hidden="true">
        <div className="hero-gradient-orb absolute inset-0 opacity-40 pointer-events-none" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center flex flex-col items-center gap-7">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-5 py-2 text-xs md:text-sm text-[var(--color-accent)] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Digital Infrastructure & Systems Engineered for African Scale</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[1.1] tracking-tight text-white max-w-5xl">
          Everything Your Business Needs to{" "}
          <span className="hero-gold-text">Run, Scale &amp; Dominate</span>{" "}
          Online.
        </h1>

        {/* Subheadline */}
        <p className="max-w-3xl text-base md:text-xl text-neutral-400 leading-relaxed font-normal">
          From high-converting web platforms and M-Pesa automated workflows to custom
          retail POS and enterprise logistics — <strong className="text-white">Kila Kitu Tech</strong> engineers
          the mission-critical software that powers modern Kenyan businesses.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-8 py-4 text-base font-bold text-black transition-all hover:bg-[var(--color-accent-hover)] hover:scale-105 active:scale-95 shadow-xl shadow-[var(--color-accent)]/20"
          >
            Start a Project on WhatsApp →
          </a>
          <a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("portfolio")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-[var(--color-border)] hover:border-[var(--color-accent)] px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/5 hover:scale-105 active:scale-95"
          >
            Explore Live Systems ↓
          </a>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-xs md:text-sm text-neutral-400 pt-2">
          <span className="flex items-center gap-2">
            <span className="text-[var(--color-accent)]">⚡</span> Sub-Second Turbopack Speed
          </span>
          <span className="text-neutral-700">•</span>
          <span className="flex items-center gap-2">
            <span className="text-emerald-400">📱</span> 100% Mobile &amp; 3G/4G Optimized
          </span>
          <span className="text-neutral-700">•</span>
          <span className="flex items-center gap-2">
            <span className="text-[var(--color-accent)]">💳</span> Daraja M-Pesa STK Automated
          </span>
        </div>

        {/* Live Systems Snapshot Strip (The Wex/Ratified differentiator) */}
        <div className="w-full mt-10 pt-8 border-t border-white/5">
          <div className="text-[11px] uppercase tracking-widest text-neutral-500 font-bold mb-4">
            Recent Production Deployments
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {previewProjects.map((p, idx) => (
              <a
                key={idx}
                href="#portfolio"
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#121215] p-2 hover:border-[var(--color-accent)] transition-all duration-300 text-left block"
              >
                <div className="h-24 w-full rounded-xl overflow-hidden bg-black/50 mb-2 relative">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                </div>
                <div className="px-1">
                  <div className="text-xs font-bold text-white group-hover:text-[var(--color-accent)] truncate">
                    {p.name}
                  </div>
                  <div className="text-[10px] text-neutral-400 truncate">
                    {p.tag}
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
              rgba(212, 168, 67, 0.16) 0%,
              transparent 65%
            ),
            radial-gradient(
              ellipse 60% 80% at 20% 70%,
              rgba(212, 168, 67, 0.08) 0%,
              transparent 55%
            ),
            radial-gradient(
              ellipse 50% 50% at 85% 40%,
              rgba(212, 168, 67, 0.06) 0%,
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
          background: linear-gradient(135deg, #d4a843 0%, #fae69e 50%, #d4a843 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </section>
  );
}
