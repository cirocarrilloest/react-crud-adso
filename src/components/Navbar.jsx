import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#" className="navbar-logo">
          BarberShop
        </a>

        <ul className="navbar-menu">
          <li>
            <a href="#">INICIO</a>
          </li>
          <li>
            <a href="#">SERVICIOS</a>
          </li>
          <li>
            <a href="#">CONTACTO</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
