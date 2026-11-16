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
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white hover:bg-neutral-50 border border-black/15 text-black shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
        <span className="text-xs font-semibold text-black tracking-wide">
          Chat with us
        </span>
        <span className="text-[10px] text-neutral-500 font-mono pl-1 border-l border-neutral-300">
          WhatsApp
        </span>
      </a>
    </aside>
  );
}
