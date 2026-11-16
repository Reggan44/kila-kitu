"use client";

import { useState } from "react";
import Image from "next/image";

interface PinoutHotspot {
  id: string;
  name: string;
  tag: string;
  x: number; // percentage from left
  y: number; // percentage from top
  headline: string;
  description: string;
  specs: string[];
}

const hotspots: PinoutHotspot[] = [
  {
    id: "cellular",
    name: "Cellular Telemetry & Dual SIM Stage",
    tag: "CONNECTIVITY",
    x: 28,
    y: 35,
    headline: "SIM800C & Quectel Cellular Telemetry Array",
    description:
      "Integrated quad-band GSM/GPRS and LTE-M transceivers engineered for resilient bidirectional telemetry across Safaricom and Airtel networks in remote and urban Kenya.",
    specs: ["Quad-band GSM/GPRS 850/900/1800/1900MHz", "Hardware watchdog auto-reconnect", "Integrated eSIM / Nano-SIM footprint"],
  },
  {
    id: "mcu",
    name: "Cortex-M / ESP32 Compute Engine",
    tag: "SILICON & LOGIC",
    x: 52,
    y: 46,
    headline: "ARM Cortex-M4 / ESP32 Dual-Core Embedded Brain",
    description:
      "Runs bare-metal C/C++ and FreeRTOS firmware routines with real-time sensor ingestion, local cryptographic telemetry signing, and automated failover logging.",
    specs: ["Up to 240MHz 32-bit architecture", "Hardware AES-256 encryption", "Microsecond task scheduling & sleep modes"],
  },
  {
    id: "power",
    name: "Wide-Input Power & Battery PMIC",
    tag: "POWER SYSTEM",
    x: 74,
    y: 65,
    headline: "Industrial Transient-Protected Power Delivery",
    description:
      "Engineered to withstand erratic Kenyan grid fluctuations, automotive 12V/24V alternator spikes, and uninterrupted LiFePO4 / Lead-Acid solar battery buffering.",
    specs: ["9V – 36V wide DC input tolerance", "TVS diode over-voltage & reverse clamp", "Intelligent solar MPPT & Li-ion charge circuit"],
  },
  {
    id: "io",
    name: "Industrial I/O & Isolated Relays",
    tag: "PERIPHERALS",
    x: 82,
    y: 30,
    headline: "Opto-Isolated Field Switching & Modbus Bus",
    description:
      "Galvanically isolated solid-state and mechanical relay banks for heavy machinery control, fuel pump telemetry, and RS-485 Modbus industrial integration.",
    specs: ["3.75kV optical isolation barrier", "RS-485 / Modbus RTU differential transceiver", "Heavy-duty 10A 250VAC switching relays"],
  },
];

const hardwareProjects = [
  {
    title: "SIM800C Cellular & MicroSD Data Logger",
    tag: "REMOTE TELEMETRY",
    image: "/hardware/sim800c-gsm-board.jpg",
    specs: ["SIMCOM SIM800C", "MicroSD SPI Slot", "3.3V LDO Array"],
    description:
      "High-density field telemetry logger buffering environmental and energy data to onboard storage during network dropouts, auto-syncing over GSM when cellular signal restores.",
  },
  {
    title: "AlphaTag V1.0 Asset & Fleet Tracker",
    tag: "GPS & IOT TRACKING",
    image: "/hardware/alphatag-tracker.jpg",
    specs: ["Quectel BG96 LTE/GPS", "Antenova Antenna", "Ultra-Low Sleep <15uA"],
    description:
      "Compact commercial vehicle and asset tracking unit featuring sub-meter GNSS fix, tamper detection, geo-fencing routines, and direct cloud telemetry forwarding.",
  },
  {
    title: "High-Current Power & Inverter Stage",
    tag: "POWER ELECTRONICS",
    image: "/hardware/power-inverter-pcb.jpg",
    specs: ["Toroidal Inductor Core", "Heavy Aluminum Heatsink", "High-Amperage Terminal Blocks"],
    description:
      "Custom power distribution and DC-AC conversion module built for high-duty solar pumps, backup power switches, and industrial battery bank monitoring.",
  },
  {
    title: "STM32 Silicon R&D & Testbench Prototyping",
    tag: "FIRMWARE BENCH",
    image: "/hardware/stm32-rd-prototyping.jpg",
    specs: ["STM32 ARM Core", "ST-Link V2 Debug Hub", "Real-Time Logic Analyzer Hooks"],
    description:
      "Laboratory validation bench for protocol compliance testing, signal integrity analysis, thermal validation, and automated production flash verification.",
  },
];

export default function HardwareLab() {
  const [activeHotspot, setActiveHotspot] = useState<PinoutHotspot>(hotspots[0]);

  return (
    <section id="hardware" className="py-24 md:py-32 bg-[#08090D] relative border-t border-white/10 overflow-hidden">
      {/* Background architectural glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#F59E0B]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[#F59E0B] font-mono text-xs uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
              PHYSICAL HARDWARE &bull; EMBEDDED R&D LAB
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-white max-w-3xl">
              Where silicon meets software.{" "}
              <span className="editorial-italic text-[#F59E0B] font-normal block sm:inline">
                Built and tested in Nairobi.
              </span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-neutral-400 max-w-md leading-relaxed">
            We don’t just write code that lives in browsers. We design custom multi-layer PCBs, flash real-time firmware, and assemble production-grade IoT telemetry hardware for Kenya’s toughest physical environments.
          </p>
        </div>

        {/* 1. Top Split-Banner: Live Production & QA Reel Video */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0E1118] p-1.5 mb-16 shadow-2xl group">
          <div className="relative rounded-xl overflow-hidden aspect-[16/9] md:aspect-[21/9] max-h-[460px] w-full bg-black">
            <video
              src="/hardware/batch-qa-loop.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090D] via-transparent to-black/30 pointer-events-none" />

            {/* Video overlay badges */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-emerald-500/30 font-mono text-[11px] text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                LIVE BENCH QA // MULTI-UNIT TELEMETRY
              </span>
              <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 font-mono text-[11px] text-neutral-300">
                ACTIVE GREEN STATUS LEDS &bull; SMA RF TERMINALS
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[#F59E0B] mb-1">
                  BATCH VALIDATION RUN
                </p>
                <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                  From single prototype boards to burn-in tested production batches.
                </h3>
              </div>
              <a
                href="#consultation"
                className="self-start sm:self-auto px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-xs font-semibold text-white transition tracking-wide uppercase whitespace-nowrap"
              >
                Commission Batch R&D &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* 2. Centerpiece: Interactive PCB Pinout Explorer */}
        <div className="mb-20">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <span className="font-mono text-xs text-[#F59E0B] tracking-widest uppercase block">
                INTERACTIVE HARDWARE SPECIFICATION
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                Explore the Flagship IoT & Telemetry Hub Architecture
              </h3>
            </div>
            <p className="hidden md:block font-mono text-xs text-neutral-400">
              CLICK HOTSPOTS TO INSPECT CIRCUITRY
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Board viewer with interactive hotspots */}
            <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-white/10 bg-[#0E1118] p-2 flex items-center justify-center group">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden bg-black/80">
                <Image
                  src="/hardware/telemetry-hub-main.jpg"
                  alt="Kila Kitu Technologies Telemetry Hub PCB"
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  priority
                />

                {/* Subtle vignette and grid texture */}
                <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-40" />

                {/* Hotspot Markers */}
                {hotspots.map((h) => {
                  const isActive = activeHotspot.id === h.id;
                  return (
                    <button
                      key={h.id}
                      onClick={() => setActiveHotspot(h)}
                      aria-label={`Inspect ${h.name}`}
                      style={{ left: `${h.x}%`, top: `${h.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group/pin z-20 focus:outline-none"
                    >
                      {/* Pulse ring */}
                      <span
                        className={`absolute -inset-2 rounded-full transition-opacity duration-300 ${
                          isActive
                            ? "bg-[#F59E0B]/40 animate-ping opacity-100"
                            : "bg-white/20 opacity-0 group-hover/pin:opacity-100"
                        }`}
                      />
                      {/* Hotspot Core Button */}
                      <span
                        className={`relative w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 shadow-xl ${
                          isActive
                            ? "bg-[#F59E0B] text-[#08090D] scale-110 shadow-[#F59E0B]/50 ring-4 ring-[#F59E0B]/30"
                            : "bg-black/80 backdrop-blur-md text-white border border-white/30 hover:border-[#F59E0B] hover:text-[#F59E0B]"
                        }`}
                      >
                        +
                      </span>

                      {/* Tooltip on hover */}
                      <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-0.5 rounded bg-black/90 backdrop-blur-md border border-white/10 font-mono text-[10px] text-white whitespace-nowrap opacity-0 group-hover/pin:opacity-100 pointer-events-none transition duration-200">
                        {h.tag}
                      </span>
                    </button>
                  );
                })}

                {/* Bottom status badge */}
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 font-mono text-[10px] text-neutral-400">
                  REVISION 2.4 &bull; ROHS FR-4 PCB &bull; ENIG FINISH
                </div>
              </div>
            </div>

            {/* Spec inspector side panel */}
            <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-[#0E1118]/80 backdrop-blur-sm p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded bg-[#F59E0B]/10 border border-[#F59E0B]/20 font-mono text-[10px] font-semibold tracking-wider text-[#F59E0B] uppercase">
                    {activeHotspot.tag}
                  </span>
                  <span className="font-mono text-xs text-neutral-400">PINOUT SPECS</span>
                </div>

                <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                  {activeHotspot.headline}
                </h4>

                <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                  {activeHotspot.description}
                </p>

                {/* Technical Bullet points */}
                <div className="space-y-2.5 border-t border-white/10 pt-5">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 block mb-2">
                    ENGINEERING ATTRIBUTES
                  </span>
                  {activeHotspot.specs.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-1.5 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <a
                  href="#consultation"
                  className="w-full block text-center px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#F59E0B]/50 text-xs font-bold text-white tracking-wider uppercase transition duration-200"
                >
                  Discuss Custom Hardware Architecture &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom 4-Card Hardware Capabilities Grid */}
        <div className="mb-12">
          <div className="mb-8">
            <span className="font-mono text-xs text-[#F59E0B] tracking-widest uppercase block">
              PORTFOLIO OF SILICON ARTIFACTS
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Engineered Subsystems Ready for Deployment
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {hardwareProjects.map((proj, idx) => (
              <div
                key={idx}
                className="studio-card rounded-2xl overflow-hidden border border-white/10 bg-[#0E1118] p-5 flex flex-col justify-between group transition-all duration-300 hover:border-[#F59E0B]/40 hover:-translate-y-1"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/60 mb-5 border border-white/5">
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 font-mono text-[10px] text-neutral-300 uppercase">
                        {proj.tag}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-[#F59E0B] transition duration-200">
                    {proj.title}
                  </h4>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                    {proj.description}
                  </p>
                </div>

                {/* Specs tags */}
                <div className="border-t border-white/10 pt-4 flex flex-wrap gap-2">
                  {proj.specs.map((s, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 font-mono text-[11px] text-neutral-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Banner callout */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#0E1118] via-[#121620] to-[#0E1118] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <span className="font-mono text-xs text-[#F59E0B] uppercase tracking-wider block mb-1">
              FULL-STACK CONTINUITY
            </span>
            <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Need custom hardware, firmware, and cloud dashboards synced under one roof?
            </h4>
            <p className="text-sm text-neutral-400 mt-2">
              Eliminate the vendor finger-pointing between your electronics fabricator and software dev agency.
            </p>
          </div>
          <a
            href="#consultation"
            className="px-6 py-3.5 rounded-full text-xs font-bold tracking-wider text-[#08090D] bg-[#F59E0B] hover:bg-[#FBBF24] transition duration-200 uppercase whitespace-nowrap shadow-lg shadow-[#F59E0B]/20"
          >
            Commission Hardware R&D &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
