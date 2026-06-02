import React, { useState } from "react";
import "./ContactPage.css";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `✨ ¡Gracias ${name} por contactarnos! ✨\n\nNos pondremos en contacto contigo pronto.\n\n📧 Email: ${email}\n💬 Mensaje: ${message}`
    );
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <div className="contactSection">
        <h2>Contacto</h2>
        <div className="contactMap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.123456789!2d-3.6875!3d40.425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4229e9f5b5b5b5%3A0x123456789abcdef!2sCalle%20de%20Serrano%2C%2045%2C%2028001%20Madrid!5e0!3m2!1ses!2ses!4v1700000000000!5m2!1ses!2ses"
            width="800"
            height="600"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="MODE Madrid Store"
          ></iframe>
        </div>
        <div className="contactInfo">
          <div className="contactAddress">
            <div className="address">
              <h3>📍 MODE Madrid</h3>
              <p>
                Calle de Serrano, 45
                <br /> 28001 Madrid
                <br /> España
              </p>
              <p>
                ✉️ hello@modestore.com
                <br />
                📞 +34 91 123 45 67
              </p>
            </div>
            <div className="address">
              <h3>📍 MODE Barcelona</h3>
              <p>
                Passeig de Gràcia, 35
                <br /> 08007 Barcelona
                <br /> España
              </p>
              <p>
                ✉️ bcn@modestore.com
                <br />
                📞 +34 93 234 56 78
              </p>
            </div>
          </div>
          <div className="contactForm">
            <h3>Envíanos un mensaje</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                placeholder="Nombre completo *"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                value={email}
                placeholder="Correo electrónico *"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <textarea
                rows={10}
                cols={40}
                placeholder="Tu mensaje..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit">Enviar mensaje</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;