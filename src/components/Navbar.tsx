import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logout from "./Logout";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../hooks/useAuth";
import "./Navbar.css";

function Navbar() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar navbar-expand-lg app-navbar sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <svg width="26" height="26" viewBox="0 0 24 24" role="img" aria-label="Stock Dashboard logo">
            <rect x="1" y="1" width="22" height="22" rx="6" fill="var(--accent)" />
            <rect x="5.5" y="12" width="3" height="6.5" rx="1" fill="#fff" opacity="0.75" />
            <rect x="10.5" y="9" width="3" height="9.5" rx="1" fill="#fff" opacity="0.9" />
            <rect x="15.5" y="5.5" width="3" height="13" rx="1" fill="#fff" />
          </svg>
          <span>Stock Dashboard</span>
        </Link>
        <div className="d-flex align-items-center gap-2 order-lg-2">
          <ThemeToggle />
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-controls="navbarNav"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto me-lg-3">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            {user && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard" onClick={closeMenu}>
                  Dashboard
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact" onClick={closeMenu}>
                Contact Us
              </NavLink>
            </li>
            {!user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login" onClick={closeMenu}>
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register" onClick={closeMenu}>
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Logout onClick={closeMenu} />
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
