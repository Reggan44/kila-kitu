import React from "react";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function SelectedWork() {
  return (
    <section className="work section-pad" id="work">
      <div className="section-heading" data-reveal>
        <div>
          <p className="section-kicker">02 / SELECTED WORK</p>
          <h2>
            Made to live
            <br />
            in the world.
          </h2>
        </div>
        <p>
          Over 13+ client systems and in-house platforms shipped across East Africa and beyond. Designed here. Running everywhere.
        </p>
      </div>

      <div className="project-grid">
        {/* Sofiya Nzau */}
        <a
          className="project-card project-large"
          href="https://sofiyanzau.com"
          target="_blank"
          rel="noopener noreferrer"
          data-reveal
        >
          <div className="project-image">
            <img
              src="/projects/sofiya.jpg"
              alt="Sofiya Nzau official website and global tour platform"
            />
            <span>LIVE PROJECT ↗</span>
          </div>
          <div className="project-meta">
            <div>
              <small>MUSIC & CULTURE / WEBSITE</small>
              <h3>Sofiya Nzau</h3>
              <p>A global stage and touring platform for the chart-topping Afrohouse sensation.</p>
            </div>
            <b>
              <Arrow />
            </b>
          </div>
        </a>

        {/* Nzuki & Co. Advocates */}
        <a
          className="project-card project-offset"
          href="https://www.nzukilawassociates.co.ke/"
          target="_blank"
          rel="noopener noreferrer"
          data-reveal
        >
          <div className="project-image">
            <img
              src="/projects/nzuki.jpg"
              alt="Nzuki & Company Advocates website platform"
              style={{ objectPosition: "left top" }}
            />
            <span>LIVE PROJECT ↗</span>
          </div>
          <div className="project-meta">
            <div>
              <small>PROFESSIONAL SERVICES / WEBSITE</small>
              <h3>Nzuki & Co. Advocates</h3>
              <p>A digital presence built around trust and legal clarity.</p>
            </div>
            <b>
              <Arrow />
            </b>
          </div>
        </a>
      </div>

      <div className="project-grid" style={{ marginTop: "26px" }}>
        {/* Meed Collections */}
        <a
          className="project-card project-large"
          href="https://www.meedcollections.store/"
          target="_blank"
          rel="noopener noreferrer"
          data-reveal
        >
          <div className="project-image">
            <img src="/projects/meed.jpg" alt="Meed Collections E-Commerce Storefront" />
            <span>LIVE PROJECT ↗</span>
          </div>
          <div className="project-meta">
            <div>
              <small>RETAIL & COMMERCE / STOREFRONT</small>
              <h3>Meed Collections</h3>
              <p>Full-stack multi-vendor marketplace with automated M-Pesa checkout and regional delivery.</p>
            </div>
            <b>
              <Arrow />
            </b>
          </div>
        </a>

        {/* MyIbada */}
        <a
          className="project-card project-offset"
          href="https://myibada.co.ke"
          target="_blank"
          rel="noopener noreferrer"
          data-reveal
        >
          <div className="project-image">
            <img
              src="/projects/myibada.jpg"
              alt="MyIbada church management platform"
              style={{ objectPosition: "left top" }}
            />
            <span style={{ background: "var(--blue)", color: "white" }}>IN-HOUSE VENTURE ↗</span>
          </div>
          <div className="project-meta">
            <div>
              <small>CLOUD SAAS / COMMUNITY ERP</small>
              <h3>MyIbada</h3>
              <p>Intelligent church management with integrated NFC check-in and automated M-Pesa reconciliation.</p>
            </div>
            <b>
              <Arrow />
            </b>
          </div>
        </a>
      </div>
    </section>
  );
}
