import { useState } from "react";
import { NavLink } from "react-router-dom";
import { navLinks } from "../data/content";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink className="brand" to="/" aria-label="Woodello home" onClick={() => setOpen(false)}>
          <img className="brand-logo" src="/assets/images/woodello%20logo.svg" alt="Woodello" />
          {/* <span className="brand-text"> */}
          {/* <span className="brand-tag">Factories to Home</span> */}
          {/* </span> */}
        </NavLink>

        <nav className={`site-nav ${open ? "open" : ""}`} aria-label="Main Navigation">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          {/* <NavLink className="btn btn-secondary header-guide" to="/how-to-choose" onClick={() => setOpen(false)}>
            Guide
          </NavLink> */}
          <NavLink className="btn btn-primary header-cta" to="/contact" onClick={() => setOpen(false)}>
            Talk to Expert
          </NavLink>
          <button
            className={`nav-toggle ${open ? "is-open" : ""}`}
            type="button"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
