"use client";

import { useEffect, useState } from "react";

interface IntroLoaderProps {
  onComplete?: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  // Phase sequence: 0 = pieces appearing, 1 = merge to center, 2 = reveal wordmark, 3 = curtain split, 4 = complete/unmount
  const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if user already saw the loader in this session
    const hasSeen = typeof window !== "undefined" && sessionStorage.getItem("kila_kitu_intro_seen");
    if (hasSeen) {
      setDismissed(true);
      onComplete?.();
      return;
    }

    // Sequence timers based on exact specification
    const t1 = setTimeout(() => setPhase(1), 800);   // 0.8s: Merge into center
    const t2 = setTimeout(() => setPhase(2), 1500);  // 1.5s: Reveal Wordmark
    const t3 = setTimeout(() => setPhase(3), 2200);  // 2.2s: Curtain split opens
    const t4 = setTimeout(() => {
      setPhase(4);
      setDismissed(true);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("kila_kitu_intro_seen", "true");
      }
      onComplete?.();
    }, 2700);                                         // 2.7s: Fully unmount

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        skipIntro();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const skipIntro = () => {
    setPhase(4);
    setDismissed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("kila_kitu_intro_seen", "true");
    }
    onComplete?.();
  };

  if (dismissed || phase === 4) return null;

  return (
    <div
      aria-label="Site introduction"
      className="fixed inset-0 z-[100] pointer-events-auto overflow-hidden select-none"
    >
      {/* Left Sliding Curtain */}
      <div
        className={`absolute top-0 left-0 bottom-0 w-1/2 bg-[#0B0F19] transition-transform duration-500 ease-out z-10 ${
          phase === 3 ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{
          backgroundImage:
            "radial-gradient(circle at 100% 50%, rgba(245, 158, 11, 0.05), transparent 40%), linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 40px 40px, 40px 40px",
        }}
      />

      {/* Right Sliding Curtain */}
      <div
        className={`absolute top-0 right-0 bottom-0 w-1/2 bg-[#0B0F19] transition-transform duration-500 ease-out z-10 ${
          phase === 3 ? "translate-x-full" : "translate-x-0"
        }`}
        style={{
          backgroundImage:
            "radial-gradient(circle at 0% 50%, rgba(245, 158, 11, 0.05), transparent 40%), linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 40px 40px, 40px 40px",
        }}
      />

      {/* Center Animation Stage (Stays on top of curtains until split) */}
      <div
        className={`absolute inset-0 z-20 flex flex-col items-center justify-center transition-opacity duration-300 ${
          phase === 3 ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      >
        {/* Glow backdrop behind emblem */}
        <div className="absolute w-72 h-72 rounded-full bg-[#F59E0B]/15 blur-3xl pointer-events-none transition-all duration-700"></div>

        {/* 4-Pillar Building Blocks Node Assembly */}
        <div className="relative w-44 h-44 flex items-center justify-center">
          {/* Node 1: Code / Web (Top-Left) */}
          <div
            className={`absolute w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-500 ease-in-out ${
              phase === 0
                ? "-translate-x-12 -translate-y-12 opacity-100 bg-[#111827] border-[#F59E0B]/50 shadow-lg shadow-[#F59E0B]/20"
                : "translate-x-0 translate-y-0 opacity-0 scale-50"
            }`}
          >
            <span className="text-sm font-mono font-bold text-[#F59E0B]">&lt;/&gt;</span>
          </div>

          {/* Node 2: Mobile App (Top-Right) */}
          <div
            className={`absolute w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-500 ease-in-out ${
              phase === 0
                ? "translate-x-12 -translate-y-12 opacity-100 bg-[#111827] border-emerald-500/50 shadow-lg shadow-emerald-500/20"
                : "translate-x-0 translate-y-0 opacity-0 scale-50"
            }`}
          >
            <span className="text-base text-emerald-400">📱</span>
          </div>

          {/* Node 3: Cloud / Systems (Bottom-Left) */}
          <div
            className={`absolute w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-500 ease-in-out ${
              phase === 0
                ? "-translate-x-12 translate-y-12 opacity-100 bg-[#111827] border-cyan-500/50 shadow-lg shadow-cyan-500/20"
                : "translate-x-0 translate-y-0 opacity-0 scale-50"
            }`}
          >
            <span className="text-base text-cyan-400">⚡</span>
          </div>

          {/* Node 4: Growth / M-Pesa (Bottom-Right) */}
          <div
            className={`absolute w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-500 ease-in-out ${
              phase === 0
                ? "translate-x-12 translate-y-12 opacity-100 bg-[#111827] border-amber-400/50 shadow-lg shadow-amber-400/20"
                : "translate-x-0 translate-y-0 opacity-0 scale-50"
            }`}
          >
            <span className="text-sm font-bold text-amber-300">254</span>
          </div>

          {/* Merged Emblem: Kila Kitu Tech Core (Appears in Phase 1 & 2) */}
          <div
            className={`absolute w-20 h-20 rounded-2xl bg-gradient-to-br from-[#F59E0B] via-[#D97706] to-[#B45309] flex items-center justify-center shadow-2xl shadow-[#F59E0B]/40 transition-all duration-500 ease-out border border-[#FDE68A]/60 ${
              phase >= 1 ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 rotate-45"
            }`}
          >
            <div className="w-16 h-16 rounded-xl bg-[#0B0F19] flex items-center justify-center">
              <span className="text-2xl font-black text-[#F59E0B] tracking-tighter">
                KK
              </span>
            </div>
          </div>
        </div>

        {/* Wordmark Reveal (Phase 2) */}
        <div
          className={`mt-6 text-center transition-all duration-500 ${
            phase >= 2
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <div className="text-2xl md:text-3xl font-black tracking-tight text-white">
            KILA KITU <span className="text-[#F59E0B]">TECH</span>
          </div>
          <div className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-semibold mt-1.5">
            Everything Digital. Built to Scale.
          </div>
        </div>

        {/* Skip action in top right */}
        <button
          onClick={skipIntro}
          className="absolute top-6 right-6 text-[11px] uppercase tracking-wider text-neutral-500 hover:text-[#F59E0B] transition-colors px-3 py-1.5 rounded-full border border-white/10 hover:border-[#F59E0B]/30 bg-black/40 backdrop-blur-sm"
        >
          Skip Intro [Esc] ✕
        </button>
      </div>
    </div>
  );
}
