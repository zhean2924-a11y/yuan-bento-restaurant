/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RouterProvider, useRouter } from './router/Router';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import FloatingCartButton from './components/FloatingCartButton';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import MenuPage from './pages/MenuPage';
import LocationsPage from './pages/LocationsPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';
import FeedbackPage from './pages/FeedbackPage';

function PageRouter() {
  const { currentPath } = useRouter();

  switch (currentPath) {
    case '/about':
      return <AboutPage />;
    case '/menu':
      return <MenuPage />;
    case '/locations':
      return <LocationsPage />;
    case '/news':
      return <NewsPage />;
    case '/contact':
      return <ContactPage />;
    case '/feedback':
      return <FeedbackPage />;
    case '/':
    default:
      return <HomePage />;
  }
}

export default function App() {
  return (
    <RouterProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1A1A1A] selection:bg-[#EA580C] selection:text-white">
          <Header />
          <main className="flex-1">
            <PageRouter />
          </main>
          <Footer />
          {/* Persistent E-commerce Cart Drawer & Floating Cart Entry */}
          <CartDrawer />
          <FloatingCartButton />
        </div>
      </CartProvider>
    </RouterProvider>
  );
}
