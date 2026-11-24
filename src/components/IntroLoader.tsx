"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

/* ─── Timing constants (seconds) ─── */
const T_DRAW_DUR = 1.05;
const T_LOCKED = 0.85;
const T_WORDMARK = 1.18;
const T_TAGLINE = 1.45;
const T_RETRACT_START = 2.2;
const T_RETRACT_DUR = 0.6;
const T_EXIT = 2.85;
const T_DONE = 3.1;

/* ─── Polyline math ─── */
function computeSegLengths(points: { x: number; y: number }[]) {
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
): { x: number; y: number } {
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

/* ─── Trace interface ─── */
interface PcbTrace {
  points: { x: number; y: number }[];
  segLengths: number[];
  total: number;
  colorRGB: string;
  width: number;
  hasResistor: boolean;
  delay: number;
}

/* ─── Draw a single PCB trace with pulse ─── */
function drawPcbTrace(
  ctx: CanvasRenderingContext2D,
  trace: PcbTrace,
  drawnDist: number,
  pulseDist: number
) {
  const { points, segLengths, total, colorRGB, width, hasResistor } = trace;
  if (drawnDist <= 0 || total <= 0) return;
  const clampedDraw = Math.min(total, drawnDist);

  /* ── Solid copper/cyan base trace ── */
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  let accum = 0;
  for (let i = 0; i < segLengths.length; i++) {
    const segLen = segLengths[i];
    if (accum + segLen <= clampedDraw) {
      ctx.lineTo(points[i + 1].x, points[i + 1].y);
      accum += segLen;
    } else {
      const rem = clampedDraw - accum;
      const r = segLen === 0 ? 0 : rem / segLen;
      ctx.lineTo(
        points[i].x + (points[i + 1].x - points[i].x) * r,
        points[i].y + (points[i + 1].y - points[i].y) * r
      );
      break;
    }
  }
  ctx.strokeStyle = `rgba(${colorRGB}, 0.45)`;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();

  /* ── Inline SMD Resistor Node ── */
  if (hasResistor && clampedDraw > total * 0.45 && segLengths[0] > 42) {
    const rPt = getPointAtDistance(points, segLengths, segLengths[0] * 0.55);
    ctx.fillStyle = "#05080F";
    ctx.strokeStyle = `rgba(${colorRGB}, 0.85)`;
    ctx.lineWidth = 1.2;
    ctx.fillRect(rPt.x - 6, rPt.y - 3, 12, 6);
    ctx.strokeRect(rPt.x - 6, rPt.y - 3, 12, 6);
  }

  /* ── Glowing Solder Via at the drawing tip ── */
  const tipPt = getPointAtDistance(points, segLengths, clampedDraw);
  ctx.beginPath();
  ctx.arc(tipPt.x, tipPt.y, 2.8, 0, Math.PI * 2);
  ctx.fillStyle = "#05080F";
  ctx.fill();
  ctx.lineWidth = 1.7;
  ctx.strokeStyle = `rgba(${colorRGB}, 0.95)`;
  ctx.stroke();

  /* ── Fast Electric Light Pulse gliding inward ── */
  if (pulseDist > 0 && pulseDist < clampedDraw + 75) {
    const tailLen = 80;
    const pStart = Math.max(0, pulseDist - tailLen);
    const pEnd = Math.min(clampedDraw, pulseDist);
    if (pEnd > pStart) {
      const steps = 16;
      for (let s = 0; s < steps; s++) {
        const d1 = pStart + ((pEnd - pStart) * s) / steps;
        const d2 = pStart + ((pEnd - pStart) * (s + 1)) / steps;
        const ratio = s / steps;
        const pt1 = getPointAtDistance(points, segLengths, d1);
        const pt2 = getPointAtDistance(points, segLengths, d2);
        ctx.beginPath();
        ctx.moveTo(pt1.x, pt1.y);
        ctx.lineTo(pt2.x, pt2.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.pow(ratio, 1.6) * 0.92})`;
        ctx.lineWidth = width * 1.3;
        ctx.stroke();
      }
      /* Bright radial glow at pulse head */
      const headPt = getPointAtDistance(points, segLengths, pEnd);
      const glow = ctx.createRadialGradient(headPt.x, headPt.y, 0, headPt.x, headPt.y, 10);
      glow.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      glow.addColorStop(0.35, `rgba(${colorRGB}, 0.85)`);
      glow.addColorStop(1, `rgba(${colorRGB}, 0)`);
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(headPt.x, headPt.y, 10, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

/* ─── Build responsive edge-to-center traces ─── */
function buildResponsiveEdgeTraces(w: number, h: number): PcbTrace[] {
  const cy = h / 2;
  const cx = w / 2;
  const isMobile = w < 520;
  const traces: PcbTrace[] = [];

  const laneConfigs = isMobile
    ? [
      { yOff: -125, endOff: -54, jogRatio: 0.42, cyan: true, res: true },
      { yOff: -72, endOff: -28, jogRatio: 0.55, cyan: false, res: false },
      { yOff: -20, endOff: -8, jogRatio: 0.65, cyan: true, res: false },
      { yOff: 45, endOff: 18, jogRatio: 0.58, cyan: false, res: true },
      { yOff: 110, endOff: 48, jogRatio: 0.44, cyan: true, res: false },
    ]
    : [
      { yOff: -155, endOff: -68, jogRatio: 0.42, cyan: true, res: true },
      { yOff: -110, endOff: -44, jogRatio: 0.52, cyan: false, res: false },
      { yOff: -65, endOff: -22, jogRatio: 0.60, cyan: true, res: true },
      { yOff: -22, endOff: -8, jogRatio: 0.68, cyan: false, res: false },
      { yOff: 22, endOff: 8, jogRatio: 0.68, cyan: true, res: false },
      { yOff: 65, endOff: 22, jogRatio: 0.60, cyan: false, res: true },
      { yOff: 110, endOff: 44, jogRatio: 0.52, cyan: true, res: false },
      { yOff: 155, endOff: 68, jogRatio: 0.42, cyan: false, res: true },
    ];

  const centerKeepout = isMobile
    ? Math.max(74, w * 0.21)
    : Math.min(185, Math.max(115, w * 0.14));
  const targetXLeft = Math.max(28, cx - centerKeepout);
  const targetXRight = Math.min(w - 28, cx + centerKeepout);

  laneConfigs.forEach((cfg, idx) => {
    const yStart = cy + cfg.yOff;
    const yEnd = cy + cfg.endOff;
    const dy = Math.abs(yEnd - yStart);

    /* Left Edge → Center Pin */
    const lx1 = targetXLeft * cfg.jogRatio;
    const lx2 = Math.min(targetXLeft - 8, lx1 + dy * 0.75);
    const leftPts = [
      { x: 0, y: yStart },
      { x: lx1, y: yStart },
      { x: lx2, y: yEnd },
      { x: targetXLeft, y: yEnd },
    ];
    const leftMetrics = computeSegLengths(leftPts);
    traces.push({
      points: leftPts,
      segLengths: leftMetrics.segLengths,
      total: leftMetrics.total,
      colorRGB: cfg.cyan ? "14, 165, 233" : "226, 232, 240",
      width: cfg.cyan ? 1.75 : 1.3,
      hasResistor: cfg.res,
      delay: idx * 0.045,
    });

    /* Right Edge → Center Pin */
    const spanR = w - targetXRight;
    const rx1 = w - spanR * cfg.jogRatio;
    const rx2 = Math.max(targetXRight + 8, rx1 - dy * 0.75);
    const rightPts = [
      { x: w, y: yStart },
      { x: rx1, y: yStart },
      { x: rx2, y: yEnd },
      { x: targetXRight, y: yEnd },
    ];
    const rightMetrics = computeSegLengths(rightPts);
    traces.push({
      points: rightPts,
      segLengths: rightMetrics.segLengths,
      total: rightMetrics.total,
      colorRGB: cfg.cyan ? "56, 189, 248" : "226, 232, 240",
      width: cfg.cyan ? 1.75 : 1.3,
      hasResistor: cfg.res,
      delay: idx * 0.045,
    });
  });

  return traces;
}

export default function IntroLoader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [phase, setPhase] = useState<"tracing" | "locked" | "exiting" | "done">("tracing");
  const [chipsEnergized, setChipsEnergized] = useState(false);
  const [wordmarkVisible, setWordmarkVisible] = useState(false);
  const [taglineVisible, setTaglineVisible] = useState(false);
  const [progressWidth, setProgressWidth] = useState("0%");

  const dismissIntro = useCallback(() => {
    setPhase("exiting");
    setTimeout(() => setPhase("done"), 650);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let cW = 0;
    let cH = 0;
    let traces: PcbTrace[] = [];
    const start = performance.now();

    /* Resize canvas to match window (high-DPI) */
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      cW = window.innerWidth;
      cH = window.innerHeight;
      canvas.width = cW * dpr;
      canvas.height = cH * dpr;
      canvas.style.width = cW + "px";
      canvas.style.height = cH + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      traces = buildResponsiveEdgeTraces(cW, cH);
    };
    resize();
    window.addEventListener("resize", resize);

    /* Main animation loop */
    const draw = (now: number) => {
      ctx.clearRect(0, 0, cW, cH);
      const elapsed = (now - start) / 1000;

      traces.forEach((tr) => {
        /* Draw progress with per-trace stagger delay */
        const drawRaw = Math.max(0, Math.min(1, (elapsed - tr.delay) / T_DRAW_DUR));
        const drawEased = 1 - Math.pow(1 - drawRaw, 2.3);

        /* Retract progress */
        const retractRaw =
          elapsed > T_RETRACT_START
            ? Math.max(0, Math.min(1, (elapsed - T_RETRACT_START) / T_RETRACT_DUR))
            : 0;
        const retractEased = Math.pow(retractRaw, 1.8);

        const activeFactor = Math.max(0, drawEased - retractEased);
        const drawnDist = tr.total * activeFactor;

        /* Light pulse: starts 0.15s after trace begins, travels inward */
        const pulseProgress = Math.max(0, (elapsed - tr.delay - 0.15) / 1.15);
        const pulseDist = pulseProgress * (tr.total + 85);

        drawPcbTrace(ctx, tr, drawnDist, pulseDist);
      });

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    /* Choreography timers */
    setProgressWidth("42%");

    const t1 = setTimeout(() => {
      setChipsEnergized(true);
      setPhase("locked");
      setProgressWidth("78%");
    }, T_LOCKED * 1000);

    const t2 = setTimeout(() => {
      setWordmarkVisible(true);
    }, T_WORDMARK * 1000);

    const t3 = setTimeout(() => {
      setTaglineVisible(true);
      setProgressWidth("100%");
    }, T_TAGLINE * 1000);

    const t4 = setTimeout(() => {
      setPhase("exiting");
    }, T_EXIT * 1000);

    const t5 = setTimeout(() => setPhase("done"), T_DONE * 1000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismissIntro();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [dismissIntro]);

  if (phase === "done") return null;

  return (
    <div
      id="kkt-pcb-loader"
      className={`fixed inset-0 z-[9999] h-[100dvh] w-full overflow-hidden bg-[#05080F] flex flex-col items-center justify-center px-4 transition-opacity duration-[650ms] ${phase === "exiting" ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
    >
      {/* Precision PCB Micro-Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(14, 165, 233, 0.045) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(14, 165, 233, 0.045) 1px, transparent 1px),
            linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px, 32px 32px, 160px 160px, 160px 160px",
        }}
      />

      {/* Radial vignette centering blue glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.12)_0%,transparent_50%,#05080F_92%)] pointer-events-none z-[5]" />

      {/* Canvas for animated 45° beveled traces with light pulses */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
      />

      {/* Top Micro Telemetry Bar with Skip Button */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between z-20 font-mono text-[10px] sm:text-[11px] text-slate-400 tracking-widest">
        <span className="flex items-center gap-2 truncate">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] shrink-0"
            style={{ animation: "pulse 2s ease-in-out infinite" }}
          />
          <span className="truncate">KILAKITUTECH.CO.KE // BOOT</span>
        </span>
        <button
          onClick={dismissIntro}
          className="text-slate-300 hover:text-[#38BDF8] transition uppercase tracking-widest text-[10px] cursor-pointer px-3 py-1.5 rounded-lg border border-white/10 bg-[#0A0F1C]/80 backdrop-blur-md active:scale-95"
          aria-label="Skip intro animation"
        >
          Skip [ESC]
        </button>
      </div>

      {/* Center Stage: Silicon Carrier + Official Kila Kitu Emblem */}
      <div
        className={`relative z-20 flex flex-col items-center text-center w-full max-w-2xl px-2 transition-all duration-[750ms] ${phase === "exiting"
          ? "scale-[1.14] opacity-0"
          : "scale-100 opacity-100"
          }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)" }}
      >
        {/* Technical Silicon Carrier Housing the Emblem */}
        <div className="relative w-40 h-40 sm:w-52 sm:h-52 mb-3 sm:mb-4 flex items-center justify-center">
          {/* Background Technical Silicon Carrier SVG with Connecting Bus Traces */}
          <svg
            className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
            viewBox="0 0 240 240"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="carrierBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="40%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#0EA5E9" />
              </linearGradient>
              <radialGradient id="carrierCore" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(56, 189, 248, 0.20)" />
                <stop offset="70%" stopColor="rgba(10, 15, 28, 0.95)" />
                <stop offset="100%" stopColor="rgba(5, 8, 15, 0.98)" />
              </radialGradient>
            </defs>

            {/* Radiating PCB Pinout Traces (Animated with stroke-dashoffset) */}
            <g stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round">
              {/* Top Pins */}
              <path
                d="M 90 40 L 90 14 L 76 6"
                stroke="#E2E8F0"
                style={{
                  strokeDasharray: 120,
                  strokeDashoffset: chipsEnergized ? 0 : 120,
                  transition: "stroke-dashoffset 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
              <path
                d="M 120 40 L 120 10"
                stroke="#38BDF8"
                style={{
                  strokeDasharray: 120,
                  strokeDashoffset: chipsEnergized ? 0 : 120,
                  transition: "stroke-dashoffset 0.85s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
              <path
                d="M 150 40 L 150 14 L 164 6"
                stroke="#E2E8F0"
                style={{
                  strokeDasharray: 120,
                  strokeDashoffset: chipsEnergized ? 0 : 120,
                  transition: "stroke-dashoffset 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />

              {/* Bottom Pins */}
              <path
                d="M 90 200 L 90 226 L 76 234"
                stroke="#E2E8F0"
                style={{
                  strokeDasharray: 120,
                  strokeDashoffset: chipsEnergized ? 0 : 120,
                  transition: "stroke-dashoffset 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
              <path
                d="M 120 200 L 120 230"
                stroke="#38BDF8"
                style={{
                  strokeDasharray: 120,
                  strokeDashoffset: chipsEnergized ? 0 : 120,
                  transition: "stroke-dashoffset 0.85s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
              <path
                d="M 150 200 L 150 226 L 164 234"
                stroke="#E2E8F0"
                style={{
                  strokeDasharray: 120,
                  strokeDashoffset: chipsEnergized ? 0 : 120,
                  transition: "stroke-dashoffset 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />

              {/* Left Pins */}
              <path
                d="M 40 90 L 14 90 L 6 76"
                stroke="#38BDF8"
                style={{
                  strokeDasharray: 120,
                  strokeDashoffset: chipsEnergized ? 0 : 120,
                  transition: "stroke-dashoffset 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
              <path
                d="M 40 120 L 10 120"
                stroke="#E2E8F0"
                style={{
                  strokeDasharray: 120,
                  strokeDashoffset: chipsEnergized ? 0 : 120,
                  transition: "stroke-dashoffset 0.85s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
              <path
                d="M 40 150 L 14 150 L 6 164"
                stroke="#38BDF8"
                style={{
                  strokeDasharray: 120,
                  strokeDashoffset: chipsEnergized ? 0 : 120,
                  transition: "stroke-dashoffset 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />

              {/* Right Pins */}
              <path
                d="M 200 90 L 226 90 L 234 76"
                stroke="#38BDF8"
                style={{
                  strokeDasharray: 120,
                  strokeDashoffset: chipsEnergized ? 0 : 120,
                  transition: "stroke-dashoffset 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
              <path
                d="M 200 120 L 230 120"
                stroke="#E2E8F0"
                style={{
                  strokeDasharray: 120,
                  strokeDashoffset: chipsEnergized ? 0 : 120,
                  transition: "stroke-dashoffset 0.85s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
              <path
                d="M 200 150 L 226 150 L 234 164"
                stroke="#38BDF8"
                style={{
                  strokeDasharray: 120,
                  strokeDashoffset: chipsEnergized ? 0 : 120,
                  transition: "stroke-dashoffset 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
            </g>

            {/* Solder Vias at Outer Pin Fronts */}
            <g fill="#05080F" stroke="#F8FAFC" strokeWidth="1.4">
              <circle cx="76" cy="6" r="2.8" stroke="#38BDF8" />
              <circle cx="120" cy="10" r="2.8" />
              <circle cx="164" cy="6" r="2.8" stroke="#38BDF8" />

              <circle cx="76" cy="234" r="2.8" stroke="#38BDF8" />
              <circle cx="120" cy="230" r="2.8" />
              <circle cx="164" cy="234" r="2.8" stroke="#38BDF8" />

              <circle cx="6" cy="76" r="2.8" stroke="#38BDF8" />
              <circle cx="10" cy="120" r="2.8" />
              <circle cx="6" cy="164" r="2.8" stroke="#38BDF8" />

              <circle cx="234" cy="76" r="2.8" stroke="#38BDF8" />
              <circle cx="230" cy="120" r="2.8" />
              <circle cx="234" cy="164" r="2.8" stroke="#38BDF8" />
            </g>

            {/* Silicon Carrier Frame */}
            <rect
              x="40"
              y="40"
              width="160"
              height="160"
              rx="24"
              fill="url(#carrierCore)"
              stroke="url(#carrierBorder)"
              strokeWidth="2"
              className="drop-shadow-[0_0_24px_rgba(14,165,233,0.35)]"
            />

            {/* Microchip Inner Circuit Border */}
            <rect
              x="48"
              y="48"
              width="144"
              height="144"
              rx="18"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="1"
              strokeDasharray="4 3"
              opacity="0.6"
            />

            {/* Corner Fiducial Alignment Marks */}
            <g stroke="#38BDF8" strokeWidth="1.2" opacity="0.7">
              <path d="M 54 62 L 62 62 M 58 58 L 58 66" />
              <path d="M 178 62 L 186 62 M 182 58 L 182 66" />
              <path d="M 54 178 L 62 178 M 58 174 L 58 182" />
              <path d="M 178 178 L 186 178 M 182 174 L 182 182" />
            </g>

            {/* Micro-Telemetry Labels on Carrier */}
            <text
              x="120"
              y="60"
              textAnchor="middle"
              fill="#94A3B8"
              fontFamily="monospace"
              fontSize="6"
              letterSpacing="1.5"
            >
              SILICON // DIE REV 3.0
            </text>
            <text
              x="120"
              y="186"
              textAnchor="middle"
              fill="#38BDF8"
              fontFamily="monospace"
              fontSize="6"
              letterSpacing="1.5"
            >
              NAIROBI &bull; KKT-CORE
            </text>
          </svg>

          {/* Central Kila Kitu Stylized Logo Emblem */}
          <div
            className="relative z-10 w-24 h-24 sm:w-32 sm:h-32 transition-all duration-700 ease-out flex items-center justify-center p-2"
            style={{
              opacity: chipsEnergized ? 1 : 0,
              transform: chipsEnergized ? "scale(1)" : "scale(0.84)",
              filter: chipsEnergized
                ? "drop-shadow(0 0 20px rgba(56, 189, 248, 0.9)) drop-shadow(0 0 40px rgba(14, 165, 233, 0.45))"
                : "none",
            }}
          >
            <Image
              src="/logo-mark-transparent.png"
              alt="Kila Kitu Technologies Emblem"
              width={130}
              height={130}
              className="w-full h-full object-contain select-none pointer-events-none drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]"
            />
          </div>
        </div>

        {/* Fluid Responsive Brand Typography — staggered reveal */}
        <div
          className={`transition-all duration-700 ease-out ${wordmarkVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2"
            }`}
        >
          <p className="text-[clamp(1.25rem,4.6vw,2.5rem)] tracking-[clamp(0.14em,0.55vw,0.26em)] font-extrabold text-white uppercase drop-shadow-[0_0_24px_rgba(14,165,233,0.45)] leading-tight">
            KILA KITU{" "}
            <span className="text-[#38BDF8] block sm:inline mt-0.5 sm:mt-0">
              TECHNOLOGIES
            </span>
          </p>
        </div>

        {/* Electric Cyan Expanding Hairline */}
        <div
          className={`h-[1.5px] bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent mx-auto my-3 sm:my-4 transition-all duration-700 ease-out ${wordmarkVisible ? "w-48 sm:w-64 opacity-100" : "w-0 opacity-0"
            }`}
        />

        {/* Studio Subtitle */}
        <p
          className={`font-mono text-[clamp(0.6rem,2.1vw,0.78rem)] tracking-[clamp(0.2em,0.7vw,0.36em)] text-[#BAE6FD] uppercase transition-opacity duration-700 ${taglineVisible ? "opacity-100" : "opacity-0"
            }`}
        >
          HARDWARE &bull; FIRMWARE &bull; SOFTWARE
        </p>
      </div>

      {/* Bottom Ultra-Slim Electric Cyan Progress Bus */}
      <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white/10 z-20">
        <div
          className="h-full bg-gradient-to-r from-[#0369A1] via-[#38BDF8] to-white transition-all duration-150 ease-out"
          style={{ width: progressWidth }}
        />
      </div>

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.45; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
