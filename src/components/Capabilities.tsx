import React from "react";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

const capabilities = [
  [
    "01",
    "Websites & e-commerce",
    "Fast, expressive digital experiences that turn attention into action.",
    "SITES / STOREFRONTS / PLATFORMS",
  ],
  [
    "02",
    "Business systems",
    "Less paperwork. More control. Software shaped around how your team actually works.",
    "ERP / POS / OPERATIONS",
  ],
  [
    "03",
    "Payments & integrations",
    "Connected customer journeys with M-Pesa and the tools your business depends on.",
    "DARAJA / AUTOMATION / APIs",
  ],
  [
    "04",
    "Hardware & IoT",
    "From custom circuit boards to the cloud interfaces that make their data useful.",
    "PCB / FIRMWARE / TELEMETRY",
  ],
];

export default function Capabilities() {
  return (
    <section className="capabilities section-pad" id="expertise">
      <div className="capability-intro" data-reveal>
        <p className="section-kicker light">03 / WHAT WE BUILD</p>
        <h2>
          One team.
          <br />
          Every layer.
        </h2>
        <p>
          No handoffs between five vendors. Just one accountable team from the first sketch to the
          system you run on.
        </p>
      </div>
      <div className="capability-list">
        {capabilities.map(([number, title, body, tags]) => (
          <a href="#contact" className="capability-row" key={number}>
            <span>{number}</span>
            <div>
              <h3>{title}</h3>
              <p>{body}</p>
              <small>{tags}</small>
            </div>
            <Arrow />
          </a>
        ))}
      </div>
    </section>
  );
}
