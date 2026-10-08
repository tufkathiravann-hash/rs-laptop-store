import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';


// Motion & Scroll Providers
import { SmoothScroll } from './components/common/SmoothScroll';
import { CyberBackground } from './components/common/CyberBackground';
import { ScrollProgressBar } from './components/common/ScrollProgressBar';

// Providers
import { ToastProvider } from './context/ToastContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { CompareProvider } from './context/CompareContext';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';

// Global Overlays & Nav
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { SearchModal } from './components/common/SearchModal';
import { CartDrawer } from './components/common/CartDrawer';
import { AuthModal } from './components/common/AuthModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { DealsPage } from './pages/DealsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { WishlistPage } from './pages/WishlistPage';
import { ComparePage } from './pages/ComparePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AccountPage } from './pages/AccountPage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top helper on route transition
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <ToastProvider>
      <CurrencyProvider>
        <AuthProvider>
          <WishlistProvider>
            <CompareProvider>
              <CartProvider>
                <SearchProvider>
                  <SmoothScroll>
                    <Router>
                      <ScrollToTop />
                      <ScrollProgressBar />
                      <CyberBackground />
                      <div className="flex flex-col min-h-screen bg-black text-white selection:bg-red-600 selection:text-white antialiased relative z-10 w-full max-w-full overflow-x-hidden">
                        {/* Navigation Header */}
                        <Header />

                        {/* Main Dynamic View */}
                        <main className="flex-1 w-full max-w-full overflow-x-hidden">
                          <Routes>

                            <Route path="/" element={<HomePage />} />
                            <Route path="/laptops" element={<ProductsPage />} />
                            <Route path="/product/:id" element={<ProductDetailPage />} />
                            <Route path="/deals" element={<DealsPage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/checkout" element={<CheckoutPage />} />
                            <Route path="/wishlist" element={<WishlistPage />} />
                            <Route path="/compare" element={<ComparePage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/account" element={<AccountPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<LoginPage />} />
                            <Route path="*" element={<NotFoundPage />} />
                          </Routes>
                        </main>

                        {/* Footer */}
                        <Footer />

                        {/* Global Modals & Overlays */}
                        <SearchModal />
                        <CartDrawer />
                        <AuthModal />
                        <ToastContainer />
                      </div>
                    </Router>
                  </SmoothScroll>
                </SearchProvider>
              </CartProvider>
            </CompareProvider>
          </WishlistProvider>
        </AuthProvider>
      </CurrencyProvider>
    </ToastProvider>
  );
}

export default App;
