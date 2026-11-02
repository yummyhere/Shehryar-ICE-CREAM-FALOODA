import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FlavourExperience } from './components/FlavourExperience';
import { FlavourCollection } from './components/FlavourCollection';
import { About } from './components/About';
import { Specialties } from './components/Specialties';
import { Branches } from './components/Branches';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Check, Sparkles } from 'lucide-react';
import './App.css';

// Toast Notification component that listens to CartContext
const ToastNotification = () => {
  const { toastMessage } = useCart();
  if (!toastMessage) return null;

  return (
    <div className="app-toast-alert">
      <div className="toast-icon-wrap">
        <Sparkles size={16} />
      </div>
      <span className="toast-text">{toastMessage}</span>
    </div>
  );
};

function MainAppContent() {
  return (
    <div className="shehryar-website-wrapper">
      <Navbar />
      <main>
        <Hero />
        <FlavourExperience />
        <FlavourCollection />
        <About />
        <Specialties />
        <Branches />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <CartDrawer />
      <CheckoutModal />
      <ToastNotification />
    </div>
  );
}

export function App() {
  return (
    <CartProvider>
      <MainAppContent />
    </CartProvider>
  );
}

export default App;
