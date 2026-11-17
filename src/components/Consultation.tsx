"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";

const capabilitiesList = [
  "Custom PCB & Embedded Hardware",
  "IoT Telemetry & M-Pesa Systems",
  "High-Speed Web Platform / Next.js",
  "Retail POS & Inventory System",
  "Faith / Community Cloud Portal",
  "Mobile App & Field Diagnostics",
  "Firmware (C/C++ & FreeRTOS)",
  "Enterprise ERP & Workflow Engine",
];

const projectStages = [
  { id: "concept", label: "Concept / New Build", desc: "Starting fresh from an idea or spec" },
  { id: "prototype", label: "Prototype / R&D Stage", desc: "Validating an existing schematic or MVP" },
  { id: "scaling", label: "Scaling / Modernization", desc: "Upgrading legacy systems or high volume" },
];

export default function Consultation() {
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([
    "Custom PCB & Embedded Hardware",
    "IoT Telemetry & M-Pesa Systems",
  ]);
  const [selectedStage, setSelectedStage] = useState<string>("concept");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [projectBrief, setProjectBrief] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleCapability = (cap: string) => {
    setSelectedCapabilities((prev) =>
      prev.includes(cap) ? prev.filter((c) => c !== cap) : [...prev, cap]
    );
  };

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const stageLabel =
      projectStages.find((s) => s.id === selectedStage)?.label || selectedStage;

    const message = [
      `*Technical Consultation Request — Kila Kitu Technologies*`,
      `---------------------------------------`,
      `*Name:* ${name || "Not provided"}`,
      `*Organization:* ${company || "Not provided"}`,
      `*Phone/WhatsApp:* ${phone || "Not provided"}`,
      `*Project Stage:* ${stageLabel}`,
      `*Required Capabilities:*`,
      selectedCapabilities.length > 0
        ? selectedCapabilities.map((c) => `• ${c}`).join("\n")
        : "• Custom Engineering",
      projectBrief ? `\n*Brief / Objectives:*\n${projectBrief}` : "",
      `---------------------------------------`,
      `Sent via kilakitutech.co.ke/consultation`,
    ]
      .filter(Boolean)
      .join("\n");

    setSubmitted(true);

    const waUrl = siteConfig.whatsappUrl(message);
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="consultation" className="py-24 md:py-32 bg-white relative border-t border-black/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Positioning & 3-Step Process */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50/80 border border-sky-200/60 text-sky-900 font-mono text-xs uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
              ENGINEERING ADVISORY &bull; DIRECT ENGAGEMENT
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-black mb-6">
              Ready to engineer your next system?{" "}
              <span className="editorial-italic text-[#0284C7] font-normal block mt-2">
                Talk directly with our engineers.
              </span>
            </h2>

            <p className="text-sm md:text-base text-neutral-600 leading-relaxed mb-8 font-light">
              Every system we deliver is engineered around your specific operational bottlenecks. We don’t push off-the-shelf templates or charge markups for outsourced contractors—you work with our Nairobi silicon and software leads from day one.
            </p>

            {/* 3-Step Engagement Protocol */}
            <div className="space-y-6 border-t border-black/10 pt-8 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center font-mono text-xs font-bold text-[#0284C7] shrink-0">
                  01
                </div>
                <div>
                  <h4 className="text-sm font-bold text-black uppercase tracking-wider">
                    Technical Scope & Feasibility
                  </h4>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed font-light">
                    We review your architectural requirements, data volumes, or hardware schematics under mutual NDA.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center font-mono text-xs font-bold text-[#0284C7] shrink-0">
                  02
                </div>
                <div>
                  <h4 className="text-sm font-bold text-black uppercase tracking-wider">
                    Fixed-Scope Milestone Blueprint
                  </h4>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed font-light">
                    Transparent deliverables, bill-of-materials, staging dates, and test protocols. Zero ambiguous scope creep.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center font-mono text-xs font-bold text-[#0284C7] shrink-0">
                  03
                </div>
                <div>
                  <h4 className="text-sm font-bold text-black uppercase tracking-wider">
                    Rapid Execution & Kenya Field Deployment
                  </h4>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed font-light">
                    Direct access via WhatsApp/Slack. Real-time test telemetry, staging previews, and hands-on site handover.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Contact Links */}
            <div className="p-5 rounded-xl border border-black/10 bg-neutral-50 space-y-3 shadow-sm">
              <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block font-semibold">
                DIRECT INQUIRY CHANNELS
              </span>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={siteConfig.whatsappUrl("Hi Kila Kitu Tech! I'd like to schedule an engineering consultation.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2.5 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  WhatsApp Direct
                </a>
                <a
                  href={`mailto:${siteConfig.email}?subject=Technical%20Consultation%20Inquiry`}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-white hover:bg-neutral-100 border border-black/10 text-neutral-800 font-mono text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  Email Studio Desk
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Scope Brief Card */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-black/10 bg-neutral-50 p-6 sm:p-10 shadow-sm relative">
              <div className="mb-8">
                <span className="font-mono text-xs text-[#0284C7] uppercase tracking-wider block font-semibold">
                  SYSTEM SCOPE BUILDER
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight mt-1">
                  Draft Your Project Requirements
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1 font-light">
                  Select your required architectural pillars to generate an instant technical briefing for our team.
                </p>
              </div>

              <form onSubmit={handleConsultationSubmit} className="space-y-6">
                {/* 1. Select Capabilities */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-neutral-700 mb-3 font-semibold">
                    1. Select Core Capabilities Needed:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {capabilitiesList.map((cap) => {
                      const isSelected = selectedCapabilities.includes(cap);
                      return (
                        <button
                          key={cap}
                          type="button"
                          onClick={() => toggleCapability(cap)}
                          className={`p-3 rounded-xl border text-left transition-all duration-200 flex items-center justify-between text-xs font-semibold cursor-pointer ${isSelected
                              ? "bg-[#0284C7] text-white border-[#0284C7] shadow-sm shadow-[#0284C7]/20"
                              : "bg-white border-black/10 text-neutral-600 hover:border-[#0284C7]/40 hover:text-black"
                            }`}
                        >
                          <span>{cap}</span>
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${isSelected
                                ? "bg-white text-[#0284C7] font-bold"
                                : "border border-neutral-300 text-transparent"
                              }`}
                          >
                            &check;
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Project Stage */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-neutral-700 mb-3 font-semibold">
                    2. Current Project Lifecycle Stage:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {projectStages.map((stage) => {
                      const isSelected = selectedStage === stage.id;
                      return (
                        <button
                          key={stage.id}
                          type="button"
                          onClick={() => setSelectedStage(stage.id)}
                          className={`p-3 rounded-xl border text-left transition duration-200 cursor-pointer ${isSelected
                              ? "bg-white border-[#0284C7] text-black ring-2 ring-[#0284C7]/40 shadow-sm"
                              : "bg-white border-black/10 text-neutral-500 hover:border-black/20"
                            }`}
                        >
                          <span className="font-bold text-xs block text-black">
                            {stage.label}
                          </span>
                          <span className="text-[11px] text-neutral-500 mt-1 block leading-snug font-light">
                            {stage.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block font-mono text-xs uppercase text-neutral-600 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. David Mwangi"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-black/15 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-[#0284C7] transition"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs uppercase text-neutral-600 mb-2">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+254 7..."
                      className="w-full px-4 py-3 rounded-xl bg-white border border-black/15 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-[#0284C7] transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase text-neutral-600 mb-2">
                    Company / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Apex Logistics Ltd"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-black/15 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-[#0284C7] transition"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase text-neutral-600 mb-2">
                    System Requirements & Scope Notes
                  </label>
                  <textarea
                    rows={3}
                    value={projectBrief}
                    onChange={(e) => setProjectBrief(e.target.value)}
                    placeholder="Briefly describe what you're aiming to build, key timelines, or technical specifications..."
                    className="w-full px-4 py-3 rounded-xl bg-white border border-black/15 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-[#0284C7] transition resize-none"
                  />
                </div>

                {/* Submit CTA */}
                <div>
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-sans font-bold text-sm tracking-wider uppercase text-white bg-black hover:bg-[#0284C7] transition duration-200 shadow-xl shadow-black/10 flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Submit Scope & Open WhatsApp Channel</span>
                    <span className="group-hover:translate-x-1 transition duration-200">&rarr;</span>
                  </button>
                  <p className="font-mono text-[10px] text-center text-neutral-500 mt-3 uppercase tracking-wider">
                    DIRECT DISPATCH TO OUR NAIROBI ENGINEERING LEAD &bull; NO SPAM GUARANTEE
                  </p>
                </div>

                {submitted && (
                  <div className="p-3 rounded-lg bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono text-center">
                    Brief dispatched! If WhatsApp didn't open automatically, reach us directly at +254 700 000 000.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
