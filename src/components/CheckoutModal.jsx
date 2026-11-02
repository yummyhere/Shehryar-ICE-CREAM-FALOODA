import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, MessageCircle, MapPin, Truck, Store, Check, AlertCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { branchesData } from '../data/branches';
import './CheckoutModal.css';

export const CheckoutModal = () => {
  const {
    cart,
    subtotal,
    isCheckoutOpen,
    setIsCheckoutOpen,
    selectedBranch,
    setSelectedBranch,
    generateWhatsAppMessage
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderType, setOrderType] = useState('delivery'); // 'delivery' | 'pickup'
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleConfirmWhatsApp = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please enter your Name and Contact Number.');
      return;
    }

    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      alert('Please enter your Delivery Address in Toba Tek Singh.');
      return;
    }

    setIsSubmitting(true);

    // Fire celebratory confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // non-critical
    }

    const waUrl = generateWhatsAppMessage({
      customerName,
      customerPhone,
      deliveryAddress,
      orderType,
      specialNotes
    });

    setTimeout(() => {
      window.open(waUrl, '_blank');
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="checkout-modal-overlay" onClick={() => setIsCheckoutOpen(false)}>
      <div className="checkout-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="checkout-modal-header">
          <div className="checkout-header-title-wrap">
            <MessageCircle size={22} className="checkout-wa-icon" />
            <div>
              <h3 className="checkout-title">WhatsApp Order Checkout</h3>
              <p className="checkout-subtitle">Direct dispatch to Shehryar Ice Cream (+92 301 6565418)</p>
            </div>
          </div>

          <button
            className="checkout-close-btn"
            onClick={() => setIsCheckoutOpen(false)}
            aria-label="Close checkout"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleConfirmWhatsApp} className="checkout-modal-body">
          {/* Left Column: Customer Form */}
          <div className="checkout-form-column">
            {/* Order Type Toggle */}
            <div className="checkout-field-section">
              <label className="section-label">1. Order Method</label>
              <div className="order-type-tabs">
                <button
                  type="button"
                  className={`type-tab-btn ${orderType === 'delivery' ? 'is-active-type' : ''}`}
                  onClick={() => setOrderType('delivery')}
                >
                  <Truck size={17} />
                  <span>Home Delivery (Toba)</span>
                </button>
                <button
                  type="button"
                  className={`type-tab-btn ${orderType === 'pickup' ? 'is-active-type' : ''}`}
                  onClick={() => setOrderType('pickup')}
                >
                  <Store size={17} />
                  <span>Store Pickup / Takeaway</span>
                </button>
              </div>
            </div>

            {/* Branch Selection */}
            <div className="checkout-field-section">
              <label className="section-label" htmlFor="branch-select">2. Select Branch</label>
              <select
                id="branch-select"
                className="checkout-select"
                value={selectedBranch.id}
                onChange={(e) => {
                  const b = branchesData.find(item => item.id === e.target.value);
                  if (b) setSelectedBranch(b);
                }}
              >
                {branchesData.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} — {b.shortAddress} {b.isConfirmed ? '(Flagship)' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Customer Details */}
            <div className="checkout-field-section">
              <label className="section-label">3. Customer Details</label>
              <div className="fields-grid">
                <div className="input-group">
                  <label htmlFor="customer-name">Full Name *</label>
                  <input
                    id="customer-name"
                    type="text"
                    required
                    placeholder="e.g. Shehryar Ahmad"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="customer-phone">WhatsApp / Phone Number *</label>
                  <input
                    id="customer-phone"
                    type="tel"
                    required
                    placeholder="e.g. 0301 6565418"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                </div>
              </div>

              {orderType === 'delivery' && (
                <div className="input-group full-width-input">
                  <label htmlFor="customer-address">Toba Tek Singh Delivery Address *</label>
                  <input
                    id="customer-address"
                    type="text"
                    required
                    placeholder="House / Shop #, Street, Mohalla / Colony, Toba Tek Singh"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                  />
                </div>
              )}

              <div className="input-group full-width-input">
                <label htmlFor="special-notes">Special Instructions (Optional)</label>
                <input
                  id="special-notes"
                  type="text"
                  placeholder="e.g. Extra nuts on Falooda, spoons needed, etc."
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Order Review & WhatsApp Preview */}
          <div className="checkout-review-column">
            <div className="review-card">
              <h4 className="review-card-title">Order Items Review ({cart.length})</h4>

              <div className="review-items-list">
                {cart.map((item) => (
                  <div key={item.id} className="review-item-row">
                    <div className="review-item-meta">
                      <strong>{item.name}</strong>
                      <span>Qty: {item.quantity} × Rs. {item.price}</span>
                    </div>
                    <span className="review-item-total">
                      Rs. {item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="review-totals-box">
                <div className="totals-row">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal}</span>
                </div>
                <div className="totals-row">
                  <span>Delivery Dispatch</span>
                  <span className="badge-free">Calculated by Branch</span>
                </div>
                <div className="totals-row total-highlight">
                  <span>Estimated Total</span>
                  <span>Rs. {subtotal}</span>
                </div>
              </div>

              <div className="whatsapp-notice-card">
                <AlertCircle size={16} className="notice-icon" />
                <p>
                  <strong>How it works:</strong> Clicking below opens WhatsApp with your pre-formatted order directly sent to <strong>{selectedBranch.name}</strong>. The branch staff will instantly confirm availability, total price, and dispatch time.
                </p>
              </div>

              <button
                type="submit"
                className="btn btn-primary submit-whatsapp-order-btn"
                disabled={isSubmitting}
              >
                <MessageCircle size={18} />
                <span>{isSubmitting ? 'Opening WhatsApp...' : 'Confirm Order on WhatsApp'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CheckoutModal;
