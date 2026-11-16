"use client";

import { siteConfig } from "@/config/site";

export default function CTA() {
  return (
    <section className="py-20 md:py-28 px-6 lg:px-10 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-[#09090B] text-white p-10 md:p-20 text-center shadow-2xl">
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-widest uppercase bg-white/10 border border-white/15 text-neutral-300">
            Ready to Build?
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Let’s engineer your next <br />
            <span className="editorial-italic text-neutral-300 font-normal">competitive advantage.</span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto">
            Stop losing qualified customers to sluggish websites or manual paperwork leaks.
            Tell us what your business needs — we will engineer the exact system to scale it.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={siteConfig.whatsappUrl("Hi Kila Kitu Technologies! I'd like to book a scoping call for my system.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-all duration-300 shadow-xl hover:scale-105 cursor-pointer"
            >
              Start a Project on WhatsApp &rarr;
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-xs uppercase tracking-wider text-white border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300 cursor-pointer"
            >
              Send Project Brief &darr;
            </a>
          </div>

          <div className="pt-4 text-xs font-mono text-neutral-400">
            Direct WhatsApp discovery &bull; Fast turnaround &bull; 90-day post-launch warranty
          </div>
        </div>
      </div>
    </section>
  );
}
