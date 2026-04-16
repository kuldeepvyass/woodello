import { Link, useParams } from "react-router-dom";
import { productCards, productDetailsBySlug } from "../data/content";
import { renderBrandWordmark } from "../utils/brandText";

const defaultDetail = {
  summary: "Premium coating solution with excellent hardness, rich depth, and long-term clarity retention for high-end furniture and interior panels.",
  specs: [
    { label: "Recoat time", value: "6-8 hrs" },
    { label: "Solids by volume", value: "45-50%" },
    { label: "Mix ratio", value: "2:1" },
  ],
  recommendedUse: [
    "Premium interior furniture",
    "Veneer and MDF panels",
    "Cabinet shutters and wardrobes",
    "Hotel and retail wood fixtures",
  ],
  keyFeatures: [
    "Excellent scratch and stain resistance",
    "Superior flow and leveling",
    "Low yellowing long-term film",
    "Available in matte, satin, and gloss",
  ],
};

function ProductDetailPage() {
  const { slug } = useParams();
  const product = productCards.find((item) => item.slug === slug) || productCards[0];
  const productDetail = productDetailsBySlug[product.slug] || defaultDetail;
  const hasPremiumDatasheet = !!(productDetail.mixingSchedule?.length && productDetail.productSpecifications?.length);
  const specs = productDetail.specs?.length ? productDetail.specs : defaultDetail.specs;
  const recommendedUse = productDetail.recommendedUse?.length ? productDetail.recommendedUse : defaultDetail.recommendedUse;
  const keyFeatures = productDetail.keyFeatures?.length ? productDetail.keyFeatures : defaultDetail.keyFeatures;
  const summary = productDetail.summary || defaultDetail.summary;
  const datasheetUrl = productDetail.datasheet || "";
  const availablePacks = productDetail.availablePacks || [];
  const availableFinishes = productDetail.availableFinishes || [];
  const colorsAvailable = productDetail.colorsAvailable || [];
  const coverage = productDetail.coverage || "";
  const surfacePreparation = productDetail.surfacePreparation || [];
  const mixingSchedule = productDetail.mixingSchedule || [];
  const productSpecifications = productDetail.productSpecifications || [];
  const applicationRecommendations = productDetail.applicationRecommendations || [];
  const postApplicationCare = productDetail.postApplicationCare || [];
  const safetyInformation = productDetail.safetyInformation || [];
  const versionNote = productDetail.versionNote || "";
  const downloadFileName = `${product.slug || "product"}-datasheet.pdf`;

  return (
    <main>
      <section className={`page-hero ${hasPremiumDatasheet ? "page-hero-product-premium" : ""}`}>
        <div className="container split">
          <div data-reveal>
            <span className="eyebrow">Individual Product</span>
            <h1>{renderBrandWordmark(product.title, "brand-wordmark-hero")}</h1>
            <p>{renderBrandWordmark(summary)}</p>
            <div className="btn-row">
              {datasheetUrl ? (
                <a className="btn btn-primary" href={datasheetUrl} download={downloadFileName}>
                  Download Datasheet
                </a>
              ) : (
                <Link className="btn btn-primary" to="/technical-downloads">
                  Download Technical Data
                </Link>
              )}
              <Link className="btn btn-secondary" to="/contact">
                Request Sample
              </Link>
            </div>
            <div className="kpi-row">
              {specs.slice(0, 3).map((spec, index) => (
                <article className="kpi-card" key={`${spec.label}-${index}`}>
                  <strong>{spec.value}</strong>
                  {spec.label}
                </article>
              ))}
            </div>
          </div>
          <div
            className="page-hero-banner"
            data-reveal
            style={{
              minHeight: "420px",
              backgroundImage: `url('${product.image}')`,
            }}
          />
        </div>
      </section>

      {hasPremiumDatasheet ? (
        <>
          <section className="section indian-pu-overview">
            <div className="container indian-pu-overview-grid">
              <article className="tile indian-pu-tile" data-reveal>
                <h3>Ideal Applications</h3>
                <ul className="list">
                  {recommendedUse.map((item, index) => (
                    <li key={`use-${index}`}>{renderBrandWordmark(item)}</li>
                  ))}
                </ul>
              </article>

              <article className="tile indian-pu-tile" data-reveal>
                <h3>Key Features</h3>
                <ul className="list">
                  {keyFeatures.map((item, index) => (
                    <li key={`feature-${index}`}>{renderBrandWordmark(item)}</li>
                  ))}
                </ul>
              </article>

              <article className="tile indian-pu-tile indian-pu-tile-soft" data-reveal>
                <h3>Pack, Finish, and Shade Options</h3>
                <p className="indian-pu-meta-heading">Available Packs</p>
                <ul className="list">
                  {availablePacks.map((item, index) => (
                    <li key={`pack-${index}`}>{renderBrandWordmark(item)}</li>
                  ))}
                </ul>
                <p className="indian-pu-meta-heading">Available Finishes</p>
                <ul className="list">
                  {availableFinishes.map((item, index) => (
                    <li key={`finish-${index}`}>{renderBrandWordmark(item)}</li>
                  ))}
                </ul>
                <p className="indian-pu-meta-heading">Color and Stain Compatibility</p>
                <ul className="list">
                  {colorsAvailable.map((item, index) => (
                    <li key={`color-${index}`}>{renderBrandWordmark(item)}</li>
                  ))}
                </ul>
                {coverage ? <p className="indian-pu-coverage">{renderBrandWordmark(coverage)}</p> : null}
              </article>
            </div>
          </section>

          <section className="section indian-pu-system">
            <div className="container">
              <h2 className="section-title" data-reveal>
                Application System and Mixing Details
              </h2>
              <p className="section-subtitle" data-reveal>
                Follow this schedule for sealer and topcoat stages to maintain consistency and finish quality.
              </p>
              <div className="indian-pu-table-wrap" data-reveal>
                <table className="data-table indian-pu-table">
                  <thead>
                    <tr>
                      <th>Step</th>
                      <th>Application Stage</th>
                      <th>Base : Hardener</th>
                      <th>Thinner</th>
                      <th>Dilution</th>
                      <th>Viscosity</th>
                      <th>Recoat / Sanding</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mixingSchedule.map((item, index) => (
                      <tr key={`mix-${index}`}>
                        <td>{item.step}</td>
                        <td>{item.stage}</td>
                        <td>{item.ratio}</td>
                        <td>{renderBrandWordmark(item.thinner, "brand-wordmark-inline")}</td>
                        <td>{item.dilution}</td>
                        <td>{item.viscosity}</td>
                        <td>{item.recoat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="section indian-pu-technical">
            <div className="container split">
              <article className="tile indian-pu-tile" data-reveal>
                <h3>Surface Preparation Workflow</h3>
                <ol className="indian-pu-steps">
                  {surfacePreparation.map((item, index) => (
                    <li key={`surface-${index}`}>{renderBrandWordmark(item)}</li>
                  ))}
                </ol>

                <h3 className="indian-pu-subtitle">Application Recommendations</h3>
                <ul className="list">
                  {applicationRecommendations.map((item, index) => (
                    <li key={`recommend-${index}`}>{renderBrandWordmark(item)}</li>
                  ))}
                </ul>
              </article>

              <article className="tile indian-pu-tile" data-reveal>
                <h3>Product Specifications</h3>
                <div className="indian-pu-spec-list">
                  {productSpecifications.map((spec, index) => (
                    <article key={`spec-${index}`}>
                      <p>{spec.label}</p>
                      <strong>{renderBrandWordmark(spec.value)}</strong>
                    </article>
                  ))}
                </div>
              </article>
            </div>
          </section>

          <section className="section indian-pu-advisory">
            <div className="container split">
              <article className="tile indian-pu-tile" data-reveal>
                <h3>Post Application Care</h3>
                <ul className="list">
                  {postApplicationCare.map((item, index) => (
                    <li key={`care-${index}`}>{renderBrandWordmark(item)}</li>
                  ))}
                </ul>
              </article>

              <article className="tile indian-pu-tile indian-pu-warning" data-reveal>
                <h3>Safety Information</h3>
                <ul className="list">
                  {safetyInformation.map((item, index) => (
                    <li key={`safety-${index}`}>{renderBrandWordmark(item)}</li>
                  ))}
                </ul>
                {versionNote ? <p className="small">{versionNote}</p> : null}
              </article>
            </div>
          </section>
        </>
      ) : (
        <section className="section">
          <div className="container split">
            <article className="tile" data-reveal>
              <h3>Recommended Use</h3>
              <ul className="list">
                {recommendedUse.map((item, index) => (
                  <li key={`use-${index}`}>{renderBrandWordmark(item)}</li>
                ))}
              </ul>
            </article>
            <article className="tile" data-reveal>
              <h3>Key Features</h3>
              <ul className="list">
                {keyFeatures.map((item, index) => (
                  <li key={`feature-${index}`}>{renderBrandWordmark(item)}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      )}
    </main>
  );
}

export default ProductDetailPage;
