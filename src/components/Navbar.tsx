"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Architecture", href: "#live-signal-card" },
  { label: "Ecosystem", href: "#services" },
  { label: "Case Studies", href: "#portfolio" },
  { label: "Estimator", href: "#estimator" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#07090E]/90 backdrop-blur-xl border-b border-[#1A2333] shadow-2xl py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Monogram & Title */}
        <Link href="#" className="flex items-center gap-3 group shrink-0">
          <div className="w-11 h-8 rounded-lg bg-[#0B0F17] border border-[#1A2333] group-hover:border-[#F59E0B]/50 flex items-center justify-center px-1.5 transition">
            <svg
              className="w-full h-full"
              viewBox="0 0 255 116"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 10 12 L 32 12 L 32 52 L 68 12 L 96 12 L 54 57 L 98 104 L 68 104 L 32 64 L 32 104 L 10 104 Z"
                fill="#E2E8F0"
              />
              <path
                d="M 98 12 L 120 12 L 120 52 L 156 12 L 184 12 L 142 57 L 186 104 L 156 104 L 120 64 L 120 104 L 98 104 Z"
                fill="#F59E0B"
              />
              <path
                d="M 176 12 L 244 12 L 234 31 L 219 31 L 219 104 L 197 104 L 197 31 L 176 31 Z"
                fill="#E2E8F0"
              />
              <circle cx="242" cy="18" r="5" fill="#FBBF24" />
            </svg>
          </div>
          <div>
            <span className="font-sans font-black text-sm sm:text-base tracking-[0.14em] text-white block leading-none uppercase">
              KILA KITU <span className="text-[#F59E0B]">TECHNOLOGIES</span>
            </span>
            <span className="font-mono text-[10px] text-slate-400 tracking-wider block mt-1">
              kilakitutech.co.ke
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-medium tracking-wide text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center gap-2.5">
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("kkt-replay-intro"));
              }
            }}
            className="px-3.5 py-2 rounded-xl bg-[#0B0F17] hover:bg-[#0F1522] border border-[#1A2333] hover:border-[#F59E0B]/50 text-slate-300 hover:text-[#F59E0B] text-xs font-medium transition flex items-center gap-1.5 cursor-pointer"
            title="Replay NVIDIA-style Intro"
          >
            <span className="text-[#F59E0B]">⟲</span>
            <span>Replay Intro</span>
          </button>
          <a
            href={siteConfig.whatsappUrl("Hi Kila Kitu Technologies! I'd like to book a scoping call for my system.")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-xl text-xs font-bold text-[#07090E] bg-[#F59E0B] hover:bg-[#FBBF24] transition-all duration-200 shadow-md shadow-[#F59E0B]/20 hover:scale-105"
          >
            Start a Project →
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden w-10 h-10 rounded-xl glass-card flex flex-col items-center justify-center gap-1.5 text-white"
          aria-label="Toggle menu"
        >
          <span
            className={`w-5 h-0.5 bg-white transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-white transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-white transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden glass-card border-b border-[#1A2333] px-6 py-6 mt-3 space-y-4 bg-[#07090E]/95 backdrop-blur-2xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-semibold text-neutral-200 hover:text-[#F59E0B]"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-[#1A2333] space-y-2">
            <button
              onClick={() => {
                setMobileOpen(false);
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("kkt-replay-intro"));
                }
              }}
              className="w-full py-2.5 rounded-xl text-center text-xs font-semibold block bg-[#0B0F17] border border-[#1A2333] text-slate-300"
            >
              ⟲ Replay Intro
            </button>
            <a
              href={siteConfig.whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl text-center text-xs font-bold block bg-[#F59E0B] text-[#07090E]"
            >
              Start a Project on WhatsApp →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
