import React from 'react';
import { Heart, Sparkles, MapPin, Milk, Clock, Users } from 'lucide-react';
import './About.css';

export const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          {/* Left Column: Asymmetrical Images */}
          <div className="about-images-col">
            <div className="about-image-primary-wrap">
              <img
                src="/images/brand/milk-craft.jpg"
                alt="Natural farm milk churned for Shehryar Ice Cream"
                className="about-image-primary"
                loading="lazy"
              />
              <div className="about-image-badge">
                <Milk size={18} className="badge-milk-icon" />
                <div>
                  <strong>Pure Dairy Heritage</strong>
                  <span>Whole natural milk base</span>
                </div>
              </div>
            </div>

            <div className="about-image-secondary-wrap">
              <img
                src="/images/brand/ambiance.jpg"
                alt="Shehryar Ice Cream Boutique Parlour Ambiance"
                className="about-image-secondary"
                loading="lazy"
              />
              <div className="about-floating-location-tag">
                <MapPin size={14} />
                <span>3 Branches in Toba Tek Singh</span>
              </div>
            </div>

            {/* Decorative pastel blob behind */}
            <div className="about-organic-blob"></div>
          </div>

          {/* Right Column: Editorial Storytelling */}
          <div className="about-content-col">
            <div className="about-header-meta">
              <span className="badge-pill">
                <Sparkles size={13} />
                OUR BRAND STORY
              </span>
            </div>

            <h2 className="about-heading">
              MORE THAN JUST ICE CREAM
            </h2>

            <blockquote className="about-core-quote">
              "At Shehryar Ice Cream, we bring people together through the simple joy of natural milk ice cream and delicious falooda. Every scoop is an invitation to enjoy a little sweetness in your day."
            </blockquote>

            <div className="about-paragraphs">
              <p>
                In the vibrant heart of <strong>Toba Tek Singh, Pakistan</strong>, our philosophy is refreshingly simple: dessert should taste honest, wholesome, and unforgettable. We reject artificial thickeners and vegetable fats, insisting instead on the creamy richness of natural dairy milk.
              </p>
              <p>
                Whether it is our silky strawberry churned with real fruit, velvety dark chocolate, or the multi-layered majesty of our royal special falooda served in chilled crystal glasses, each recipe is prepared to share happy memories across generations.
              </p>
            </div>

            {/* Value Pillars */}
            <div className="about-pillars-grid">
              <div className="pillar-item">
                <div className="pillar-icon">🥛</div>
                <div className="pillar-text">
                  <h4>Natural Milk Purity</h4>
                  <p>Whole fresh dairy churned slowly for an authentic velvety texture.</p>
                </div>
              </div>

              <div className="pillar-item">
                <div className="pillar-icon">🍧</div>
                <div className="pillar-text">
                  <h4>Signature Falooda</h4>
                  <p>Layered with authentic rabri milk, ruby rose syrup, and handmade sev.</p>
                </div>
              </div>

              <div className="pillar-item">
                <div className="pillar-icon">🏪</div>
                <div className="pillar-text">
                  <h4>Three Local Branches</h4>
                  <p>Serving our community with flagship warmth on Farooq Road.</p>
                </div>
              </div>

              <div className="pillar-item">
                <div className="pillar-icon">❤️</div>
                <div className="pillar-text">
                  <h4>Customer-Focused Service</h4>
                  <p>Always served with genuine care, cleanliness, and warm hospitality.</p>
                </div>
              </div>
            </div>

            <div className="about-action-row">
              <a href="#branches" className="btn btn-primary">
                Discover Our 3 Branches
              </a>
              <a href="#menu" className="btn btn-secondary">
                Taste The Menu
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
