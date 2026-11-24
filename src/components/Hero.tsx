"use client";

import React, { useRef, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);

  const moveStage = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const bounds = stageRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    stageRef.current.style.setProperty("--rx", `${-y * 8}deg`);
    stageRef.current.style.setProperty("--ry", `${x * 10}deg`);
  };

  const resetStage = () => {
    stageRef.current?.style.setProperty("--rx", "0deg");
    stageRef.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <section className="hero section-pad">
      <div className="eyebrow-row">
        <span>NAIROBI, KENYA / INDEPENDENT ENGINEERING STUDIO</span>
        <span>WEBSITES + SYSTEMS + CONNECTED THINGS</span>
      </div>
      <div className="hero-grid">
        <div className="hero-copy" data-reveal>
          <p className="section-kicker">FROM FIRST THOUGHT TO REAL-WORLD IMPACT</p>
          <h1>
            Ideas you can <em>step into.</em>
          </h1>
          <p className="hero-intro">
            We design and engineer websites, digital platforms, and connected products — as one
            complete experience.
          </p>
          <div className="action-row">
            <a className="button button-blue" href="#process">
              See how we build <span aria-hidden="true">↓</span>
            </a>
            <a className="text-link" href="#work">
              Explore our work <Arrow />
            </a>
          </div>
        </div>

        {/* 3D Interactive System Stage */}
        <div
          className="system-stage"
          ref={stageRef}
          onPointerMove={moveStage}
          onPointerLeave={resetStage}
          aria-label="An interactive stack showing the layers of a digital product"
          data-reveal
        >
          <div className="stage-orbit orbit-one" />
          <div className="stage-orbit orbit-two" />
          <div className="system-stack">
            <div className="stack-card stack-back">
              <span>INFRASTRUCTURE</span>
              <i />
            </div>
            <div className="stack-card stack-middle">
              <span>ENGINEERING</span>
              <div className="code-lines">
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="stack-card stack-front">
              <Image
                src="/assets/3613c.png"
                alt="A connected circuit board prototype"
                width={1376}
                height={768}
                sizes="(max-width: 680px) 86vw, 42vw"
              />
              <div>
                <span>EXPERIENCE</span>
                <strong>Built as one system.</strong>
              </div>
            </div>
          </div>
          <div className="stage-label label-left">
            <span>01</span> Think
          </div>
          <div className="stage-label label-right">
            <span>04</span> Scale
          </div>
          <p className="stage-hint">MOVE YOUR CURSOR</p>
        </div>
      </div>
      <div className="scroll-cue">
        <span /> SCROLL TO EXPLORE
      </div>
    </section>
  );
}
