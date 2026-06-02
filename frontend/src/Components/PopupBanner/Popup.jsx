import React, { useState, useEffect } from "react";
import "./Popup.css";

import popupImg from "../../Assets/newsletter-popup.jpg";

const Popup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const hasClosedPopup = localStorage.getItem('popupClosed');
    if (!hasClosedPopup) {
      const timer = setTimeout(() => setShowPopup(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setFadeOut(true);
    localStorage.setItem('popupClosed', 'true');
    setTimeout(() => {
      setShowPopup(false);
    }, 300);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    alert(`✨ Thanks for subscribing! ✨\n\nYou'll receive our latest news at:\n${email}`);
    handleClose();
  };

  return (
    showPopup && (
      <div className="popup-overlay">
        <div className={`popup-content ${fadeOut ? "fade-out" : ""}`}>
          <button className="close-button" onClick={handleClose}>
            ×
          </button>
          <div className="popup-left">
            <img src={popupImg} alt="MODE Newsletter" />
          </div>
          <div className="popup-right">
            <h2>Join the MODE Community</h2>
            <p>
              Be the first to get the latest news about trends, promotions, and exclusive offers!
            </p>
            <form onSubmit={handleSubscribe}>
              <input type="email" placeholder="Your email address" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default Popup;