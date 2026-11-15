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
    <section id="about" className="py-24 md:py-32 bg-[#08090D] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#F59E0B] uppercase font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
              <span>Studio Philosophy</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight mb-6">
              An established team. Finally opening our <span className="editorial-italic text-[#F59E0B] font-normal">public doors.</span>
            </h2>

            <div className="space-y-4 text-neutral-300 text-base md:text-lg leading-relaxed font-light">
              <p>
                We are not a "startup" experimenting with your business capital.
                <strong className="text-white font-semibold"> Kila Kitu Technologies</strong> is a proven Digital Solutions Studio
                with high-concurrency production platforms running live across Kenya and global markets.
              </p>
              <p>
                Kenyan business owners are exhausted by hiring one freelancer for graphic design, another for web,
                a third for M-Pesa integration, and an aloof hosting company. When something breaks, everyone points fingers.
              </p>
              <p className="text-white font-medium">
                Our core promise is simple: <span className="text-[#F59E0B]">One roof. Zero finger-pointing.</span> We
                engineer, launch, secure, and maintain your entire technical infrastructure from start to scale.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="studio-card p-6 sm:p-8 rounded-3xl flex flex-col justify-center group"
              >
                <div className="text-4xl sm:text-5xl font-black text-[#F59E0B] mb-2 font-mono group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base font-bold text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-neutral-400 font-light">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Grid: Traditional vs Kila Kitu Technologies */}
        <div className="studio-card rounded-3xl p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-xs font-mono uppercase font-bold text-[#F59E0B] tracking-wider mb-2">
              The Quality Benchmark
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Traditional Agency vs. Kila Kitu Technologies
            </h3>
          </div>

          <div className="divide-y divide-white/10">
            {comparisons.map((c, i) => (
              <div key={i} className="py-4 sm:py-5 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 items-center">
                <div className="text-sm font-bold text-neutral-300 font-mono">
                  {c.factor}
                </div>
                <div className="text-xs sm:text-sm text-neutral-400 flex items-start gap-2 font-light">
                  <span className="text-rose-400 mt-0.5 font-bold">✕</span>
                  <span>{c.traditional}</span>
                </div>
                <div className="text-xs sm:text-sm text-emerald-400 font-medium flex items-start gap-2">
                  <span className="text-[#F59E0B] mt-0.5 font-bold">✔</span>
                  <span className="text-white">{c.kilakitu}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
