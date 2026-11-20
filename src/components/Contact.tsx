"use client";

import React, { FormEvent, useState } from "react";
import { siteConfig } from "@/config/site";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Contact() {
  const [projectType, setProjectType] = useState("Website");

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name") || "";
    const email = data.get("email") || "";
    const message = data.get("message") || "";

    // Direct WhatsApp discovery link with prefilled details
    const text = `Hi Kila Kitu Technologies! I'm reaching out regarding a ${projectType} project.%0A%0AName: ${name}%0AEmail: ${email}%0ADetails: ${message}`;
    window.open(siteConfig.whatsappUrl(text), "_blank");
  };

  return (
    <section className="contact section-pad" id="contact">
      <div className="contact-copy" data-reveal>
        <p className="section-kicker">05 / START SOMETHING</p>
        <h2>
          What should we make <em>possible?</em>
        </h2>
        <p>A website. A better system. A connected product. Tell us where you want to go.</p>
        <a href="mailto:kilakitutechnologies@gmail.com">
          kilakitutechnologies@gmail.com <Arrow />
        </a>
      </div>
      <form onSubmit={submitEnquiry} data-reveal>
        <fieldset>
          <legend>I’m interested in</legend>
          <div className="choice-row">
            {["Website", "Business system", "Hardware / IoT"].map((choice) => (
              <button
                className={projectType === choice ? "is-selected" : ""}
                type="button"
                onClick={() => setProjectType(choice)}
                key={choice}
              >
                {choice}
              </button>
            ))}
          </div>
        </fieldset>
        <label>
          <span>Your name</span>
          <input name="name" placeholder="Alex Kamau" required />
        </label>
        <label>
          <span>Email address</span>
          <input name="email" type="email" placeholder="you@company.com" required />
        </label>
        <label>
          <span>Tell us a little about it</span>
          <textarea name="message" placeholder="What would you like to make possible?" required />
        </label>
        <button className="button button-dark form-submit" type="submit">
          Send project enquiry <Arrow />
        </button>
        <small>Your idea stays between us. No mailing lists. No spam.</small>
      </form>
    </section>
  );
}
