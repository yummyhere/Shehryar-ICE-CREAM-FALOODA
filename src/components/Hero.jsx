import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Sparkles, ArrowRight, Heart, Award, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Hero.css';

export const Hero = () => {
  const { addToCart } = useCart();
  const heroRef = useRef(null);
  const leftContentRef = useRef(null);
  const scoopContainerRef = useRef(null);
  const floatingItemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-badge-wrap', {
        y: -20,
        opacity: 0,
        duration: 0.7,
        delay: 0.2
      })
      .from('.hero-main-heading .word', {
        y: 60,
        opacity: 0,
        rotate: 2,
        duration: 0.9,
        stagger: 0.08
      }, '-=0.4')
      .from('.hero-lead-text', {
        y: 30,
        opacity: 0,
        duration: 0.8
      }, '-=0.5')
      .from('.hero-actions-row', {
        y: 20,
        opacity: 0,
        duration: 0.6
      }, '-=0.4')
      .from('.hero-trust-row', {
        y: 20,
        opacity: 0,
        duration: 0.6
      }, '-=0.4')
      .from('.hero-organic-blob', {
        scale: 0.6,
        opacity: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.75)'
      }, '-=1.2')
      .from('.hero-icecream-img', {
        scale: 0.75,
        opacity: 0,
        y: 40,
        duration: 1.1,
        ease: 'power3.out'
      }, '-=1.0')
      .from('.floating-decor-item', {
        scale: 0,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out(1.7)'
      }, '-=0.7');

      // Continuous gentle floating animation
      gsap.to('.hero-icecream-img', {
        y: -12,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to('.decor-item-1', {
        y: -16,
        x: 6,
        rotation: 8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to('.decor-item-2', {
        y: 18,
        x: -8,
        rotation: -10,
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to('.decor-item-3', {
        y: -10,
        x: -6,
        rotation: 12,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToFlavours = (e) => {
    e.preventDefault();
    const elem = document.querySelector('#flavour-experience');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToMenu = (e) => {
    e.preventDefault();
    const elem = document.querySelector('#menu');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Quick add sample strawberry scoop to cart
  const handleQuickAdd = () => {
    addToCart({
      id: 'prod-strawberry',
      name: 'Fresh Strawberry Natural Scoop',
      price: 250,
      unit: 'Single Gourmet Cup / Cone',
      image: '/images/flavours/strawberry.jpg'
    }, 1);
  };

  return (
    <section id="hero" className="hero-section" ref={heroRef}>
      <div className="hero-bg-accent"></div>
      
      <div className="container hero-container">
        {/* Left Column: Editorial Content */}
        <div className="hero-content" ref={leftContentRef}>
          <div className="hero-badge-wrap">
            <span className="badge-pill">
              <Sparkles size={13} />
              NATURAL MILK ICE CREAM
            </span>
            <span className="hero-location-chip">Toba Tek Singh</span>
          </div>

          <h1 className="hero-main-heading">
            <span className="heading-line">
              <span className="word">A</span>{' '}
              <span className="word">LITTLE</span>{' '}
              <span className="word highlight-word">SCOOP</span>
            </span>
            <span className="heading-line">
              <span className="word">OF</span>{' '}
              <span className="word">HAPPINESS</span>
            </span>
          </h1>

          <p className="hero-lead-text">
            Real milk, delightful flavours, and sweet moments made to be shared. 
            Crafted daily with uncompromised dairy purity across our three branches in Toba Tek Singh.
          </p>

          <div className="hero-actions-row">
            <a href="#flavour-experience" className="btn btn-primary hero-btn-main" onClick={handleScrollToFlavours}>
              Explore Flavours
              <ArrowRight size={17} />
            </a>
            <a href="#menu" className="btn btn-secondary hero-btn-menu" onClick={handleScrollToMenu}>
              Order Menu
            </a>
          </div>

          <div className="hero-trust-row">
            <div className="trust-pill">
              <span className="trust-icon-circle">🥛</span>
              <div>
                <strong>100% Pure Milk</strong>
                <p>Natural whole dairy, zero palm oil</p>
              </div>
            </div>
            <div className="trust-pill">
              <span className="trust-icon-circle">🍧</span>
              <div>
                <strong>Royal Falooda</strong>
                <p>Authentic rabri &amp; ruby rose</p>
              </div>
            </div>
            <div className="trust-pill">
              <span className="trust-icon-circle">📍</span>
              <div>
                <strong>3 Toba Branches</strong>
                <p>Flagship on Farooq Road</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Ice Cream Showcase */}
        <div className="hero-visual" ref={scoopContainerRef}>
          {/* Large circular organic background shape */}
          <div className="hero-organic-blob"></div>
          <div className="hero-organic-blob-secondary"></div>

          {/* Centered High-Res Scoop Image */}
          <div className="hero-icecream-stage">
            <img
              src="/images/flavours/strawberry.jpg"
              alt="Shehryar Strawberry Natural Milk Ice Cream Scoop"
              className="hero-icecream-img"
              loading="eager"
            />

            {/* Quick Add Floating Pill */}
            <div className="hero-quick-tag" onClick={handleQuickAdd} role="button" tabIndex={0}>
              <div className="quick-tag-dot"></div>
              <div className="quick-tag-info">
                <span className="quick-tag-title">Fresh Strawberry</span>
                <span className="quick-tag-price">Rs. 250 • Add to Bag +</span>
              </div>
            </div>

            {/* Floating Decorative Elements */}
            <div className="floating-decor-item decor-item-1">
              <span className="decor-strawberry-icon">🍓</span>
              <span className="decor-label">Sun Ripened</span>
            </div>

            <div className="floating-decor-item decor-item-2">
              <span className="decor-pure-icon">✨</span>
              <span className="decor-label">Churned Daily</span>
            </div>

            <div className="floating-decor-item decor-item-3">
              <span className="decor-badge-circle">
                <Heart size={16} fill="#E88B9B" stroke="none" />
                <span>Loved in Toba</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
