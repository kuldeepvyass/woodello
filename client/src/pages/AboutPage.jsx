import { renderBrandWordmark } from "../utils/brandText";

function AboutPage() {
  return (
    <main>
      <section className="page-hero about-hero">
        <div className="container">
          <span className="eyebrow">About Us</span>
          <h1>{renderBrandWordmark("Woodello by Marudhar Chemicals", "brand-wordmark-hero")}</h1>
          <p className="section-subtitle">
            {renderBrandWordmark(
              "Woodello is a furniture coating and surface care brand from Marudhar Chemicals, created to enhance the beauty, durability, and performance of furniture finishes."
            )}
          </p>
          <div className="about-hero-metrics">
            <article>
              <strong>1,000+</strong>
              Furniture factories worked with
            </article>
            <article>
              <strong>70+</strong>
              Countries reached through export ecosystems
            </article>
            <article>
              <strong>From Factories to Homes</strong>
              Professional finishing knowledge adapted for home furniture care
            </article>
          </div>
        </div>
      </section>

      <section className="section about-story">
        <div className="container about-story-grid">
          <article className="tile about-story-main" data-reveal>
            <h3>Built on Real Furniture Finishing Experience</h3>
            <p>
              The brand builds on Marudhar Chemicals&apos; long experience in the furniture finishing industry, working
              closely with furniture manufacturers and exporters.
            </p>
            <p>
              Marudhar Chemicals has experience of working with over 1,000 furniture factories whose products are
              exported to more than 70 countries worldwide. This deep connection with the furniture manufacturing
              ecosystem helps {renderBrandWordmark("Woodello")} develop products that meet real finishing requirements
              for both professional use and home care.
            </p>
            <p>
              {renderBrandWordmark(
                "Woodello offers a range of finishing and maintenance solutions designed to protect, revive, and enhance furniture surfaces made from wood, metal, and leather."
              )}
            </p>
          </article>

          <article className="tile about-story-side" data-reveal>
            <p className="about-pill">Brand Belief</p>
            <h3>Furniture Reflects Craftsmanship, Design, and Everyday Living.</h3>
            <p>
              Our products help maintain the natural character of materials while providing reliable protection and
              long-lasting appearance.
            </p>
            <p className="about-tagline">Our goal is to bring professional furniture finishing solutions from factories to homes.</p>
          </article>
        </div>
      </section>

      <section className="section about-focus">
        <div className="container">
          <h2 className="section-title" data-reveal>
            Our Focus
          </h2>
          <p className="section-subtitle" data-reveal>
            {renderBrandWordmark(
              "With industry expertise and a focus on quality, Woodello aims to help furniture remain beautiful, protected, and long-lasting."
            )}
          </p>

          <div className="about-focus-grid">
            <article className="tile about-focus-item" data-reveal>
              <h3>Furniture Finishing and Maintenance</h3>
              <p>Solutions developed for both professional finishing workflows and everyday care needs.</p>
            </article>

            <article className="tile about-focus-item" data-reveal>
              <h3>Multi-Surface Capability</h3>
              <p>Products designed for wood, metal, and leather surface protection and finish enhancement.</p>
            </article>

            <article className="tile about-focus-item" data-reveal>
              <h3>Performance-First Outcomes</h3>
              <p>Enhancing durability, gloss retention, and reliable long-term surface protection.</p>
            </article>

            <article className="tile about-focus-item" data-reveal>
              <h3>Factory-Backed Knowledge</h3>
              <p>Built from experience with export-oriented furniture manufacturers and real production challenges.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section about-closing">
        <div className="container">
          <article className="about-cta" data-reveal>
            <h2>{renderBrandWordmark("Woodello by Marudhar Chemicals", "brand-wordmark-heading")}</h2>
            <ul className="list">
              <li>Furniture coating and surface care expertise</li>
              <li>Engineered for beauty, durability, and performance</li>
              <li>Professional-grade finishing solutions from factories to homes</li>
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
