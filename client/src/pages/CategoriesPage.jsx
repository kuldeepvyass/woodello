import { Link } from "react-router-dom";
import { categories } from "../data/content";
import { renderBrandWordmark } from "../utils/brandText";

function CategoriesPage() {
  return (
    <main className="categories-page">
      <section className="page-hero categories-hero">
        <div className="container">
          <span className="eyebrow">Product Categories</span>
          <h1>Complete Product Families</h1>
          <p className="section-subtitle">
            {renderBrandWordmark(
              "Browse the full Woodello portfolio grouped by chemistry, substrate fit, and application priorities."
            )}
          </p>
          <div className="categories-hero-note">
            <strong>{categories.length}</strong> Core families to quickly match product direction with project needs.
          </div>
        </div>
      </section>

      <section className="section categories-section">
        <div className="container categories-layout">
          {categories.map((item) => (
            <Link
              className="card card-link category-card"
              key={item.slug || item.title}
              to={`/products?category=${encodeURIComponent((item.filterBy || []).join(","))}`}
              data-reveal
            >
              <div
                className={`card-media category-art ${item.artClass || "default"} ${item.image ? "has-image" : ""}`}
                style={item.image ? { "--category-image": `url('${item.image}')` } : undefined}
              >
                <p className="category-art-label">Category</p>
                <h4>{item.title}</h4>
              </div>
              <div className="card-body">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="card-cta">View Products</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default CategoriesPage;
