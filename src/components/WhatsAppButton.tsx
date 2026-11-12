"use client";

export default function WhatsAppButton() {
  const whatsappUrl =
    "https://wa.me/254700000000?text=" +
    encodeURIComponent(
      "Hi Kila Kitu Tech! I visited kilakitutech.co.ke and would like to inquire about building a project."
    );

  return (
    <aside
      aria-label="Direct messaging"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 group"
    >
      <span className="hidden md:inline-block px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] shadow-lg group-hover:border-[var(--color-accent)] transition-colors">
        Chat with us
      </span>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Kila Kitu Tech on WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" fill="currentColor" stroke="none" />
          <path
            d="M8 12.5a5.5 5.5 0 0 0 4.5 4.5m-3-7.5c.3 0 .7.3.8.6l.7 1.8c.1.3 0 .6-.2.8l-.5.5c.7 1.1 1.6 2 2.7 2.7l.5-.5c.2-.2.5-.3.8-.2l1.8.7c.3.1.6.5.6.8v1.3c0 .5-.4.9-.9.9-6.1 0-11-4.9-11-11 0-.5.4-.9.9-.9H8z"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          />
        </svg>
      </a>
    </aside>
  );
}
