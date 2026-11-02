import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, ChevronDown, ChevronLeft, ChevronRight, Sparkles, Check, ArrowRight } from 'lucide-react';
import { flavoursData } from '../data/flavours';
import { useCart } from '../context/CartContext';
import './FlavourExperience.css';

gsap.registerPlugin(ScrollTrigger);

export const FlavourExperience = () => {
  const { addToCart } = useCart();
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Preload all 7 images on mount
  useEffect(() => {
    flavoursData.forEach((flavour) => {
      const img = new Image();
      img.src = flavour.image;
    });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const numFlavours = flavoursData.length;
      
      // Explicitly set all non-strawberry items hidden, and Strawberry fully visible
      gsap.set('.flavour-image-item', {
        opacity: 0,
        scale: 0.84,
        rotation: 8
      });
      gsap.set('.flavour-img-strawberry', {
        opacity: 1,
        scale: 1,
        rotation: 0
      });

      gsap.set('.flavour-slide', {
        opacity: 0,
        pointerEvents: 'none',
        y: 25
      });
      gsap.set('.flavour-content-strawberry', {
        opacity: 1,
        pointerEvents: 'auto',
        y: 0
      });

      // Main scrub timeline pinned with GSAP pinSpacing
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=2400',
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            const step = Math.min(
              numFlavours - 1,
              Math.floor(self.progress * numFlavours)
            );
            setActiveIndex(step);
          }
        }
      });

      timelineRef.current = tl;

      // Build sequential stepped transitions for each flavour
      flavoursData.forEach((flavour, i) => {
        if (i < numFlavours - 1) {
          const nextFlavour = flavoursData[i + 1];
          const label = `step_${i}_to_${i + 1}`;

          tl.addLabel(label)
            // 1. Morph background color of the pinned showcase
            .to(section, {
              backgroundColor: nextFlavour.background,
              duration: 1.0,
              ease: 'power1.inOut'
            }, label)

            // 2. Crossfade & scale/rotate product scoops
            .to(`.flavour-img-${flavour.id}`, {
              opacity: 0,
              scale: 0.84,
              rotation: -8,
              duration: 0.8,
              ease: 'power1.inOut'
            }, label)
            .fromTo(`.flavour-img-${nextFlavour.id}`, 
              { opacity: 0, scale: 0.84, rotation: 8 },
              { opacity: 1, scale: 1, rotation: 0, duration: 0.9, ease: 'power1.out' },
              label + '+=0.1'
            )

            // 3. Slide and fade text smoothly without layout shifting
            .to(`.flavour-content-${flavour.id}`, {
              opacity: 0,
              y: -25,
              duration: 0.7,
              pointerEvents: 'none',
              ease: 'power1.in'
            }, label)
            .fromTo(`.flavour-content-${nextFlavour.id}`,
              { opacity: 0, y: 25, pointerEvents: 'none' },
              { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.8, ease: 'power1.out' },
              label + '+=0.15'
            )

            // 4. Update dynamic text colors
            .to('.flavour-dynamic-text', {
              color: nextFlavour.textColor,
              duration: 0.8,
              ease: 'power1.inOut'
            }, label);
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Jump to specific flavour on bullet click or arrow navigation
  const jumpToFlavour = (targetIndex) => {
    const tl = timelineRef.current;
    if (!tl || !tl.scrollTrigger) return;
    const st = tl.scrollTrigger;
    const progress = targetIndex / (flavoursData.length - 1);
    const targetScroll = st.start + progress * (st.end - st.start);
    
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  const handleNext = () => {
    if (activeIndex < flavoursData.length - 1) {
      jumpToFlavour(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      jumpToFlavour(activeIndex - 1);
    }
  };

  const handleAddCurrentFlavour = (flavour) => {
    addToCart({
      id: `prod-${flavour.id}`,
      name: `${flavour.heading} Ice Cream Scoop`,
      category: flavour.id === 'falooda' ? 'Falooda' : 'Ice Cream',
      price: flavour.price,
      unit: flavour.id === 'falooda' ? 'Tall Signature Glass' : 'Single Gourmet Cup / Cone',
      image: flavour.image
    }, 1);
  };

  const currentFlavour = flavoursData[activeIndex] || flavoursData[0];

  return (
    <section
      id="flavour-experience"
      className="flavour-experience-section"
      ref={sectionRef}
      style={{
        backgroundColor: currentFlavour.background,
        color: currentFlavour.textColor
      }}
    >
      {/* Ambient background circles */}
      <div className="flavour-ambient-circle circle-left"></div>
      <div className="flavour-ambient-circle circle-right"></div>

      {/* Top Header Row within the showcase */}
      <header className="flavour-showcase-header">
        <div className="container showcase-header-inner">
          <div className="showcase-title-badge">
            <Sparkles size={13} />
            <span>SIGNATURE FLAVOUR EXPERIENCE</span>
          </div>

          <div className="showcase-scroll-hint">
            <span>Scroll or use arrows</span>
            <ChevronDown size={14} className="bounce-arrow" />
          </div>
        </div>
      </header>

      {/* Main Split Screen Composition (Middle Flex Area) */}
      <div className="container flavour-stage-container">
        {/* Left Column: Typography & Story */}
        <div className="flavour-text-column">
          {flavoursData.map((flavour, idx) => (
            <div
              key={flavour.id}
              className={`flavour-slide flavour-content-${flavour.id} ${
                idx === activeIndex ? 'is-active-slide' : ''
              }`}
            >
              <div className="flavour-meta-top">
                <span className="flavour-number" style={{ color: flavour.textColor }}>
                  {flavour.number}
                </span>
                <span className="flavour-divider-line" style={{ backgroundColor: flavour.textColor }}></span>
                <span className="flavour-subheading-tag" style={{ color: flavour.textColor }}>
                  {flavour.subheading}
                </span>
              </div>

              <h2 className="flavour-heading" style={{ color: flavour.textColor }}>
                {flavour.heading}
              </h2>

              <p className="flavour-lead-quote" style={{ color: flavour.textColor }}>
                "{flavour.description}"
              </p>

              <p className="flavour-story-body">
                {flavour.story}
              </p>

              {/* Tasting Notes Pill Row */}
              <div className="flavour-tasting-notes">
                <span className="notes-label">Tasting Notes:</span>
                <div className="notes-tags-group">
                  {flavour.tastingNotes.map((note, nIdx) => (
                    <span
                      key={nIdx}
                      className="tasting-tag"
                      style={{
                        borderColor: flavour.textColor,
                        color: flavour.textColor,
                        backgroundColor: 'rgba(255, 255, 255, 0.5)'
                      }}
                    >
                      <Check size={11} strokeWidth={3} />
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action CTA Row */}
              <div className="flavour-action-row">
                <button
                  className="btn flavour-add-btn"
                  style={{
                    backgroundColor: flavour.textColor,
                    color: flavour.background === '#6B4538' ? '#FFF1E5' : '#FFFFFF'
                  }}
                  onClick={() => handleAddCurrentFlavour(flavour)}
                >
                  <ShoppingBag size={15} />
                  <span>Add {flavour.heading} (Rs. {flavour.price})</span>
                </button>

                <a
                  href="#menu"
                  className="flavour-view-menu-link"
                  style={{ color: flavour.textColor }}
                >
                  View in Menu <ArrowRight size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Dynamic Ice Cream Visual with floating badges */}
        <div className="flavour-image-column">
          <div className="flavour-images-stack">
            {/* Organic aura ring */}
            <div
              className="flavour-aura-circle"
              style={{ borderColor: currentFlavour.textColor }}
            ></div>

            {/* Stacked Images for smooth crossfade */}
            {flavoursData.map((flavour, idx) => (
              <div
                key={flavour.id}
                className={`flavour-image-item flavour-img-${flavour.id} ${
                  idx === 0 ? 'is-initial-visible' : ''
                }`}
              >
                <img
                  src={flavour.image}
                  alt={`Shehryar ${flavour.heading} Natural Milk Ice Cream`}
                  className="flavour-photo"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />

                {/* Floating flavour decorative tags */}
                <div className="flavour-decor-container">
                  {flavour.decorations.map((item, dIdx) => (
                    <span
                      key={dIdx}
                      className={`floating-flavour-badge badge-pos-${dIdx + 1}`}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.94)',
                        color: flavour.textColor
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dedicated Bottom Bar (Footer of the pinned showcase) */}
      <footer className="flavour-bottom-stepper">
        <div className="container stepper-container">
          {/* Arrow navigation buttons inside the bottom bar */}
          <div className="stepper-arrow-group">
            <button
              className="stepper-nav-arrow"
              onClick={handlePrev}
              disabled={activeIndex === 0}
              aria-label="Previous flavour"
              style={{
                color: currentFlavour.textColor,
                borderColor: currentFlavour.textColor
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="stepper-nav-arrow"
              onClick={handleNext}
              disabled={activeIndex === flavoursData.length - 1}
              aria-label="Next flavour"
              style={{
                color: currentFlavour.textColor,
                borderColor: currentFlavour.textColor
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Stepper track with pills */}
          <div className="stepper-track">
            {flavoursData.map((flavour, idx) => (
              <button
                key={flavour.id}
                className={`stepper-bullet ${idx === activeIndex ? 'active-bullet' : ''}`}
                onClick={() => jumpToFlavour(idx)}
                title={`Jump to ${flavour.heading}`}
                style={{ color: currentFlavour.textColor }}
              >
                <span
                  className="bullet-indicator"
                  style={{
                    backgroundColor: idx === activeIndex ? currentFlavour.textColor : 'rgba(0,0,0,0.22)'
                  }}
                ></span>
                <span className="bullet-title-text">{flavour.heading}</span>
              </button>
            ))}
          </div>

          {/* Counter */}
          <div className="stepper-counter" style={{ color: currentFlavour.textColor }}>
            <span className="current-num">{String(activeIndex + 1).padStart(2, '0')}</span>
            <span className="slash">/</span>
            <span className="total-num">{String(flavoursData.length).padStart(2, '0')}</span>
          </div>
        </div>
      </footer>
    </section>
  );
};
export default FlavourExperience;
