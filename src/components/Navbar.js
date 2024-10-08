// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout"; // Import the Logout component

function Navbar() {
  return (
    <nav className="navbar navbar-light bg-light ">
      <ul className="d-flex flex-row list-unstyled m-auto">
        <li className="nav-item mr-3">
          <Link className="nav-link btn btn-primary" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item mr-3">
          <Link className="nav-link btn btn-primary" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item mr-3">
          <Link className="nav-link btn btn-primary" to="/register">
            Register
          </Link>
        </li>
        <li className="nav-item mr-3">
          <Link className="nav-link btn btn-primary" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item mr-3 h-100 align-self-center d-flex">
          <Logout />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
