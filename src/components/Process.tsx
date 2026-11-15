export default function Process() {
  const steps = [
    {
      number: "01",
      title: "15-Minute Technical Scoping",
      badge: "Day 1",
      headline: "Fixed-price blueprint within 24 hours.",
      description:
        "No endless corporate meetings or vague proposals. We analyze your manual bottlenecks, map your database requirements, and deliver a detailed architecture blueprint with fixed KES pricing and exact milestones.",
      highlights: [
        "15-min discovery call or WhatsApp voice brief",
        "Transparent itemized quote with zero hidden fees",
        "Clear technical deliverables and milestone dates",
      ],
    },
    {
      number: "02",
      title: "14-Day Sprint & Staging Access",
      badge: "Days 2 - 14",
      headline: "Watch your system get built in real time.",
      description:
        "You don't wait weeks in the dark hoping things work. We provide private staging URL access where you can click through every page, test mobile responsiveness, and verify automated Daraja M-Pesa callbacks before launch.",
      highlights: [
        "Private live staging link updated continuously",
        "Direct founder communication channel",
        "Real M-Pesa sandbox and checkout flow testing",
      ],
    },
    {
      number: "03",
      title: "Go-Live & 90-Day Studio Warranty",
      badge: "Launch & Beyond",
      headline: "One roof. Zero finger-pointing.",
      description:
        "We handle Truehost DNS configuration, SSL certification, cloud database provisioning, and full source code handover. Every platform is backed by our 90-day post-launch warranty and priority support.",
      highlights: [
        ".co.ke domain & cloud infrastructure configuration",
        "100% full source code, IP, and database ownership",
        "90-day free performance warranty & priority support",
      ],
    },
  ];

  return (
    <section id="process" className="py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#111827] border border-neutral-800 text-[#F59E0B] mb-4">
          The Studio Delivery Model
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          How We Work. <br />
          <span className="text-gradient-gold">From Scope to Deployment in 14 Days.</span>
        </h2>
        <p className="mt-4 text-neutral-400 text-base md:text-lg">
          We eliminated the traditional agency bloat. Clear milestones, continuous live staging previews,
          and zero finger-pointing from day one.
        </p>
      </div>

      {/* 3-Step Process Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {steps.map((step, idx) => (
          <div
            key={step.number}
            className="group glass-card p-8 rounded-3xl border border-neutral-800 hover:border-[#F59E0B] transition-all duration-300 flex flex-col justify-between bg-[#0F172A]/40 relative overflow-hidden hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#F59E0B]/5"
          >
            {/* Step watermark background */}
            <div className="absolute -top-4 -right-4 text-7xl font-black text-white/[0.03] select-none pointer-events-none group-hover:text-[#F59E0B]/[0.06] transition-colors">
              {step.number}
            </div>

            <div>
              {/* Header Badge & Number */}
              <div className="flex items-center justify-between mb-6">
                <span className="w-12 h-12 rounded-2xl bg-[#111827] border border-neutral-700 text-[#F59E0B] font-black text-lg flex items-center justify-center">
                  {step.number}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20">
                  {step.badge}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#F59E0B] transition-colors">
                {step.title}
              </h3>

              <div className="text-xs font-semibold text-emerald-400 mb-4">
                {step.headline}
              </div>

              <p className="text-xs md:text-sm text-neutral-400 leading-relaxed mb-6">
                {step.description}
              </p>
            </div>

            {/* Checklist Highlights */}
            <div className="pt-6 border-t border-white/5 space-y-2.5">
              {step.highlights.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-300">
                  <span className="text-[#F59E0B] shrink-0 font-bold">✔</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

