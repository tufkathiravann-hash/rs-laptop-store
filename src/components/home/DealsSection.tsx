import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Clock, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { FLASH_DEALS } from '../../data/deals';
import { LAPTOPS_DATA } from '../../data/laptops';
import { useCurrency } from '../../context/CurrencyContext';
import { SafeImage } from '../common/SafeImage';

export const DealsSection: React.FC = () => {
  const { format } = useCurrency();

  // Dynamic ticking countdown
  const [timeLeft, setTimeLeft] = useState({
    hours: 11,
    minutes: 42,
    seconds: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header + Live Countdown */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red-950/40 via-titanium-900/80 to-titanium-950 border border-red-500/20">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-red-400 mb-1 uppercase tracking-widest">
            <Flame className="w-4 h-4 text-red-500 animate-pulse" />
            <span>Limited Hardware Allocation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Flash Drops &amp; Exclusive Price Cuts.
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Exclusive tier pricing reserved for verified RS Store visitors. Resets every 12 hours.
          </p>
        </div>

        {/* Countdown digits */}
        <div className="flex items-center gap-2 font-mono">
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-titanium-950 border border-red-500/30 flex items-center justify-center text-lg font-bold text-white shadow-inner">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <span className="text-[10px] text-slate-500 uppercase">Hours</span>
          </div>
          <span className="text-red-500 font-bold text-lg -mt-4">:</span>
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-titanium-950 border border-red-500/30 flex items-center justify-center text-lg font-bold text-white shadow-inner">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <span className="text-[10px] text-slate-500 uppercase">Mins</span>
          </div>
          <span className="text-red-500 font-bold text-lg -mt-4">:</span>
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-titanium-950 border border-red-500/30 flex items-center justify-center text-lg font-bold text-red-500 shadow-inner">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <span className="text-[10px] text-slate-500 uppercase">Secs</span>
          </div>
        </div>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FLASH_DEALS.map((deal) => {
          const laptop = LAPTOPS_DATA.find((l) => l.id === deal.laptopId);
          if (!laptop) return null;

          const claimPct = Math.round((deal.unitsClaimed / deal.unitsTotal) * 100);

          return (
            <div
              key={deal.id}
              className="p-5 rounded-2xl bg-titanium-900/60 hover:bg-titanium-800/80 border border-white/5 hover:border-red-500/30 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/30">
                    {deal.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    Save {deal.discountPercentage}%
                  </span>
                </div>

                {/* Image */}
                <Link to={`/product/${laptop.id}`} className="block aspect-[16/11] overflow-hidden rounded-xl bg-titanium-950 flex items-center justify-center p-3">
                  <SafeImage
                    src={laptop.images[0]}
                    alt={laptop.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {/* Details */}
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">{laptop.brand}</div>
                  <Link
                    to={`/product/${laptop.id}`}
                    className="text-sm font-bold text-white truncate block hover:text-cyber-cyan transition-colors"
                  >
                    {laptop.name}
                  </Link>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{deal.tag}</p>
                </div>

                {/* Prices */}
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-white font-mono">{format(deal.dealPrice)}</span>
                  <span className="text-xs text-slate-500 line-through font-mono">{format(deal.originalPrice)}</span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Claimed: {deal.unitsClaimed}/{deal.unitsTotal}</span>
                    <span className="text-red-400 font-bold">{claimPct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-titanium-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full"
                      style={{ width: `${claimPct}%` }}
                    />
                  </div>
                </div>
              </div>

              <Link
                to={`/product/${laptop.id}`}
                className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-neon-red transition-all text-center"
              >
                <span>Claim Flash Deal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};
