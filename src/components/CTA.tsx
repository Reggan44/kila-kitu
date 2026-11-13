export default function CTA() {
  const whatsappUrl =
    "https://wa.me/254700000000?text=" +
    encodeURIComponent(
      "Hi Kila Kitu Technologies! I want to discuss a new software/web platform project for my business."
    );

  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-gradient-to-br from-[#131316] via-[#1a1710] to-[#111113] p-10 md:p-16 text-center">
        {/* Glow ambient background element */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-accent)]">
            Ready to Build?
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
            Let’s Engineer Your Next <br />
            <span className="text-gradient-gold">Competitive Advantage.</span>
          </h2>

          <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Stop losing customers to slow, clunky websites or manual pen-and-paper tracking.
            Tell us what your business needs — we will build the exact system to scale it.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-black bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] transition-all duration-300 shadow-lg shadow-[var(--color-accent)]/20 hover:scale-105"
            >
              Start a Project on WhatsApp →
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full font-medium text-[var(--color-text-primary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-bg-tertiary)] transition-all duration-300"
            >
              Send Project Brief
            </a>
          </div>

          <div className="pt-6 text-xs text-[var(--color-text-secondary)]">
            Direct WhatsApp discovery • Fast turnaround • Custom Kenyan pricing
          </div>
        </div>
      </div>
    </section>
  );
}

