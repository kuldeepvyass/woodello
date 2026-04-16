import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCards from "../components/ProductCards";
import { productCards } from "../data/content";
import { renderBrandWordmark } from "../utils/brandText";

function ProductsPage() {
  const [searchParams] = useSearchParams();
  const activeCategories = useMemo(() => {
    const raw = searchParams.get("category") || "";

    return raw
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    if (!activeCategories.length) {
      return productCards;
    }

    return productCards.filter((item) => activeCategories.includes(item.category));
  }, [activeCategories]);
  const allCategories = useMemo(() => [...new Set(productCards.map((item) => item.category))], []);

  const isFiltered = activeCategories.length > 0;

  return (
    <main className="products-page">
      <section className="page-hero products-hero">
        <div className="container">
          <span className="eyebrow">{isFiltered ? "Filtered Products" : "All Products"}</span>
          <h1>
            {renderBrandWordmark(
              isFiltered ? `${activeCategories.join(" + ")} Products` : "Complete Woodello Coating Portfolio",
              "brand-wordmark-hero"
            )}
          </h1>
          <p className="section-subtitle">
            {isFiltered
              ? "Showing only products from the selected category."
              : "Explore high-performance systems for premium furniture finishing, panel coating, and site application."}
          </p>

          {/* <div className="products-hero-meta">
            <article>
              <strong>{filteredProducts.length}</strong>
              Products Visible
            </article>
            <article>
              <strong>{allCategories.length}</strong>
              Main Categories
            </article>
            <article>
              <strong>Pan-India</strong>
              Supply Coverage
            </article>
          </div> */}

          <div className="products-filter-row">
            <Link className={`products-filter-chip ${!isFiltered ? "is-active" : ""}`} to="/products">
              All
            </Link>
            {allCategories.map((category) => (
              <Link
                className={`products-filter-chip ${activeCategories.includes(category) ? "is-active" : ""}`}
                key={category}
                to={`/products?category=${encodeURIComponent(category)}`}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section products-grid-section">
        <div className="container">
          {filteredProducts.length ? (
            <ProductCards items={filteredProducts} />
          ) : (
            <article className="tile products-empty" data-reveal>
              <h3>No products in this category yet</h3>
              <p>Please choose another category to see available products.</p>
              <Link className="btn btn-secondary" to="/products">
                Reset Filters
              </Link>
            </article>
          )}
        </div>
      </section>
    </main>
  );
}

export default ProductsPage;
