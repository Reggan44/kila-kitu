"use client";

import React, { useState } from "react";
import Image from "next/image";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="nav-shell">
      <a className="brand" href="#top" aria-label="Kila Kitu home">
        <Image
          src="/assets/8a070.png"
          alt="Kila Kitu Logo"
          width={40}
          height={40}
          priority
        />
        <span>
          <strong>kila kitu</strong>
          <small>TECHNOLOGIES</small>
        </span>
      </a>
      <nav
        className={menuOpen ? "nav-links is-open" : "nav-links"}
        aria-label="Primary navigation"
      >
        <a href="#work" onClick={() => setMenuOpen(false)}>
          Work
        </a>
        <a href="#expertise" onClick={() => setMenuOpen(false)}>
          Expertise
        </a>
        <a href="#process" onClick={() => setMenuOpen(false)}>
          Process
        </a>
      </nav>
      <a className="button button-dark nav-cta" href="#contact">
        Let’s build something <Arrow />
      </a>
      <button
        className="menu-button"
        type="button"
        aria-expanded={menuOpen}
        aria-label="Toggle navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
      </button>
    </header>
  );
}
