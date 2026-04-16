import { useState } from "react";
import { shades } from "../data/content";

function ShadeGalleryPage() {
  const [active, setActive] = useState(shades[0]);

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Shade Gallery</span>
          <h1>Wood Stain Shade Collection</h1>
          <p className="section-subtitle">Hover or tap a swatch to preview the exact shade tone.</p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <div className="swatch-grid">
              {shades.map((shade) => (
                <article
                  className="swatch"
                  tabIndex={0}
                  key={shade.name}
                  onMouseEnter={() => setActive(shade)}
                  onFocus={() => setActive(shade)}
                  onClick={() => setActive(shade)}
                  data-reveal
                >
                  <div className="swatch-color" style={{ background: shade.tone }} />
                  <div className="swatch-info">
                    <strong>{shade.name}</strong>
                    <p className="small">{shade.subtitle}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="preview-block" data-reveal>
            <h3>Mockup Preview: {active.name}</h3>
            <p className="small">Solid shade preview for direct color reference.</p>
            <div className="preview-image" style={{ backgroundColor: active.tone }} />
          </aside>
        </div>
      </section>
    </main>
  );
}

export default ShadeGalleryPage;
