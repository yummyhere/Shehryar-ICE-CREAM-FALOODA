import React, { createContext, useContext, useState, useEffect } from 'react';
import { branchesData } from '../data/branches';

const CartContext = createContext();

const CART_STORAGE_KEY = 'shehryar_ice_cream_cart_v1';
const BRANCH_STORAGE_KEY = 'shehryar_ice_cream_branch_v1';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedBranch, setSelectedBranch] = useState(() => {
    try {
      const saved = localStorage.getItem(BRANCH_STORAGE_KEY);
      if (saved) {
        const found = branchesData.find(b => b.id === saved);
        if (found) return found;
      }
    } catch {
      // fallback
    }
    return branchesData[0];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (selectedBranch) {
        localStorage.setItem(BRANCH_STORAGE_KEY, selectedBranch.id);
      }
    } catch (e) {
      console.warn('Could not save branch', e);
    }
  }, [selectedBranch]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
    showToast(`Added ${qty}x ${product.name} to cart`);
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const generateWhatsAppMessage = ({ customerName, customerPhone, deliveryAddress, orderType, specialNotes }) => {
    const divider = '━━━━━━━━━━━━━━━━━━━━';
    const itemsList = cart
      .map(
        (item) => `• ${item.name} (${item.unit || 'Cup/Glass'})
   Qty: ${item.quantity} × Rs. ${item.price} = Rs. ${item.price * item.quantity}`
      )
      .join('\n');

    const text = `🍨 *NEW ORDER — SHEHRYAR ICE CREAM*
${divider}
👤 *Customer Name:* ${customerName}
📞 *Contact Number:* ${customerPhone}
🏪 *Selected Branch:* ${selectedBranch.name} (${selectedBranch.shortAddress})
📦 *Order Type:* ${orderType === 'delivery' ? 'Home Delivery (Toba Tek Singh)' : 'Store Takeaway / Pickup'}
${orderType === 'delivery' ? `📍 *Delivery Address:* ${deliveryAddress}\n` : ''}${specialNotes ? `📝 *Special Instructions:* ${specialNotes}\n` : ''}${divider}
🍦 *ORDER SUMMARY:*
${itemsList}
${divider}
💰 *Estimated Subtotal:* Rs. ${subtotal}
*(Final bill & delivery charges subject to branch confirmation)*

Please confirm if this order can be prepared and dispatched. Thank you!`;

    // Target verified WhatsApp number: 923016565418
    const targetNumber = selectedBranch?.whatsappClean || '923016565418';
    return `https://wa.me/${targetNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        totalItems,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedBranch,
        setSelectedBranch,
        toastMessage,
        generateWhatsAppMessage
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
