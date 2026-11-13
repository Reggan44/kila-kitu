export default function Services() {
  const pillars = [
    {
      icon: "🌐",
      title: "High-Speed Web Platforms & Storefronts",
      subtitle: "Websites that generate WhatsApp & M-Pesa leads",
      description:
        "We build sub-second, mobile-first web platforms engineered specifically for the Kenyan digital landscape. Built on Next.js with zero WordPress plugin vulnerabilities, lightning SEO ranking, and instant WhatsApp conversion funnels.",
      features: [
        "Sub-second load times on 3G/4G bundles",
        "WhatsApp click-to-chat & pre-filled quote flows",
        "Native SEO architecture for Google ranking in Kenya",
        "Full source code and IP ownership upon delivery",
      ],
      tag: "Conversion Focused",
    },
    {
      icon: "💻",
      title: "Custom Business Systems & ERPs",
      subtitle: "Systems that plug revenue leaks and kill paperwork",
      description:
        "Replace messy Excel sheets, lost receipts, and manual register books. We engineer custom operational software tailored to how your business actually runs—from inventory tracking and multi-branch management to automated audit logs.",
      features: [
        "Multi-branch inventory control & threshold alerts",
        "Offline-resilient data capture during internet cuts",
        "Role-based staff permissions (Cashier, Manager, Admin)",
        "Automated daily reconciliation & P&L summaries",
      ],
      tag: "Operational Scalability",
    },
    {
      icon: "📱",
      title: "Mobile Apps & Native M-Pesa Pipelines",
      subtitle: "Automating money movement & customer access",
      description:
        "Full Daraja API C2B, B2C, and STK Push integration. We engineer mobile web apps (PWAs) and cross-platform mobile software that process payments, trigger automated SMS confirmations, and give customers seamless mobile checkout.",
      features: [
        "Instant Daraja STK Push with zero manual Paybill typing",
        "Automated SMS receipts via local SMS gateways",
        "Instant payment verification & transaction callbacks",
        "Mobile-first PWA installable on iOS and Android",
      ],
      tag: "Daraja Native",
    },
    {
      icon: "🛡️",
      title: "Cloud Infrastructure & Studio SLA",
      subtitle: "One roof. Zero finger-pointing.",
      description:
        "When something needs updating or scaling, you don't get tossed between a hosting company, a freelance designer, and a payment vendor. Kila Kitu Tech manages your domain, cloud databases, uptime, and security under one single contract.",
      features: [
        ".co.ke domain & enterprise DNS management",
        "Continuous 99.9% uptime monitoring & SSL renewals",
        "Direct founder WhatsApp line for priority updates",
        "Free 3-month post-launch warranty & performance SLA",
      ],
      tag: "Zero Finger-Pointing",
    },
  ];

  return (
    <section id="services" className="py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#111827] border border-neutral-800 text-[#F59E0B] mb-4">
          The Kila Kitu Ecosystem
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Everything Your Business Needs. <br />
          <span className="text-gradient-gold">One Roof. Zero Finger-Pointing.</span>
        </h2>
        <p className="mt-4 text-neutral-400 text-base md:text-lg">
          We don't sell abstract code or bloated agency hours. We engineer reliable digital engines
          that stop revenue leaks, automate manual operations, and drive real revenue.
        </p>
      </div>

      {/* 4-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="group glass-card p-6 md:p-7 rounded-3xl border border-neutral-800 hover:border-[#F59E0B] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#F59E0B]/5 bg-[#0F172A]/50"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl p-3 rounded-2xl bg-black/40 border border-white/5">
                  {pillar.icon}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#F59E0B] px-2.5 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20">
                  {pillar.tag}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-[#F59E0B] transition-colors mb-1.5 leading-snug">
                {pillar.title}
              </h3>

              <div className="text-xs font-semibold text-emerald-400 mb-3">
                {pillar.subtitle}
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed mb-5">
                {pillar.description}
              </p>

              <ul className="space-y-2 mb-6 pt-4 border-t border-white/5 text-[11px] text-neutral-300">
                {pillar.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#F59E0B] mt-0.5 shrink-0">✔</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#contact"
              className="text-xs font-semibold text-[#F59E0B] group-hover:underline flex items-center gap-1 pt-2"
            >
              Consult with Studio →
            </a>
          </div>
        ))}
      </div>

      {/* Trust Band Banner */}
      <div className="mt-14 p-6 md:p-8 rounded-3xl border border-neutral-800 bg-gradient-to-r from-[#111827] via-[#0B0F19] to-[#111827] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <div className="text-base font-bold text-white mb-1">
            Need an integrated custom solution not listed here?
          </div>
          <div className="text-xs text-neutral-400">
            From IoT hardware telemetry to custom logistics engines—we engineer the entire stack.
          </div>
        </div>
        <a
          href="https://wa.me/254700000000?text=Hi%20Kila%20Kitu%20Tech!%20I%20have%20a%20custom%20system%20requirement%20I'd%20like%20to%20scope."
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-full text-xs font-bold bg-[#F59E0B] text-black hover:bg-[#d97706] transition-all shrink-0 hover:scale-105"
        >
          Scope Custom System on WhatsApp →
        </a>
      </div>
    </section>
  );
}
