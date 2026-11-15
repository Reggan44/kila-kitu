"use client";

import { useEffect, useRef, useState } from "react";

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

  // Soft radial head glow + solder-via core
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

export default function IntroLoader() {
  const [replayCount, setReplayCount] = useState(0);

  useEffect(() => {
    const onReplay = () => {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("kkt_intro_seen");
      }
      setReplayCount((c) => c + 1);
    };
    window.addEventListener("kkt-replay-intro", onReplay);
    return () => window.removeEventListener("kkt-replay-intro", onReplay);
  }, []);

  return <IntroLoaderInner key={replayCount} />;
}

function IntroLoaderInner() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  // Animation phase states
  const [fillRevealed, setFillRevealed] = useState(false);
  const [wordmarkRevealed, setWordmarkRevealed] = useState(false);
  const [hairlineExpanded, setHairlineExpanded] = useState(false);
  const [taglineRevealed, setTaglineRevealed] = useState(false);
  const [progressWidth, setProgressWidth] = useState("0%");

  useEffect(() => {
    // Check if user already saw the intro in this session
    const hasSeen = typeof window !== "undefined" && sessionStorage.getItem("kkt_intro_seen");
    if (hasSeen) {
      setDismissed(true);
      setUnmounted(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let animActive = true;
    let startTime = performance.now();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const render = (now: number) => {
      if (!animActive) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const elapsed = (now - startTime) / 1000;
      const cx = Math.round(canvas.width / 2 / GRID_STEP) * GRID_STEP;
      const cy = Math.round(canvas.height / 2 / GRID_STEP) * GRID_STEP;

      const rawTracks = [
        {
          pts: [
            { x: 0, y: cy - 40 },
            { x: cx - 160, y: cy - 40 },
            { x: cx - 120, y: cy },
            { x: cx - 40, y: cy },
          ],
          color: "245, 158, 11",
          delay: 0.0,
          dur: 1.05,
          tail: 160,
          w: 2.1,
        },
        {
          pts: [
            { x: canvas.width, y: cy + 40 },
            { x: cx + 160, y: cy + 40 },
            { x: cx + 120, y: cy },
            { x: cx + 40, y: cy },
          ],
          color: "245, 158, 11",
          delay: 0.08,
          dur: 1.05,
          tail: 160,
          w: 2.1,
        },
        {
          pts: [
            { x: cx - 80, y: 0 },
            { x: cx - 80, y: cy - 120 },
            { x: cx - 40, y: cy - 80 },
            { x: cx - 40, y: cy - 20 },
          ],
          color: "56, 189, 248",
          delay: 0.14,
          dur: 1.0,
          tail: 130,
          w: 1.7,
        },
        {
          pts: [
            { x: cx + 80, y: canvas.height },
            { x: cx + 80, y: cy + 120 },
            { x: cx + 40, y: cy + 80 },
            { x: cx + 40, y: cy + 20 },
          ],
          color: "56, 189, 248",
          delay: 0.2,
          dur: 1.0,
          tail: 130,
          w: 1.7,
        },
      ];

      rawTracks.forEach((tr) => {
        const { segLengths, total } = computePolylineLengths(tr.pts);

        // Architectural faint guide line
        ctx.beginPath();
        ctx.moveTo(tr.pts[0].x, tr.pts[0].y);
        for (let k = 1; k < tr.pts.length; k++) {
          ctx.lineTo(tr.pts[k].x, tr.pts[k].y);
        }
        ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
        ctx.lineWidth = 1;
        ctx.stroke();

        const progress = (elapsed - tr.delay) / tr.dur;
        if (progress > 0 && progress < 1.35) {
          const eased = 1 - Math.pow(1 - Math.min(1, progress), 2.2);
          const headDist = eased * (total + tr.tail * 0.5);
          drawGridCircuitStreak(ctx, { points: tr.pts, segLengths, total }, headDist, tr.tail, tr.color, tr.w);
        }
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // 2.6-second choreographed progression sequence
    const t0 = setTimeout(() => setProgressWidth("45%"), 120);
    const t1 = setTimeout(() => {
      setFillRevealed(true);
      setProgressWidth("78%");
    }, 850);
    const t2 = setTimeout(() => {
      setWordmarkRevealed(true);
      setHairlineExpanded(true);
    }, 1150);
    const t3 = setTimeout(() => {
      setTaglineRevealed(true);
      setProgressWidth("100%");
    }, 1450);
    const t4 = setTimeout(() => {
      setDismissed(true);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("kkt_intro_seen", "true");
      }
    }, 2550);
    const t5 = setTimeout(() => {
      animActive = false;
      setUnmounted(true);
    }, 3350);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        skipIntro();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      animActive = false;
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKeyDown);
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  const skipIntro = () => {
    setDismissed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("kkt_intro_seen", "true");
    }
    setTimeout(() => setUnmounted(true), 750);
  };

  if (unmounted) return null;

  return (
    <div
      id="kkt-intro-loader"
      className={`fixed inset-0 z-[9999] bg-[#07090E] blueprint-grid flex flex-col items-center justify-center overflow-hidden ${
        dismissed ? "intro-dismissed" : ""
      }`}
    >
      {/* Subtle Vertical Architectural Columns */}
      <div className="absolute inset-0 architectural-columns pointer-events-none" />

      {/* Converging NVIDIA-Style Orthogonal Grid Light Streaks Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

      {/* Radial Ambient Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_18%,#07090E_88%)] pointer-events-none z-10" />

      {/* Top Micro Header */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20 font-mono text-[11px] text-slate-500 tracking-widest">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] signal-dot" />
          <span>KILAKITUTECH.CO.KE</span>
        </span>
        <button
          onClick={skipIntro}
          className="text-slate-400 hover:text-[#F59E0B] transition uppercase tracking-widest text-[10px] cursor-pointer"
        >
          Skip Intro [Esc] ✕
        </button>
      </div>

      {/* Centerpiece: Geometric KKT Monogram + Wordmark + Expanding Hairline */}
      <div className="relative z-20 flex flex-col items-center text-center px-6">
        {/* Precision Geometric KKT Monogram SVG */}
        <div className="w-40 sm:w-48 h-20 sm:h-24 mb-6 flex items-center justify-center">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 255 116"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="introPlatinum" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#94A3B8" />
              </linearGradient>
              <linearGradient id="introChampagneGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
            </defs>

            {/* Filled Architectural Monogram Layer */}
            <g id="intro-kkt-fill" className={`kkt-fill-layer ${fillRevealed ? "revealed" : ""}`}>
              {/* Left K (Platinum) */}
              <path
                d="M 10 12 L 32 12 L 32 52 L 68 12 L 96 12 L 54 57 L 98 104 L 68 104 L 32 64 L 32 104 L 10 104 Z"
                fill="url(#introPlatinum)"
              />
              {/* Center K (Champagne Gold) */}
              <path
                d="M 98 12 L 120 12 L 120 52 L 156 12 L 184 12 L 142 57 L 186 104 L 156 104 L 120 64 L 120 104 L 98 104 Z"
                fill="url(#introChampagneGold)"
              />
              {/* Right T (Platinum) */}
              <path
                d="M 176 12 L 244 12 L 234 31 L 219 31 L 219 104 L 197 104 L 197 31 L 176 31 Z"
                fill="url(#introPlatinum)"
              />
              {/* Terminal Gold Node */}
              <circle cx="242" cy="18" r="4.5" fill="#FBBF24" />
            </g>

            {/* Precision Vector Stroke-Draw Layer */}
            <path
              id="intro-trace-1"
              className="kkt-stroke-trace animate-stroke-trace"
              d="M 10 12 L 32 12 L 32 52 L 68 12 L 96 12 L 54 57 L 98 104 L 68 104 L 32 64 L 32 104 L 10 104 Z"
              stroke="#38BDF8"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              id="intro-trace-2"
              className="kkt-stroke-trace animate-stroke-trace"
              d="M 98 12 L 120 12 L 120 52 L 156 12 L 184 12 L 142 57 L 186 104 L 156 104 L 120 64 L 120 104 L 98 104 Z"
              stroke="#FBBF24"
              strokeWidth="1.8"
              fill="none"
            />
            <path
              id="intro-trace-3"
              className="kkt-stroke-trace animate-stroke-trace"
              d="M 176 12 L 244 12 L 234 31 L 219 31 L 219 104 L 197 104 L 197 31 L 176 31 Z"
              stroke="#E2E8F0"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>

        {/* Brand Wordmark Reveal */}
        <div
          className={`transition-all duration-700 ease-out ${
            wordmarkRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <h2 className="text-xl sm:text-3xl font-extrabold tracking-[0.26em] text-white uppercase font-sans">
            KILA KITU <span className="text-[#F59E0B]">TECHNOLOGIES</span>
          </h2>
        </div>

        {/* Slim Expanding Gold Hairline Divider */}
        <div
          className={`gold-hairline h-[1px] bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent my-4 ${
            hairlineExpanded ? "expanded" : ""
          }`}
        />

        {/* Tagline Reveal */}
        <p
          className={`font-mono text-[11px] sm:text-xs tracking-[0.32em] text-slate-400 uppercase transition-opacity duration-700 ${
            taglineRevealed ? "opacity-100" : "opacity-0"
          }`}
        >
          HARDWARE &bull; FIRMWARE &bull; SOFTWARE
        </p>
      </div>

      {/* Bottom Ultra-Slim Progress Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1A2333] z-20">
        <div
          className="h-full bg-gradient-to-r from-[#38BDF8] via-[#F59E0B] to-[#FDE68A] transition-all duration-150 ease-out"
          style={{ width: progressWidth }}
        />
      </div>
    </div>
  );
}
