"use client";

import React, { useEffect, useState } from "react";

const processSteps = [
  {
    number: "01",
    label: "Discover",
    title: "Find the real problem.",
    body: "We get close to your business, your audience, and the friction holding the next chapter back.",
    tags: ["Strategy", "Research", "Scope"],
  },
  {
    number: "02",
    label: "Design",
    title: "Make the invisible visible.",
    body: "Journeys, interfaces, and technical architecture become a working system you can see and shape.",
    tags: ["UX / UI", "Prototype", "Architecture"],
  },
  {
    number: "03",
    label: "Build",
    title: "Engineer every moving part.",
    body: "Website, commerce, software, payments, or hardware — one team builds the complete experience.",
    tags: ["Websites", "Platforms", "Hardware"],
  },
  {
    number: "04",
    label: "Evolve",
    title: "Launch is the beginning.",
    body: "We measure, learn, and keep improving so your system stays useful as your ambitions grow.",
    tags: ["Launch", "Support", "Scale"],
  },
];

export default function ProcessJourney() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const steps = Array.from(document.querySelectorAll<HTMLElement>("[data-process-step]"));
    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveStep(Number((entry.target as HTMLElement).dataset.processStep));
          }
        });
      },
      { rootMargin: "-36% 0px -44% 0px" },
    );
    steps.forEach((element) => stepObserver.observe(element));

    return () => stepObserver.disconnect();
  }, []);

  return (
    <section className="process section-pad" id="process">
      <div className="process-sticky">
        <p className="section-kicker light">01 / THE JOURNEY</p>
        <h2>
          Watch an idea become <em>real.</em>
        </h2>
        <div className="process-visual" aria-hidden="true">
          <div className={`process-core phase-${activeStep}`}>
            <div className="core-glow" />
            <div className="core-shape">
              <span>{processSteps[activeStep].number}</span>
            </div>
            <div className="core-ring ring-a" />
            <div className="core-ring ring-b" />
          </div>
        </div>
        <div className="process-meter">
          <div style={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }} />
        </div>
        <p className="process-count">{String(activeStep + 1).padStart(2, "0")} / 04</p>
      </div>
      <div className="process-steps">
        {processSteps.map((step, index) => (
          <article
            className={activeStep === index ? "process-step is-active" : "process-step"}
            data-process-step={index}
            key={step.number}
          >
            <div className="step-top">
              <span>{step.number}</span>
              <small>{step.label}</small>
            </div>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
            <div className="tag-row">
              {step.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
