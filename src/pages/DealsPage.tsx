import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  Tag,
  Copy,
  Check,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Gift
} from 'lucide-react';
import { FLASH_DEALS, PROMO_COUPONS } from '../data/deals';
import { LAPTOPS_DATA } from '../data/laptops';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SafeImage } from '../components/common/SafeImage';
import { useToast } from '../context/ToastContext';
import { useCurrency } from '../context/CurrencyContext';

export const DealsPage: React.FC = () => {
  const { showToast } = useToast();
  const { format } = useCurrency();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Live countdown
  const [time, setTime] = useState({ h: 8, m: 34, s: 22 });

  useEffect(() => {
    const t = setInterval(() => {
      setTime((prev) => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: 59, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return { h: 12, m: 0, s: 0 };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast('Promo Code Copied!', `Apply "${code}" in checkout or cart drawer.`, 'success');
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const dealLaptops = LAPTOPS_DATA.filter((l) => l.discountPercentage > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10 min-h-screen bg-black text-white"
    >
      <Breadcrumbs items={[{ label: 'Deals & Specials' }]} />

      {/* Hero Header */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-red-950 via-titanium-900 to-black border border-red-500/40 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
        <div className="space-y-4 max-w-xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-xs font-mono text-red-400 font-bold">
            <Flame className="w-4 h-4 text-red-500 animate-pulse" />
            <span>EXCLUSIVE PRICE DROPS &amp; COUPONS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            Flash Drops &amp; Specials.
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Exclusive tier pricing on flagship hardware. Save up to ₹50,000 on RTX 4090 gaming monsters and M3 Max workstations with verified 2-Year manufacturer warranties.
          </p>
        </div>

        {/* Live Timer Clock */}
        <div className="p-6 rounded-3xl bg-black/90 border border-red-500/30 text-center space-y-2 shrink-0 shadow-neon-red relative z-10">
          <span className="text-[11px] font-mono text-red-400 uppercase tracking-widest block font-bold">
            Flash Batch Allocation Ends In:
          </span>
          <div className="flex items-center gap-2 font-mono text-2xl font-black text-white justify-center">
            <span className="p-3 rounded-xl bg-titanium-900 border border-white/15 min-w-[54px]">
              {String(time.h).padStart(2, '0')}
            </span>
            <span className="text-red-500 font-bold">:</span>
            <span className="p-3 rounded-xl bg-titanium-900 border border-white/15 min-w-[54px]">
              {String(time.m).padStart(2, '0')}
            </span>
            <span className="text-red-500 font-bold">:</span>
            <span className="p-3 rounded-xl bg-titanium-900 border border-red-500/40 min-w-[54px] text-red-500">
              {String(time.s).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Promo Coupons Cards */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 font-display">
          <Tag className="w-5 h-5 text-red-500" />
          <span>Active VIP Promo Codes</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROMO_COUPONS.map((coupon, idx) => (
            <motion.div
              key={coupon.code}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="p-6 rounded-3xl bg-titanium-900/80 border border-white/15 hover:border-red-500/40 space-y-4 flex flex-col justify-between shadow-xl transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30">
                    {coupon.discountPercentage}% DISCOUNT
                  </span>
                  {coupon.minSpend && (
                    <span className="text-[11px] font-mono text-slate-400">
                      Min: {format(coupon.minSpend)}
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-white leading-snug">{coupon.description}</h3>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="font-mono text-xs font-black text-red-500 bg-black px-3 py-1.5 rounded-xl border border-red-500/30">
                  {coupon.code}
                </span>
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => handleCopy(coupon.code)}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-neon-red transition-colors"
                >
                  {copiedCode === coupon.code ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === coupon.code ? 'Copied' : 'Copy Code'}</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Discounted Laptops Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 font-display">
          <Zap className="w-5 h-5 text-red-500" />
          <span>Discounted Hardware Inventory</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dealLaptops.map((laptop, idx) => (
            <motion.div
              key={laptop.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl bg-titanium-900/80 hover:bg-titanium-800 border border-white/15 hover:border-red-500/40 transition-all flex flex-col justify-between space-y-4 group shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-red-500 uppercase">
                    {laptop.brand}
                  </span>
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-red-600/20 text-red-400 border border-red-500/30">
                    -{laptop.discountPercentage}% OFF
                  </span>
                </div>

                <Link to={`/product/${laptop.id}`} className="block aspect-[16/11] bg-black rounded-2xl p-3 flex items-center justify-center border border-white/10">
                  <SafeImage
                    src={laptop.images[0]}
                    alt={laptop.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow group-hover:scale-105 transition-transform"
                  />
                </Link>

                <div>
                  <Link
                    to={`/product/${laptop.id}`}
                    className="text-base font-bold text-white truncate block hover:text-red-500 transition-colors"
                  >
                    {laptop.name}
                  </Link>
                  <p className="text-xs text-slate-400 truncate mt-0.5 font-mono">
                    {laptop.specs.processor} • {laptop.specs.gpu}
                  </p>
                </div>

                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-xl font-black text-white font-mono">{format(laptop.price)}</span>
                  <span className="text-xs text-slate-500 line-through font-mono">{format(laptop.originalPrice)}</span>
                </div>
              </div>

              <Link
                to={`/product/${laptop.id}`}
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-neon-red transition-all text-center"
              >
                <span>Claim Discount &amp; Configure</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
