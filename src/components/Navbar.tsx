"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

const navLinks = [
  { label: "Hardware Lab", href: "#hardware" },
  { label: "Selected Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Consultation", href: "#consultation" },
  { label: "Studio", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-black/10 py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
        {/* Brand Monogram & Name */}
        <Link href="#" className="flex items-center gap-3.5 group">
          <div className="w-10 h-8 rounded-lg bg-neutral-100 border border-black/10 group-hover:border-black/30 flex items-center justify-center px-1 transition duration-200">
            <svg
              className="w-full h-full"
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
              <circle cx="242" cy="18" r="5" fill="#09090B" />
            </svg>
          </div>
          <div>
            <span className="font-sans font-bold text-sm tracking-[0.16em] text-black block uppercase leading-none">
              KILA KITU <span className="text-neutral-500">TECHNOLOGIES</span>
            </span>
            <span className="font-mono text-[9px] text-neutral-500 tracking-wider block mt-1 uppercase">
              NAIROBI &bull; STUDIO
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider uppercase text-neutral-600">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-black transition duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action: Direct Phone & Start Project CTA */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href="tel:+254700000000"
            className="flex items-center gap-2 text-xs font-mono text-neutral-600 hover:text-black transition"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            <span>+254 700 000 000</span>
          </a>

          <a
            href={siteConfig.whatsappUrl("Hi Kila Kitu Technologies! I'd like to scope a project.")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full text-xs font-bold tracking-wide text-white bg-black hover:bg-neutral-800 transition duration-200 shadow-md shadow-black/10 hover:scale-105 active:scale-95 uppercase"
          >
            Start a Project &rarr;
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          className="md:hidden w-10 h-10 rounded-xl bg-neutral-100 border border-black/10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
        >
          <span
            className={`w-5 h-0.5 bg-black transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-black transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-black transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-b border-black/10 px-6 py-6 mt-4 space-y-4 bg-white/98 backdrop-blur-2xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-semibold text-neutral-800 hover:text-black uppercase tracking-wider"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-black/10 flex flex-col gap-3">
            <a
              href="tel:+254700000000"
              className="text-xs font-mono text-neutral-600 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-black" />
              <span>+254 700 000 000</span>
            </a>
            <a
              href={siteConfig.whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider block bg-black text-white"
            >
              Start a Project on WhatsApp &rarr;
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
