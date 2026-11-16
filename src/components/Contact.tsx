"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";

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
    const waText = `Hi Kila Kitu Technologies!%0A%0AMy Name: ${encodeURIComponent(formData.name)}%0AEmail: ${encodeURIComponent(formData.email)}%0APhone: ${encodeURIComponent(formData.phone)}%0AProject Type: ${encodeURIComponent(formData.projectType)}%0ABudget: ${encodeURIComponent(formData.budget)}%0ABrief: ${encodeURIComponent(formData.message)}`;
    window.open(`https://wa.me/254700000000?text=${waText}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 lg:px-10 max-w-7xl mx-auto border-t border-white/10 bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Left: Contact Info */}
        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-300 uppercase font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>Get in Touch</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
              Tell us about your <br />
              <span className="editorial-italic text-neutral-200 font-normal">vision & timeline.</span>
            </h2>

            <p className="mt-4 text-neutral-400 text-base md:text-lg font-light leading-relaxed">
              We respond to all inquiries within 2 hours during Nairobi business days.
              For urgent scoping consultations, reach out directly on WhatsApp.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0D0D10] border border-white/10 flex items-center justify-center text-lg text-white shrink-0">
                📍
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">Studio Location</div>
                <div className="text-base font-semibold text-white">Nairobi, Kenya</div>
                <div className="text-xs text-neutral-400 font-light">Serving East Africa & Worldwide</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0D0D10] border border-white/10 flex items-center justify-center text-lg text-white shrink-0">
                ✉️
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">Direct Email</div>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-base font-semibold text-white hover:underline transition-colors"
                >
                  {siteConfig.email}
                </a>
                <div className="text-xs text-neutral-400 font-light">Direct founder inbox</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0D0D10] border border-white/10 flex items-center justify-center text-lg text-white shrink-0">
                💬
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">WhatsApp Fast-Track</div>
                <a
                  href={siteConfig.whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-semibold text-white hover:underline"
                >
                  Chat with Kila Kitu Technologies Team &rarr;
                </a>
                <div className="text-xs text-neutral-400 font-light">Fastest response channel in Kenya</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive Form */}
        <div className="studio-card p-8 sm:p-10 rounded-3xl bg-[#0A0A0C]">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="text-5xl">🚀</div>
              <h3 className="text-2xl font-bold text-white">Brief Generated!</h3>
              <p className="text-neutral-400 text-sm font-light">
                WhatsApp opened with your project requirements. We look forward to engineering with you.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-full border border-white/20 text-xs uppercase tracking-wider text-white hover:bg-white/10 transition"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kelvin Mwangi"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-white text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.co.ke"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+254 7..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    Project Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0D0D10] border border-white/10 text-white focus:outline-none focus:border-white text-sm"
                  >
                    <option>High-Speed Web Platform</option>
                    <option>Full-Stack E-Commerce Store</option>
                    <option>Custom Business ERP / POS</option>
                    <option>M-Pesa Daraja Integration</option>
                    <option>Church / Community Platform</option>
                    <option>Custom Hardware / Firmware</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    Target Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0D0D10] border border-white/10 text-white focus:outline-none focus:border-white text-sm"
                  >
                    <option>KES 35,000 - 65,000</option>
                    <option>KES 65,000 - 150,000</option>
                    <option>KES 150,000 - 350,000</option>
                    <option>KES 350,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Project Brief & Current Pain Points
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us what you are building, what is currently manual or slow, and your target timeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-white text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition duration-200 shadow-lg shadow-white/10 cursor-pointer"
              >
                Send Brief to WhatsApp &rarr;
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
