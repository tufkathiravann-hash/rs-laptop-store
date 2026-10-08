import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Star,
  ShieldCheck,
  Zap,
  ShoppingCart,
  ArrowRight,
  Heart,
  Layers,
  Check
} from 'lucide-react';
import { Laptop } from '../../types/product';
import { SafeImage } from './SafeImage';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import { useCurrency } from '../../context/CurrencyContext';

interface QuickViewModalProps {
  laptop: Laptop | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ laptop, onClose }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, toggleCompare } = useCompare();
  const { format } = useCurrency();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedRam, setSelectedRam] = useState<string>('');
  const [selectedStorage, setSelectedStorage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  if (!laptop) return null;

  const currentRam = selectedRam || laptop.config.ramOptions[0]?.label || laptop.specs.ram;
  const currentStorage = selectedStorage || laptop.config.storageOptions[0]?.label || laptop.specs.storage;
  const currentColor = selectedColor || laptop.config.colorOptions[0]?.name || 'Standard';

  const ramDelta = laptop.config.ramOptions.find((r) => r.label === currentRam)?.priceDelta || 0;
  const storageDelta = laptop.config.storageOptions.find((s) => s.label === currentStorage)?.priceDelta || 0;
  const extraPrice = ramDelta + storageDelta;
  const finalPrice = laptop.price + extraPrice;

  const isSaved = isInWishlist(laptop.id);
  const isCompared = isInCompare(laptop.id);

  const handleAddToCart = () => {
    addToCart(
      laptop,
      currentRam,
      currentStorage,
      currentColor,
      laptop.specs.gpu,
      extraPrice,
      1
    );
    onClose();
  };

  const handleViewFullPage = () => {
    onClose();
    navigate(`/product/${laptop.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-titanium-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-3xl bg-titanium-900 border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-titanium-950/80 hover:bg-titanium-800 rounded-xl border border-white/10 transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Gallery */}
          <div className="p-6 bg-titanium-950 flex flex-col justify-between items-center border-b md:border-b-0 md:border-r border-white/10">
            <div className="w-full flex-1 flex items-center justify-center min-h-[220px]">
              <SafeImage
                src={laptop.images[activeImageIndex] || laptop.images[0]}
                alt={laptop.name}
                className="max-h-[260px] max-w-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]"
              />
            </div>

            {/* Thumbnail selector */}
            <div className="flex gap-2 mt-4">
              {laptop.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-12 h-12 rounded-lg bg-titanium-900 border overflow-hidden transition-all ${
                    activeImageIndex === idx
                      ? 'border-cyber-cyan shadow-neon-cyan/40 scale-105'
                      : 'border-white/10 hover:border-white/30 opacity-70'
                  }`}
                >
                  <SafeImage src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Product Overview & Configuration */}
          <div className="p-6 flex flex-col justify-between space-y-4 max-h-[80vh] overflow-y-auto">
            <div>
              {/* Brand & Category & Rating */}
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-mono font-bold text-cyber-cyan uppercase">
                  {laptop.brand} • {laptop.category}
                </span>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold text-slate-200">{laptop.rating}</span>
                  <span className="text-slate-500 text-[10px]">({laptop.reviewCount})</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white leading-snug">
                {laptop.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                {laptop.description}
              </p>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white font-mono">
                  {format(finalPrice)}
                </span>
                {laptop.originalPrice > laptop.price && (
                  <span className="text-sm text-slate-500 line-through font-mono">
                    {format(laptop.originalPrice)}
                  </span>
                )}
                {laptop.discountPercentage > 0 && (
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Save {laptop.discountPercentage}%
                  </span>
                )}
              </div>

              {/* Memory Configuration */}
              {laptop.config.ramOptions.length > 1 && (
                <div className="mt-3.5 space-y-1.5">
                  <label className="text-xs font-mono text-slate-400 block">
                    Memory (RAM)
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {laptop.config.ramOptions.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => setSelectedRam(opt.label)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                          currentRam === opt.label
                            ? 'bg-cyber-cyan text-titanium-950 font-bold shadow-neon-cyan/40'
                            : 'bg-titanium-950 text-slate-300 border border-white/10 hover:border-white/30'
                        }`}
                      >
                        {opt.label} {opt.priceDelta > 0 && `(+${format(opt.priceDelta)})`}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Storage Configuration */}
              {laptop.config.storageOptions.length > 1 && (
                <div className="mt-3 space-y-1.5">
                  <label className="text-xs font-mono text-slate-400 block">
                    Solid-State Storage (SSD)
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {laptop.config.storageOptions.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => setSelectedStorage(opt.label)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                          currentStorage === opt.label
                            ? 'bg-cyber-cyan text-titanium-950 font-bold shadow-neon-cyan/40'
                            : 'bg-titanium-950 text-slate-300 border border-white/10 hover:border-white/30'
                        }`}
                      >
                        {opt.label} {opt.priceDelta > 0 && `(+${format(opt.priceDelta)})`}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions & Footer CTAs */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-indigo-600 hover:opacity-95 text-titanium-950 font-bold text-xs shadow-neon-cyan flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Bag ({format(finalPrice)})</span>
                </button>
                <button
                  onClick={() => toggleWishlist(laptop)}
                  className={`p-2.5 rounded-xl border transition-colors ${
                    isSaved
                      ? 'bg-rose-500 text-white border-rose-500'
                      : 'bg-titanium-950 text-slate-400 hover:text-white border-white/10'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => toggleCompare(laptop)}
                  className={`p-2.5 rounded-xl border transition-colors ${
                    isCompared
                      ? 'bg-cyber-cyan text-titanium-950 border-cyber-cyan'
                      : 'bg-titanium-950 text-slate-400 hover:text-white border-white/10'
                  }`}
                  title="Compare"
                >
                  <Layers className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleViewFullPage}
                className="w-full py-2 text-center text-xs font-semibold text-slate-400 hover:text-cyber-cyan transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View Full Specifications &amp; Benchmarks</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
