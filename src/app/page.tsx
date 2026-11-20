"use client";

import React, { useEffect } from "react";
import IntroLoader from "@/components/IntroLoader";
import WhatsAppButton from "@/components/WhatsAppButton";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ProcessJourney from "@/components/ProcessJourney";
import SelectedWork from "@/components/SelectedWork";
import Capabilities from "@/components/Capabilities";
import HardwareLab from "@/components/HardwareLab";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    const observers = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const revealObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) => entry.isIntersecting && entry.target.classList.add("is-visible"),
        ),
      { threshold: 0.16 },
    );
    observers.forEach((element) => revealObserver.observe(element));

    return () => revealObserver.disconnect();
  }, []);

  return (
    <>
      {/* 3-Second Cinematic Intro */}
      <IntroLoader />

      <main id="top">
        <Navbar />
        <Hero />
        <Marquee />
        <ProcessJourney />
        <SelectedWork />
        <Capabilities />
        <HardwareLab />
        <Contact />
        <Footer />
      </main>

      {/* Floating Direct Line WhatsApp */}
      <WhatsAppButton />
    </>
  );
}
