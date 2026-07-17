import { useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useAuth } from "../hooks/useAuth";
import "./Navbar.css";

function Navbar() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Stock Dashboard
        </Link>
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

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={closeMenu}>
                Home
              </Link>
            </li>
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard" onClick={closeMenu}>
                  Dashboard
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={closeMenu}>
                Contact Us
              </Link>
            </li>
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={closeMenu}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register" onClick={closeMenu}>
                    Register
                  </Link>
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
