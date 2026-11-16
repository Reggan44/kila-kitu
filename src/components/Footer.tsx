import Link from "next/link";
import { siteConfig } from "@/config/site";

const services = [
  "Custom PCB & Embedded Lab",
  "High-Speed Web Platforms",
  "Custom Business ERPs & POS",
  "Safaricom Daraja M-Pesa & IoT",
];

const quickLinks = [
  { label: "Hardware Lab", href: "#hardware" },
  { label: "Selected Work", href: "#work" },
  { label: "Capabilities", href: "#services" },
  { label: "Technical Consultation", href: "#consultation" },
  { label: "Studio Philosophy", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-neutral-400">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="#" className="inline-flex items-center gap-2 text-base font-black tracking-wider uppercase text-white">
              <span>KILA KITU</span>
              <span className="text-neutral-400">TECHNOLOGIES</span>
            </Link>
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-neutral-400 font-light">
              Digital Solutions Studio in Nairobi engineering high-converting web platforms, custom ERPs, and physical telemetry hardware. One roof. Zero finger-pointing.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-4 inline-flex items-center gap-2 text-xs font-mono text-white hover:underline"
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

          {/* Verification & Location */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-white">
              Engineering Lab
            </h3>
            <div className="mt-4 space-y-2 text-xs font-light text-neutral-400 leading-relaxed">
              <p className="text-white font-medium">Nairobi, Kenya</p>
              <p>Serving enterprise clients, institutions, and growth brands across East Africa & global markets.</p>
              <div className="pt-2 flex items-center gap-2 font-mono text-[11px] text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>Nairobi Studio Active</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs sm:flex-row text-neutral-500 font-mono">
          <p>&copy; 2026 Kila Kitu Technologies. All rights reserved.</p>
          <p className="tracking-widest uppercase text-[10px]">
            Engineered with Next.js &bull; Nairobi, Kenya
          </p>
        </div>
      </div>
    </footer>
  );
}
