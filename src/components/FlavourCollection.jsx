import React, { useState } from 'react';
import { ShoppingBag, Plus, Star, Sparkles, Check, Info } from 'lucide-react';
import { productsData } from '../data/products';
import { useCart } from '../context/CartContext';
import './FlavourCollection.css';

export const FlavourCollection = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [addedItemMap, setAddedItemMap] = useState({});

  const categories = ['All', 'Ice Cream', 'Falooda'];

  const filteredProducts = selectedCategory === 'All'
    ? productsData
    : productsData.filter((item) => item.category === selectedCategory);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setAddedItemMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  return (
    <section id="menu" className="menu-section">
      <div className="container">
        {/* Section Header */}
        <div className="menu-header-group text-center">
          <span className="badge-pill">
            <Sparkles size={13} />
            HANDCRAFTED MENU SELECTION
          </span>
          <h2 className="menu-main-title">
            FIND YOUR FAVOURITE SCOOP
          </h2>
          <p className="menu-subtitle">
            Pure natural milk ice cream scoops and royal falooda creations. Churned fresh daily in Toba Tek Singh.
          </p>

          {/* Category Filter Pills */}
          <div className="category-tabs-row">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-pill-btn ${selectedCategory === category ? 'is-active-tab' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'All' ? '✨ All Flavours' : category === 'Ice Cream' ? '🍦 Natural Milk Ice Cream' : '🍧 Royal Falooda'}
              </button>
            ))}
          </div>

          <div className="menu-pricing-disclaimer">
            <Info size={14} />
            <span>* Editable preview menu prices. Final rates are confirmed at branch dispatch.</span>
          </div>
        </div>

        {/* Editorial Product Grid */}
        <div className="products-editorial-grid">
          {filteredProducts.map((product, index) => {
            const isAdded = addedItemMap[product.id];
            const isFeatured = index === 0 || product.badge === 'Bestseller';

            return (
              <div
                key={product.id}
                className={`product-card ${isFeatured ? 'card-featured' : ''}`}
              >
                {/* Visual Image container */}
                <div className="card-image-wrap">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                  />
                  {product.badge && (
                    <span className="product-badge-tag">{product.badge}</span>
                  )}
                  <div className="product-rating-chip">
                    <Star size={12} fill="#FFB800" stroke="#FFB800" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                {/* Product Content Details */}
                <div className="product-body">
                  <div className="product-category-row">
                    <span className="card-cat-name">{product.category}</span>
                    <span className="card-unit-name">{product.unit}</span>
                  </div>

                  <h3 className="product-title">{product.name}</h3>

                  <p className="product-desc">{product.description}</p>

                  <div className="product-footer-row">
                    <div className="price-tag-group">
                      <span className="price-currency">Rs.</span>
                      <span className="price-amount">{product.price}</span>
                    </div>

                    <button
                      className={`btn-add-cart ${isAdded ? 'is-success-added' : ''}`}
                      onClick={() => handleAddToCart(product)}
                      aria-label={`Add ${product.name} to order`}
                    >
                      {isAdded ? (
                        <>
                          <Check size={16} />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={16} />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner callout */}
        <div className="menu-custom-callout">
          <div className="callout-inner">
            <div className="callout-text">
              <h3>Hosting a Family Gathering or Sweet Occasion?</h3>
              <p>We provide party tubs and special Falooda catering across Toba Tek Singh. Reach out via WhatsApp directly.</p>
            </div>
            <a
              href="https://wa.me/923016565418?text=Hello%20Shehryar%20Ice%20Cream,%20I%20would%20like%20to%20inquire%20about%20party%20tubs%20and%20catering%20in%20Toba%20Tek%20Singh."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Order Family Party Tubs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FlavourCollection;
