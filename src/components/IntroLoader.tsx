"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

/* ─── Timing constants (seconds) ─── */
const T_DRAW_END = 1.3;
const T_HOLD_END = 2.4;
const T_EXIT_END = 3.0;
const T_FADE_MS = 600;

/* ─── Palette ─── */
const CYAN = "#0EA5E9";
const CYAN_BRIGHT = "#38BDF8";
const CYAN_LIGHT = "#BAE6FD";
const WHITE = "#F8FAFC";
const BG = "#05080F";

/* ─── Trace path definition ─── */
interface TraceSegment {
  /** points as [x, y] ratios of canvas size, relative to center */
  pts: [number, number][];
  color: "cyan" | "white";
  width: number;
  /** delay before this trace starts drawing (0–1 fraction of draw phase) */
  delay: number;
  /** via radius at the end (0 = no via) */
  via: number;
  /** branch children indices */
  branches?: number[];
}

function buildTraces(isMobile: boolean): TraceSegment[] {
  const s = isMobile ? 0.7 : 1;
  const traces: TraceSegment[] = [];

  /* ─── Main horizontal bus lanes (left side) ─── */
  // L0 — top cyan bus
  traces.push({
    pts: [[-0.48 * s, -0.12], [-0.22 * s, -0.12], [-0.17 * s, -0.08]],
    color: "cyan", width: 2.2, delay: 0, via: 3.5,
  });
  // L1 — upper white trace
  traces.push({
    pts: [[-0.48 * s, -0.065], [-0.26 * s, -0.065], [-0.19 * s, -0.04]],
    color: "white", width: 1.4, delay: 0.05, via: 2.8,
  });
  // L2 — center cyan
  traces.push({
    pts: [[-0.48 * s, -0.015], [-0.20 * s, -0.015]],
    color: "cyan", width: 2, delay: 0.08, via: 3.2,
  });
  // L3 — lower white
  traces.push({
    pts: [[-0.48 * s, 0.035], [-0.25 * s, 0.035], [-0.19 * s, 0.06]],
    color: "white", width: 1.4, delay: 0.12, via: 2.8,
  });
  // L4 — bottom cyan bus
  traces.push({
    pts: [[-0.48 * s, 0.085], [-0.22 * s, 0.085], [-0.17 * s, 0.12]],
    color: "cyan", width: 2.2, delay: 0.15, via: 3.5,
  });

  /* ─── Main horizontal bus lanes (right side — mirror) ─── */
  traces.push({
    pts: [[0.48 * s, -0.12], [0.22 * s, -0.12], [0.17 * s, -0.08]],
    color: "cyan", width: 2.2, delay: 0, via: 3.5,
  });
  traces.push({
    pts: [[0.48 * s, -0.065], [0.26 * s, -0.065], [0.19 * s, -0.04]],
    color: "white", width: 1.4, delay: 0.05, via: 2.8,
  });
  traces.push({
    pts: [[0.48 * s, -0.015], [0.20 * s, -0.015]],
    color: "cyan", width: 2, delay: 0.08, via: 3.2,
  });
  traces.push({
    pts: [[0.48 * s, 0.035], [0.25 * s, 0.035], [0.19 * s, 0.06]],
    color: "white", width: 1.4, delay: 0.12, via: 2.8,
  });
  traces.push({
    pts: [[0.48 * s, 0.085], [0.22 * s, 0.085], [0.17 * s, 0.12]],
    color: "cyan", width: 2.2, delay: 0.15, via: 3.5,
  });

  /* ─── Vertical bus lanes (top) ─── */
  traces.push({
    pts: [[-0.07, -0.44 * s], [-0.07, -0.18], [-0.04, -0.14]],
    color: "cyan", width: 1.8, delay: 0.06, via: 3,
  });
  traces.push({
    pts: [[0.0, -0.44 * s], [0.0, -0.16]],
    color: "white", width: 1.3, delay: 0.1, via: 2.6,
  });
  traces.push({
    pts: [[0.07, -0.44 * s], [0.07, -0.18], [0.04, -0.14]],
    color: "cyan", width: 1.8, delay: 0.06, via: 3,
  });

  /* ─── Vertical bus lanes (bottom) ─── */
  traces.push({
    pts: [[-0.07, 0.44 * s], [-0.07, 0.18], [-0.04, 0.14]],
    color: "cyan", width: 1.8, delay: 0.06, via: 3,
  });
  traces.push({
    pts: [[0.0, 0.44 * s], [0.0, 0.16]],
    color: "white", width: 1.3, delay: 0.1, via: 2.6,
  });
  traces.push({
    pts: [[0.07, 0.44 * s], [0.07, 0.18], [0.04, 0.14]],
    color: "cyan", width: 1.8, delay: 0.06, via: 3,
  });

  /* ─── Diagonal corner traces (45°) ─── */
  if (!isMobile) {
    // Top-left diagonal
    traces.push({
      pts: [[-0.42, -0.32], [-0.28, -0.18], [-0.20, -0.14]],
      color: "cyan", width: 1.5, delay: 0.18, via: 3,
    });
    traces.push({
      pts: [[-0.38, -0.36], [-0.30, -0.28], [-0.22, -0.22]],
      color: "white", width: 1, delay: 0.22, via: 2.4,
    });
    // Top-right diagonal
    traces.push({
      pts: [[0.42, -0.32], [0.28, -0.18], [0.20, -0.14]],
      color: "cyan", width: 1.5, delay: 0.18, via: 3,
    });
    traces.push({
      pts: [[0.38, -0.36], [0.30, -0.28], [0.22, -0.22]],
      color: "white", width: 1, delay: 0.22, via: 2.4,
    });
    // Bottom-left diagonal
    traces.push({
      pts: [[-0.42, 0.32], [-0.28, 0.18], [-0.20, 0.14]],
      color: "cyan", width: 1.5, delay: 0.18, via: 3,
    });
    traces.push({
      pts: [[-0.38, 0.36], [-0.30, 0.28], [-0.22, 0.22]],
      color: "white", width: 1, delay: 0.22, via: 2.4,
    });
    // Bottom-right diagonal
    traces.push({
      pts: [[0.42, 0.32], [0.28, 0.18], [0.20, 0.14]],
      color: "cyan", width: 1.5, delay: 0.18, via: 3,
    });
    traces.push({
      pts: [[0.38, 0.36], [0.30, 0.28], [0.22, 0.22]],
      color: "white", width: 1, delay: 0.22, via: 2.4,
    });
  }

  /* ─── Branch stubs off the main buses (subtle T-junctions) ─── */
  // Left branches
  traces.push({
    pts: [[-0.34 * s, -0.12], [-0.34 * s, -0.19], [-0.30 * s, -0.23]],
    color: "white", width: 1, delay: 0.25, via: 2.2,
  });
  traces.push({
    pts: [[-0.30 * s, 0.085], [-0.30 * s, 0.16], [-0.26 * s, 0.20]],
    color: "white", width: 1, delay: 0.28, via: 2.2,
  });
  // Right branches
  traces.push({
    pts: [[0.34 * s, -0.12], [0.34 * s, -0.19], [0.30 * s, -0.23]],
    color: "white", width: 1, delay: 0.25, via: 2.2,
  });
  traces.push({
    pts: [[0.30 * s, 0.085], [0.30 * s, 0.16], [0.26 * s, 0.20]],
    color: "white", width: 1, delay: 0.28, via: 2.2,
  });

  return traces;
}

/* ─── Utility: total path length for a trace ─── */
function pathLength(pts: [number, number][], cx: number, cy: number, w: number, h: number): number {
  let len = 0;
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i][0] * w - pts[i - 1][0] * w;
    const dy = pts[i][1] * h - pts[i - 1][1] * h;
    len += Math.sqrt(dx * dx + dy * dy);
  }
  return len;
}

/* ─── Utility: point along path at fractional distance ─── */
function pointOnPath(
  pts: [number, number][], frac: number, cx: number, cy: number, w: number, h: number
): { x: number; y: number } {
  const totalLen = pathLength(pts, cx, cy, w, h);
  let target = frac * totalLen;
  for (let i = 1; i < pts.length; i++) {
    const ax = cx + pts[i - 1][0] * w;
    const ay = cy + pts[i - 1][1] * h;
    const bx = cx + pts[i][0] * w;
    const by = cy + pts[i][1] * h;
    const segLen = Math.sqrt((bx - ax) ** 2 + (by - ay) ** 2);
    if (target <= segLen) {
      const t = segLen > 0 ? target / segLen : 0;
      return { x: ax + (bx - ax) * t, y: ay + (by - ay) * t };
    }
    target -= segLen;
  }
  const last = pts[pts.length - 1];
  return { x: cx + last[0] * w, y: cy + last[1] * h };
}

export default function IntroLoader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [phase, setPhase] = useState<"tracing" | "locked" | "exiting" | "done">("tracing");

  const dismissIntro = useCallback(() => {
    setPhase("exiting");
    if (typeof window !== "undefined") {
      sessionStorage.setItem("kkt_intro_seen", "true");
    }
    setTimeout(() => setPhase("done"), T_FADE_MS);
  }, []);

  useEffect(() => {
    const hasSeen =
      typeof window !== "undefined" &&
      sessionStorage.getItem("kkt_intro_seen");
    if (hasSeen) {
      setPhase("done");
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const start = performance.now();

    /* High-DPI resize */
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const isMobile = window.innerWidth < 640;
    const traces = buildTraces(isMobile);

    const draw = (now: number) => {
      const elapsed = (now - start) / 1000;
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      const cx = w / 2;
      const cy = h / 2;
      ctx.clearRect(0, 0, w, h);

      /* ─── Global draw progress ─── */
      const rawDraw = Math.min(1, elapsed / T_DRAW_END);
      const retractStart = T_HOLD_END;
      const retractDur = T_EXIT_END - T_HOLD_END;
      const rawRetract = elapsed > retractStart ? Math.min(1, (elapsed - retractStart) / retractDur) : 0;

      /* Eased */
      const drawEase = 1 - Math.pow(1 - rawDraw, 2.8);
      const retractEase = rawRetract * rawRetract;

      /* ─── Pulse glow during hold phase ─── */
      const inHold = elapsed > T_DRAW_END && elapsed < T_HOLD_END;
      const holdPulse = inHold ? 0.5 + 0.5 * Math.sin((elapsed - T_DRAW_END) * Math.PI * 3.5) : 0;

      /* ─── Draw each trace ─── */
      traces.forEach((trace, _idx) => {
        const localDraw = Math.max(0, Math.min(1, (drawEase - trace.delay) / (1 - trace.delay)));
        const activeRatio = Math.max(0, localDraw - retractEase);

        if (activeRatio <= 0.001) return;

        const isCyan = trace.color === "cyan";
        const baseColor = isCyan ? CYAN_BRIGHT : WHITE;
        const alpha = 0.55 + activeRatio * 0.4;
        const glowAlpha = inHold ? 0.3 + holdPulse * 0.35 : 0.2;

        /* ── Draw the trace line ── */
        ctx.save();
        ctx.strokeStyle = isCyan
          ? `rgba(56, 189, 248, ${alpha})`
          : `rgba(248, 250, 252, ${alpha * 0.7})`;
        ctx.lineWidth = trace.width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        /* Neon glow */
        if (isCyan) {
          ctx.shadowColor = `rgba(14, 165, 233, ${glowAlpha})`;
          ctx.shadowBlur = 10 + holdPulse * 6;
        }

        /* Calculate how far along the path to draw */
        const totalLen = pathLength(trace.pts, cx, cy, w, h);
        const drawLen = totalLen * activeRatio;

        ctx.beginPath();
        let accumulated = 0;
        const startPt = trace.pts[0];
        ctx.moveTo(cx + startPt[0] * w, cy + startPt[1] * h);

        for (let i = 1; i < trace.pts.length; i++) {
          const ax = cx + trace.pts[i - 1][0] * w;
          const ay = cy + trace.pts[i - 1][1] * h;
          const bx = cx + trace.pts[i][0] * w;
          const by = cy + trace.pts[i][1] * h;
          const segLen = Math.sqrt((bx - ax) ** 2 + (by - ay) ** 2);

          if (accumulated + segLen <= drawLen) {
            ctx.lineTo(bx, by);
            accumulated += segLen;
          } else {
            const remaining = drawLen - accumulated;
            const t = segLen > 0 ? remaining / segLen : 0;
            ctx.lineTo(ax + (bx - ax) * t, ay + (by - ay) * t);
            break;
          }
        }
        ctx.stroke();
        ctx.restore();

        /* ── Solder via at the drawn tip ── */
        if (trace.via > 0 && activeRatio > 0.85) {
          const tip = pointOnPath(trace.pts, activeRatio, cx, cy, w, h);
          const viaAlpha = Math.min(1, (activeRatio - 0.85) / 0.15);

          /* Outer halo ring */
          ctx.save();
          ctx.strokeStyle = isCyan
            ? `rgba(56, 189, 248, ${viaAlpha * 0.4})`
            : `rgba(248, 250, 252, ${viaAlpha * 0.3})`;
          ctx.lineWidth = 1.2;
          if (isCyan) {
            ctx.shadowColor = `rgba(14, 165, 233, ${viaAlpha * 0.6})`;
            ctx.shadowBlur = 8;
          }
          ctx.beginPath();
          ctx.arc(tip.x, tip.y, trace.via + 2.5, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();

          /* Inner filled core */
          ctx.save();
          ctx.fillStyle = isCyan
            ? `rgba(56, 189, 248, ${viaAlpha})`
            : `rgba(248, 250, 252, ${viaAlpha * 0.9})`;
          ctx.beginPath();
          ctx.arc(tip.x, tip.y, trace.via, 0, Math.PI * 2);
          ctx.fill();

          /* Dark center hole */
          ctx.fillStyle = `rgba(5, 8, 15, ${viaAlpha * 0.8})`;
          ctx.beginPath();
          ctx.arc(tip.x, tip.y, trace.via * 0.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        /* ── Traveling energy packets ── */
        if (activeRatio > 0.3 && elapsed < T_HOLD_END) {
          const packetCount = isCyan ? 3 : 2;
          const speed = 1.8;
          for (let p = 0; p < packetCount; p++) {
            const offset = p / packetCount;
            const rawFrac = ((elapsed * speed + offset) % 1);
            const frac = rawFrac * activeRatio;

            if (frac > activeRatio) continue;

            const pkt = pointOnPath(trace.pts, frac, cx, cy, w, h);
            const pktSize = isCyan ? 2.5 : 1.8;

            /* Outer glow */
            ctx.save();
            ctx.fillStyle = isCyan
              ? "rgba(56, 189, 248, 0.6)"
              : "rgba(248, 250, 252, 0.4)";
            ctx.shadowColor = isCyan ? CYAN : "rgba(248, 250, 252, 0.5)";
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.arc(pkt.x, pkt.y, pktSize + 1.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            /* Bright core */
            ctx.save();
            ctx.fillStyle = isCyan ? "#BAE6FD" : "#FFFFFF";
            ctx.beginPath();
            ctx.arc(pkt.x, pkt.y, pktSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
      });

      /* ── Extra ambient solder pads scattered at intersections ── */
      if (drawEase > 0.6) {
        const padAlpha = Math.min(1, (drawEase - 0.6) / 0.3) * (1 - retractEase);
        const pads = isMobile
          ? [[-0.35, -0.12], [0.35, -0.12], [-0.35, 0.085], [0.35, 0.085]]
          : [
              [-0.40, -0.12], [0.40, -0.12], [-0.40, 0.085], [0.40, 0.085],
              [-0.34, -0.19], [0.34, -0.19], [-0.30, 0.16], [0.30, 0.16],
              [-0.07, -0.30], [0.07, -0.30], [-0.07, 0.30], [0.07, 0.30],
            ];

        pads.forEach(([rx, ry]) => {
          const px = cx + rx * w;
          const py = cy + ry * h;

          ctx.save();
          ctx.fillStyle = `rgba(56, 189, 248, ${padAlpha * 0.25})`;
          ctx.shadowColor = `rgba(14, 165, 233, ${padAlpha * 0.4})`;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(5, 8, 15, ${padAlpha * 0.6})`;
          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    /* Phase timers — total 3.0s */
    const t1 = setTimeout(() => setPhase("locked"), T_DRAW_END * 1000);
    const t2 = setTimeout(() => {
      setPhase("exiting");
      if (typeof window !== "undefined") {
        sessionStorage.setItem("kkt_intro_seen", "true");
      }
    }, T_HOLD_END * 1000);
    const t3 = setTimeout(() => setPhase("done"), T_EXIT_END * 1000);

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
    };
  }, [dismissIntro]);

  if (phase === "done") return null;

  return (
    <div
      id="kkt-pcb-loader"
      className={`fixed inset-0 z-[9999] h-[100dvh] w-full overflow-hidden bg-[#05080F] flex flex-col items-center justify-center px-4 transition-opacity duration-700 ${
        phase === "exiting" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Precision PCB Micro-Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(14, 165, 233, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(14, 165, 233, 0.04) 1px, transparent 1px),
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px, 28px 28px, 140px 140px, 140px 140px",
        }}
      />

      {/* Radial vignette centering blue glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.10)_0%,transparent_45%,#05080F_90%)] pointer-events-none z-0" />

      {/* Canvas for animated PCB circuit traces */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Top Micro Telemetry Bar with Skip Button */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between z-20 font-mono text-[10px] sm:text-[11px] text-slate-400 tracking-widest">
        <span className="flex items-center gap-2 truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-ping shrink-0" />
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

      {/* Center Stage: Dual Interlocking Silicon Microchip Dies + Fluid Brand Typography */}
      <div
        className={`relative z-20 flex flex-col items-center text-center w-full max-w-2xl px-2 transition-all duration-700 ease-out ${
          phase === "exiting" ? "scale-110 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {/* Dual Interlocking Microchip Dies SVG */}
        <div className="w-32 h-32 sm:w-44 sm:h-44 mb-3 sm:mb-4 flex items-center justify-center">
          <svg
            className="w-full h-full overflow-visible drop-shadow-[0_0_20px_rgba(14,165,233,0.55)]"
            viewBox="0 0 220 220"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="icBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#0EA5E9" />
              </linearGradient>
              <radialGradient id="icCoreRadial" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(56, 189, 248, 0.35)" />
                <stop offset="100%" stopColor="rgba(5, 8, 15, 0.96)" />
              </radialGradient>
              <filter id="chipGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Inter-Die Connecting Bus Lines */}
            <g stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 96 66 L 138 66 L 138 110" />
              <path d="M 96 76 L 128 76 L 128 110" />
              <path d="M 66 96 L 66 138 L 110 138" />
              <path d="M 76 96 L 76 128 L 110 128" />
              <path d="M 86 96 L 86 118 L 110 118" />

              {/* Radiating Outer Pins */}
              <path d="M 52 44 L 52 20 L 38 8" stroke="#E2E8F0" />
              <path d="M 66 44 L 66 14" stroke="#38BDF8" />
              <path d="M 80 44 L 80 24 L 94 12" stroke="#E2E8F0" />
              <path d="M 44 58 L 18 58 L 6 46" stroke="#38BDF8" />
              <path d="M 44 74 L 12 74" stroke="#E2E8F0" />
              <path d="M 166 126 L 194 126 L 208 112" stroke="#38BDF8" />
              <path d="M 166 142 L 204 142" stroke="#E2E8F0" />
              <path d="M 126 166 L 126 196 L 112 210" stroke="#E2E8F0" />
              <path d="M 140 166 L 140 206" stroke="#38BDF8" />
              <path d="M 154 166 L 154 190 L 170 206" stroke="#E2E8F0" />
            </g>

            {/* Solder Vias & SMD Resistors */}
            <g fill="#05080F" stroke="#F8FAFC" strokeWidth="1.4">
              <circle cx="38" cy="8" r="2.6" />
              <circle cx="66" cy="14" r="2.6" stroke="#38BDF8" />
              <circle cx="94" cy="12" r="2.6" />
              <circle cx="6" cy="46" r="2.6" stroke="#38BDF8" />
              <circle cx="12" cy="74" r="2.6" />
              <circle cx="208" cy="112" r="2.6" stroke="#38BDF8" />
              <circle cx="204" cy="142" r="2.6" />
              <circle cx="112" cy="210" r="2.6" />
              <circle cx="140" cy="206" r="2.6" stroke="#38BDF8" />
              <circle cx="170" cy="206" r="2.6" />
              <rect x="134" y="80" width="8" height="14" rx="1.5" fill="#05080F" stroke="#38BDF8" />
              <rect x="80" y="134" width="14" height="8" rx="1.5" fill="#05080F" stroke="#F8FAFC" />
            </g>

            {/* Upper-Left Silicon Microchip Die */}
            <g filter="url(#chipGlow)">
              <rect
                x="44" y="44" width="52" height="52" rx="6"
                fill="url(#icCoreRadial)" stroke="url(#icBorderGrad)" strokeWidth="2.2"
              />
              <rect
                x="51" y="51" width="38" height="38" rx="3"
                fill="#05080F" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 2"
              />
              <text x="70" y="73" textAnchor="middle" fill="#FFFFFF"
                fontFamily="monospace" fontSize="10" fontWeight="700" letterSpacing="1">
                KKT
              </text>
              <text x="70" y="83" textAnchor="middle" fill="#38BDF8"
                fontFamily="monospace" fontSize="6.5">
                MCU-01
              </text>
            </g>

            {/* Lower-Right Silicon Microchip Die */}
            <g filter="url(#chipGlow)">
              <rect
                x="110" y="110" width="56" height="56" rx="6"
                fill="url(#icCoreRadial)" stroke="url(#icBorderGrad)" strokeWidth="2.2"
              />
              <rect
                x="117" y="117" width="42" height="42" rx="3"
                fill="#05080F" stroke="#F8FAFC" strokeWidth="1" strokeDasharray="3 2"
              />
              <text x="138" y="140" textAnchor="middle" fill="#38BDF8"
                fontFamily="monospace" fontSize="10" fontWeight="700" letterSpacing="1">
                SYS
              </text>
              <text x="138" y="150" textAnchor="middle" fill="#CBD5E1"
                fontFamily="monospace" fontSize="6.5">
                CLOUD-02
              </text>
            </g>
          </svg>
        </div>

        {/* Fluid Responsive Brand Typography */}
        <h1 className="text-[clamp(1.15rem,4.4vw,2.35rem)] tracking-[clamp(0.14em,0.55vw,0.26em)] font-extrabold text-white uppercase drop-shadow-[0_0_24px_rgba(14,165,233,0.45)] leading-tight">
          KILA KITU <span className="text-[#38BDF8] block sm:inline mt-0.5 sm:mt-0">TECHNOLOGIES</span>
        </h1>

        {/* Electric Cyan Expanding Hairline */}
        <div className="w-48 sm:w-64 h-[1.5px] bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent mx-auto my-3 sm:my-4" />

        {/* Studio Subtitle */}
        <p className="font-mono text-[clamp(0.6rem,2.1vw,0.78rem)] tracking-[clamp(0.2em,0.7vw,0.36em)] text-[#BAE6FD] uppercase">
          HARDWARE &bull; FIRMWARE &bull; SOFTWARE
        </p>
      </div>

      {/* Bottom Ultra-Slim Electric Cyan Progress Bus */}
      <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white/10 z-20">
        <div
          className="h-full bg-gradient-to-r from-[#0369A1] via-[#38BDF8] to-white transition-all duration-300 ease-out"
          style={{ width: phase === "locked" || phase === "exiting" ? "100%" : "55%" }}
        />
      </div>
    </div>
  );
}
