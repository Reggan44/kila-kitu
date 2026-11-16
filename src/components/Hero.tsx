"use client";

import { siteConfig } from "@/config/site";

export default function Hero() {
  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-white hero-glow">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Top Studio Badge */}
        <div className="flex items-center justify-start mb-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-black/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
            <span className="font-mono text-[11px] font-medium tracking-widest text-neutral-800 uppercase">
              NAIROBI, KENYA &bull; DIGITAL &bull; HARDWARE &bull; SOFTWARE
            </span>
          </div>
        </div>

        {/* Primary Headline with Editorial Italic Accent */}
        <div className="max-w-5xl space-y-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[82px] font-black tracking-tight text-black leading-[1.05]">
            Everything engineered to <span className="editorial-italic text-neutral-500 font-normal">scale.</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-neutral-600 max-w-3xl leading-relaxed font-light">
            Stop juggling five different freelancers for hardware, code, M-Pesa, and cloud hosting.
            We engineer lightning-fast web platforms, custom ERPs, and embedded physical hardware under one roof.
            <span className="text-black font-medium"> Zero finger-pointing.</span>
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-8">
          <a
            href={siteConfig.whatsappUrl("Hi Kila Kitu Technologies! I want to discuss a system for my business.")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-black hover:bg-neutral-800 text-white font-bold text-sm tracking-wide transition shadow-xl shadow-black/10 hover:scale-105 active:scale-95 text-center uppercase"
          >
            Start a Project &rarr;
          </a>

          <a
            href="#work"
            className="px-8 py-4 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-black/10 hover:border-black/25 text-black font-semibold text-sm tracking-wide transition text-center flex items-center justify-center gap-2"
          >
            <span>See Live Deployments</span>
            <span className="text-neutral-500">&darr;</span>
          </a>
        </div>

        {/* Trust & Proof Metric Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 mt-16 border-t border-black/10">
          <div>
            <div className="text-2xl md:text-3xl font-black text-black">4 Live</div>
            <div className="text-xs text-neutral-500 font-mono uppercase tracking-wider mt-1">
              Production Client Deployments
            </div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-black">Sub-Second</div>
            <div className="text-xs text-neutral-500 font-mono uppercase tracking-wider mt-1">
              Global Edge CDN Latency
            </div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-black">Daraja STK</div>
            <div className="text-xs text-neutral-500 font-mono uppercase tracking-wider mt-1">
              Automated M-Pesa Reconciliation
            </div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-black">90-Day SLA</div>
            <div className="text-xs text-neutral-500 font-mono uppercase tracking-wider mt-1">
              Post-Launch Engineering Warranty
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
