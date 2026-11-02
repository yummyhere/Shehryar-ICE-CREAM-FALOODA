import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Navigation, Send, Sparkles, Clock, AlertCircle } from 'lucide-react';
import './Contact.css';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [submittedStatus, setSubmittedStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // Direct user to WhatsApp with prefilled message
    const waText = `Hello Shehryar Ice Cream,\nMy name is ${formData.name} (${formData.phone}).\nMessage: ${formData.message}`;
    const waUrl = `https://wa.me/923016565418?text=${encodeURIComponent(waText)}`;
    
    setSubmittedStatus('redirecting');
    setTimeout(() => {
      window.open(waUrl, '_blank');
      setSubmittedStatus('sent');
      setFormData({ name: '', phone: '', message: '' });
    }, 800);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        {/* Section Header */}
        <div className="contact-header text-center">
          <span className="badge-pill">
            <Sparkles size={13} />
            GET IN TOUCH
          </span>
          <h2 className="contact-title">
            LET'S MAKE LIFE A LITTLE SWEETER
          </h2>
          <p className="contact-subtitle">
            Whether you are planning a family dessert night, seeking catering, or want to say hello in Toba Tek Singh.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Info & Quick Action Cards */}
          <div className="contact-info-col">
            <div className="contact-card info-card-primary">
              <div className="info-card-header">
                <span className="info-card-badge">Confirmed Main Branch</span>
                <h3 className="info-branch-name">Machli Bazar Branch</h3>
              </div>

              <div className="info-detail-row">
                <MapPin size={20} className="info-icon" />
                <div>
                  <strong>Address</strong>
                  <p>Farooq Road, Machli Bazar, Toba Tek Singh, Punjab, Pakistan</p>
                </div>
              </div>

              <div className="info-detail-row">
                <Clock size={20} className="info-icon" />
                <div>
                  <strong>Opening Hours</strong>
                  <p>11:00 AM – 01:30 AM (Open 7 Days a Week)</p>
                </div>
              </div>

              <div className="info-detail-row">
                <Phone size={20} className="info-icon" />
                <div>
                  <strong>Direct Calling Lines</strong>
                  <p>
                    <a href="tel:+923016565418" className="phone-link">+92 301 6565418</a>
                    {' • '}
                    <a href="tel:+923467273552" className="phone-link">+92 346 7273552</a>
                  </p>
                </div>
              </div>

              <div className="info-detail-row">
                <MessageCircle size={20} className="info-icon wa-color" />
                <div>
                  <strong>WhatsApp Inquiries &amp; Orders</strong>
                  <p>
                    <a href="https://wa.me/923016565418" target="_blank" rel="noopener noreferrer" className="wa-link">
                      +92 301 6565418 (Machli Bazar)
                    </a>
                    <br />
                    <a href="https://wa.me/923467273552" target="_blank" rel="noopener noreferrer" className="wa-link">
                      +92 346 7273552 (Customer Support)
                    </a>
                  </p>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="info-buttons-row">
                <a href="tel:+923016565418" className="btn btn-primary info-btn">
                  <Phone size={16} /> Call Now
                </a>
                <a
                  href="https://wa.me/923467273552?text=Hello%20Shehryar%20Ice%20Cream,%20I%20would%20like%20to%20chat."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary info-btn"
                >
                  <MessageCircle size={16} /> Chat on WhatsApp
                </a>
                <a
                  href="https://maps.google.com/?q=Farooq+Road+Machli+Bazar+Toba+Tek+Singh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-white info-btn"
                >
                  <Navigation size={16} /> Get Directions
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="contact-form-col">
            <div className="contact-form-card">
              <h3 className="form-card-title">Send a Quick Inquiry</h3>
              <p className="form-card-desc">
                Have questions regarding custom flavours, party tubs, or business queries? Fill out the fields below.
              </p>

              <form onSubmit={handleSubmit} className="contact-actual-form">
                <div className="form-field-group">
                  <label htmlFor="contact-name">Your Full Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. Shehryar Ahmad"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="contact-phone">Phone Number (WhatsApp) *</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    placeholder="e.g. 0301 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="contact-message">Your Message or Query *</label>
                  <textarea
                    id="contact-message"
                    rows="4"
                    required
                    placeholder="Tell us what flavours or event you're looking for..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <div className="form-notice-box">
                  <AlertCircle size={15} />
                  <span>
                    Note: Form requires backend integration for database storage. Submitting sends your inquiry directly to our official WhatsApp (+92 301 6565418).
                  </span>
                </div>

                <button type="submit" className="btn btn-primary submit-inquiry-btn">
                  <Send size={16} />
                  <span>{submittedStatus === 'redirecting' ? 'Opening WhatsApp...' : 'Submit via WhatsApp'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contact;
