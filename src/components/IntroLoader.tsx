"use client";

import { useEffect, useState } from "react";

export default function IntroLoader() {
  const [dismissed, setDismissed] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  useEffect(() => {
    const hasSeen =
      typeof window !== "undefined" &&
      sessionStorage.getItem("kkt_intro_seen");
    if (hasSeen) {
      setDismissed(true);
      setUnmounted(true);
      return;
    }

    const timer = setTimeout(() => {
      setDismissed(true);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("kkt_intro_seen", "true");
      }
    }, 2450);

    const unmountTimer = setTimeout(() => {
      setUnmounted(true);
    }, 3300);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDismissed(true);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("kkt_intro_seen", "true");
        }
        setTimeout(() => setUnmounted(true), 800);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      clearTimeout(unmountTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (unmounted) return null;

  return (
    <>
      <style jsx global>{`
        .kkt-arch-grid {
          background-color: #ffffff;
          background-image:
            linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(to right, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 1px, transparent 1px);
          background-size: 40px 40px, 40px 40px, 200px 200px, 200px 200px;
        }
        #kkt-intro-loader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: transform 0.8s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.7s ease;
        }
        #kkt-intro-loader.intro-dismissed {
          transform: translateY(-28px);
          opacity: 0;
          pointer-events: none;
        }
      `}</style>

      <div
        id="kkt-intro-loader"
        className={`kkt-arch-grid ${dismissed ? "intro-dismissed" : ""}`}
      >
        <svg
          width="160"
          viewBox="0 0 255 116"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 10 12 L 32 12 L 32 52 L 68 12 L 96 12 L 54 57 L 98 104 L 68 104 L 32 64 L 32 104 L 10 104 Z"
            fill="#09090B"
          />
          <path
            d="M 98 12 L 120 12 L 120 52 L 156 12 L 184 12 L 142 57 L 186 104 L 156 104 L 120 64 L 120 104 L 98 104 Z"
            fill="#71717A"
          />
          <path
            d="M 176 12 L 244 12 L 234 31 L 219 31 L 219 104 L 197 104 L 197 31 L 176 31 Z"
            fill="#09090B"
          />
          <circle cx="242" cy="18" r="4.5" fill="#09090B" />
        </svg>

        <div
          style={{
            marginTop: "20px",
            color: "#09090B",
            fontWeight: 800,
            letterSpacing: "0.26em",
            fontFamily: "system-ui, -apple-system, sans-serif",
            textTransform: "uppercase",
            fontSize: "14px",
          }}
        >
          KILA KITU TECHNOLOGIES
        </div>

        <div
          style={{
            marginTop: "10px",
            color: "#71717A",
            fontSize: "10px",
            letterSpacing: "0.32em",
            fontFamily: "monospace",
          }}
        >
          HARDWARE &bull; FIRMWARE &bull; SOFTWARE
        </div>
      </div>
    </>
  );
}
