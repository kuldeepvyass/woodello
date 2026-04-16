import { qrSystems } from "../data/content";

function QrSection({ title = "Scan to Watch Videos", subtitle = "Quick technical guides for applicators and merchants." }) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title" data-reveal>
          {title}
        </h2>
        <p className="section-subtitle" data-reveal>
          {subtitle}
        </p>
        <div className="qr-grid">
          {qrSystems.map((system) => (
            <article className="qr-card" key={system} data-reveal>
              <div className="qr-code" aria-hidden="true" />
              <h3>{system}</h3>
              <p className="small">Scan to open application walkthrough.</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default QrSection;
