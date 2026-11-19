export default function Services() {
  const pillars = [
    {
      num: "01",
      title: "Web Platforms & Storefronts",
      tagline: "Sub-second load times on 3G/4G bundles",
      description:
        "High-conversion digital storefronts and company platforms engineered with Next.js and Cloudflare Edge. Zero slow WordPress plugins, bulletproof security, and native WhatsApp lead generation.",
      points: [
        "Headless Next.js architecture with instant TTFB",
        "WhatsApp click-to-chat conversion flows",
        "Nairobi & Kenyan Google SEO metadata optimization",
        "Complete source code ownership & zero vendor lock-in",
      ],
      tag: "Web & E-Commerce",
    },
    {
      num: "02",
      title: "Custom Business ERPs & POS",
      tagline: "Plug revenue leaks & eliminate manual paperwork",
      description:
        "Purpose-engineered operational software tailored to how your business operates. Multi-branch inventory tracking, real-time sales dashboards, cashier permissions, and automated audit logs.",
      points: [
        "Multi-branch stock sync & low-inventory alerts",
        "Offline-resilient transaction capture",
        "Role-based staff access (Cashier, Supervisor, Admin)",
        "Daily automated P&L & revenue summaries",
      ],
      tag: "Operations & POS",
    },
    {
      num: "03",
      title: "M-Pesa Daraja & Fintech APIs",
      tagline: "Zero manual Paybill typing for your customers",
      description:
        "Direct Safaricom Daraja API C2B, B2C, and STK Push integration. When customers make a payment, funds are automatically verified, accounts credited, and instant SMS receipts dispatched.",
      points: [
        "Instant STK Push prompts sent directly to client phones",
        "Automated ledger reconciliation with zero human entry",
        "Bulk SMS transactional receipts via local gateways",
        "Webhook failover architecture with zero lost orders",
      ],
      tag: "Payments & Fintech",
    },
    {
      num: "04",
      title: "Hardware, IoT & Cloud SLA",
      tagline: "One roof. Zero finger-pointing.",
      description:
        "We design physical telemetry boards, manage your .co.ke domains, cloud databases, and server uptime under one contract. Direct founder WhatsApp line for fast turnaround and a 90-day post-launch warranty.",
      points: [
        "Custom PCB schematics & firmware engineering",
        ".co.ke domain & Truehost DNS architecture",
        "99.9% uptime monitoring & automated database backups",
        "Comprehensive 90-day post-launch SLA warranty",
      ],
      tag: "Embedded & Cloud",
    },
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-[#FAFAFC] relative border-t border-black/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#0284C7] uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
              <span>What We Build</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-black leading-tight">
              Engineering disciplines. <br />
              <span className="editorial-italic text-[#0284C7] font-normal">Zero bloated fluff.</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-neutral-600 max-w-md font-light leading-relaxed">
            Most agencies sell hours and templates. We sell engineered outcomes that automate manual work, capture online revenue, and don't break under load.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {pillars.map((p) => (
            <div
              key={p.num}
              className="studio-card rounded-3xl p-6 sm:p-10 flex flex-col justify-between border border-black/10 bg-white hover:border-[#0284C7]/40 shadow-sm hover:shadow-xl group transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-bold tracking-wider text-neutral-400 uppercase">
                    Pillar // {p.num}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono text-sky-700 bg-sky-50 border border-sky-200/80 uppercase tracking-wider">
                    {p.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-black mb-2 leading-snug group-hover:text-[#0284C7] transition-colors">
                  {p.title}
                </h3>

                <p className="text-xs font-mono text-[#0284C7] mb-4 font-semibold">
                  {p.tagline}
                </p>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light mb-6">
                  {p.description}
                </p>
              </div>

              <div className="pt-4 border-t border-black/5 space-y-2">
                {p.points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-neutral-700 font-light">
                    <span className="text-[#0284C7] mt-0.5 font-bold">&bull;</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
