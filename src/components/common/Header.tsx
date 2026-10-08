import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Laptop,
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Layers,
  Flame,
  Zap,
  ShieldCheck,
  Cpu,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import { useAuth } from '../../context/AuthContext';
import { useSearch } from '../../context/SearchContext';
import { useCurrency } from '../../context/CurrencyContext';
import { CATEGORIES_DATA } from '../../data/categories';
import { CurrencyCode } from '../../types/user';
import { SafeImage, DEFAULT_AVATAR_FALLBACK } from './SafeImage';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { totalItemCount, openCart, grandTotal } = useCart();
  const { wishlistCount } = useWishlist();
  const { compareCount } = useCompare();
  const { user, openAuthModal, isAuthenticated } = useAuth();
  const { openSearch } = useSearch();
  const { currency, setCurrency, format } = useCurrency();

  // Scroll listener for glassmorphism header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
    setCurrencyDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Laptops', path: '/laptops', hasMega: true },
    { name: 'Deals', path: '/deals', badge: 'HOT' },
    { name: 'Compare', path: '/compare', badge: compareCount > 0 ? `${compareCount}` : undefined },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleAccountClick = () => {
    if (isAuthenticated) {
      navigate('/account');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      {/* Top promotional bar */}
      <div className="bg-black border-b border-white/10 py-1.5 px-4 text-center text-xs text-slate-300 relative z-40 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="font-medium text-white">RS HARDWARE ALLOCATION:</span>
            <span>Use code <strong className="text-red-500 font-mono tracking-wider">RSWELCOME10</strong> for ₹25,000 instant discount</span>
          </div>
          <div className="flex items-center gap-6 text-slate-400">
            <span className="flex items-center gap-1 hover:text-white transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
              <span>Certified 2-Year VIP Warranty</span>
            </span>
            <span className="flex items-center gap-1 hover:text-white transition-colors">
              <Zap className="w-3.5 h-3.5 text-red-500" />
              <span>Free Express Insured Air Delivery &gt; ₹99,999</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Bar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-black/90 backdrop-blur-xl border-b border-red-500/20 shadow-2xl py-3'
            : 'bg-black/75 backdrop-blur-md border-b border-white/10 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="RS Laptop Home"
          >
            <motion.div
              whileHover={{ scale: 1.08, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-rose-500 to-white p-[1.5px] shadow-neon-red transition-all duration-300"
            >
              <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
                <Laptop className="w-5 h-5 text-red-500" />
              </div>
            </motion.div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-xl font-bold tracking-tight text-white group-hover:text-red-500 transition-colors">
                  RS
                </span>
                <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-red-600/20 text-red-500 border border-red-500/40">
                  STORE
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 -mt-0.5 uppercase">
                Titan Computing
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 relative">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path === '/laptops' && location.pathname.startsWith('/laptops'));
              
              if (link.hasMega) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setMegaMenuOpen(true)}
                    onMouseLeave={() => setMegaMenuOpen(false)}
                  >
                    <Link
                      to={link.path}
                      className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                        isActive
                          ? 'text-white font-bold'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNavPill"
                          className="absolute inset-0 rounded-xl bg-red-600/20 border border-red-500/40 -z-10 shadow-neon-red/40"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span>{link.name}</span>
                      <motion.div
                        animate={{ rotate: megaMenuOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className={`w-3.5 h-3.5 ${megaMenuOpen ? 'text-red-500' : 'text-slate-400'}`} />
                      </motion.div>
                    </Link>

                    {/* Mega Menu Dropdown with Framer Motion */}
                    <AnimatePresence>
                      {megaMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[740px] rounded-3xl bg-black/95 backdrop-blur-2xl border border-white/15 p-6 shadow-2xl z-50 overflow-hidden"
                        >
                          <div className="grid grid-cols-3 gap-3.5">
                            {CATEGORIES_DATA.map((cat, idx) => (
                              <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.25, delay: idx * 0.04 }}
                              >
                                <Link
                                  to={`/laptops?category=${cat.id}`}
                                  className="group p-4 rounded-2xl bg-titanium-900/80 hover:bg-titanium-800 border border-white/10 hover:border-red-500/40 transition-all duration-200 flex flex-col justify-between h-full shadow-lg"
                                >
                                  <div>
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-sm font-bold text-white group-hover:text-red-500 transition-colors">
                                        {cat.name}
                                      </span>
                                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/60 text-slate-300 border border-white/10">
                                        {cat.laptopCount} models
                                      </span>
                                    </div>
                                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                                      {cat.shortDesc}
                                    </p>
                                  </div>
                                  <span className="text-[11px] text-red-500 font-bold mt-3 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                    <span>Explore Collection</span>
                                    <ArrowRight className="w-3 h-3" />
                                  </span>
                                </Link>
                              </motion.div>
                            ))}
                          </div>

                          {/* Mega menu footer banner */}
                          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                            <span className="flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-red-500" />
                              <span>Looking for custom RAM / SSD configs? Check model configurators.</span>
                            </span>
                            <Link
                              to="/laptops"
                              className="text-white hover:text-red-500 font-bold transition-colors flex items-center gap-1"
                            >
                              <span>View All Laptops</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-xl bg-red-600/20 border border-red-500/40 -z-10 shadow-neon-red/40"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-red-600 text-white shadow-sm">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Search Trigger Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={openSearch}
              className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 rounded-xl bg-titanium-900/90 hover:bg-titanium-800 border border-white/15 hover:border-red-500/40 text-slate-300 hover:text-white transition-all text-xs focus:outline-none shadow-sm"
              title="Search laptops (Ctrl+K / Cmd+K)"
              aria-label="Open search modal"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span className="hidden md:inline font-normal text-slate-400">Search rigs...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-black rounded border border-white/15">
                ⌘K
              </kbd>
            </motion.button>

            {/* Currency Selector */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="px-2.5 py-1.5 rounded-xl bg-titanium-900/90 hover:bg-titanium-800 border border-white/15 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1 transition-all"
                aria-label="Change currency"
              >
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>


              <AnimatePresence>
                {currencyDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-32 rounded-2xl bg-black border border-white/15 p-1.5 shadow-2xl z-50"
                  >
                    {(['INR', 'USD', 'EUR', 'GBP'] as CurrencyCode[]).map((code) => (
                      <button
                        key={code}
                        onClick={() => {
                          setCurrency(code);
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-mono flex items-center justify-between transition-colors ${
                          currency === code
                            ? 'bg-red-600/20 text-red-500 font-bold border border-red-500/30'
                            : 'text-slate-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span>{code}</span>
                        <span className="text-slate-400 font-bold">
                          {code === 'USD' ? '$' : code === 'EUR' ? '€' : code === 'GBP' ? '£' : '₹'}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
              title="Saved Wishlist"
              aria-label="View wishlist"
            >
              <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                <Heart className="w-5 h-5" />
              </motion.div>
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center shadow-sm"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </Link>

            {/* Cart Icon & Drawer Trigger */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={openCart}
              className="relative flex items-center gap-2 p-2 sm:px-3 sm:py-1.5 rounded-xl bg-titanium-900/90 hover:bg-titanium-800 border border-white/15 hover:border-red-500/40 text-slate-300 hover:text-white transition-all focus:outline-none shadow-sm"
              aria-label="Open Shopping Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-red-500" />
                {totalItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center shadow-neon-red"
                  >
                    {totalItemCount}
                  </motion.span>
                )}
              </div>
              <div className="hidden xl:flex flex-col text-left text-xs">
                <span className="text-[10px] text-slate-400 leading-none">Cart</span>
                <span className="font-semibold text-white leading-tight font-mono">
                  {format(grandTotal)}
                </span>
              </div>
            </motion.button>

            {/* User Profile / Auth Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleAccountClick}
              className="p-1.5 sm:p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
              title={isAuthenticated ? `Account (${user?.fullName})` : 'Sign In'}
              aria-label="Account profile"
            >
              {isAuthenticated && user?.avatar ? (
                <SafeImage
                  src={user.avatar}
                  alt={user.fullName}
                  fallbackSrc={DEFAULT_AVATAR_FALLBACK}
                  className="w-7 h-7 rounded-full object-cover border border-red-500/50"
                />
              ) : (
                <User className="w-5 h-5" />
              )}
            </motion.button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-red-500" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu with Framer Motion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed inset-0 top-[60px] z-50 bg-black/98 backdrop-blur-2xl border-t border-white/10 p-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-4">
              {/* Quick search input in mobile drawer */}
              <div className="relative mb-2">
                <input
                  type="text"
                  readOnly
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openSearch();
                  }}
                  placeholder="Search any laptop model, specs..."
                  className="w-full bg-titanium-900 border border-white/15 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 cursor-pointer"
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-4 top-3.5" />
              </div>

              {/* Navigation links */}
              <div className="flex flex-col gap-1 border-b border-white/10 pb-4">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-bold text-slate-200 hover:text-red-500 hover:bg-white/5"
                >
                  Home
                </Link>
                <Link
                  to="/laptops"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-bold text-slate-200 hover:text-red-500 hover:bg-white/5 flex items-center justify-between"
                >
                  <span>All Laptops</span>
                  <span className="text-xs font-mono text-red-500 font-bold">30+ Models</span>
                </Link>

                {/* Categories in Mobile */}
                <div className="px-4 py-2 text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
                  Categories
                </div>
                <div className="grid grid-cols-2 gap-2 px-2">
                  {CATEGORIES_DATA.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/laptops?category=${cat.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3 rounded-xl bg-titanium-900 border border-white/10 text-xs font-semibold text-slate-300 hover:text-red-500"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>

                <Link
                  to="/deals"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-bold text-slate-200 hover:text-red-500 hover:bg-white/5 flex items-center gap-2"
                >
                  <Flame className="w-4 h-4 text-red-500" />
                  <span>Flash Deals</span>
                </Link>
                <Link
                  to="/compare"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-bold text-slate-200 hover:text-red-500 hover:bg-white/5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-red-500" />
                    <span>Compare Specs</span>
                  </div>
                  {compareCount > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-red-600/20 text-red-500 font-mono font-bold">
                      {compareCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-bold text-slate-200 hover:text-red-500 hover:bg-white/5"
                >
                  About RS
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-bold text-slate-200 hover:text-red-500 hover:bg-white/5"
                >
                  Contact &amp; Support
                </Link>

                {/* Mobile Currency Selector */}
                <div className="px-4 py-2 text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
                  Currency ({currency})
                </div>
                <div className="grid grid-cols-4 gap-2 px-2">
                  {(['INR', 'USD', 'EUR', 'GBP'] as CurrencyCode[]).map((code) => (
                    <button
                      key={code}
                      onClick={() => setCurrency(code)}
                      className={`py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                        currency === code
                          ? 'bg-red-600 text-white shadow-neon-red'
                          : 'bg-titanium-900 border border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </div>

              {/* User status & quick action */}
              <div className="pt-2">
                {isAuthenticated ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-titanium-900 border border-white/10">
                    <div className="flex items-center gap-3">
                      <SafeImage
                        src={user?.avatar}
                        alt={user?.fullName}
                        fallbackSrc={DEFAULT_AVATAR_FALLBACK}
                        className="w-10 h-10 rounded-full border border-red-500/50"
                      />
                      <div>
                        <div className="text-sm font-semibold text-white">{user?.fullName}</div>
                        <div className="text-xs text-red-500 font-mono">{user?.memberTier} Member</div>
                      </div>
                    </div>
                    <Link
                      to="/account"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-red-600 text-white font-bold shadow-neon-red"
                    >
                      View Account
                    </Link>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-neon-red flex items-center justify-center gap-2"
                  >
                    <span>Sign In / VIP Register</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
