import React from "react";
import "./Footer.css";
import logo from "../../Assets/logo.png";
import paymentIcon from "../../Assets/paymentIcon.png";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("✨ ¡Gracias por suscribirte! ✨\n\nRecibirás nuestras novedades y promociones exclusivas.");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getCurrentYear = () => new Date().getFullYear();

  return (
    <>
      <footer className="footer">
        <div className="footer__container">
          <div className="footer_left">
            <div className="footer_logo_container">
              <img src={logo} alt="MODE" />
            </div>

            <p>
              450 Fashion Avenue, Floor 12
              <br /> New York, NY 10018
              <br /> United States
            </p>

            <div className="footer_address">
              <strong>✉️ hello@modestore.com</strong>
              <strong>📞 +1 (212) 555-0123</strong>
            </div>

            <div className="social_links">
              <FaFacebookF />
              <FaXTwitter />
              <FaInstagram />
              <FaYoutube />
              <FaPinterest />
            </div>
          </div>

          <div className="footer_content">
            <h5>Compañía</h5>
            <div className="links_container">
              <ul onClick={scrollToTop}>
                <li>
                  <Link to="/about">Sobre Nosotros</Link>
                </li>
                <li>
                  <Link to="/about">Carreras</Link>
                </li>
                <li>
                  <Link to="*">Afiliados</Link>
                </li>
                <li>
                  <Link to="/contact">Contacto</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer_content">
            <h5>Tienda</h5>
            <div className="links_container">
              <ul onClick={scrollToTop}>
                <li>
                  <Link to="/shop">Nuevos Lanzamientos</Link>
                </li>
                <li>
                  <Link to="/shop">Accesorios</Link>
                </li>
                <li>
                  <Link to="/shop">Hombre</Link>
                </li>
                <li>
                  <Link to="/shop">Mujer</Link>
                </li>
                <li>
                  <Link to="/shop">Ver Todo</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer_content">
            <h5>Ayuda</h5>
            <div className="links_container">
              <ul onClick={scrollToTop}>
                <li>
                  <Link to="/contact">Servicio al Cliente</Link>
                </li>
                <li>
                  <Link to="/loginSignUp">Mi Cuenta</Link>
                </li>
                <li>
                  <Link to="/contact">Encuentra una Tienda</Link>
                </li>
                <li>
                  <Link to="/terms">Privacidad y Legal</Link>
                </li>
                <li>
                  <Link to="/contact">Contacto</Link>
                </li>
                <li>
                  <Link to="/">Tarjeta de Regalo</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer_right">
            <h5>Suscríbete</h5>
            <p>
              Sé el primero en recibir las últimas novedades, tendencias y ofertas exclusivas.
            </p>

            <form onSubmit={handleSubscribe}>
              <input type="email" placeholder="Tu correo electrónico" required />
              <button type="submit">Unirme</button>
            </form>

            <h6>Pagos Seguros</h6>
            <div className="paymentIconContainer">
              <img src={paymentIcon} alt="Métodos de pago" />
            </div>
          </div>
        </div>
        <div className="footer_bottom">
          <p>
            © {getCurrentYear()} MODE. Todos los derechos reservados. | Creado con ❤️
          </p>
          <div className="footerLangCurrency">
            <div className="footerLang">
              <p>Idioma</p>
              <select name="language" id="language">
                <option value="spanish">Español</option>
                <option value="english">English</option>
                <option value="french">Français</option>
                <option value="italian">Italiano</option>
              </select>
            </div>
            <div className="footerCurrency">
              <p>Moneda</p>
              <select name="currency" id="currency">
                <option value="EUR">€ EUR</option>
                <option value="USD">$ USD</option>
                <option value="GBP">£ GBP</option>
              </select>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;