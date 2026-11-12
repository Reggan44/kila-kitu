export default function About() {
  const stats = [
    { value: "10+", label: "Systems Deployed", detail: "Across East Africa" },
    { value: "99.9%", label: "Platform Uptime", detail: "Mission-critical reliability" },
    { value: "< 1s", label: "Page Load Speed", detail: "Engineered for 3G/4G bundles" },
    { value: "100%", label: "M-Pesa Native", detail: "Daraja C2B/B2C automated" },
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Story & Positioning */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-accent)] mb-6">
            The Kila Kitu Edge
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] mb-6 leading-tight">
            We don’t just build websites. <br />
            <span className="text-gradient-gold">We engineer operational engines.</span>
          </h2>
          <div className="space-y-4 text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed">
            <p>
              Most agencies hand you a slow, generic template, link a contact form, and disappear.
              When your business grows, those sites break, plugin updates fail, and your checkout hangs.
            </p>
            <p>
              <strong className="text-[var(--color-text-primary)]">Kila Kitu Tech</strong> builds
              purpose-engineered software tailored to how African businesses actually operate:
              offline-resilient retail POS, automated M-Pesa reconciliations, scalable directories, and
              rock-solid customer portals.
            </p>
            <p>
              Whether you need to automate inventory across multiple physical stores or launch a nationwide
              digital marketplace, we design, code, and deploy the entire technical ecosystem under one roof.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Full IP & Code Ownership
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Zero Bloatware
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Local 254 Support
            </div>
          </div>
        </div>

        {/* Right Column: Stats Grid */}
        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card p-6 md:p-8 flex flex-col justify-center border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-300 group"
            >
              <div className="text-4xl md:text-5xl font-black text-gradient-gold mb-2 group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-base font-semibold text-[var(--color-text-primary)] mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-[var(--color-text-secondary)]">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
