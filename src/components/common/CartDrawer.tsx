import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCurrency } from '../../context/CurrencyContext';
import { SafeImage } from './SafeImage';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
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

  const handleProceedToCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleViewFullCart = () => {
    closeCart();
    navigate('/cart');
  };

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={closeCart}
            aria-hidden="true"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-black border-l border-white/15 shadow-2xl flex flex-col"
            >
              {/* Cart Header */}
              <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-titanium-900/90">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 shadow-neon-red">
                    <ShoppingCart className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Your Hardware Bag</h3>
                    <span className="text-xs text-slate-400 font-mono">
                      {items.length} {items.length === 1 ? 'item' : 'items'} configured
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeCart}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-red-500 hover:bg-white/5 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Indicator */}
              {items.length > 0 && (
                <div className="px-5 py-3 bg-titanium-900/40 border-b border-white/10">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-300 font-medium flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-red-500" />
                      {amountNeededForFreeShipping === 0 ? (
                        <strong className="text-white font-bold">You unlocked Free Express Air Delivery!</strong>
                      ) : (
                        <span>Add {format(amountNeededForFreeShipping)} more for Free Shipping</span>
                      )}
                    </span>
                    <span className="font-mono text-red-500 font-bold">{freeShippingProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-titanium-950 rounded-full overflow-hidden border border-white/10">
                    <motion.div
                      className="h-full bg-red-600 rounded-full shadow-neon-red"
                      initial={{ width: 0 }}
                      animate={{ width: `${freeShippingProgress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              )}

              {/* Cart Items Scroll Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-16 h-16 rounded-3xl bg-titanium-900 border border-white/10 flex items-center justify-center mx-auto text-red-500 shadow-xl">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-white">Your bag is currently empty</h4>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto">
                        Explore our flagship gaming laptops, creator studios, and executive ultrabooks.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        closeCart();
                        navigate('/laptops');
                      }}
                      className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-neon-red transition-all inline-flex items-center gap-2"
                    >
                      <span>Explore Laptop Collection</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="p-4 rounded-2xl bg-titanium-900/80 border border-white/10 space-y-3 relative group shadow-lg"
                      >
                        <div className="flex gap-3">
                          <SafeImage
                            src={item.laptop.images[0]}
                            alt={item.laptop.name}
                            className="w-18 h-18 sm:w-20 sm:h-20 object-contain rounded-xl bg-black border border-white/10 shrink-0 cursor-pointer p-1"
                            onClick={() => {
                              closeCart();
                              navigate(`/product/${item.laptop.id}`);
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <span className="text-[10px] font-mono font-bold text-red-500 uppercase">
                                  {item.laptop.brand}
                                </span>
                                <h4
                                  onClick={() => {
                                    closeCart();
                                    navigate(`/product/${item.laptop.id}`);
                                  }}
                                  className="text-xs sm:text-sm font-bold text-white truncate cursor-pointer hover:text-red-500 transition-colors"
                                >
                                  {item.laptop.name}
                                </h4>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-slate-500 hover:text-red-500 p-1 transition-colors"
                                title="Remove item"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Specs Badge */}
                            <div className="flex flex-wrap gap-1 mt-1 text-[10px] text-slate-300 font-mono">
                              <span className="px-1.5 py-0.5 rounded bg-black border border-white/10">
                                {item.selectedRam}
                              </span>
                              <span className="px-1.5 py-0.5 rounded bg-black border border-white/10">
                                {item.selectedStorage}
                              </span>
                            </div>

                            {/* Price & Quantity Controls */}
                            <div className="flex items-center justify-between mt-3">
                              <div className="text-sm font-black text-white font-mono">
                                {format(item.unitPrice * item.quantity)}
                              </div>

                              <div className="flex items-center border border-white/15 rounded-lg bg-black overflow-hidden">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="px-2 py-1 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2 text-xs font-mono text-white font-bold">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="px-2 py-1 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Warranty add-on toggle */}
                        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                          <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={!!item.warrantyIncluded}
                              onChange={() => toggleWarranty(item.id)}
                              className="rounded border-white/20 bg-black text-red-600 focus:ring-red-500"
                            />
                            <span className="text-[11px] text-slate-300 flex items-center gap-1 font-medium">
                              <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
                              2-Year RS Care (+{format(14999)})
                            </span>
                          </label>
                          <button
                            onClick={() => {
                              toggleWishlist(item.laptop);
                              removeFromCart(item.id);
                            }}
                            className="text-[11px] text-slate-400 hover:text-white underline font-mono"
                          >
                            Save for later
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Cart Footer Summary & Checkout CTA */}
              {items.length > 0 && (
                <div className="p-4 sm:p-5 border-t border-white/10 bg-titanium-900/95 space-y-3.5 shadow-2xl">
                  {/* Coupon input */}
                  <div>
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-red-600/20 border border-red-500/40 text-xs">
                        <div className="flex items-center gap-1.5 text-red-400 font-mono font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{appliedCoupon.code} (-{appliedCoupon.discountPercentage}%)</span>
                        </div>
                        <button
                          onClick={removeCoupon}
                          className="text-slate-400 hover:text-white text-xs underline font-mono font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                          <input
                            type="text"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                            placeholder="Coupon code (e.g. RSWELCOME10)"
                            className="w-full bg-black border border-white/15 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white uppercase placeholder-slate-500 focus:outline-none focus:border-red-500 font-mono"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors"
                        >
                          Apply
                        </button>
                      </form>
                    )}
                    {couponError && (
                      <span className="text-[11px] text-red-400 mt-1 block">{couponError}</span>
                    )}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-white font-bold">{format(subtotal)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-red-400 font-bold">
                        <span>VIP Discount</span>
                        <span>-{format(discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className={shippingFee === 0 ? 'text-red-400 font-bold' : 'text-white'}>
                        {shippingFee === 0 ? 'FREE' : format(shippingFee)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (18%)</span>
                      <span className="text-white">{format(taxAmount)}</span>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold text-white">
                      <span>Total</span>
                      <span className="text-red-500 font-mono font-black text-lg">{format(grandTotal)}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={handleViewFullCart}
                      className="py-3 rounded-xl bg-black hover:bg-titanium-800 text-slate-200 hover:text-white text-xs font-bold border border-white/15 transition-all text-center"
                    >
                      View Full Bag
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleProceedToCheckout}
                      className="py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-neon-red flex items-center justify-center gap-1.5 transition-all text-center"
                    >
                      <span>Checkout</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
