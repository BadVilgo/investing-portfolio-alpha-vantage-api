// Navbar.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import "./Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // State to manage navbar collapse

  useEffect(() => {
    // Set up an authentication state observer
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Clean up subscription
    return () => unsubscribe();
  }, []);

  // Function to handle link clicks
  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Stock Dashboard
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)} // Toggle the isOpen state
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Conditionally add 'show' class based on isOpen state */}
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleLinkClick}>
                Home
              </Link>
            </li>
            {user && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/dashboard"
                  onClick={handleLinkClick}
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/contact"
                onClick={handleLinkClick}
              >
                Contact Us
              </Link>
            </li>
            {!user ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/login"
                    onClick={handleLinkClick}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/register"
                    onClick={handleLinkClick}
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Logout onClick={handleLinkClick} />{" "}
                {/* Ensure Logout also collapses the menu */}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
