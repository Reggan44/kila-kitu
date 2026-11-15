"use client";

import { siteConfig } from "@/config/site";

export default function WhatsAppButton() {
  return (
    <aside
      aria-label="Direct WhatsApp line"
      className="fixed bottom-6 right-6 z-50 flex items-center"
    >
      <a
        href={siteConfig.whatsappUrl("Hi Kila Kitu Technologies! I'd like to ask a few questions about your services.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0E1118]/95 hover:bg-[#131722] border border-white/15 hover:border-emerald-400/60 backdrop-blur-xl shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
        <span className="text-xs font-semibold text-white tracking-wide">
          Chat with us
        </span>
        <span className="text-[10px] text-neutral-400 font-mono pl-1 border-l border-white/10">
          WhatsApp
        </span>
      </a>
    </aside>
  );
}
