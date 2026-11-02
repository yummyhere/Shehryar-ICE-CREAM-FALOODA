import React from 'react';
import { Sparkles, ArrowRight, Award, CheckCircle2 } from 'lucide-react';
import './Specialties.css';

export const Specialties = () => {
  return (
    <section id="specialties" className="specialties-section">
      <div className="container">
        {/* Section Header */}
        <div className="specialties-header text-center">
          <span className="badge-pill">
            <Sparkles size={13} />
            OUR CULINARY PILLARS
          </span>
          <h2 className="specialties-title">
            SIGNATURE SPECIALTIES
          </h2>
          <p className="specialties-lead">
            Three handcrafted pillars defining why families across Toba Tek Singh make Shehryar their beloved dessert destination.
          </p>
        </div>

        {/* Feature 01: Natural Milk Ice Cream */}
        <div className="specialty-card specialty-01">
          <div className="specialty-text-wrap">
            <div className="specialty-num-tag">FEATURE 01</div>
            <h3 className="specialty-item-title">Natural Milk Ice Cream</h3>
            <p className="specialty-desc">
              We begin every batch with farm-fresh whole buffalo and cow milk. Slowly churned to achieve a thick, silky density without palm oils, artificial emulsifiers, or excessive air whipping.
            </p>
            <ul className="specialty-perks-list">
              <li><CheckCircle2 size={16} className="perk-icon" /> 100% Whole Dairy Cream Base</li>
              <li><CheckCircle2 size={16} className="perk-icon" /> Slow Artisanal Churn for Maximum Creaminess</li>
              <li><CheckCircle2 size={16} className="perk-icon" /> Handcrafted Fresh Every Single Morning</li>
            </ul>
            <div className="specialty-cta-wrap">
              <a href="#menu" className="btn btn-primary">Order Ice Cream Scoops</a>
            </div>
          </div>
          <div className="specialty-media-wrap">
            <div className="specialty-circle-blob blob-pistachio"></div>
            <img
              src="/images/flavours/pistachio.jpg"
              alt="Artisanal Natural Milk Ice Cream"
              className="specialty-img"
              loading="lazy"
            />
            <div className="specialty-floating-label">
              <span>Pure Whole Milk</span>
            </div>
          </div>
        </div>

        {/* Feature 02: Delicious Royal Falooda (Reversed layout) */}
        <div className="specialty-card specialty-02 specialty-reversed">
          <div className="specialty-text-wrap">
            <div className="specialty-num-tag">FEATURE 02</div>
            <h3 className="specialty-item-title">Delicious Royal Falooda</h3>
            <p className="specialty-desc">
              A timeless Pakistani dessert ritual. Tall crystal glass layered with concentrated ruby rose nectar, hand-drawn vermicelli (falooda sev), cooling sweet basil seeds (tukhm-e-balanga), thick aromatic rabri milk, and crowned with rich khoya kulfi scoop and crushed dry fruits.
            </p>
            <ul className="specialty-perks-list">
              <li><CheckCircle2 size={16} className="perk-icon" /> Chilled Condensed Rabri Milk</li>
              <li><CheckCircle2 size={16} className="perk-icon" /> Fragrant Rose Nectar &amp; Basil Seeds</li>
              <li><CheckCircle2 size={16} className="perk-icon" /> Crowned with Decadent Kulfi &amp; Nuts</li>
            </ul>
            <div className="specialty-cta-wrap">
              <a href="#menu" className="btn btn-primary">Taste Royal Falooda</a>
            </div>
          </div>
          <div className="specialty-media-wrap">
            <div className="specialty-circle-blob blob-falooda"></div>
            <img
              src="/images/flavours/falooda.jpg"
              alt="Delicious Royal Falooda Glass with Rabri"
              className="specialty-img"
              loading="lazy"
            />
            <div className="specialty-floating-label label-rose">
              <span>Signature Rabri Glass</span>
            </div>
          </div>
        </div>

        {/* Feature 03: A Variety of Sweet Flavours */}
        <div className="specialty-card specialty-03">
          <div className="specialty-text-wrap">
            <div className="specialty-num-tag">FEATURE 03</div>
            <h3 className="specialty-item-title">A Variety of Sweet Flavours</h3>
            <p className="specialty-desc">
              From sun-ripened strawberry and Pakistani Chaunsa mango to decadent dark cocoa chocolate, crunchy cookies &amp; cream, and slow-roasted emerald pistachio. A kaleidoscope of natural flavors crafted to delight every age.
            </p>
            <ul className="specialty-perks-list">
              <li><CheckCircle2 size={16} className="perk-icon" /> Ripe Seasonal Fruits &amp; Pure Purees</li>
              <li><CheckCircle2 size={16} className="perk-icon" /> Belgian Dark Cocoa &amp; Real Cookie Chunks</li>
              <li><CheckCircle2 size={16} className="perk-icon" /> Available Across All 3 Toba Branches</li>
            </ul>
            <div className="specialty-cta-wrap">
              <a href="#flavour-experience" className="btn btn-secondary">
                Explore Scroll Showcase <ArrowRight size={16} />
              </a>
            </div>
          </div>
          <div className="specialty-media-wrap">
            <div className="specialty-circle-blob blob-mango"></div>
            <img
              src="/images/flavours/mango.jpg"
              alt="A Variety of Sweet Flavours"
              className="specialty-img"
              loading="lazy"
            />
            <div className="specialty-floating-label label-golden">
              <span>7+ Gourmet Flavours</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Specialties;
