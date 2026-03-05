import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <h3>Barbería Americana</h3>
        <p>Corte clásico | Barba | Estilo moderno</p>

        <div className="footer-contact">
          <p>Cali, Colombia</p>
          <p>+57 508 224 4587</p>
          <p>barbershop@gmail.com</p>
        </div>

        <div className="footer-nav">
          <a href="#">Inicio</a>
          <a href="#">Servicios</a>
          <a href="#">Contacto</a>
        </div>

        <p className="footer-copy">
          © 2025 Barbería Americana. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
