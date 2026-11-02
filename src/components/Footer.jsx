import React from 'react';
import { Phone, MessageCircle, MapPin, Heart, ArrowUp } from 'lucide-react';
import { branchesData } from '../data/branches';
import './Footer.css';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="shehryar-footer">
      <div className="container">
        {/* Main Footer Row */}
        <div className="footer-main-grid">
          {/* Brand Info Col */}
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <span className="footer-logo-icon">
                <svg viewBox="0 0 40 40" className="logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 20L20 34L26 20Z" fill="#D48B47" stroke="#A94458" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M15 22L25 22M17 26L23 26" stroke="#B87333" strokeWidth="1" strokeLinecap="round" />
                  <circle cx="20" cy="15" r="9" fill="#E88B9B" stroke="#A94458" strokeWidth="1.5" />
                  <path d="M12 18C13 16 15 17 17 17C19 17 19 16 21 16C23 16 23 17 25 17C27 17 27 18 28 18" stroke="#FFF0F1" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <div className="footer-logo-text">
                <span className="footer-brand-title">Shehryar</span>
                <span className="footer-brand-tag">NATURAL MILK ICE CREAM &amp; FALOODA</span>
              </div>
            </div>

            <p className="footer-about-text">
              Crafting pure, honest dairy moments in Toba Tek Singh, Pakistan. Made with natural whole milk, authentic slow churn, and signature royal falooda recipes.
            </p>

            <div className="footer-contacts-list">
              <a href="tel:+923016565418" className="footer-contact-item">
                <Phone size={14} /> +92 301 6565418
              </a>
              <a href="https://wa.me/923016565418" target="_blank" rel="noopener noreferrer" className="footer-contact-item">
                <MessageCircle size={14} className="wa-icon-color" /> WhatsApp: +92 301 6565418
              </a>
              <a href="tel:+923467273552" className="footer-contact-item">
                <Phone size={14} /> +92 346 7273552
              </a>
            </div>
          </div>

          {/* Quick Navigation Col */}
          <div className="footer-col links-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li><a href="#hero">Home</a></li>
              <li><a href="#flavour-experience">Flavour World</a></li>
              <li><a href="#menu">Menu &amp; Ordering</a></li>
              <li><a href="#about">Our Brand Story</a></li>
              <li><a href="#specialties">Culinary Specialties</a></li>
              <li><a href="#branches">Our 3 Branches</a></li>
              <li><a href="#contact">Contact &amp; Location</a></li>
            </ul>
          </div>

          {/* Signature Flavours Col */}
          <div className="footer-col flavours-col">
            <h4 className="footer-col-title">Flavours &amp; Falooda</h4>
            <ul className="footer-links-list">
              <li><a href="#flavour-experience">Fresh Strawberry Scoop</a></li>
              <li><a href="#flavour-experience">Belgian Dark Chocolate</a></li>
              <li><a href="#flavour-experience">Madagascar Vanilla Bean</a></li>
              <li><a href="#flavour-experience">Chaunsa Mango Gold</a></li>
              <li><a href="#flavour-experience">Roasted Pistachio (Pista)</a></li>
              <li><a href="#flavour-experience">Cookies &amp; Sweet Cream</a></li>
              <li><a href="#flavour-experience">Shehryar Royal Falooda</a></li>
            </ul>
          </div>

          {/* Branches Col */}
          <div className="footer-col branches-col">
            <h4 className="footer-col-title">Three Toba Branches</h4>
            <div className="footer-branch-item">
              <strong>Flagship Main Branch:</strong>
              <p>Farooq Road, Machli Bazar, Toba Tek Singh</p>
              <span className="branch-status-tag">Confirmed Official Branch</span>
            </div>
            <div className="footer-branch-item">
              <strong>Branch 02:</strong>
              <p>Toba Tek Singh (Address pending confirmation)</p>
            </div>
            <div className="footer-branch-item">
              <strong>Branch 03:</strong>
              <p>Toba Tek Singh (Address pending confirmation)</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {new Date().getFullYear()} <strong>Shehryar Ice Cream</strong>. Natural Milk Ice Cream &amp; Falooda. Toba Tek Singh, Pakistan. All rights reserved.
          </p>

          <button className="back-to-top-btn" onClick={scrollToTop} aria-label="Back to top">
            <span>Back to top</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
