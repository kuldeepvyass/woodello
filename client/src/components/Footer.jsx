import { Link } from "react-router-dom";

function Footer() {
  const instagramPreviewImages = [
    "/assets/images/image1.png",
    "/assets/images/Product%20Mockup%20images/tin%20box.jpg",
    "/assets/images/Product%20Mockup%20images/waterBased%20PU.png",
    "/assets/images/Product%20Mockup%20images/CLEAR%20WARNISH.jpg",
    "/assets/images/stain.png",
    "/assets/images/fabric-protector.png",
  ];

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <img className="brand-logo" src="/assets/images/woodello%20logo.svg" alt="Woodello" />
          <br />
          <p>Premium wood coatings engineered for elegant durability.</p>
        </div>
        <div>
          <h3>Quick Links</h3>
          <p>
            <Link to="/products">All Products</Link>
          </p>
          <p>
            <Link to="/application-guide">Application Guide</Link>
          </p>
          <p>
            <Link to="/technical-downloads">Technical Downloads</Link>
          </p>
        </div>
        <div>
          <h3>Contact</h3>
          <p>
            <a href="mailto:info@woodello.in">info@woodello.in</a>
          </p>
          <p>
            <a href="tel:+919119104829">+91 91191 04829</a>
          </p>
          <p>Jodhpur (Rajasthan), India</p>
        </div>
      </div>

      {/* <div className="container footer-instagram">
        <a
          className="footer-instagram-card"
          href="https://www.instagram.com/woodello.in/"
          target="_blank"
          rel="noreferrer"
          aria-label="Visit Woodello on Instagram"
        >
          <div className="footer-instagram-headline">
            <p className="footer-instagram-label">Instagram</p>
            <span className="footer-instagram-open">Open Profile</span>
          </div>

          <div className="footer-instagram-profile">
            <div className="footer-instagram-avatar-ring">
              <div className="footer-instagram-avatar">
                <img src="/assets/images/woodello%20logo.svg" alt="Woodello Instagram" />
              </div>
            </div>

            <div className="footer-instagram-profile-copy">
              <div className="footer-instagram-handle-row">
                <div>
                  <strong>woodello.in</strong>
                  <span>Woodello - Factory To Home</span>
                </div>
                <span className="footer-instagram-menu">...</span>
              </div>

              <div className="footer-instagram-stats">
                <div>
                  <strong>15</strong>
                  <span>posts</span>
                </div>
                <div>
                  <strong>18</strong>
                  <span>followers</span>
                </div>
                <div>
                  <strong>3</strong>
                  <span>following</span>
                </div>
              </div>

              <div className="footer-instagram-bio">
                <p>India's Growing Wood Care Brand</p>
                <p>Complete Range of Wood Care &amp; Surface Finishing | Lakdi ki Natural Khoobsurti ko De...</p>
              </div>
            </div>
          </div>

          <div className="footer-instagram-tabs">
            <span className="is-active">Grid</span>
            <span>Reels</span>
            <span>Tagged</span>
          </div>

          <div className="footer-instagram-grid">
            {instagramPreviewImages.map((image, index) => (
              <div className="footer-instagram-tile" key={image}>
                <img src={image} alt="" loading="lazy" />
                {index < 3 ? <span className="footer-instagram-pin">Pinned</span> : null}
              </div>
            ))}
          </div>

          <div className="footer-instagram-bottom">
            <div>
              <strong>woodello.in</strong>
              <p>Tap to view the full Instagram page on Instagram web.</p>
            </div>
            <span className="footer-instagram-arrow">Visit {"->"}</span>
          </div>
        </a>
      </div> */}
    </footer>
  );
}

export default Footer;
