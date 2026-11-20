import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <p>
          INDEPENDENT THINKING.
          <br />
          CONNECTED ENGINEERING.
        </p>
        <div>
          <a href="#work">Work</a>
          <a href="#expertise">Expertise</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </div>
        <p>
          NAIROBI, KENYA
          <br />
          EAST AFRICA & BEYOND
        </p>
      </div>
      <a className="footer-wordmark" href="#top">
        kila kitu.
      </a>
      <div className="footer-bottom">
        <span>© 2026 Kila Kitu Technologies</span>
        <span>Everything, engineered together.</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
