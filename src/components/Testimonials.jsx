import React from 'react';
import { Star, Sparkles, Quote } from 'lucide-react';
import './Testimonials.css';

export const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote: "The Special Falooda with cold rabri milk and kulfi is unmatched in Toba Tek Singh. The texture is so rich and pure, you can immediately tell they use real dairy milk.",
      author: "Family Customer",
      location: "Farooq Road Visitor",
      favourite: "Special Falooda",
      rating: 5
    },
    {
      id: 2,
      quote: "Fresh Strawberry and Pista scoops are our family weekend ritual. Clean ambiance, friendly hospitality, and flavours that are not overly sugary. Just pure happiness.",
      author: "Local Dessert Enthusiast",
      location: "Toba Tek Singh Resident",
      favourite: "Strawberry & Pista Scoops",
      rating: 5
    },
    {
      id: 3,
      quote: "Ordering directly via WhatsApp is super convenient. They prepared our party order quickly from the Machli Bazar branch, neatly packed and ice-cold.",
      author: "Party & Gathering Host",
      location: "Machli Bazar Customer",
      favourite: "Belgian Chocolate & Mango",
      rating: 5
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        {/* Header */}
        <div className="testimonials-header text-center">
          <span className="badge-pill">
            <Sparkles size={13} />
            COMMUNITY VOICES
          </span>
          <h2 className="testimonials-title">
            SWEET WORDS, HAPPY CUSTOMERS
          </h2>
          <p className="testimonials-subtitle">
            Placeholder guest experiences from our ice cream lovers across Toba Tek Singh (editable with verified customer reviews).
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {testimonials.map((item) => (
            <div key={item.id} className="testimonial-card">
              <Quote size={28} className="quote-mark-icon" />

              <div className="testimonial-rating-row">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={15} fill="#FFB800" stroke="#FFB800" />
                ))}
              </div>

              <p className="testimonial-quote-text">
                "{item.quote}"
              </p>

              <div className="testimonial-footer">
                <div className="author-info">
                  <h4 className="author-title">{item.author}</h4>
                  <span className="author-loc">{item.location}</span>
                </div>
                <div className="favourite-chip">
                  <span>Fav: {item.favourite}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
