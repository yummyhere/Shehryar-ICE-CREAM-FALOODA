import React from 'react';
import { MapPin, Phone, MessageCircle, Navigation, CheckCircle, Clock, Sparkles } from 'lucide-react';
import { branchesData } from '../data/branches';
import { useCart } from '../context/CartContext';
import './Branches.css';

export const Branches = () => {
  const { selectedBranch, setSelectedBranch } = useCart();

  return (
    <section id="branches" className="branches-section">
      <div className="container">
        {/* Header */}
        <div className="branches-header text-center">
          <span className="badge-pill">
            <Sparkles size={13} />
            THREE LOCATIONS IN TOBA TEK SINGH
          </span>
          <h2 className="branches-title">
            YOUR NEAREST SCOOP IS CLOSER THAN YOU THINK
          </h2>
          <p className="branches-subtitle">
            Visit us in person for fresh churned scoops and chilled royal falooda, or select your preferred branch for fast WhatsApp delivery dispatch.
          </p>
        </div>

        {/* Branch Cards */}
        <div className="branches-grid">
          {branchesData.map((branch) => {
            const isSelected = selectedBranch.id === branch.id;

            return (
              <div
                key={branch.id}
                className={`branch-card ${isSelected ? 'branch-is-selected' : ''} ${
                  branch.isConfirmed ? 'branch-confirmed' : 'branch-placeholder'
                }`}
              >
                {/* Branch Header Tag */}
                <div className="branch-card-header">
                  <span className={`branch-tag-pill ${branch.isConfirmed ? 'tag-verified' : 'tag-pending'}`}>
                    {branch.isConfirmed ? '✓ Confirmed Location' : 'Pending Confirmation'}
                  </span>
                  {isSelected && (
                    <span className="active-selection-badge">
                      <CheckCircle size={14} />
                      Active for Checkout
                    </span>
                  )}
                </div>

                <h3 className="branch-name">{branch.name}</h3>

                <div className="branch-address-box">
                  <MapPin size={18} className="branch-icon-pin" />
                  <p className="branch-address-text">{branch.address}</p>
                </div>

                <div className="branch-hours-box">
                  <Clock size={16} className="branch-icon-clock" />
                  <span>{branch.hours}</span>
                </div>

                <p className="branch-notes-text">{branch.note}</p>

                {/* Contact & Actions Row */}
                <div className="branch-contacts-group">
                  <a
                    href={`tel:${branch.phoneClean}`}
                    className="branch-contact-link"
                    title={`Call ${branch.name}`}
                  >
                    <Phone size={15} />
                    <span>{branch.phone}</span>
                  </a>

                  <a
                    href={`https://wa.me/${branch.whatsappClean}?text=Hello%20Shehryar%20Ice%20Cream%20(${encodeURIComponent(branch.name)}),%20I%20would%20like%20to%20order.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="branch-whatsapp-link"
                    title={`Chat on WhatsApp with ${branch.name}`}
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp Chat</span>
                  </a>
                </div>

                {/* Card Bottom Buttons */}
                <div className="branch-card-actions">
                  {branch.isConfirmed && branch.mapQuery ? (
                    <a
                      href={`https://maps.google.com/?q=${branch.mapQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-branch-direction"
                    >
                      <Navigation size={14} />
                      <span>Get Directions</span>
                    </a>
                  ) : (
                    <span className="btn-branch-direction direction-placeholder" title="Map pin will be added upon branch address verification">
                      <Navigation size={14} />
                      <span>Map Location Pending</span>
                    </span>
                  )}

                  <button
                    className={`btn-select-branch ${isSelected ? 'btn-selected' : ''}`}
                    onClick={() => setSelectedBranch(branch)}
                  >
                    {isSelected ? '✓ Selected Branch' : 'Select for Order'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note on 3 Branches */}
        <div className="branches-info-banner">
          <p>
            <strong>Note for Customers:</strong> Shehryar Ice Cream proudly operates 3 branches in Toba Tek Singh.
            Our flagship confirmed location is at <strong>Farooq Road, Machli Bazar</strong>. For inquiries about the other two branch locations, please call <strong>+92 301 6565418</strong> or <strong>+92 346 7273552</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};
export default Branches;
