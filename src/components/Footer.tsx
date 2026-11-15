import Link from "next/link";
import { siteConfig } from "@/config/site";

const services = [
  "High-Speed Web Platforms",
  "Custom Business ERPs",
  "Safaricom Daraja M-Pesa",
  "E-Commerce & Storefronts",
];

const quickLinks = [
  { label: "Selected Work", href: "#work" },
  { label: "What We Build", href: "#services" },
  { label: "Interactive Estimator", href: "#estimator" },
  { label: "Studio Philosophy", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#06070A] text-neutral-400">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="#" className="inline-flex items-center gap-2 text-base font-black tracking-wider uppercase text-white">
              <span>KILA KITU</span>
              <span className="text-[#F59E0B]">TECHNOLOGIES</span>
            </Link>
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-neutral-400 font-light">
              Digital Solutions Studio in Nairobi engineering high-converting web platforms, custom ERPs, and native Daraja M-Pesa systems. One roof. Zero finger-pointing.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-4 inline-flex items-center gap-2 text-xs font-mono text-[#F59E0B] hover:underline"
            >
              {siteConfig.email}
            </a>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-white">
              Capabilities
            </h3>
            <ul className="mt-4 space-y-2.5">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-xs sm:text-sm text-neutral-400 transition-colors duration-200 hover:text-white font-light"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-white">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-neutral-400 transition-colors duration-200 hover:text-white font-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-white">
              Connect
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={siteConfig.whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-[#F59E0B] font-mono hover:underline"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>WhatsApp Discovery Line</span>
                </a>
              </li>
              <li>
                <span className="text-xs font-mono text-neutral-400 block">
                  Nairobi, Kenya &bull; East Africa
                </span>
              </li>
              <li>
                <span className="text-xs font-mono text-neutral-400 block">
                  Mon &ndash; Fri &bull; 8:00 AM &ndash; 6:00 PM EAT
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 lg:px-10 sm:flex-row font-mono text-[11px] text-neutral-400">
          <p>
            &copy; 2026 Kila Kitu Technologies. All rights reserved.
          </p>
          <p className="flex items-center gap-2 text-neutral-400">
            <span>Engineered with precision in Nairobi</span>
            <span className="text-[#F59E0B]">&bull;</span>
            <span className="text-emerald-400">kilakitutech.co.ke</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
