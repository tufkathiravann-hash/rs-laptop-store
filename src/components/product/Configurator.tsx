import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Zap,
  ShieldCheck,
  Heart,
  Layers,
  Truck,
  RotateCcw,
  Check,
  MapPin,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Laptop } from '../../types/product';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import { useCurrency } from '../../context/CurrencyContext';

interface ConfiguratorProps {
  laptop: Laptop;
}

export const Configurator: React.FC<ConfiguratorProps> = ({ laptop }) => {
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, toggleCompare } = useCompare();
  const { format } = useCurrency();

  // State
  const [selectedRam, setSelectedRam] = useState(laptop.config.ramOptions[0]?.label || laptop.specs.ram);
  const [selectedStorage, setSelectedStorage] = useState(laptop.config.storageOptions[0]?.label || laptop.specs.storage);
  const [selectedColor, setSelectedColor] = useState(laptop.config.colorOptions[0]?.name || 'Standard');
  const [warrantyOption, setWarrantyOption] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [pinCode, setPinCode] = useState('');
  const [pinChecked, setPinChecked] = useState(false);

  // Price math
  const ramDelta = laptop.config.ramOptions.find((r) => r.label === selectedRam)?.priceDelta || 0;
  const storageDelta = laptop.config.storageOptions.find((s) => s.label === selectedStorage)?.priceDelta || 0;
  const warrantyPrice = warrantyOption ? 14999 : 0;
  const totalExtra = ramDelta + storageDelta + warrantyPrice;
  const finalUnitPrice = laptop.price + totalExtra;
  const finalTotalPrice = finalUnitPrice * quantity;

  const isSaved = isInWishlist(laptop.id);
  const isCompared = isInCompare(laptop.id);

  const handleAddToCart = () => {
    addToCart(
      laptop,
      selectedRam,
      selectedStorage,
      selectedColor,
      laptop.specs.gpu,
      ramDelta + storageDelta,
      quantity,
      warrantyOption
    );
  };

  const handleBuyNow = () => {
    addToCart(
      laptop,
      selectedRam,
      selectedStorage,
      selectedColor,
      laptop.specs.gpu,
      ramDelta + storageDelta,
      quantity,
      warrantyOption
    );
    navigate('/checkout');
  };

  const handleCheckPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinCode.trim().length >= 3) {
      setPinChecked(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Price & Monthly EMI banner */}
      <div className="p-5 rounded-2xl bg-titanium-900/80 border border-white/10 space-y-2">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
              {format(finalTotalPrice)}
            </span>
            {laptop.originalPrice > laptop.price && (
              <span className="text-base text-slate-500 line-through font-mono">
                {format(laptop.originalPrice * quantity)}
              </span>
            )}
          </div>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            In Stock ({laptop.stockCount} left)
          </span>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2">
          <span>Or finance for <strong>{format(Math.round(finalTotalPrice / 24))}/mo</strong> for 24 months with RS 0% APR</span>
        </div>
      </div>

      {/* RAM Options */}
      {laptop.config.ramOptions.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <label className="font-mono text-slate-300 font-semibold uppercase tracking-wider">
              1. Unified / DDR5 RAM
            </label>
            <span className="text-cyber-cyan font-mono text-[11px]">{selectedRam}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {laptop.config.ramOptions.map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => setSelectedRam(opt.label)}
                className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                  selectedRam === opt.label
                    ? 'bg-cyber-cyan/10 border-cyber-cyan text-white shadow-neon-cyan/20'
                    : 'bg-titanium-950/70 border-white/10 hover:border-white/20 text-slate-300'
                }`}
              >
                <div className="text-xs font-semibold">{opt.label}</div>
                <div className="text-[11px] font-mono text-slate-400">
                  {opt.priceDelta === 0 ? 'Included' : `+${format(opt.priceDelta)}`}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Storage Options */}
      {laptop.config.storageOptions.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <label className="font-mono text-slate-300 font-semibold uppercase tracking-wider">
              2. NVMe Gen4 Storage
            </label>
            <span className="text-cyber-cyan font-mono text-[11px]">{selectedStorage}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {laptop.config.storageOptions.map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => setSelectedStorage(opt.label)}
                className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                  selectedStorage === opt.label
                    ? 'bg-cyber-cyan/10 border-cyber-cyan text-white shadow-neon-cyan/20'
                    : 'bg-titanium-950/70 border-white/10 hover:border-white/20 text-slate-300'
                }`}
              >
                <div className="text-xs font-semibold">{opt.label}</div>
                <div className="text-[11px] font-mono text-slate-400">
                  {opt.priceDelta === 0 ? 'Included' : `+${format(opt.priceDelta)}`}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chassis Finish / Color */}
      {laptop.config.colorOptions.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <label className="font-mono text-slate-300 font-semibold uppercase tracking-wider">
              3. Chassis Finish
            </label>
            <span className="text-cyber-cyan font-mono text-[11px]">{selectedColor}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {laptop.config.colorOptions.map((col) => (
              <button
                key={col.name}
                type="button"
                onClick={() => setSelectedColor(col.name)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium transition-all ${
                  selectedColor === col.name
                    ? 'bg-white/10 border-cyber-cyan text-white shadow-neon-cyan/20'
                    : 'bg-titanium-950/70 border-white/10 hover:border-white/20 text-slate-300'
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                  style={{ backgroundColor: col.hex }}
                />
                <span>{col.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Warranty Add-on Box */}
      <div
        onClick={() => setWarrantyOption(!warrantyOption)}
        className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
          warrantyOption
            ? 'bg-indigo-950/30 border-indigo-500/50 shadow-neon-purple/10'
            : 'bg-titanium-950/60 border-white/10'
        }`}
      >
        <div className={`mt-0.5 p-1 rounded-lg ${warrantyOption ? 'bg-indigo-500 text-white' : 'bg-white/5 text-slate-500'}`}>
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              RS Concierge 2-Year VIP Shield
            </span>
            <span className="text-xs font-mono font-bold text-cyber-cyan">
              +{format(14999)}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Includes zero-deductible accidental spill &amp; drop coverage, priority 4-hour on-site tech response, and free battery health swap.
          </p>
        </div>
      </div>

      {/* Quantity & CTAs */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-3">
          {/* Quantity selector */}
          <div className="flex items-center border border-white/15 rounded-xl bg-titanium-950 px-2 py-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1.5 text-slate-400 hover:text-white transition-colors"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-3 text-xs font-mono font-bold text-white">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(laptop.stockCount, quantity + 1))}
              className="p-1.5 text-slate-400 hover:text-white transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3.5 rounded-xl bg-titanium-800 hover:bg-titanium-700 text-white font-bold text-xs border border-white/15 hover:border-cyber-cyan/40 flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-[1.01]"
          >
            <ShoppingCart className="w-4 h-4 text-cyber-cyan" />
            <span>Add to Cart</span>
          </button>

          {/* Buy Now CTA */}
          <button
            onClick={handleBuyNow}
            className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-cyber-cyan via-cyan-400 to-indigo-600 hover:opacity-95 text-titanium-950 font-extrabold text-xs shadow-neon-cyan flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
          >
            <Zap className="w-4 h-4" />
            <span>Buy Now</span>
          </button>

          {/* Wishlist & Compare Icons */}
          <button
            onClick={() => toggleWishlist(laptop)}
            className={`p-3 rounded-xl border transition-colors ${
              isSaved ? 'bg-rose-500 text-white border-rose-500' : 'bg-titanium-950 border-white/15 text-slate-400 hover:text-white'
            }`}
            title="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => toggleCompare(laptop)}
            className={`p-3 rounded-xl border transition-colors ${
              isCompared ? 'bg-cyber-cyan text-titanium-950 border-cyber-cyan' : 'bg-titanium-950 border-white/15 text-slate-400 hover:text-white'
            }`}
            title="Compare"
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Delivery Checker */}
      <div className="p-4 rounded-2xl bg-titanium-900/40 border border-white/5 space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-semibold text-white">
          <Truck className="w-4 h-4 text-cyber-cyan" />
          <span>Check Fast Delivery &amp; Express Availability</span>
        </div>
        <form onSubmit={handleCheckPin} className="flex gap-2">
          <div className="relative flex-1">
            <MapPin className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={pinCode}
              onChange={(e) => {
                setPinCode(e.target.value);
                setPinChecked(false);
              }}
              placeholder="Enter Postal / ZIP code..."
              className="w-full bg-titanium-950 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan font-mono"
            />
          </div>
          <button
            type="submit"
            className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
          >
            Verify
          </button>
        </form>

        {pinChecked && (
          <div className="pt-2 text-xs text-emerald-400 font-mono flex items-center gap-1.5 animate-in fade-in">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Eligible for Free Next-Day Priority Delivery to <strong>{pinCode}</strong></span>
          </div>
        )}
      </div>
    </div>
  );
};
