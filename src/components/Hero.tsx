"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";

const GRID_STEP = 40;

function computePolylineLengths(points: { x: number; y: number }[]) {
  const segLengths: number[] = [];
  let total = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const len = Math.hypot(points[i + 1].x - points[i].x, points[i + 1].y - points[i].y);
    segLengths.push(len);
    total += len;
  }
  return { segLengths, total };
}

function getPointAtDistance(
  points: { x: number; y: number }[],
  segLengths: number[],
  dist: number
) {
  let remaining = dist;
  for (let i = 0; i < segLengths.length; i++) {
    const len = segLengths[i];
    if (remaining <= len || i === segLengths.length - 1) {
      const ratio = len === 0 ? 0 : Math.max(0, Math.min(1, remaining / len));
      return {
        x: points[i].x + (points[i + 1].x - points[i].x) * ratio,
        y: points[i].y + (points[i + 1].y - points[i].y) * ratio,
      };
    }
    remaining -= len;
  }
  return points[points.length - 1];
}

function drawGridCircuitStreak(
  ctx: CanvasRenderingContext2D,
  pathObj: { points: { x: number; y: number }[]; segLengths: number[]; total: number },
  headDist: number,
  tailLen: number,
  colorRGB: string,
  lineWidth: number
) {
  const { points, segLengths, total } = pathObj;
  if (total <= 0) return;

  const startDist = Math.max(0, headDist - tailLen);
  const endDist = Math.min(total, headDist);
  if (endDist <= startDist) return;

  const steps = 32;
  for (let i = 0; i < steps; i++) {
    const d1 = startDist + ((endDist - startDist) * i) / steps;
    const d2 = startDist + ((endDist - startDist) * (i + 1)) / steps;
    const ratio = i / steps;

    const p1 = getPointAtDistance(points, segLengths, d1);
    const p2 = getPointAtDistance(points, segLengths, d2);

    const alpha = Math.pow(ratio, 1.7) * 0.9;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = `rgba(${colorRGB}, ${alpha})`;
    ctx.lineWidth = lineWidth * (0.4 + 0.6 * ratio);
    ctx.lineCap = "round";
    ctx.stroke();
  }

  // Soft radial head glow
  if (headDist >= 0 && headDist <= total + 20) {
    const clampedDist = Math.min(total, headDist);
    const headPt = getPointAtDistance(points, segLengths, clampedDist);

    const glow = ctx.createRadialGradient(headPt.x, headPt.y, 0, headPt.x, headPt.y, 13);
    glow.addColorStop(0, "rgba(255, 255, 255, 0.95)");
    glow.addColorStop(0.3, `rgba(${colorRGB}, 0.8)`);
    glow.addColorStop(1, `rgba(${colorRGB}, 0)`);

    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(headPt.x, headPt.y, 13, 0, Math.PI * 2);
    ctx.fill();
  }
}

function createArchitecturalGridPath(width: number, height: number, seedIndex: number) {
  const cols = Math.ceil(width / GRID_STEP);
  const rows = Math.ceil(height / GRID_STEP);
  const isHorizontal = seedIndex % 2 === 0;
  const points: { x: number; y: number }[] = [];

  if (isHorizontal) {
    const startRow = 2 + ((seedIndex * 3) % Math.max(4, rows - 4));
    const y1 = startRow * GRID_STEP;
    const jogCol = Math.floor(cols * (0.32 + ((seedIndex * 17) % 35) / 100));
    const jogDir = seedIndex % 4 === 0 ? 1 : -1;
    const jogSteps = 2;

    points.push({ x: 0, y: y1 });
    points.push({ x: jogCol * GRID_STEP, y: y1 });
    points.push({
      x: (jogCol + jogSteps) * GRID_STEP,
      y: (startRow + jogDir * jogSteps) * GRID_STEP,
    });
    points.push({
      x: cols * GRID_STEP + GRID_STEP,
      y: (startRow + jogDir * jogSteps) * GRID_STEP,
    });
  } else {
    const startCol = 3 + ((seedIndex * 5) % Math.max(5, cols - 6));
    const x1 = startCol * GRID_STEP;
    const jogRow = Math.floor(rows * (0.28 + ((seedIndex * 23) % 40) / 100));
    const jogDir = seedIndex % 3 === 0 ? 1 : -1;
    const jogSteps = 2;

    points.push({ x: x1, y: 0 });
    points.push({ x: x1, y: jogRow * GRID_STEP });
    points.push({
      x: (startCol + jogDir * jogSteps) * GRID_STEP,
      y: (jogRow + jogSteps) * GRID_STEP,
    });
    points.push({
      x: (startCol + jogDir * jogSteps) * GRID_STEP,
      y: rows * GRID_STEP + GRID_STEP,
    });
  }

  const { segLengths, total } = computePolylineLengths(points);
  return {
    points,
    segLengths,
    total,
    color: seedIndex % 3 === 0 ? "56, 189, 248" : "245, 158, 11",
    speed: 240 + (seedIndex % 4) * 55,
    tailLen: 150 + (seedIndex % 3) * 45,
    phaseOffset: (seedIndex * 310) % 1200,
    width: seedIndex % 3 === 0 ? 1.6 : 2.0,
  };
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeLayer, setActiveLayer] = useState<1 | 2 | 3>(1);

  const liveSites = [
    {
      name: "Sofiya Nzau",
      domain: "sofiyanzau.com",
      url: "https://www.sofiyanzau.com/",
      tag: "Global Afrohouse ('Mwaki')",
      img: "/projects/sofiya-logo.png",
    },
    {
      name: "Nzuki & Co. Advocates",
      domain: "nzukilawassociates.co.ke",
      url: "https://www.nzukilawassociates.co.ke/",
      tag: "Hazina Towers Corporate Law",
      img: "/projects/law-hero.png",
    },
    {
      name: "MyIbada",
      domain: "myibada.co.ke",
      url: "https://myibada.co.ke/",
      tag: "Church Platform & M-Pesa",
      img: "/projects/myibada-hero.jpg",
    },
    {
      name: "Meed Collections",
      domain: "meedcollections.store",
      url: "https://www.meedcollections.store/",
      tag: "Next.js + IntaSend Store",
      img: "/projects/meed-banner2.png",
    },
  ];

  const layerSpecs = {
    1: {
      badge: "LAYER 01 / 03",
      metricLeft: "BUS: 3.3V / 5V REGULATED",
      metricRight: "SCHEMATIC: VERIFIED",
      title: "Custom Multi-Layer PCB Design & Industrial Sensor Nodes",
      description:
        "Schematic capture, high-density KiCad/Altium routing, ESP32/STM32 microcontroller architecture, and ruggedized enclosures engineered for Kenyan field conditions.",
      deployment:
        "Automated cold-chain & water-level telemetry boards deployed across Nairobi & Kiambu commercial facilities.",
    },
    2: {
      badge: "LAYER 02 / 03",
      metricLeft: "RTOS: C++20 // TLS-MQTT",
      metricRight: "FAILOVER: FLASH BUFFER",
      title: "Deterministic Embedded Firmware & Edge Telemetry",
      description:
        "Low-power C/C++ firmware with offline flash ring-buffering, GSM/4G cellular modems, LoRa long-range mesh links, and encrypted OTA firmware updates.",
      deployment:
        "Solar & generator remote fuel-monitoring units transmitting real-time GSM/MQTT alerts across off-grid sites.",
    },
    3: {
      badge: "LAYER 03 / 03",
      metricLeft: "API: < 45ms LATENCY",
      metricRight: "DARAJA STK: AUTOMATED",
      title: "Enterprise Cloud Dashboards, Web Apps & M-Pesa Integration",
      description:
        "High-speed Next.js web platforms, custom ERP/POS inventory systems, mobile apps, and automated Safaricom Daraja M-Pesa STK Push reconciliation.",
      deployment:
        "Multi-branch retail POS & automated M-Pesa billing portals serving Kenyan SMEs and enterprise teams.",
    },
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let animActive = true;
    let mousePos = { x: -1000, y: -1000 };
    let ambientGridTracks: ReturnType<typeof createArchitecturalGridPath>[] = [];
    let cursorPulseTracks: any[] = [];
    let lastCursorSpawnCell = "";

    const resize = () => {
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
      ambientGridTracks = [];
      const trackCount = Math.max(7, Math.min(12, Math.floor(canvas.width / 130)));
      for (let i = 0; i < trackCount; i++) {
        ambientGridTracks.push(createArchitecturalGridPath(canvas.width, canvas.height, i));
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnCursorLanePulse = (gx: number, gy: number) => {
      const horizontal = Math.random() > 0.45;
      const dir = Math.random() > 0.5 ? 1 : -1;
      const span = 240 + Math.floor(Math.random() * 4) * GRID_STEP;
      const pts = horizontal
        ? [{ x: gx, y: gy }, { x: gx + dir * span, y: gy }]
        : [{ x: gx, y: gy }, { x: gx, y: gy + dir * span }];

      const { segLengths, total } = computePolylineLengths(pts);
      cursorPulseTracks.push({
        points: pts,
        segLengths,
        total,
        color: Math.random() > 0.35 ? "245, 158, 11" : "56, 189, 248",
        born: performance.now(),
        speed: 360,
        tailLen: 110,
        width: 1.8,
      });

      if (cursorPulseTracks.length > 14) {
        cursorPulseTracks.shift();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.x = e.clientX - rect.left;
      mousePos.y = e.clientY - rect.top;

      const snapX = Math.round(mousePos.x / GRID_STEP) * GRID_STEP;
      const snapY = Math.round(mousePos.y / GRID_STEP) * GRID_STEP;
      const cellKey = `${snapX},${snapY}`;
      if (cellKey !== lastCursorSpawnCell && mousePos.y >= 0 && mousePos.y <= canvas.height) {
        lastCursorSpawnCell = cellKey;
        if (Math.random() > 0.45) {
          spawnCursorLanePulse(snapX, snapY);
        }
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    const render = (now: number) => {
      if (!animActive) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const tSec = now * 0.001;

      // 1. Cursor Spotlight illuminating nearby grid intersections
      if (mousePos.x > 0 && mousePos.y > 0) {
        const radius = 175;
        const startX = Math.floor((mousePos.x - radius) / GRID_STEP) * GRID_STEP;
        const endX = Math.ceil((mousePos.x + radius) / GRID_STEP) * GRID_STEP;
        const startY = Math.floor((mousePos.y - radius) / GRID_STEP) * GRID_STEP;
        const endY = Math.ceil((mousePos.y + radius) / GRID_STEP) * GRID_STEP;

        const spot = ctx.createRadialGradient(mousePos.x, mousePos.y, 0, mousePos.x, mousePos.y, radius);
        spot.addColorStop(0, "rgba(245, 158, 11, 0.055)");
        spot.addColorStop(0.55, "rgba(56, 189, 248, 0.025)");
        spot.addColorStop(1, "rgba(7, 9, 14, 0)");
        ctx.fillStyle = spot;
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, radius, 0, Math.PI * 2);
        ctx.fill();

        for (let gx = startX; gx <= endX; gx += GRID_STEP) {
          for (let gy = startY; gy <= endY; gy += GRID_STEP) {
            const dist = Math.hypot(gx - mousePos.x, gy - mousePos.y);
            if (dist < radius) {
              const intensity = 1 - dist / radius;
              const isMajorNode = gx % 200 === 0 && gy % 200 === 0;
              ctx.beginPath();
              ctx.arc(gx, gy, isMajorNode ? 2.4 : 1.4, 0, Math.PI * 2);
              ctx.fillStyle = isMajorNode
                ? `rgba(245, 158, 11, ${intensity * 0.9})`
                : `rgba(226, 232, 240, ${intensity * 0.42})`;
              ctx.fill();
            }
          }
        }
      }

      // 2. Render continuous NVIDIA-style circuit streaks along grid tracks
      ambientGridTracks.forEach((track) => {
        ctx.beginPath();
        ctx.moveTo(track.points[0].x, track.points[0].y);
        for (let k = 1; k < track.points.length; k++) {
          ctx.lineTo(track.points[k].x, track.points[k].y);
        }
        ctx.strokeStyle = "rgba(255, 255, 255, 0.028)";
        ctx.lineWidth = 1;
        ctx.stroke();

        const midPt = track.points[Math.floor(track.points.length / 2)];
        const cursorBoost =
          mousePos.x > 0 && Math.hypot(midPt.x - mousePos.x, midPt.y - mousePos.y) < 220
            ? 1.35
            : 1.0;

        const cycleDist = track.total + track.tailLen + 260;
        const headDist = (tSec * track.speed * cursorBoost + track.phaseOffset) % cycleDist;
        drawGridCircuitStreak(ctx, track, headDist, track.tailLen, track.color, track.width);
      });

      // 3. Render cursor-triggered lane pulses
      for (let i = cursorPulseTracks.length - 1; i >= 0; i--) {
        const cp = cursorPulseTracks[i];
        const ageSec = (now - cp.born) / 1000;
        const headDist = ageSec * cp.speed;
        if (headDist > cp.total + cp.tailLen) {
          cursorPulseTracks.splice(i, 1);
        } else {
          drawGridCircuitStreak(ctx, cp, headDist, cp.tailLen, cp.color, cp.width);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      animActive = false;
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const currentLayer = layerSpecs[activeLayer];

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden blueprint-grid pt-24 pb-12">
      {/* NVIDIA Build-Style Orthogonal & 45° Beveled Circuit Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Depth Lighting Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_68%_42%,rgba(245,158,11,0.065)_0%,rgba(56,189,248,0.035)_38%,#07090E_84%)] pointer-events-none z-0" />

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 flex-grow flex items-center w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center w-full">
          {/* Left Column: Architectural Storytelling (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Studio Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0B0F17]/90 border border-neutral-800 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] signal-dot" />
              <span className="font-mono text-[11px] font-medium tracking-widest text-slate-300 uppercase">
                NAIROBI, KENYA &bull; FULL-STACK ENGINEERING STUDIO
              </span>
            </div>

            {/* Primary Headline */}
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight text-white leading-[1.08]">
              Outgrow the manual.<br />
              <span className="bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#D97706] bg-clip-text text-transparent">
                Build systems that scale.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              From custom PCB design and embedded firmware to cloud APIs and web/mobile platforms—we engineer every layer of your technology in Nairobi under one roof. Zero finger-pointing.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => {
                  setActiveLayer((prev) => (prev < 3 ? ((prev + 1) as 1 | 2 | 3) : 1));
                  const el = document.getElementById("live-signal-card");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3.5 rounded-xl bg-[#F59E0B] hover:bg-[#FBBF24] text-[#07090E] font-bold text-sm tracking-wide transition shadow-lg shadow-[#F59E0B]/20 flex items-center gap-2.5 cursor-pointer"
              >
                <span>Explore Our Architecture</span>
                <span>→</span>
              </button>

              <a
                href={siteConfig.whatsappUrl(
                  "Hi Kila Kitu Technologies! I want to discuss a full-stack digital/hardware system for my business."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-[#0B0F17]/90 hover:bg-[#0F1522] border border-neutral-800 hover:border-neutral-600 text-white font-semibold text-sm tracking-wide transition flex items-center gap-2.5 shadow-sm"
              >
                <span>Chat on WhatsApp / Book Call</span>
              </a>
            </div>

            {/* Studio Capabilities Strip */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-800/80 max-w-xl">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">Silicon &amp; PCB</div>
                <div className="text-xs text-slate-400 mt-0.5">Custom Multi-Layer Boards</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-[#F59E0B]">Edge Firmware</div>
                <div className="text-xs text-slate-400 mt-0.5">GSM, LoRa &amp; Real-Time RTOS</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">Cloud &amp; M-Pesa</div>
                <div className="text-xs text-slate-400 mt-0.5">Web Apps, APIs &amp; Daraja STK</div>
              </div>
            </div>

            {/* Live Client Sites Quick-Strip */}
            <div className="pt-6 border-t border-white/5 max-w-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Live Client Sites in Production
                </span>
                <a href="#portfolio" className="text-xs text-[#F59E0B] hover:underline font-semibold">
                  View All Case Studies →
                </a>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {liveSites.map((site) => (
                  <a
                    key={site.domain}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-[#0B0F17]/80 border border-neutral-800 hover:border-[#F59E0B] transition flex items-center gap-2.5 group"
                  >
                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-black/60 shrink-0 border border-white/5">
                      <img src={site.img} alt={site.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold text-white group-hover:text-[#F59E0B] truncate">
                        {site.name}
                      </div>
                      <div className="text-[10px] font-mono text-emerald-400 truncate">
                        {site.domain} ↗
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3-Layer Hardware-to-Cloud Architecture Card (5 Cols) */}
          <div id="live-signal-card" className="lg:col-span-5">
            <div className="studio-glass border border-neutral-800 rounded-2xl p-5 sm:p-6 relative overflow-hidden">
              {/* Subtle Top Accent Glow Line */}
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#F59E0B]/70 to-transparent" />

              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 signal-dot" />
                  <span className="font-mono text-xs font-semibold tracking-wider text-slate-200 uppercase">
                    Hardware-to-Cloud Architecture
                  </span>
                </div>
                <span className="font-mono text-[10px] px-2.5 py-1 rounded-md bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] font-medium">
                  {currentLayer.badge}
                </span>
              </div>

              {/* Interactive Layer Tabs */}
              <div className="grid grid-cols-3 gap-2 my-4">
                <button
                  type="button"
                  onClick={() => setActiveLayer(1)}
                  className={`px-2.5 py-2.5 rounded-xl font-mono text-[10px] sm:text-[11px] text-left transition cursor-pointer ${
                    activeLayer === 1
                      ? "bg-[#F59E0B]/15 border border-[#F59E0B]/50 text-[#F59E0B] font-semibold"
                      : "bg-[#07090E]/70 hover:bg-[#0F1522] border border-neutral-800 text-slate-400 hover:text-slate-200 font-medium"
                  }`}
                >
                  <span className="block text-[9px] opacity-75">01.</span>
                  Custom PCB &amp; Sensors
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLayer(2)}
                  className={`px-2.5 py-2.5 rounded-xl font-mono text-[10px] sm:text-[11px] text-left transition cursor-pointer ${
                    activeLayer === 2
                      ? "bg-[#F59E0B]/15 border border-[#F59E0B]/50 text-[#F59E0B] font-semibold"
                      : "bg-[#07090E]/70 hover:bg-[#0F1522] border border-neutral-800 text-slate-400 hover:text-slate-200 font-medium"
                  }`}
                >
                  <span className="block text-[9px] opacity-75">02.</span>
                  Embedded Firmware
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLayer(3)}
                  className={`px-2.5 py-2.5 rounded-xl font-mono text-[10px] sm:text-[11px] text-left transition cursor-pointer ${
                    activeLayer === 3
                      ? "bg-[#F59E0B]/15 border border-[#F59E0B]/50 text-[#F59E0B] font-semibold"
                      : "bg-[#07090E]/70 hover:bg-[#0F1522] border border-neutral-800 text-slate-400 hover:text-slate-200 font-medium"
                  }`}
                >
                  <span className="block text-[9px] opacity-75">03.</span>
                  Cloud API &amp; M-Pesa Web
                </button>
              </div>

              {/* Schematic Trace Preview Viewport with Live Animated Data-Packet Traces */}
              <div className="relative h-52 rounded-xl bg-[#07090E] border border-neutral-800 overflow-hidden p-4 flex items-center justify-center mb-4">
                <div className="absolute inset-0 blueprint-grid opacity-80" />

                {/* SVG Architectural Schematic Diagram */}
                <svg
                  className="relative z-10 w-full h-full max-w-[330px]"
                  viewBox="0 0 330 180"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Layer 1: Custom PCB & Sensors */}
                  <g className={`transition-opacity duration-300 ${activeLayer === 1 ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    <path d="M 28 50 L 95 50 L 118 72" stroke="rgba(56,189,248,0.28)" strokeWidth="1.6" />
                    <path d="M 28 90 L 118 90" stroke="rgba(245,158,11,0.35)" strokeWidth="2" />
                    <path d="M 28 130 L 95 130 L 118 108" stroke="rgba(56,189,248,0.28)" strokeWidth="1.6" />
                    <path d="M 212 72 L 235 50 L 302 50" stroke="rgba(245,158,11,0.28)" strokeWidth="1.6" />
                    <path d="M 212 90 L 302 90" stroke="rgba(245,158,11,0.35)" strokeWidth="2" />
                    <path d="M 212 108 L 235 130 L 302 130" stroke="rgba(56,189,248,0.28)" strokeWidth="1.6" />

                    <path d="M 28 50 L 95 50 L 118 72" stroke="#38BDF8" strokeWidth="1.8" className="schematic-packet-line-slow" />
                    <path d="M 28 90 L 118 90" stroke="#FBBF24" strokeWidth="2.2" className="schematic-packet-line" />
                    <path d="M 28 130 L 95 130 L 118 108" stroke="#38BDF8" strokeWidth="1.8" className="schematic-packet-line-slow" />
                    <path d="M 212 72 L 235 50 L 302 50" stroke="#F59E0B" strokeWidth="1.8" className="schematic-packet-line-slow" />
                    <path d="M 212 90 L 302 90" stroke="#FBBF24" strokeWidth="2.2" className="schematic-packet-line" />
                    <path d="M 212 108 L 235 130 L 302 130" stroke="#38BDF8" strokeWidth="1.8" className="schematic-packet-line-slow" />

                    <circle cx="28" cy="50" r="3.5" fill="#07090E" stroke="#38BDF8" strokeWidth="1.8" />
                    <circle cx="28" cy="90" r="4" fill="#07090E" stroke="#FBBF24" strokeWidth="2" />
                    <circle cx="28" cy="130" r="3.5" fill="#07090E" stroke="#38BDF8" strokeWidth="1.8" />
                    <circle cx="302" cy="50" r="3.5" fill="#07090E" stroke="#F59E0B" strokeWidth="1.8" />
                    <circle cx="302" cy="90" r="4" fill="#07090E" stroke="#FBBF24" strokeWidth="2" />
                    <circle cx="302" cy="130" r="3.5" fill="#07090E" stroke="#38BDF8" strokeWidth="1.8" />

                    <rect x="118" y="48" width="94" height="84" rx="10" fill="#0B0F17" stroke="#F59E0B" strokeWidth="1.8" />
                    <rect x="129" y="59" width="72" height="62" rx="6" fill="rgba(245, 158, 11, 0.08)" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                    <text x="165" y="87" textAnchor="middle" fill="#F8FAFC" fontFamily="monospace" fontSize="11" fontWeight="600">
                      KKT-PCB
                    </text>
                    <text x="165" y="103" textAnchor="middle" fill="#F59E0B" fontFamily="monospace" fontSize="8.5">
                      4-LAYER BOARD
                    </text>
                  </g>

                  {/* Layer 2: Embedded Firmware */}
                  <g className={`transition-opacity duration-300 ${activeLayer === 2 ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    <path d="M 24 68 L 72 68 L 92 48 L 138 48 L 158 68 L 204 68 L 224 48 L 302 48" stroke="rgba(56,189,248,0.28)" strokeWidth="1.6" fill="none" />
                    <path d="M 28 118 L 72 118 L 72 96 L 122 96 L 122 118 L 172 118 L 172 96 L 222 96 L 222 118 L 302 118" stroke="rgba(245,158,11,0.3)" strokeWidth="1.6" fill="none" />
                    <path d="M 24 68 L 72 68 L 92 48 L 138 48 L 158 68 L 204 68 L 224 48 L 302 48" stroke="#38BDF8" strokeWidth="2" fill="none" className="schematic-packet-line" />
                    <path d="M 28 118 L 72 118 L 72 96 L 122 96 L 122 118 L 172 118 L 172 96 L 222 96 L 222 118 L 302 118" stroke="#FBBF24" strokeWidth="2" fill="none" className="schematic-packet-line-slow" />
                    <rect x="92" y="14" width="146" height="22" rx="6" fill="#0B0F17" stroke="#38BDF8" strokeWidth="1.2" />
                    <text x="165" y="28" textAnchor="middle" fill="#38BDF8" fontFamily="monospace" fontSize="8.5" fontWeight="600">
                      RTOS // TLS-MQTT STREAM
                    </text>
                    <text x="165" y="152" textAnchor="middle" fill="#94A3B8" fontFamily="monospace" fontSize="8.5">
                      FLASH FAILOVER: VERIFIED &bull; 4G/LoRa
                    </text>
                  </g>

                  {/* Layer 3: Cloud API & M-Pesa Web */}
                  <g className={`transition-opacity duration-300 ${activeLayer === 3 ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    <rect x="24" y="42" width="76" height="44" rx="8" fill="#0B0F17" stroke="#38BDF8" strokeWidth="1.5" />
                    <text x="62" y="61" textAnchor="middle" fill="#F8FAFC" fontFamily="monospace" fontSize="9" fontWeight="600">
                      FIELD NODE
                    </text>
                    <text x="62" y="75" textAnchor="middle" fill="#38BDF8" fontFamily="monospace" fontSize="8">
                      TELEMETRY
                    </text>

                    <path d="M 100 64 L 114 64 L 114 92 L 122 92" stroke="rgba(245,158,11,0.3)" strokeWidth="1.6" />
                    <path d="M 100 64 L 114 64 L 114 92 L 122 92" stroke="#FBBF24" strokeWidth="2" className="schematic-packet-line" />

                    <rect x="122" y="68" width="86" height="48" rx="8" fill="rgba(245, 158, 11, 0.1)" stroke="#F59E0B" strokeWidth="1.8" />
                    <text x="165" y="89" textAnchor="middle" fill="#F8FAFC" fontFamily="monospace" fontSize="9.5" fontWeight="600">
                      KKT CLOUD
                    </text>
                    <text x="165" y="103" textAnchor="middle" fill="#FBBF24" fontFamily="monospace" fontSize="8">
                      REST + WEB APP
                    </text>

                    <path d="M 208 92 L 218 92 L 218 126 L 226 126" stroke="rgba(16,185,129,0.35)" strokeWidth="1.6" />
                    <path d="M 208 92 L 218 92 L 218 126 L 226 126" stroke="#10B981" strokeWidth="2" className="schematic-packet-line" />

                    <rect x="226" y="104" width="80" height="44" rx="8" fill="#0B0F17" stroke="#10B981" strokeWidth="1.6" />
                    <text x="266" y="123" textAnchor="middle" fill="#10B981" fontFamily="monospace" fontSize="9" fontWeight="600">
                      M-PESA STK
                    </text>
                    <text x="266" y="137" textAnchor="middle" fill="#CBD5E1" fontFamily="monospace" fontSize="8">
                      RECONCILED
                    </text>
                  </g>
                </svg>

                {/* Bottom Telemetry Bar */}
                <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between font-mono text-[10px] text-slate-400">
                  <span>{currentLayer.metricLeft}</span>
                  <span className="text-[#F59E0B]">{currentLayer.metricRight}</span>
                </div>
              </div>

              {/* Architectural Specs Description */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {currentLayer.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {currentLayer.description}
                  </p>
                </div>

                {/* Real-World Kenyan Deployment Pill */}
                <div className="p-3 rounded-xl bg-[#07090E]/90 border border-neutral-800 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center shrink-0 mt-0.5 text-xs text-[#F59E0B]">
                    📍
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#F59E0B] uppercase tracking-wider font-semibold block">
                      Kenyan Deployment Example
                    </span>
                    <span className="text-xs text-slate-300 leading-snug block mt-0.5">
                      {currentLayer.deployment}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
