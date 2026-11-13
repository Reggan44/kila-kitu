export default function About() {
  const comparisons = [
    {
      factor: "Accountability",
      traditional: "5 different vendors blaming each other when things break",
      kilakitu: "One roof. Zero finger-pointing. Direct founder line.",
    },
    {
      factor: "Architecture",
      traditional: "Heavy WordPress themes with 30 fragile plugins",
      kilakitu: "Custom Next.js / React with sub-second speeds on 3G/4G",
    },
    {
      factor: "Payment Flows",
      traditional: "Clunky manual Paybill instructions with delayed receipts",
      kilakitu: "Automated Daraja M-Pesa STK Push with instant verification",
    },
    {
      factor: "Delivery Speed",
      traditional: "6 to 12 weeks of missed milestones and silence",
      kilakitu: "Agile 2 to 4 week sprints with live staging demo access",
    },
  ];

  const stats = [
    { value: "4+", label: "Flagship Platforms", detail: "Running live in production" },
    { value: "100%", label: "M-Pesa Automated", detail: "Daraja C2B/B2C native" },
    { value: "< 1s", label: "Page Load Speed", detail: "Engineered for 3G/4G bundles" },
    { value: "0", label: "Finger-Pointing", detail: "One studio. End-to-end code." },
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-[#111827] border border-neutral-800 text-[#F59E0B] mb-6">
            Studio Philosophy
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6 leading-tight">
            An established engineering team. <br />
            <span className="text-gradient-gold">Finally opening our public doors.</span>
          </h2>
          <div className="space-y-4 text-neutral-300 text-base md:text-lg leading-relaxed">
            <p>
              We are not a "startup" testing experimental ideas with your business capital.
              <strong className="text-white"> Kila Kitu Tech</strong> is a proven Digital Solutions Studio
              with a backlog of production platforms running live across Kenya and international markets.
            </p>
            <p>
              Kenyan business owners are tired of hiring one freelancer for graphic design, another for a website,
              a third for M-Pesa integration, and a separate vendor for hosting. When something breaks, everyone points fingers.
            </p>
            <p className="text-white font-medium">
              Our core promise is simple: <span className="text-[#F59E0B]">One roof. Zero finger-pointing.</span> We
              engineer, launch, secure, and maintain your entire technical infrastructure from start to scale.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card p-6 md:p-8 flex flex-col justify-center border border-neutral-800 hover:border-[#F59E0B] transition-all duration-300 group bg-[#0F172A]/40 rounded-3xl"
            >
              <div className="text-4xl md:text-5xl font-black text-gradient-gold mb-2 group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-base font-bold text-white mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-neutral-400">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Grid: Traditional vs Kila Kitu Tech */}
      <div className="glass-card rounded-3xl border border-neutral-800 p-8 md:p-12 bg-[#111827]/60">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs uppercase font-bold text-[#F59E0B] tracking-wider mb-2">
            The Difference in Quality
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white">
            Traditional Agency vs. Kila Kitu Tech
          </h3>
        </div>

        <div className="divide-y divide-neutral-800">
          {comparisons.map((c, i) => (
            <div key={i} className="py-4 md:py-5 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="text-sm font-bold text-neutral-400">
                {c.factor}
              </div>
              <div className="text-xs md:text-sm text-neutral-500 flex items-start gap-2">
                <span className="text-rose-400 mt-0.5">✕</span>
                <span>{c.traditional}</span>
              </div>
              <div className="text-xs md:text-sm text-emerald-400 font-semibold flex items-start gap-2">
                <span className="text-[#F59E0B] mt-0.5">✔</span>
                <span className="text-white">{c.kilakitu}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
