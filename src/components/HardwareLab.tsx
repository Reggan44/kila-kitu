"use client";

import { useState } from "react";
import Image from "next/image";

interface PinoutHotspot {
  id: string;
  name: string;
  tag: string;
  x: number;
  y: number;
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
  {
    title: "Ruggedized Field Telemetry Enclosure",
    tag: "MECHANICAL ENCLOSURE",
    image: "/hardware/hardware-enclosure-bench.jpg",
    specs: ["Extruded Aluminum Chassis", "IP67 Silicone Gasket Seal", "SMA & M12 Glands"],
    description:
      "Weatherproof industrial casing with vibration dampening, engineered for Kenyan agricultural, borehole, and fleet environments where dust and moisture resilience are critical.",
  },
  {
    title: "RS-485 Modbus Industrial Sensor Hub",
    tag: "INDUSTRIAL I/O",
    image: "/hardware/iot-sensor-interface.jpg",
    specs: ["Opto-Isolated Modbus RTU", "4-20mA Current Loops", "Transient Voltage Suppressors"],
    description:
      "Multi-channel sensor acquisition unit interfacing digital flow meters, diesel fuel level probes, and solar inverters with automated cloud telemetry forwarding.",
  },
];

export default function HardwareLab() {
  const [activeHotspot, setActiveHotspot] = useState<PinoutHotspot>(hotspots[0]);

  return (
    <section id="hardware" className="py-24 md:py-32 bg-white relative border-t border-black/10 overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50/80 border border-sky-200/60 text-sky-900 font-mono text-xs uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
              PHYSICAL HARDWARE &bull; EMBEDDED R&D LAB
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-black max-w-3xl">
              Where silicon meets software.{" "}
              <span className="editorial-italic text-[#0284C7] font-normal block sm:inline">
                Built and tested in Nairobi.
              </span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-neutral-600 max-w-md leading-relaxed font-light">
            We don’t just write code that lives in browsers. We design custom multi-layer PCBs, flash real-time firmware, and assemble production-grade IoT telemetry hardware for Kenya’s toughest physical environments.
          </p>
        </div>

        {/* Centerpiece: Interactive PCB Pinout Explorer */}
        <div className="mb-20">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <span className="font-mono text-xs text-[#0284C7] tracking-widest uppercase block font-semibold">
                INTERACTIVE HARDWARE SPECIFICATION
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight mt-1">
                Explore the Flagship IoT & Telemetry Hub Architecture
              </h3>
            </div>
            <p className="hidden md:block font-mono text-xs text-neutral-500">
              CLICK HOTSPOTS TO INSPECT CIRCUITRY
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Board viewer with interactive hotspots */}
            <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-black/10 bg-neutral-900 p-2 flex items-center justify-center group shadow-md">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden bg-black">
                <Image
                  src="/hardware/telemetry-hub-main.jpg"
                  alt="Kila Kitu Technologies Telemetry Hub PCB"
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  priority
                />

                {/* Hotspot Markers */}
                {hotspots.map((h) => {
                  const isActive = activeHotspot.id === h.id;
                  return (
                    <button
                      key={h.id}
                      onClick={() => setActiveHotspot(h)}
                      aria-label={`Inspect ${h.name}`}
                      style={{ left: `${h.x}%`, top: `${h.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group/pin z-20 focus:outline-none cursor-pointer"
                    >
                      {/* Pulse ring */}
                      <span
                        className={`absolute -inset-2 rounded-full transition-opacity duration-300 ${
                          isActive
                            ? "bg-[#0284C7]/40 animate-ping opacity-100"
                            : "bg-white/20 opacity-0 group-hover/pin:opacity-100"
                        }`}
                      />
                      {/* Hotspot Core Button */}
                      <span
                        className={`relative w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 shadow-xl ${
                          isActive
                            ? "bg-[#0284C7] text-white scale-110 shadow-lg shadow-[#0284C7]/50 ring-4 ring-[#0284C7]/30"
                            : "bg-white/95 backdrop-blur-md text-black border border-black/30 hover:border-[#0284C7] hover:text-[#0284C7]"
                        }`}
                      >
                        +
                      </span>

                      {/* Tooltip on hover */}
                      <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-0.5 rounded bg-black text-white font-mono text-[10px] whitespace-nowrap opacity-0 group-hover/pin:opacity-100 pointer-events-none transition duration-200 shadow-md">
                        {h.tag}
                      </span>
                    </button>
                  );
                })}

                {/* Bottom status badge */}
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 font-mono text-[10px] text-neutral-300">
                  REVISION 2.4 &bull; ROHS FR-4 PCB &bull; ENIG FINISH
                </div>
              </div>
            </div>

            {/* Spec inspector side panel */}
            <div className="lg:col-span-4 rounded-2xl border border-black/10 bg-neutral-50 p-6 sm:p-8 flex flex-col justify-between relative shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded bg-sky-50 text-sky-700 border border-sky-200 font-mono text-[10px] font-semibold tracking-wider uppercase">
                    {activeHotspot.tag}
                  </span>
                  <span className="font-mono text-xs text-neutral-500">PINOUT SPECS</span>
                </div>

                <h4 className="text-xl sm:text-2xl font-bold text-black tracking-tight mb-2">
                  {activeHotspot.headline}
                </h4>

                <p className="text-sm text-neutral-600 leading-relaxed mb-6 font-light">
                  {activeHotspot.description}
                </p>

                {/* Technical Bullet points */}
                <div className="space-y-2.5 border-t border-black/10 pt-5">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 block mb-2 font-semibold">
                    ENGINEERING ATTRIBUTES
                  </span>
                  {activeHotspot.specs.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] mt-1.5 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-black/10">
                <a
                  href="#consultation"
                  className="w-full block text-center px-5 py-3 rounded-xl bg-black hover:bg-[#0284C7] text-xs font-bold text-white tracking-wider uppercase transition duration-200 shadow-md shadow-black/10 cursor-pointer"
                >
                  Discuss Custom Hardware Architecture &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom 6-Card Hardware Capabilities Grid */}
        <div className="mb-12">
          <div className="mb-8">
            <span className="font-mono text-xs text-[#0284C7] tracking-widest uppercase block font-semibold">
              PORTFOLIO OF SILICON ARTIFACTS
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-black tracking-tight mt-1">
              Engineered Subsystems Ready for Deployment
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hardwareProjects.map((proj, idx) => (
              <div
                key={idx}
                className="studio-card rounded-2xl overflow-hidden border border-black/10 bg-white p-5 flex flex-col justify-between group transition-all duration-300 hover:border-[#0284C7]/40 hover:shadow-lg"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-neutral-900 mb-5 border border-black/5">
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />

                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md border border-black/10 font-mono text-[10px] text-black font-semibold uppercase">
                        {proj.tag}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-black tracking-tight mb-2 group-hover:text-[#0284C7] transition duration-200">
                    {proj.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4 font-light">
                    {proj.description}
                  </p>
                </div>

                {/* Specs tags */}
                <div className="border-t border-black/10 pt-4 flex flex-wrap gap-1.5">
                  {proj.specs.map((s, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-neutral-100 border border-black/5 font-mono text-[10px] text-neutral-700"
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
        <div className="rounded-2xl border border-black/10 bg-neutral-900 text-white p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-xl text-center md:text-left">
            <span className="font-mono text-xs text-[#38BDF8] uppercase tracking-wider block mb-1 font-semibold">
              FULL-STACK CONTINUITY
            </span>
            <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Need custom hardware, firmware, and cloud dashboards synced under one roof?
            </h4>
            <p className="text-sm text-neutral-300 mt-2 font-light">
              Eliminate the vendor finger-pointing between your electronics fabricator and software dev agency.
            </p>
          </div>
          <a
            href="#consultation"
            className="px-6 py-3.5 rounded-full text-xs font-bold tracking-wider text-black bg-white hover:bg-[#38BDF8] transition duration-200 uppercase whitespace-nowrap shadow-md cursor-pointer"
          >
            Commission Hardware R&D &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
