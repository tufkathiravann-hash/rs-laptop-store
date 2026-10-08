import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Package,
  MapPin,
  CreditCard,
  LogOut,
  ShieldCheck,
  Sparkles,
  Truck,
  CheckCircle2,
  Clock,
  ChevronRight,
  ExternalLink,
  Lock,
  Plus,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { useToast } from '../context/ToastContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { formatDate } from '../utils/formatters';
import { SafeImage, DEFAULT_AVATAR_FALLBACK } from '../components/common/SafeImage';

export const AccountPage: React.FC = () => {
  const { user, isAuthenticated, logout, openAuthModal, updateProfile } = useAuth();
  const { format } = useCurrency();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'cards' | 'security'>('orders');

  // Edit profile state
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');

  if (!isAuthenticated || !user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4 min-h-screen bg-black text-white"
      >
        <Breadcrumbs items={[{ label: 'VIP Account' }]} />
        <div className="max-w-md mx-auto p-8 sm:p-12 rounded-3xl bg-titanium-900/80 border border-white/15 space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-3xl bg-black border border-white/10 flex items-center justify-center mx-auto text-red-500 shadow-neon-red">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white">Sign In Required</h2>
          <p className="text-xs text-slate-400">
            Please sign in to access your order history, warranty certificates, and saved addresses.
          </p>
          <Link
            to="/login"
            className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-neon-red flex items-center justify-center gap-2 transition-all"
          >
            <span>Sign In / VIP Register</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ fullName, phone });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 min-h-screen bg-black text-white"
    >
      <Breadcrumbs items={[{ label: 'VIP Member Portal' }]} />

      {/* User Header Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red-950 via-titanium-900 to-black border border-red-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4 text-center md:text-left">
          <SafeImage
            src={user.avatar}
            alt={user.fullName}
            fallbackSrc={DEFAULT_AVATAR_FALLBACK}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-red-500 shadow-neon-red"
          />
          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <h1 className="text-xl sm:text-2xl font-black text-white font-display">{user.fullName}</h1>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/40">
                {user.memberTier}
              </span>
            </div>
            <p className="text-xs text-slate-300 font-mono mt-0.5">{user.email}</p>
          </div>
        </div>

        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="px-4 py-2 rounded-xl bg-black hover:bg-titanium-800 text-slate-300 hover:text-red-500 border border-white/15 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Account Navigation Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 space-y-1.5 bg-titanium-900/80 p-3 rounded-3xl border border-white/15 shadow-xl">
          {[
            { id: 'orders' as const, label: `Order History (${user.orders.length})`, icon: <Package className="w-4 h-4" /> },
            { id: 'addresses' as const, label: 'Saved Addresses', icon: <MapPin className="w-4 h-4" /> },
            { id: 'cards' as const, label: 'Payment Methods', icon: <CreditCard className="w-4 h-4" /> },
            { id: 'security' as const, label: 'Profile & Settings', icon: <Lock className="w-4 h-4" /> }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative w-full p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2.5 transition-all text-left ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="accountTabPill"
                    className="absolute inset-0 bg-red-600 rounded-2xl shadow-neon-red -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panes */}
        <div className="lg:col-span-9 p-6 sm:p-8 rounded-3xl bg-titanium-900/80 border border-white/15 space-y-6 shadow-2xl">
          <AnimatePresence mode="wait">
            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <h2 className="text-xs font-mono font-bold text-white uppercase tracking-wider pb-3 border-b border-white/10 flex items-center gap-2">
                  <Package className="w-4 h-4 text-red-500" />
                  <span>Hardware Order Allocation History</span>
                </h2>

                {user.orders.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 space-y-3">
                    <Package className="w-10 h-10 mx-auto text-slate-600" />
                    <p className="text-sm">No hardware orders found yet.</p>
                    <Link to="/laptops" className="text-xs text-red-500 underline block font-bold">
                      Browse Flagship Rigs &rarr;
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {user.orders.map((order) => (
                      <div
                        key={order.id}
                        className="p-5 rounded-2xl bg-black border border-white/10 space-y-4 shadow-lg"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10 text-xs font-mono">
                          <div>
                            <span className="text-slate-400">ORDER NO: </span>
                            <span className="text-white font-bold">{order.id}</span>
                            <span className="text-slate-400 ml-3">DATE: </span>
                            <span className="text-slate-300">{formatDate(order.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 font-bold uppercase text-[10px]">
                              {order.status}
                            </span>
                            <span className="text-white font-black">{format(order.total)}</span>
                          </div>
                        </div>

                        {/* Items */}
                        <div className="space-y-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <SafeImage src={item.image} alt="" className="w-12 h-12 object-contain rounded-lg bg-titanium-950 p-1 border border-white/10" />
                                <div>
                                  <h4 className="text-xs font-bold text-white">{item.name}</h4>
                                  <p className="text-[11px] text-slate-400 font-mono">{item.configSummary}</p>
                                </div>
                              </div>
                              <span className="text-xs font-mono text-white font-semibold">
                                {format(item.unitPrice * item.quantity)} (x{item.quantity})
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Tracking footer */}
                        <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400">
                          <div className="flex items-center gap-2">
                            <Truck className="w-3.5 h-3.5 text-red-500" />
                            <span>Tracking: <strong className="text-white font-mono">{order.trackingNumber}</strong></span>
                          </div>
                          <span className="text-red-400 font-mono font-bold">Est: {order.estimatedDelivery}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <motion.div
                key="addresses"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <h2 className="text-xs font-mono font-bold text-white uppercase tracking-wider pb-3 border-b border-white/10 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span>Saved Shipping Locations</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.addresses.map((addr) => (
                    <div key={addr.id} className="p-5 rounded-2xl bg-black border border-white/10 space-y-2 shadow-md">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">{addr.fullName}</span>
                        {addr.isDefault && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-500/30">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{addr.street}, {addr.city}, {addr.state} {addr.postalCode}</p>
                      <p className="text-[11px] text-slate-400 font-mono">{addr.phone}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* PAYMENT METHODS */}
            {activeTab === 'cards' && (
              <motion.div
                key="cards"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <h2 className="text-xs font-mono font-bold text-white uppercase tracking-wider pb-3 border-b border-white/10 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-red-500" />
                  <span>Saved Vault Payment Methods</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.savedPaymentMethods.map((card) => (
                    <div key={card.id} className="p-6 rounded-3xl bg-gradient-to-br from-black via-titanium-900 to-red-950/40 border border-white/15 space-y-4 shadow-xl">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-300 font-bold">
                        <span>{card.cardBrand}</span>
                        <span>Expires {card.expiry}</span>
                      </div>
                      <div className="text-lg font-mono text-white font-bold tracking-widest">
                        •••• •••• •••• {card.last4}
                      </div>
                      <div className="text-xs text-slate-300">{card.holderName}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* PROFILE & SETTINGS */}
            {activeTab === 'security' && (
              <motion.form
                key="security"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSaveProfile}
                className="space-y-4 max-w-md"
              >
                <h2 className="text-xs font-mono font-bold text-white uppercase tracking-wider pb-3 border-b border-white/10 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-red-500" />
                  <span>Update Profile Information</span>
                </h2>

                <div>
                  <label className="block text-xs text-slate-300 mb-1 font-medium">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1 font-medium">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-neon-red transition-all"
                >
                  Save Changes
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
