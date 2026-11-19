"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
          ? "bg-white/90 backdrop-blur-xl border-b border-black/10 py-3.5 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="#" className="flex items-center gap-3.5 group">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white border border-black/10 group-hover:border-[#0284C7]/50 flex items-center justify-center p-1 transition duration-200 shadow-sm">
            <Image
              src="/logo-mark.png"
              alt="Kila Kitu Technologies Logo"
              width={36}
              height={36}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div>
            <span className="font-sans font-bold text-sm tracking-[0.16em] text-black block uppercase leading-none">
              KILA KITU <span className="text-[#0284C7]">TECHNOLOGIES</span>
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
              className="hover:text-[#0284C7] transition duration-200"
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
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] animate-pulse" />
            <span>+254 700 000 000</span>
          </a>

          <a
            href={siteConfig.whatsappUrl("Hi Kila Kitu Technologies! I'd like to scope a project.")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full text-xs font-bold tracking-wide text-white bg-black hover:bg-[#0284C7] transition duration-200 shadow-md shadow-black/10 hover:scale-105 active:scale-95 uppercase cursor-pointer"
          >
            Start a Project &rarr;
          </a>
        </div>

        {/* Mobile Menu Button (Accessible 44px minimum touch target) */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          className="md:hidden w-11 h-11 rounded-xl bg-neutral-100 border border-black/10 flex flex-col items-center justify-center gap-1.5 focus:outline-none cursor-pointer"
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
        <div className="md:hidden border-b border-black/10 px-6 py-6 mt-3 space-y-4 bg-white/98 backdrop-blur-2xl shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-semibold text-neutral-800 hover:text-[#0284C7] uppercase tracking-wider py-1"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-black/10 flex flex-col gap-3">
            <a
              href="tel:+254700000000"
              className="text-xs font-mono text-neutral-600 flex items-center gap-2 py-1"
            >
              <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
              <span>+254 700 000 000</span>
            </a>
            <a
              href={siteConfig.whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl text-center text-xs font-bold uppercase tracking-wider block bg-black hover:bg-[#0284C7] text-white transition shadow-md"
            >
              Start a Project on WhatsApp &rarr;
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
