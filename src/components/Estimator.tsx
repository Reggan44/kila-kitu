"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";

interface PlatformOption {
  id: string;
  name: string;
  basePrice: number;
  description: string;
}

interface FeatureOption {
  id: string;
  name: string;
  price: number;
  popular?: boolean;
}

const platforms: PlatformOption[] = [
  {
    id: "web-presence",
    name: "High-Speed Web Platform",
    basePrice: 35000,
    description: "Next.js business site, SEO setup, domain configuration & WhatsApp integration",
  },
  {
    id: "ecommerce",
    name: "E-Commerce & Storefront",
    basePrice: 65000,
    description: "Product catalog, automated cart, M-Pesa checkout & order management",
  },
  {
    id: "pos",
    name: "Retail POS & Inventory System",
    basePrice: 85000,
    description: "Barcode scanning, offline receipts, stock tracking & cashier shift control",
  },
  {
    id: "portal",
    name: "Faith / Community Portal",
    basePrice: 55000,
    description: "Member directory, livestream archive, event booking & M-Pesa giving",
  },
  {
    id: "enterprise",
    name: "Custom Enterprise ERP / Portal",
    basePrice: 140000,
    description: "Multi-department workflows, fleet/logistics tracking & role-based security",
  },
];

const featureList: FeatureOption[] = [
  { id: "mpesa", name: "Daraja M-Pesa Automated STK Push", price: 20000, popular: true },
  { id: "sms", name: "Automated SMS Alerts & Receipts", price: 10000 },
  { id: "offline", name: "Offline-First Local Sync (SQLite)", price: 25000, popular: true },
  { id: "analytics", name: "Executive Business Analytics Dashboard", price: 15000 },
  { id: "auth", name: "Multi-Role Staff Access & Audit Logs", price: 15000 },
  { id: "domain", name: ".co.ke Domain & High-Speed Cloud Setup", price: 8000 },
];

export default function Estimator() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("pos");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "mpesa",
    "offline",
    "analytics",
  ]);
  const [timeline, setTimeline] = useState<"standard" | "express">("standard");

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const currentPlatform =
    platforms.find((p) => p.id === selectedPlatform) || platforms[0];

  const featuresTotal = selectedFeatures.reduce((sum, fId) => {
    const feat = featureList.find((f) => f.id === fId);
    return sum + (feat ? feat.price : 0);
  }, 0);

  const subtotal = currentPlatform.basePrice + featuresTotal;
  const multiplier = timeline === "express" ? 1.25 : 1.0;
  const estimatedMin = Math.round(subtotal * multiplier);
  const estimatedMax = Math.round(estimatedMin * 1.2);

  const formatKes = (amount: number) => {
    return "KES " + amount.toLocaleString();
  };

  const generateWhatsAppMessage = () => {
    const featNames = selectedFeatures
      .map((fId) => featureList.find((f) => f.id === fId)?.name)
      .filter(Boolean)
      .join(", ");

    const text =
      `Hi Kila Kitu Technologies! I used the Project Estimator on kilakitutech.co.ke:\n\n` +
      `• Platform: ${currentPlatform.name}\n` +
      `• Add-on Modules: ${featNames || "None"}\n` +
      `• Timeline: ${timeline === "express" ? "Express (10-14 days)" : "Standard (3-4 weeks)"}\n` +
      `• Ballpark Estimate: ${formatKes(estimatedMin)} - ${formatKes(estimatedMax)}\n\n` +
      `Can we schedule a discovery call to finalize scope?`;

    return siteConfig.whatsappUrl(text);
  };

  return (
    <section id="estimator" className="py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-accent)] mb-4">
          Transparent Kenyan Pricing
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
          Interactive <span className="text-gradient-gold">Project Estimator.</span>
        </h2>
        <p className="mt-3 text-[var(--color-text-secondary)] text-base md:text-lg">
          No hidden fees or unexpected bills. Select the exact modules your business needs
          and generate a transparent estimate in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Left 2 Cols: Selections */}
        <div className="lg:col-span-2 space-y-10">
          {/* Step 1: Platform Type */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[var(--color-accent)] text-black text-xs flex items-center justify-center font-bold">
                1
              </span>
              Select System Archetype
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {platforms.map((p) => {
                const isSelected = selectedPlatform === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPlatform(p.id)}
                    className={`p-4 rounded-2xl text-left transition-all duration-200 border ${
                      isSelected
                        ? "bg-[#181612] border-[var(--color-accent)] shadow-lg shadow-[var(--color-accent)]/10"
                        : "glass-card border-[var(--color-border)] hover:border-white/20"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-bold text-sm text-[var(--color-text-primary)]">
                        {p.name}
                      </div>
                      <div className="text-xs font-semibold text-[var(--color-accent)]">
                        From {formatKes(p.basePrice)}
                      </div>
                    </div>
                    <div className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                      {p.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Essential Capabilities */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[var(--color-accent)] text-black text-xs flex items-center justify-center font-bold">
                2
              </span>
              Select Add-On Modules & Integrations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {featureList.map((f) => {
                const isChecked = selectedFeatures.includes(f.id);
                return (
                  <div
                    key={f.id}
                    onClick={() => toggleFeature(f.id)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 border flex items-center justify-between ${
                      isChecked
                        ? "bg-[#141416] border-[var(--color-accent)]"
                        : "glass-card border-[var(--color-border)] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold transition-colors ${
                          isChecked
                            ? "bg-[var(--color-accent)] text-black"
                            : "border border-neutral-600 bg-neutral-800"
                        }`}
                      >
                        {isChecked && "✓"}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[var(--color-text-primary)]">
                          {f.name}
                        </div>
                        {f.popular && (
                          <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold">
                            Most Requested
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-neutral-400">
                      +{formatKes(f.price)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Delivery Speed */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[var(--color-accent)] text-black text-xs flex items-center justify-center font-bold">
                3
              </span>
              Deployment Timeline
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setTimeline("standard")}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  timeline === "standard"
                    ? "bg-[#181612] border-[var(--color-accent)]"
                    : "glass-card border-[var(--color-border)] hover:border-white/20"
                }`}
              >
                <div className="font-bold text-sm text-white">Standard Delivery</div>
                <div className="text-xs text-neutral-400 mt-0.5">3 to 4 Weeks</div>
              </button>
              <button
                type="button"
                onClick={() => setTimeline("express")}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  timeline === "express"
                    ? "bg-[#181612] border-[var(--color-accent)]"
                    : "glass-card border-[var(--color-border)] hover:border-white/20"
                }`}
              >
                <div className="font-bold text-sm text-white flex items-center justify-between">
                  <span>Fast-Track Sprint</span>
                  <span className="text-[10px] text-[var(--color-accent)] font-semibold">+25%</span>
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">10 to 14 Days Priority</div>
              </button>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Sticky Calculation Box */}
        <div className="lg:sticky lg:top-28 glass-card p-7 md:p-8 rounded-3xl border border-[var(--color-border)] bg-[#121215]">
          <div className="text-xs uppercase tracking-wider text-neutral-400 font-bold mb-2">
            Project Estimate Summary
          </div>
          <div className="text-2xl font-black text-white mb-1">
            {currentPlatform.name}
          </div>
          <div className="text-xs text-neutral-400 mb-6">
            Custom engineered with full source code ownership.
          </div>

          <div className="space-y-3 py-4 border-y border-[var(--color-border)] text-xs">
            <div className="flex justify-between text-neutral-300">
              <span>Base Architecture</span>
              <span className="font-semibold text-white">{formatKes(currentPlatform.basePrice)}</span>
            </div>
            <div className="flex justify-between text-neutral-300">
              <span>Selected Modules ({selectedFeatures.length})</span>
              <span className="font-semibold text-white">+{formatKes(featuresTotal)}</span>
            </div>
            <div className="flex justify-between text-neutral-300">
              <span>Delivery Mode</span>
              <span className="font-semibold text-white capitalize">{timeline}</span>
            </div>
          </div>

          <div className="my-6">
            <div className="text-xs text-neutral-400 mb-1">Estimated Investment Range</div>
            <div className="text-2xl md:text-3xl font-black text-gradient-gold">
              {formatKes(estimatedMin)} – {formatKes(estimatedMax)}
            </div>
            <div className="text-[11px] text-neutral-500 mt-1">
              *Final quote confirmed after 15-minute scoping call.
            </div>
          </div>

          <a
            href={generateWhatsAppMessage()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-xl font-bold text-sm text-center block bg-[var(--color-accent)] text-black hover:bg-[var(--color-accent-hover)] transition-all duration-300 shadow-lg shadow-[var(--color-accent)]/20 hover:scale-105"
          >
            Lock in Estimate on WhatsApp →
          </a>

          <div className="mt-4 text-center">
            <span className="text-[10px] text-neutral-400">
              🔒 Includes free 3-month post-launch warranty & SLA
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

