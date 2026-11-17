"use client";

import React, { useEffect, useRef, useState } from "react";

export default function IntroLoader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [phase, setPhase] = useState<"tracing" | "locked" | "exiting" | "done">("tracing");
  const [skipAvailable, setSkipAvailable] = useState(true);

  const dismissIntro = () => {
    setPhase("exiting");
    if (typeof window !== "undefined") {
      sessionStorage.setItem("kkt_intro_seen", "true");
    }
    setTimeout(() => setPhase("done"), 650);
  };

  useEffect(() => {
    // Check if user already saw the intro in this session
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

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (now: number) => {
      const elapsed = (now - start) / 1000;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const isMobile = w < 640;
      ctx.clearRect(0, 0, w, h);

      // Draw inward (0 -> 1.05s), hold, then retract outward (2.15s -> 2.8s)
      const drawProg = Math.min(1, elapsed / 1.05);
      const retractProg = elapsed > 2.15 ? Math.min(1, (elapsed - 2.15) / 0.6) : 0;
      const activeRatio = Math.max(0, drawProg - retractProg);

      // Adaptive lanes & center keepout for mobile vs desktop
      const lanes = isMobile ? [-100, -50, 50, 100] : [-140, -90, -40, 40, 90, 140];
      const centerKeepout = isMobile ? Math.max(76, w * 0.22) : Math.min(185, w * 0.15);
      const targetSpan = Math.max(36, cx - centerKeepout);

      lanes.forEach((offsetY, idx) => {
        const isCyan = idx % 2 === 0;
        const color = isCyan ? "14, 165, 233" : "226, 232, 240";
        const reach = targetSpan * (1 - Math.pow(1 - activeRatio, 2.2));
        const bevel = offsetY * 0.42;

        // Left Edge -> Center Microchip Pin
        ctx.beginPath();
        ctx.moveTo(0, cy + offsetY);
        ctx.lineTo(reach * 0.65, cy + offsetY);
        ctx.lineTo(reach, cy + offsetY - bevel);
        ctx.strokeStyle = `rgba(${color}, 0.65)`;
        ctx.lineWidth = isCyan ? 1.8 : 1.3;
        ctx.stroke();

        // Right Edge -> Center Microchip Pin
        ctx.beginPath();
        ctx.moveTo(w, cy + offsetY);
        ctx.lineTo(w - reach * 0.65, cy + offsetY);
        ctx.lineTo(w - reach, cy + offsetY - bevel);
        ctx.stroke();

        // Solder Via Node at Tip
        if (activeRatio > 0.05) {
          ctx.fillStyle = isCyan ? "#38BDF8" : "#FFFFFF";
          ctx.beginPath();
          ctx.arc(reach, cy + offsetY - bevel, 2.8, 0, Math.PI * 2);
          ctx.arc(w - reach, cy + offsetY - bevel, 2.8, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    const t1 = setTimeout(() => setPhase("locked"), 850);
    const t2 = setTimeout(() => {
      setPhase("exiting");
      if (typeof window !== "undefined") {
        sessionStorage.setItem("kkt_intro_seen", "true");
      }
    }, 2150);
    const t3 = setTimeout(() => setPhase("done"), 2800);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dismissIntro();
      }
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
  }, []);

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
            linear-gradient(to right, rgba(14, 165, 233, 0.045) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(14, 165, 233, 0.045) 1px, transparent 1px),
            linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px, 32px 32px, 160px 160px, 160px 160px",
        }}
      />

      {/* Radial vignette centering blue glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.12)_0%,transparent_50%,#05080F_92%)] pointer-events-none z-0" />

      {/* Canvas for animated 45° beveled traces */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

      {/* Top Micro Telemetry Bar with Skip Button */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between z-20 font-mono text-[10px] sm:text-[11px] text-slate-400 tracking-widest">
        <span className="flex items-center gap-2 truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-ping shrink-0" />
          <span className="truncate">KILAKITUTECH.CO.KE // BOOT</span>
        </span>
        {skipAvailable && (
          <button
            onClick={dismissIntro}
            className="text-slate-300 hover:text-[#38BDF8] transition uppercase tracking-widest text-[10px] cursor-pointer px-3 py-1.5 rounded-lg border border-white/10 bg-[#0A0F1C]/80 backdrop-blur-md active:scale-95"
            aria-label="Skip intro animation"
          >
            Skip [ESC]
          </button>
        )}
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
            className="w-full h-full overflow-visible drop-shadow-[0_0_16px_rgba(14,165,233,0.5)]"
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
            <g>
              <rect
                x="44"
                y="44"
                width="52"
                height="52"
                rx="6"
                fill="url(#icCoreRadial)"
                stroke="url(#icBorderGrad)"
                strokeWidth="2.2"
              />
              <rect
                x="51"
                y="51"
                width="38"
                height="38"
                rx="3"
                fill="#05080F"
                stroke="#38BDF8"
                strokeWidth="1"
                strokeDasharray="3 2"
              />
              <text
                x="70"
                y="73"
                textAnchor="middle"
                fill="#FFFFFF"
                fontFamily="monospace"
                fontSize="10"
                fontWeight="700"
                letterSpacing="1"
              >
                KKT
              </text>
              <text
                x="70"
                y="83"
                textAnchor="middle"
                fill="#38BDF8"
                fontFamily="monospace"
                fontSize="6.5"
              >
                MCU-01
              </text>
            </g>

            {/* Lower-Right Silicon Microchip Die */}
            <g>
              <rect
                x="110"
                y="110"
                width="56"
                height="56"
                rx="6"
                fill="url(#icCoreRadial)"
                stroke="url(#icBorderGrad)"
                strokeWidth="2.2"
              />
              <rect
                x="117"
                y="117"
                width="42"
                height="42"
                rx="3"
                fill="#05080F"
                stroke="#F8FAFC"
                strokeWidth="1"
                strokeDasharray="3 2"
              />
              <text
                x="138"
                y="140"
                textAnchor="middle"
                fill="#38BDF8"
                fontFamily="monospace"
                fontSize="10"
                fontWeight="700"
                letterSpacing="1"
              >
                SYS
              </text>
              <text
                x="138"
                y="150"
                textAnchor="middle"
                fill="#CBD5E1"
                fontFamily="monospace"
                fontSize="6.5"
              >
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
