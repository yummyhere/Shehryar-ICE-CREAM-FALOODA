import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalItems,
    selectedBranch
  } = useCart();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-drawer-header">
          <div className="cart-header-title-group">
            <ShoppingBag size={20} className="cart-icon" />
            <h3 className="cart-header-title">Your Sweet Bag</h3>
            <span className="cart-count-pill">{totalItems} items</span>
          </div>

          <button
            className="cart-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </div>

        {/* Selected Branch notification bar */}
        <div className="cart-branch-bar">
          <MapPin size={14} className="bar-pin-icon" />
          <div className="bar-text">
            <span>Dispatching from: <strong>{selectedBranch.name}</strong></span>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="cart-items-container">
          {cart.length === 0 ? (
            <div className="empty-cart-state">
              <div className="empty-cart-icon-circle">🍨</div>
              <h4>Your bag is currently empty</h4>
              <p>Explore our natural milk flavours and royal falooda to start your sweet order.</p>
              <button
                className="btn btn-primary empty-cart-btn"
                onClick={() => {
                  setIsCartOpen(false);
                  const el = document.querySelector('#menu');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-item-row">
                  <img src={item.image} alt={item.name} className="cart-item-img" />

                  <div className="cart-item-info">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <span className="cart-item-unit">{item.unit || 'Cup/Glass'}</span>
                    <span className="cart-item-rate">Rs. {item.price} each</span>

                    {/* Quantity Stepper */}
                    <div className="cart-quantity-row">
                      <div className="qty-stepper">
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="qty-number">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <span className="cart-item-line-total">
                        Rs. {item.price * item.quantity}
                      </span>
                    </div>
                  </div>

                  <button
                    className="cart-item-remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-subtotal-row">
              <span className="subtotal-label">Subtotal</span>
              <span className="subtotal-val">Rs. {subtotal}</span>
            </div>

            <p className="cart-footer-disclaimer">
              * Delivery charges (if applicable) and confirmation are finalized via WhatsApp.
            </p>

            <button
              className="btn btn-primary checkout-trigger-btn"
              onClick={handleProceedToCheckout}
            >
              <span>Proceed to WhatsApp Checkout</span>
              <ArrowRight size={18} />
            </button>

            <button className="cart-clear-btn" onClick={clearCart}>
              Clear Entire Bag
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default CartDrawer;
