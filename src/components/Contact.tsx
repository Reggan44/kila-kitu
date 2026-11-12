"use client";

import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Custom Web Platform",
    budget: "KES 50,000 - 150,000",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pre-fill WhatsApp message for instant response or log
    const waText = `Hi Kila Kitu Tech!%0A%0AMy Name: ${encodeURIComponent(formData.name)}%0AEmail: ${encodeURIComponent(formData.email)}%0APhone: ${encodeURIComponent(formData.phone)}%0AProject Type: ${encodeURIComponent(formData.projectType)}%0ABudget: ${encodeURIComponent(formData.budget)}%0ABrief: ${encodeURIComponent(formData.message)}`;
    window.open(`https://wa.me/254700000000?text=${waText}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Contact Info */}
        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-accent)] mb-4">
              Get in Touch
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--color-text-primary)]">
              Tell us about your <br />
              <span className="text-gradient-gold">vision & timeline.</span>
            </h2>
            <p className="mt-4 text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed">
              We respond to all inquiries within 2 hours during business days.
              For urgent consultations, hit us directly on WhatsApp.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center text-xl text-[var(--color-accent)] shrink-0">
                📍
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">Location</div>
                <div className="text-base font-semibold text-[var(--color-text-primary)]">Nairobi, Kenya</div>
                <div className="text-sm text-[var(--color-text-secondary)]">Serving East Africa & Worldwide</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center text-xl text-[var(--color-accent)] shrink-0">
                ✉️
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">Official Email</div>
                <a
                  href="mailto:kilakitutechnologies@gmail.com"
                  className="text-base font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors"
                >
                  kilakitutechnologies@gmail.com
                </a>
                <div className="text-sm text-[var(--color-text-secondary)]">Direct founder inbox</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center text-xl text-[var(--color-accent)] shrink-0">
                💬
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">WhatsApp Quick Chat</div>
                <a
                  href="https://wa.me/254700000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-semibold text-[var(--color-accent)] hover:underline"
                >
                  Chat with Kila Kitu Team
                </a>
                <div className="text-sm text-[var(--color-text-secondary)]">Fastest response channel</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive Form */}
        <div className="glass-card p-8 md:p-10 border border-[var(--color-border)]">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="text-5xl">🚀</div>
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">Message Initiated!</h3>
              <p className="text-[var(--color-text-secondary)]">
                WhatsApp opened with your project brief. We look forward to building with you.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2 rounded-full border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Brian Ochieng"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)]/50 focus:outline-none focus:border-[var(--color-accent)] text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="brian@company.co.ke"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)]/50 focus:outline-none focus:border-[var(--color-accent)] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+254 7..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)]/50 focus:outline-none focus:border-[var(--color-accent)] text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
                    System / Project Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] text-sm"
                  >
                    <option>Custom Web Platform</option>
                    <option>Retail POS & Inventory System</option>
                    <option>E-Commerce + M-Pesa Integration</option>
                    <option>Faith / Institutional Portal</option>
                    <option>Legal / Enterprise Software</option>
                    <option>IoT / Hardware Telemetry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
                    Estimated Budget (KES)
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] text-sm"
                  >
                    <option>KES 35,000 - 75,000</option>
                    <option>KES 75,000 - 150,000</option>
                    <option>KES 150,000 - 350,000</option>
                    <option>KES 350,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
                  Project Details / Requirements
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us what you're building, key features needed, and your target launch date..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)]/50 focus:outline-none focus:border-[var(--color-accent)] text-sm resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl font-semibold text-black bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] transition-all duration-300 shadow-md hover:shadow-[var(--color-accent)]/20"
              >
                Send Project Brief via WhatsApp →
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
