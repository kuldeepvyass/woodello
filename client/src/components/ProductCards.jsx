import { Link } from "react-router-dom";
import { renderBrandWordmark } from "../utils/brandText";

function ProductCards({ items }) {
  return (
    <div className="card-grid">
      {items.map((item) => (
        <Link
          className="card card-link"
          key={item.slug || item.title}
          to={item.link || `/products/${item.slug || "ultraguard-pu-clear"}`}
          data-reveal
        >
          {item.image ? <div className="card-media" style={{ backgroundImage: `url('${item.image}')` }} /> : null}
          <div className="card-body">
            {item.category ? <p className="card-meta">{item.category}</p> : null}
            <h3>{renderBrandWordmark(item.title, "brand-wordmark-heading")}</h3>
            <p>{renderBrandWordmark(item.description)}</p>
            <span className="card-cta">{item.linkLabel || "View Details"}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProductCards;
