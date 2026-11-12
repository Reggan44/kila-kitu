"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[#0a0a0a]" aria-hidden="true">
        <div className="hero-gradient-orb absolute inset-0 opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-8 py-20">
        {/* Badge / Pill */}
        <span className="inline-flex items-center gap-2 rounded-full border border-[#d4a843]/30 bg-[#d4a843]/10 px-5 py-2 text-sm text-[#d4a843] backdrop-blur-sm">
          🚀 Digital Infrastructure for Modern African Businesses
        </span>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-white">
          Everything Your Business Needs to{" "}
          <span className="hero-gold-text">Run, Scale &amp; Dominate</span>{" "}
          Online.
        </h1>

        {/* Subheadline */}
        <p className="max-w-3xl text-lg md:text-xl text-neutral-400 leading-relaxed">
          From lightning-fast web platforms and M-Pesa integrated apps to custom
          POS systems and enterprise software — Kila Kitu Tech engineers the
          digital backbone of modern businesses.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <a
            href="https://wa.me/254700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#d4a843] px-8 py-4 text-base font-semibold text-[#0a0a0a] transition-all hover:brightness-110 hover:scale-105 active:scale-100"
          >
            Start a Project →
          </a>
          <a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("portfolio")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center rounded-full border border-[#d4a843] px-8 py-4 text-base font-semibold text-[#d4a843] transition-all hover:bg-[#d4a843]/10 hover:scale-105 active:scale-100"
          >
            Explore Our Work ↓
          </a>
        </div>

        {/* Trust Metrics */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6 text-sm text-neutral-500">
          <span className="flex items-center gap-1.5">⚡ Sub-Second Load Times</span>
          <span className="hidden sm:inline text-neutral-700">|</span>
          <span className="flex items-center gap-1.5">📱 Mobile-First UX</span>
          <span className="hidden sm:inline text-neutral-700">|</span>
          <span className="flex items-center gap-1.5">💳 M-Pesa Ready</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 hero-bounce">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-neutral-500"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* Inline styles for animations */}
      <style jsx>{`
        .hero-gradient-orb {
          background: radial-gradient(
              ellipse 80% 60% at 50% 40%,
              rgba(212, 168, 67, 0.15) 0%,
              transparent 60%
            ),
            radial-gradient(
              ellipse 60% 80% at 30% 70%,
              rgba(212, 168, 67, 0.08) 0%,
              transparent 50%
            ),
            radial-gradient(
              ellipse 50% 50% at 80% 30%,
              rgba(212, 168, 67, 0.06) 0%,
              transparent 50%
            );
          animation: hero-gradient-shift 12s ease-in-out infinite alternate;
        }

        @keyframes hero-gradient-shift {
          0% {
            transform: scale(1) translate(0%, 0%);
            opacity: 0.3;
          }
          33% {
            transform: scale(1.05) translate(2%, -3%);
            opacity: 0.35;
          }
          66% {
            transform: scale(0.97) translate(-3%, 2%);
            opacity: 0.25;
          }
          100% {
            transform: scale(1.03) translate(1%, -1%);
            opacity: 0.32;
          }
        }

        .hero-gold-text {
          background: linear-gradient(135deg, #d4a843 0%, #f5d77a 50%, #d4a843 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-bounce {
          animation: hero-chevron-bounce 2s ease-in-out infinite;
        }

        @keyframes hero-chevron-bounce {
          0%,
          100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(8px);
          }
        }
      `}</style>
    </section>
  );
}
