import { renderBrandWordmark } from "../utils/brandText";

function ApplicationGuidePage() {
  return (
    <main className="guide-page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Application Process Guide</span>
          <h1>Step-by-Step Timeline for Premium Finishing</h1>
          <p className="section-subtitle">Standardized process for consistent shade, adhesion, and long-term performance.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="timeline">
            <article className="timeline-item" data-reveal>
              <h3>1. Surface Prep</h3>
              <p>Sand from 180 to 320 grit, fill defects, remove dust, verify moisture control.</p>
            </article>
            <article className="timeline-item" data-reveal>
              <h3>2. Sealer</h3>
              <p>{renderBrandWordmark("Apply 1-2 coats of Woodello sealer with proper flash-off and leveling control.")}</p>
            </article>
            <article className="timeline-item" data-reveal>
              <h3>3. Stain</h3>
              <p>Spray or wipe uniformly, correct shade variation, and allow complete dry.</p>
            </article>
            <article className="timeline-item" data-reveal>
              <h3>4. Top Coat</h3>
              <p>Apply selected PU/Melamine top coat at recommended viscosity and pressure.</p>
            </article>
            <article className="timeline-item" data-reveal>
              <h3>5. Final Curing</h3>
              <p>Allow full cure cycle before packing or heavy handling to prevent print marks.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <article className="tile" data-reveal>
            <h3>Application Controls</h3>
            <ul className="list">
              <li>Room temperature: 25 +/- 2 C</li>
              <li>Relative humidity: 45-65%</li>
              <li>Clean compressed air and moisture trap</li>
              <li>Viscosity check before each batch</li>
            </ul>
          </article>
          <article className="tile" data-reveal>
            <h3>Common Defect Prevention</h3>
            <ul className="list">
              <li>Orange peel: control viscosity and gun distance</li>
              <li>Pinholes: increase flash time</li>
              <li>Shade mismatch: sample board approval</li>
              <li>Soft film: verify hardener ratio</li>
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}

export default ApplicationGuidePage;
