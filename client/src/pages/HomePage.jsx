import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ProductCards from "../components/ProductCards";
import { productCards, qrSystems } from "../data/content";
import { renderBrandWordmark } from "../utils/brandText";

function HomePage() {
  const heroRef = useRef(null);
  const instagramFeedRef = useRef(null);
  const [heroMood, setHeroMood] = useState("amber");
  const featured = productCards
    .slice(0, 6)
    .map((item) => ({ ...item, link: `/products/${item.slug}`, linkLabel: "Explore System" }));
  const heroPrimary = featured[0] ?? {
    title: "Woodello Finish Systems",
    category: "Premium Coatings",
    description: "High-performance coating systems for depth, durability, and consistent finish quality.",
    link: "/products",
    image: "/assets/images/image1.png",
  };
  const heroChips = [...new Set(featured.map((item) => item.category))].slice(0, 4);
  const showcaseSystems = productCards
    .slice(0, 4)
    .map((item) => ({ ...item, link: `/products/${item.slug}`, linkLabel: "View Details" }));
  const spotlight = showcaseSystems[0] ?? heroPrimary;
  const spotlightCards = showcaseSystems.slice(1, 4);
  const categoryChips = [...new Set(productCards.map((item) => item.category))].slice(0, 6);
  const learningTracks = qrSystems.slice(0, 4);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || typeof window === "undefined") {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return undefined;
    }

    const handleMove = (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      hero.style.setProperty("--pointer-x", `${x * 22}px`);
      hero.style.setProperty("--pointer-y", `${y * 16}px`);
    };

    const resetMove = () => {
      hero.style.setProperty("--pointer-x", "0px");
      hero.style.setProperty("--pointer-y", "0px");
    };

    hero.addEventListener("mousemove", handleMove);
    hero.addEventListener("mouseleave", resetMove);

    return () => {
      hero.removeEventListener("mousemove", handleMove);
      hero.removeEventListener("mouseleave", resetMove);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !instagramFeedRef.current) {
      return undefined;
    }

    const existingScript = document.querySelector("script[data-sociablekit-instagram-feed]");
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.src = "https://widgets.sociablekit.com/instagram-feed/widget.js";
    script.defer = true;
    script.dataset.sociablekitInstagramFeed = "true";
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <main>
      <section
        ref={heroRef}
        className={`hero-signature hero-mood-${heroMood}`}
        style={{ "--hero-image": "url('/assets/images/hero/luxury-furniture-hero.jpg')" }}
      >
        <div className="hero-signature-veil" aria-hidden="true" />
        <div className="hero-signature-grain" aria-hidden="true" />
        <span className="hero-signature-glow hero-signature-glow-left" aria-hidden="true" />
        <span className="hero-signature-glow hero-signature-glow-right" aria-hidden="true" />

        <div className="container hero-luxe-shell">
          <div className="hero-luxe-copy" data-reveal>
            <span className="eyebrow">Premium Wood Coatings</span>
            <p className="hero-luxe-tagline">Crafted Chemistry for Signature Interiors</p>
            <h1 className="hero-luxe-title">
              {/* <span>WOODELLO </span> */}
              <span>From Factories to Home Elegance.</span>
            </h1>
            <p className="hero-luxe-lead">
              From bespoke residential pieces to high-output factory runs, WOODELLO coating systems deliver deep
              grain expression, silk-touch feel, and lasting elegance from the first coat.
            </p>
            <div className="btn-row">
              <Link className="btn btn-primary" to="/products">
                Explore Collection
              </Link>
              <Link className="btn btn-secondary" to="/how-to-choose">
                Find Your Finish
              </Link>
            </div>

            

            <div className="hero-mood-switch" data-reveal>
              <button
                type="button"
                className={heroMood === "amber" ? "is-active" : ""}
                onClick={() => setHeroMood("amber")} 
              >
                MELAMINE
              </button>
              <button
                type="button"
                className={heroMood === "ivory" ? "is-active" : ""}
                onClick={() => setHeroMood("ivory")}
              >
               PU
              </button>
              <button
                type="button"
                className={heroMood === "teak" ? "is-active" : ""}
                onClick={() => setHeroMood("teak")}
              >
                NC
              </button>
            </div>

            <div className="hero-luxe-brief" data-reveal>
              <article className="hero-luxe-brief-item">
                <p>Signature Grain Depth</p>
                <strong>Luxury finish with rich wood character.</strong>
              </article>
              <article className="hero-luxe-brief-item">
                <p>Elegant Protection</p>
                <strong>Built to resist scratches, stains, and daily wear.</strong>
              </article>
              <article className="hero-luxe-brief-item">
                <p>Factory to Home</p>
                <strong>Consistent premium output across every project scale.</strong>
              </article>
            </div>
          </div>
        </div>
        <div className="hero-luxe-scroll" aria-hidden="true">
          Scroll to Discover
        </div>
      </section>

      <section className="section home-immersive">
        <div className="container home-immersive-grid">
          <article className="home-immersive-visual" data-reveal>
            <p className="home-immersive-label">Signature Grain Depth</p>
            <h3>Architectural finishes for furniture that needs to stand out.</h3>
            <p className="home-immersive-foot">Color stability, touch quality, and long-term confidence in one stack.</p>
          </article>

          <article className="home-immersive-copy" data-reveal>
            <span className="eyebrow">Factories to Home</span>
            <h2>Performance chemistry that still feels handcrafted.</h2>
            <p>
              {renderBrandWordmark(
                "Woodello blends process-ready formulations with design-led aesthetics so contractors, manufacturers, and homeowners get the same premium output."
              )}
            </p>

            <ul className="home-checklist">
              <li>Reliable shades and consistency across batches</li>
              <li>Complete stacks from sealer to topcoat</li>
              <li>Practical support for application and troubleshooting</li>
            </ul>

            <div className="home-immersive-proof">
              <article>
                <strong>98%</strong>
                Repeat-order confidence from regular trade buyers
              </article>
              <article>
                <strong>48h</strong>
                Fast-curing cycle options for faster dispatch
              </article>
            </div>
          </article>
        </div>
      </section>

      <section className="section home-systems">
        <div className="container">
          <div className="home-section-head" data-reveal>
            <span className="eyebrow">System Showcase</span>
            <h2 className="section-title">Curated product architecture for modern wood projects.</h2>
            <p className="section-subtitle">
              Pick a complete coating direction based on look, substrate, and usage environment.
            </p>
          </div>

          <div className="home-systems-layout">
            <article
              className="home-system-spotlight"
              style={{ "--system-image": `url('${spotlight.image || "/assets/images/image1.png"}')` }}
              data-reveal
            >
              <div className="home-system-spotlight-copy">
                <p>{spotlight.category}</p>
                <h3>{renderBrandWordmark(spotlight.title, "brand-wordmark-heading")}</h3>
                <p>{renderBrandWordmark(spotlight.description)}</p>
                <Link className="btn btn-primary" to={spotlight.link}>
                  View System
                </Link>
              </div>
            </article>

            <div className="home-system-stack">
              {spotlightCards.map((item, index) => (
                <article
                  className="home-system-card"
                  key={`${item.slug || item.title}-${index}`}
                  style={{ "--stack-image": `url('${item.image || "/assets/images/image1.png"}')` }}
                  data-reveal
                >
                  <div className="home-system-card-copy">
                    <span>{item.category}</span>
                    <h4>{renderBrandWordmark(item.title, "brand-wordmark-heading")}</h4>
                    <Link to={item.link}>Explore</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="home-category-row" data-reveal>
            <div className="home-category-chips">
              {categoryChips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
            <Link className="home-inline-link" to="/categories">
              Browse All Categories {"->"}
            </Link>
          </div>
        </div>
      </section>

      <section className="section home-process">
        <div className="container home-process-grid">
          <article className="home-process-card home-process-dark" data-reveal>
            <span className="eyebrow">Why Woodello</span>
            <h3>Built for repeatable premium results, even under project pressure.</h3>
            <p>
              Our systems are tuned for application comfort and production reliability, so your team spends less time
              fixing and more time delivering.
            </p>
            <div className="home-process-metrics">
              <div>
                <strong>Pan-India</strong>
                Merchant Network
              </div>
              <div>
                <strong>ISO</strong>
                Quality Benchmarks
              </div>
              <div>
                <strong>On-call</strong>
                Technical Guidance
              </div>
            </div>
          </article>

          <article className="home-process-card" data-reveal>
            <span className="eyebrow">3-Step Workflow</span>
            <h3>Move from material to final finish without guesswork.</h3>
            <ol className="home-steps">
              <li>
                <strong>Substrate Check</strong>
                <p>We start with material type, moisture behavior, and expected usage pattern.</p>
              </li>
              <li>
                <strong>System Recommendation</strong>
                <p>Select from PU, Melamine, NC, Water Based, or maintenance-focused stacks.</p>
              </li>
              <li>
                <strong>Application Validation</strong>
                <p>Use our guides to optimize dilution, layering, and curing for stable results.</p>
              </li>
            </ol>
            <Link className="btn btn-secondary" to="/application-guide">
              View Application Guide
            </Link>
          </article>
        </div>
      </section>

      <section className="section home-collection">
        <div className="container">
          <div className="home-section-head" data-reveal>
            <span className="eyebrow">Top Picks</span>
            <h2 className="section-title">Most requested product systems.</h2>
            <p className="section-subtitle">
              Explore best-selling solutions trusted for residential, commercial, and workshop projects.
            </p>
          </div>
          <ProductCards items={featured} />
        </div>
      </section>

      <section className="section home-learning">
        <div className="container home-learning-shell">
          <div className="home-learning-copy" data-reveal>
            <span className="eyebrow">Learning Hub</span>
            <h2>Train your team faster with compact process resources.</h2>
            <p>Quick videos, step-by-step guides, and technical files to improve application quality on every site.</p>
            <div className="btn-row">
              <Link className="btn btn-primary" to="/technical-downloads">
                Technical Downloads
              </Link>
              <Link className="btn btn-secondary" to="/how-to-choose">
                Selection Guide
              </Link>
            </div>
          </div>

          <div className="home-learning-grid">
            {learningTracks.map((system) => (
              <article className="home-learning-card" key={system} data-reveal>
                <h3>{system}</h3>
                <p>Application walkthroughs and finish notes for better repeatability.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <article className="home-final-cta" data-reveal>
            <div>
              <h2>{renderBrandWordmark("Build your project finish stack with Woodello experts.", "brand-wordmark-heading")}</h2>
              <p>Get product recommendations, trial planning, and support for your next project launch.</p>
            </div>
            <Link className="btn btn-primary" to="/contact">
              Start Consultation
            </Link>
          </article>
        </div>
      </section>

      <section className="section home-instagram-showcase">
        <div className="container">
          <div className="home-instagram-shell" data-reveal>
            <div className="home-instagram-head">
              <div className="home-section-head">
                <span className="eyebrow">Instagram Highlights</span>
                <h2 className="section-title">Follow Us On Instagram</h2>
                {/* <p className="section-subtitle">
                  This section now uses your SociableKit Instagram widget instead of the custom post cards.
                </p> */}
              </div>

              <a
                className="home-inline-link"
                href="https://www.instagram.com/woodello.in/"
                target="_blank"
                rel="noreferrer"
              >
                Open Instagram {"->"}
              </a>
            </div>

            <div className="home-instagram-widget" ref={instagramFeedRef}>
              <div className="sk-instagram-feed" data-embed-id="25663932" />
            </div>
          </div>
        </div>
        
      </section>
    </main>
  );
}

export default HomePage;
