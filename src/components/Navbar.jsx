import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, MapPin, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export const Navbar = () => {
  const { totalItems, setIsCartOpen, selectedBranch } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Flavour World', href: '#flavour-experience' },
    { name: 'Menu', href: '#menu' },
    { name: 'Our Story', href: '#about' },
    { name: 'Specialties', href: '#specialties' },
    { name: 'Branches', href: '#branches' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container navbar-container">
          {/* Logo */}
          <a href="#hero" className="navbar-logo" onClick={(e) => handleLinkClick(e, '#hero')}>
            <span className="logo-icon-wrap">
              <svg viewBox="0 0 40 40" className="logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Ice cream cone */}
                <path d="M14 20L20 34L26 20Z" fill="#D48B47" stroke="#A94458" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M15 22L25 22M17 26L23 26" stroke="#B87333" strokeWidth="1" strokeLinecap="round" />
                {/* Ice cream scoop */}
                <circle cx="20" cy="15" r="9" fill="#E88B9B" stroke="#A94458" strokeWidth="1.5" />
                <path d="M12 18C13 16 15 17 17 17C19 17 19 16 21 16C23 16 23 17 25 17C27 17 27 18 28 18" stroke="#FFF0F1" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="22" cy="12" r="1.5" fill="#FFF0F1" />
              </svg>
            </span>
            <div className="logo-text-group">
              <span className="logo-title">Shehryar</span>
              <span className="logo-subtitle">ICE CREAM &amp; FALOODA</span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="navbar-nav desktop-only">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="nav-link"
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="navbar-actions">
            {/* Cart Trigger */}
            <button
              className="cart-trigger-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label="View Shopping Cart"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </button>

            {/* Order Now CTA */}
            <a
              href="#menu"
              className="btn btn-primary nav-order-btn desktop-only"
              onClick={(e) => handleLinkClick(e, '#menu')}
            >
              Order Now
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              className="mobile-hamburger-btn mobile-only"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <MenuIcon size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'drawer-open' : ''}`}>
        <div className="mobile-nav-inner">
          <div className="mobile-nav-links">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="mobile-nav-link"
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="mobile-nav-footer">
            <div className="mobile-branch-tag">
              <MapPin size={16} />
              <span>{selectedBranch.name}</span>
            </div>
            <a
              href="#menu"
              className="btn btn-primary mobile-order-cta"
              onClick={(e) => handleLinkClick(e, '#menu')}
            >
              Order Natural Ice Cream
            </a>
            <div className="mobile-call-line">
              <a href="tel:+923016565418" className="mobile-call-btn">
                <Phone size={14} /> Call Farooq Rd: +92 301 6565418
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
