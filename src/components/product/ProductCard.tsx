import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart,
  Layers,
  ShoppingCart,
  Star,
  Eye,
  Cpu,
  Zap,
  Check
} from 'lucide-react';
import { Laptop } from '../../types/product';
import { SafeImage } from '../common/SafeImage';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import { useCurrency } from '../../context/CurrencyContext';

interface ProductCardProps {
  laptop: Laptop;
  onQuickView?: (laptop: Laptop) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ laptop, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, toggleCompare } = useCompare();
  const { format } = useCurrency();
  const navigate = useNavigate();

  const isSaved = isInWishlist(laptop.id);
  const isCompared = isInCompare(laptop.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(laptop);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(laptop);
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(laptop);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(laptop);
    } else {
      navigate(`/product/${laptop.id}`);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group relative rounded-3xl bg-gradient-to-b from-titanium-900 via-titanium-900/80 to-black hover:from-titanium-850 hover:to-titanium-900 border border-white/10 hover:border-red-500/50 transition-colors duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-red-950/40"
      onMouseEnter={() => {
        setIsHovered(true);
        if (laptop.images.length > 1) {
          setActiveImageIndex(1);
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveImageIndex(0);
      }}
    >
      {/* Top Media / Badges Area */}
      <div className="relative aspect-[16/11] bg-black/90 overflow-hidden flex items-center justify-center p-5">
        {/* Ambient card glow */}
        <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1.5 items-start">
          {laptop.isFlashDeal && (
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-red-600 text-white tracking-wider shadow-sm">
              FLASH DROP
            </span>
          )}
          {laptop.isNew && (
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-white text-black tracking-wider font-bold">
              NEW 2026
            </span>
          )}
          {laptop.discountPercentage > 0 && !laptop.isFlashDeal && (
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-red-500/20 text-red-400 border border-red-500/30">
              -{laptop.discountPercentage}%
            </span>
          )}
        </div>

        {/* Action Floating Buttons */}
        <div className="absolute top-3.5 right-3.5 z-10 flex flex-col gap-1.5">
          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className={`p-2 rounded-xl backdrop-blur-md transition-all duration-200 ${
              isSaved
                ? 'bg-red-600 text-white shadow-lg scale-105'
                : 'bg-titanium-900/80 hover:bg-titanium-700 text-slate-400 hover:text-white border border-white/10'
            }`}
            title={isSaved ? 'Remove from saved' : 'Save to wishlist'}
            aria-label="Wishlist toggle"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          {/* Compare Button */}
          <button
            onClick={handleToggleCompare}
            className={`p-2 rounded-xl backdrop-blur-md transition-all duration-200 ${
              isCompared
                ? 'bg-red-600 text-white shadow-lg scale-105'
                : 'bg-titanium-900/80 hover:bg-titanium-700 text-slate-400 hover:text-white border border-white/10'
            }`}
            title={isCompared ? 'In comparison matrix' : 'Add to spec comparison'}
            aria-label="Compare toggle"
          >
            <Layers className="w-4 h-4" />
          </button>

          {/* Quick View Button */}
          <button
            onClick={handleQuickView}
            className="p-2 rounded-xl bg-titanium-900/80 hover:bg-titanium-700 text-slate-400 hover:text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200"
            title="Quick view specs"
            aria-label="Quick view"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Laptop Image with smooth zoom */}
        <Link to={`/product/${laptop.id}`} className="w-full h-full flex items-center justify-center z-0">
          <SafeImage
            src={laptop.images[activeImageIndex] || laptop.images[0]}
            alt={laptop.name}
            className="max-h-full max-w-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] group-hover:scale-108 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </Link>
      </div>

      {/* Card Content & Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5 z-10">
        <div>
          {/* Brand & Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-red-500 uppercase text-[11px]">
                {laptop.brand}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400 capitalize text-[11px]">
                {laptop.category}
              </span>
            </div>
            <div className="flex items-center gap-1 text-amber-400 text-xs">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-semibold text-slate-200">{laptop.rating}</span>
              <span className="text-slate-500 text-[10px]">({laptop.reviewCount})</span>
            </div>
          </div>

          {/* Laptop Title */}
          <Link
            to={`/product/${laptop.id}`}
            className="block text-sm sm:text-base font-bold text-white group-hover:text-red-500 transition-colors leading-snug line-clamp-1"
          >
            {laptop.name}
          </Link>

          {/* Key Specs Pills */}
          <div className="grid grid-cols-2 gap-1.5 mt-2.5 text-[11px] text-slate-300 font-mono">
            <div className="px-2 py-1 rounded-md bg-black/80 border border-white/5 truncate">
              {laptop.specs.processor.split('(')[0]}
            </div>
            <div className="px-2 py-1 rounded-md bg-black/80 border border-white/5 truncate">
              {laptop.specs.gpu.split('(')[0]}
            </div>
            <div className="px-2 py-1 rounded-md bg-black/80 border border-white/5 truncate">
              {laptop.specs.ram}
            </div>
            <div className="px-2 py-1 rounded-md bg-black/80 border border-white/5 truncate">
              {laptop.specs.display.split(',')[0]}
            </div>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-3.5 border-t border-white/5 flex items-center justify-between gap-2">
          <div>
            <div className="text-base sm:text-lg font-bold text-white font-mono leading-tight">
              {format(laptop.price)}
            </div>
            {laptop.originalPrice > laptop.price && (
              <div className="text-xs text-slate-500 line-through font-mono">
                {format(laptop.originalPrice)}
              </div>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-neon-red transition-all hover:scale-105 active:scale-95 shrink-0"
            title="Add to cart"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
