const services = [
  {
    icon: "🌐",
    title: "High-Converting Web Platforms",
    description:
      "Next.js/React business sites, e-commerce stores, and media directories built for speed, SEO, and mobile-first Kenyan UX.",
  },
  {
    icon: "💻",
    title: "Custom Business Systems & POS",
    description:
      "Tailored ERPs, school management platforms, inventory trackers, and retail POS systems with real-time analytics.",
  },
  {
    icon: "📱",
    title: "Mobile & Web Applications",
    description:
      "Cross-platform apps with seamless M-Pesa Daraja API, SMS, and payment gateway integrations built for the Kenyan market.",
  },
  {
    icon: "⚙️",
    title: "Smart Hardware & IoT Integration",
    description:
      "Custom embedded systems, sensor telemetry, and automated GSM/cloud alerts for agriculture, logistics, and real estate.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 md:px-12 lg:px-20">
      {/* Section Heading */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          The Kila Kitu Ecosystem
        </h2>
        <p className="text-lg md:text-xl text-[var(--color-text-secondary)]">
          Everything your business needs — engineered under one roof.
        </p>
      </div>

      {/* Service Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <div
            key={service.title}
            className="bg-[#111113] border border-[#2a2a2e] rounded-2xl p-6 backdrop-blur-sm transition-transform duration-300 hover:scale-105 flex flex-col"
          >
            <span className="text-3xl mb-4 block">{service.icon}</span>
            <h3 className="text-xl font-bold text-white mb-3">
              {service.title}
            </h3>
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-5 flex-1">
              {service.description}
            </p>
            <a
              href="#contact"
              className="text-[var(--color-accent)] text-sm font-medium hover:text-[var(--color-accent-hover)] transition-colors"
            >
              Learn more →
            </a>
          </div>
        ))}
      </div>

      {/* Subtle Divider */}
      <div className="max-w-7xl mx-auto mt-20">
        <div className="h-px bg-gradient-to-r from-transparent via-[#2a2a2e] to-transparent" />
      </div>
    </section>
  );
}
