import { Link } from "react-router-dom";
import { renderBrandWordmark } from "../utils/brandText";

function HowToChoosePage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">How to Choose the Right Finish</span>
          <h1>Select the Best Coating System in 4 Steps</h1>
          <p className="section-subtitle">
            Match environment, finish look, substrate, and durability expectations.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <article className="tile" data-reveal>
            <h3>Interior vs Exterior Guide</h3>
            <p>
              <strong>Interior:</strong> prioritize smoothness, touch, and stain resistance.
            </p>
            <p>
              <strong>Exterior:</strong> prioritize UV resistance, moisture barrier, and flexibility.
            </p>
            <p>For semi-open spaces, choose hybrid exterior-grade top coats with controlled gloss.</p>
          </article>

          <article className="tile" data-reveal>
            <h3>Surface Type Recommendations</h3>
            <ul className="list">
              <li>
                <strong>Solid Wood:</strong> stain + sealer + PU top coat
              </li>
              <li>
                <strong>Veneer:</strong> low-bleed stain + melamine or PU sealer
              </li>
              <li>
                <strong>MDF:</strong> high-build primer + PU or melamine top coat
              </li>
              <li>
                <strong>Plywood:</strong> pore-filling sealer + scratch-resistant top coat
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title" data-reveal>
            Finish Type Comparison
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table" data-reveal>
              <thead>
                <tr>
                  <th>Finish Type</th>
                  <th>Look</th>
                  <th>Durability</th>
                  <th>Ideal For</th>
                  <th>Cost Band</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PU</td>
                  <td>Luxury matte to high gloss</td>
                  <td>Very high</td>
                  <td>Premium homes, hotels, designer furniture</td>
                  <td>Premium</td>
                </tr>
                <tr>
                  <td>Melamine</td>
                  <td>Uniform, production-friendly</td>
                  <td>High</td>
                  <td>Factory furniture and modular systems</td>
                  <td>Mid to Premium</td>
                </tr>
                <tr>
                  <td>NC</td>
                  <td>Warm classic polish</td>
                  <td>Moderate</td>
                  <td>Decorative interiors and refurbishing</td>
                  <td>Mid</td>
                </tr>
                <tr>
                  <td>Exterior PU</td>
                  <td>Satin to gloss weather finish</td>
                  <td>Very high weatherability</td>
                  <td>Doors, windows, exterior panels</td>
                  <td>Premium</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <article className="tile" data-reveal>
            <h3>Decision Checklist</h3>
            <ul className="list">
              <li>Indoor or weather exposed?</li>
              <li>Decorative or high-traffic use?</li>
              <li>Matte, satin, gloss, or natural grain target?</li>
              <li>Speed priority or premium finish priority?</li>
            </ul>
          </article>
          <article className="tile" data-reveal>
            <h3>Need Product Mapping?</h3>
            <p>{renderBrandWordmark("Share your substrate and target shade. We will suggest a complete Woodello coat stack.")}</p>
            <Link className="btn btn-primary" to="/contact">
              Get Recommendation
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}

export default HowToChoosePage;
