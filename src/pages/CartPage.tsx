import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  RotateCcw,
  Heart
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SafeImage } from '../components/common/SafeImage';

export const CartPage: React.FC = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    grandTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    toggleWarranty,
    clearCart,
    freeShippingThreshold,
    amountNeededForFreeShipping
  } = useCart();

  const { toggleWishlist } = useWishlist();
  const { format } = useCurrency();
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponInput('');
      setCouponError('');
    } else {
      setCouponError(res.message);
    }
  };

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6 min-h-screen bg-black text-white"
      >
        <Breadcrumbs items={[{ label: 'Hardware Bag' }]} />
        <div className="max-w-md mx-auto p-8 sm:p-12 rounded-3xl bg-titanium-900/80 border border-white/15 space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-3xl bg-black border border-white/10 flex items-center justify-center mx-auto text-red-500 shadow-neon-red">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white">Your Hardware Bag is Empty</h2>
          <p className="text-xs text-slate-400">
            You haven't configured any laptops yet. Explore our gaming flagships, creator stations, and ultrabooks.
          </p>
          <Link
            to="/laptops"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-neon-red transition-all"
          >
            <span>Explore Laptop Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 min-h-screen bg-black text-white"
    >
      <Breadcrumbs items={[{ label: 'Hardware Bag' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-display">
            Your Configured Fleet.
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review your custom specifications before secure express checkout.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 font-mono transition-colors font-bold"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Bag</span>
        </button>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="p-5 rounded-3xl bg-titanium-900/80 border border-white/15 space-y-3 shadow-xl">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-200 font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-red-500" />
            {amountNeededForFreeShipping === 0 ? (
              <strong className="text-white font-bold">You unlocked Free Express Air Insured Delivery!</strong>
            ) : (
              <span>Add <strong className="text-red-400 font-bold">{format(amountNeededForFreeShipping)}</strong> more to qualify for Free Express Shipping</span>
            )}
          </span>
          <span className="font-mono text-red-500 font-bold">{freeShippingProgress}%</span>
        </div>
        <div className="w-full h-2.5 bg-black rounded-full overflow-hidden border border-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-white rounded-full shadow-neon-red"
            initial={{ width: 0 }}
            animate={{ width: `${freeShippingProgress}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Main Grid: Items List (Left) + Summary (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="p-6 rounded-3xl bg-titanium-900/80 border border-white/15 space-y-4 transition-all shadow-xl"
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <Link
                    to={`/product/${item.laptop.id}`}
                    className="w-full sm:w-36 aspect-[16/11] bg-black rounded-2xl p-3 flex items-center justify-center shrink-0 border border-white/10"
                  >
                    <SafeImage
                      src={item.laptop.images[0]}
                      alt={item.laptop.name}
                      className="max-h-full max-w-full object-contain filter drop-shadow"
                    />
                  </Link>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-mono font-bold text-red-500 uppercase">
                          {item.laptop.brand}
                        </span>
                        <Link
                          to={`/product/${item.laptop.id}`}
                          className="text-base font-bold text-white hover:text-red-500 transition-colors block"
                        >
                          {item.laptop.name}
                        </Link>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-500 hover:text-red-500 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Configured Specs */}
                    <div className="flex flex-wrap gap-2 text-[11px] font-mono text-slate-300">
                      <span className="px-2.5 py-1 rounded-lg bg-black border border-white/10">
                        {item.selectedRam}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-black border border-white/10">
                        {item.selectedStorage}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-black border border-white/10">
                        {item.selectedColor}
                      </span>
                    </div>

                    {/* Price & Quantity Controls */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="text-xl font-black text-white font-mono">
                        {format(item.unitPrice * item.quantity)}
                      </div>

                      <div className="flex items-center border border-white/15 rounded-xl bg-black overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-mono font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Warranty & Save for later bar */}
                <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={!!item.warrantyIncluded}
                      onChange={() => toggleWarranty(item.id)}
                      className="rounded border-white/20 bg-black text-red-600"
                    />
                    <span className="text-slate-300 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-red-500" />
                      2-Year RS Concierge Shield Protection (+{format(14999)})
                    </span>
                  </label>
                  <button
                    onClick={() => {
                      toggleWishlist(item.laptop);
                      removeFromCart(item.id);
                    }}
                    className="text-slate-400 hover:text-white text-xs flex items-center gap-1 transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5 text-red-500" />
                    <span>Save for Later</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-titanium-900/90 border border-white/15 space-y-6 shadow-2xl sticky top-24">
          <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider pb-3 border-b border-white/10 flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-red-500" />
            <span>Order Financial Breakdown</span>
          </h3>

          {/* Promo code form */}
          <div className="space-y-2">
            {appliedCoupon ? (
              <div className="p-3.5 rounded-2xl bg-red-600/15 border border-red-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-red-400" />
                  <div>
                    <div className="text-xs font-bold text-white font-mono">{appliedCoupon.code}</div>
                    <div className="text-[10px] text-slate-300">{appliedCoupon.description}</div>
                  </div>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-slate-400 hover:text-white text-xs font-mono"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Promo code (e.g. RSWELCOME10)"
                  className="flex-1 bg-black border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 uppercase font-mono focus:outline-none focus:border-red-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-titanium-800 hover:bg-titanium-700 text-white font-bold text-xs border border-white/15 transition-all"
                >
                  Apply
                </button>
              </form>
            )}
            {couponError && <p className="text-[11px] text-red-400">{couponError}</p>}
          </div>

          {/* Calculation rows */}
          <div className="space-y-3 text-xs border-t border-white/10 pt-4 font-mono">
            <div className="flex justify-between text-slate-300">
              <span>Hardware Subtotal</span>
              <span className="font-bold text-white">{format(subtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-red-400 font-bold">
                <span>VIP Discount</span>
                <span>-{format(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-300">
              <span>Insured Shipping</span>
              <span className={shippingFee === 0 ? 'text-red-400 font-bold' : 'text-white'}>
                {shippingFee === 0 ? 'FREE' : format(shippingFee)}
              </span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>GST (18% Included)</span>
              <span className="text-white">{format(taxAmount)}</span>
            </div>
            <div className="flex justify-between text-base font-black text-white border-t border-white/10 pt-3 font-sans">
              <span>Grand Total</span>
              <span className="text-red-500 font-mono font-black">{format(grandTotal)}</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-neon-red flex items-center justify-center gap-2 transition-all"
          >
            <span>Proceed to Express Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
