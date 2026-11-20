import React from "react";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function HardwareLab() {
  return (
    <section className="lab section-pad">
      <div className="lab-copy" data-reveal>
        <p className="section-kicker light">04 / BEYOND THE SCREEN</p>
        <h2>
          Digital ideas.
          <br />
          Physical proof.
        </h2>
        <p>
          From bespoke client telemetry to our own in-house connected devices, we architect circuit boards,
          write firmware, and build physical prototypes right here in Nairobi.
        </p>
        <a className="button button-outline" href="#contact">
          Explore connected products <Arrow />
        </a>
      </div>
      <div className="lab-image" data-reveal>
        <img
          src="/assets/b64db.png"
          alt="Electronics prototyping bench with connected circuit boards"
        />
        <div className="lab-scan" />
        <span>PROTOTYPED IN NAIROBI / 001</span>
      </div>
    </section>
  );
}
