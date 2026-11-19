export default function About() {
  const comparisons = [
    {
      factor: "Accountability",
      traditional: "5 different freelancers blaming each other when a site crashes",
      kilakitu: "One roof. Zero finger-pointing. Direct founder engineering line.",
    },
    {
      factor: "Architecture",
      traditional: "Slow, vulnerable WordPress themes with 30 fragile plugins",
      kilakitu: "Custom Next.js & React with sub-second speeds on 3G/4G bundles",
    },
    {
      factor: "Payment Flows",
      traditional: "Manual Paybill typing instructions with delayed manual verification",
      kilakitu: "Native Safaricom Daraja STK Push with automated ledger reconciliation",
    },
    {
      factor: "Delivery Speed",
      traditional: "8 to 12 weeks of missed milestones, radio silence, and excuses",
      kilakitu: "Rapid 2 to 4 week agile sprints with private live staging access",
    },
  ];

  const stats = [
    { value: "4+", label: "Flagship Platforms", detail: "Running live in production right now" },
    { value: "100%", label: "M-Pesa Automated", detail: "Native Safaricom Daraja STK Push" },
    { value: "< 1s", label: "Page Load Speed", detail: "Engineered for Kenyan mobile networks" },
    { value: "0", label: "Finger-Pointing", detail: "One studio. Complete IP ownership." },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-[#FAFAFC] relative border-t border-black/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#0284C7] uppercase font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
              <span>Studio Philosophy</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-black leading-tight mb-6">
              An established team. Finally opening our <span className="editorial-italic text-[#0284C7] font-normal">public doors.</span>
            </h2>

            <div className="space-y-4 text-neutral-700 text-base md:text-lg leading-relaxed font-light">
              <p>
                We are not a "startup" experimenting with your business capital.
                <strong className="text-black font-semibold"> Kila Kitu Technologies</strong> is a proven Digital Solutions Studio
                with high-concurrency production platforms running live across Kenya and global markets.
              </p>
              <p>
                Kenyan business owners are exhausted by hiring one freelancer for graphic design, another for web,
                a third for M-Pesa integration, and an aloof hosting company. When something breaks, everyone points fingers.
              </p>
              <p className="text-black font-medium">
                Our core promise is simple: <span className="text-[#0284C7] underline underline-offset-4 decoration-[#0284C7]/30">One roof. Zero finger-pointing.</span> We
                engineer, launch, secure, and maintain your entire technical infrastructure from start to scale.
              </p>
            </div>
          </div>

          {/* Stats 2x2 Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="studio-card rounded-2xl p-6 sm:p-8 border border-black/10 bg-white text-center flex flex-col justify-center shadow-sm"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight mb-1">
                  {s.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-neutral-800 uppercase tracking-wider mb-2">
                  {s.label}
                </div>
                <div className="text-[11px] font-mono text-neutral-500 font-light leading-snug">
                  {s.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traditional Agency vs Kila Kitu Technologies Table */}
        <div className="rounded-3xl border border-black/10 overflow-hidden bg-white shadow-sm">
          <div className="p-6 sm:p-8 border-b border-black/10 bg-neutral-50">
            <div className="text-xs font-mono uppercase font-bold text-[#0284C7] tracking-wider mb-2">
              The Accountability Difference
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
              Why Businesses Switch to Kila Kitu Technologies
            </h3>
          </div>

          <div className="divide-y divide-black/5">
            {comparisons.map((c, i) => (
              <div
                key={i}
                className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-center hover:bg-neutral-50/50 transition"
              >
                <div className="md:col-span-3 text-sm font-mono font-semibold uppercase tracking-wider text-neutral-800">
                  {c.factor}
                </div>
                <div className="md:col-span-4 text-xs sm:text-sm text-neutral-500 font-light flex items-start gap-2">
                  <span className="text-neutral-400 mt-0.5">✕</span>
                  <span>{c.traditional}</span>
                </div>
                <div className="md:col-span-5 text-xs sm:text-sm text-black font-medium flex items-start gap-2 bg-sky-50/50 p-3 rounded-xl border border-sky-200/80">
                  <span className="text-[#0284C7] mt-0.5 font-bold">✔</span>
                  <span>{c.kilakitu}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
