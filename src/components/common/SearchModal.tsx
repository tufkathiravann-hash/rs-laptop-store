import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  Laptop,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  Tag
} from 'lucide-react';
import { useSearch } from '../../context/SearchContext';
import { useCurrency } from '../../context/CurrencyContext';
import { LAPTOPS_DATA } from '../../data/laptops';
import { SafeImage } from './SafeImage';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, searchQuery, setSearchQuery } = useSearch();
  const { format } = useCurrency();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const [recentSearches, setRecentSearches] = useState<string[]>([
    'RTX 4090',
    'MacBook Pro M3 Max',
    'OLED 120Hz',
    'Framework 16'
  ]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isSearchOpen]);

  const popularTags = ['RTX 4090', 'M3 Max', 'OLED 120Hz', 'ThinkPad', 'Gaming', 'Under ₹1,50,000'];

  const filteredLaptops = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return LAPTOPS_DATA.filter((laptop) => {
      return (
        laptop.name.toLowerCase().includes(q) ||
        laptop.brand.toLowerCase().includes(q) ||
        laptop.category.toLowerCase().includes(q) ||
        laptop.specs.processor.toLowerCase().includes(q) ||
        laptop.specs.gpu.toLowerCase().includes(q) ||
        laptop.specs.display.toLowerCase().includes(q) ||
        laptop.tagline.toLowerCase().includes(q)
      );
    }).slice(0, 6);
  }, [searchQuery]);

  const handleSelectProduct = (laptopId: string) => {
    closeSearch();
    navigate(`/product/${laptopId}`);
  };

  const handleApplyTag = (tag: string) => {
    setSearchQuery(tag);
  };

  const handleViewAllResults = () => {
    closeSearch();
    navigate(`/laptops?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={closeSearch}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-titanium-900 border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 my-8"
          >
            {/* Search Header Input */}
            <div className="flex items-center px-5 py-4 border-b border-white/10 bg-black">
              <Search className="w-5 h-5 text-red-500 shrink-0 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search laptops by name, GPU, CPU, category, or spec..."
                className="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none font-medium"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    if (filteredLaptops.length > 0) {
                      handleSelectProduct(filteredLaptops[0].id);
                    } else {
                      handleViewAllResults();
                    }
                  }
                }}
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-titanium-800 rounded border border-white/10">
                  ESC
                </kbd>
              )}
            </div>

            {/* Popular Tags */}
            <div className="px-5 py-3 bg-titanium-950/80 border-b border-white/5 flex items-center gap-2 overflow-x-auto text-xs">
              <span className="text-[11px] font-mono text-slate-400 font-bold shrink-0">TRENDING:</span>
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleApplyTag(tag)}
                  className="px-2.5 py-1 rounded-lg bg-titanium-900 hover:bg-titanium-800 text-slate-300 hover:text-red-400 text-[11px] font-mono whitespace-nowrap transition-colors border border-white/5"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Search Results / Suggestion Body */}
            <div className="p-5 max-h-[60vh] overflow-y-auto space-y-4">
              {searchQuery.trim() ? (
                filteredLaptops.length > 0 ? (
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                      Matching Machines ({filteredLaptops.length})
                    </span>
                    {filteredLaptops.map((laptop) => (
                      <motion.div
                        key={laptop.id}
                        whileHover={{ scale: 1.01 }}
                        onClick={() => handleSelectProduct(laptop.id)}
                        className="p-3.5 rounded-2xl bg-black hover:bg-titanium-800 border border-white/10 hover:border-red-500/40 flex items-center justify-between cursor-pointer group transition-all"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <SafeImage
                            src={laptop.images[0]}
                            alt={laptop.name}
                            className="w-14 h-14 object-contain rounded-xl bg-titanium-950 p-1 shrink-0 border border-white/10"
                          />
                          <div className="min-w-0">
                            <span className="text-[10px] font-mono font-bold text-red-500 uppercase">
                              {laptop.brand} • {laptop.category}
                            </span>
                            <h4 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-red-400 transition-colors">
                              {laptop.name}
                            </h4>
                            <p className="text-[11px] text-slate-400 font-mono truncate">
                              {laptop.specs.processor} | {laptop.specs.gpu}
                            </p>
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-4">
                          <span className="text-xs sm:text-sm font-black text-white font-mono block">
                            {format(laptop.price)}
                          </span>
                          <span className="text-[10px] text-red-500 font-medium group-hover:translate-x-0.5 inline-flex items-center gap-0.5 transition-transform">
                            Configure &rarr;
                          </span>
                        </div>
                      </motion.div>
                    ))}

                    <button
                      onClick={handleViewAllResults}
                      className="w-full mt-3 py-3 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-400 font-mono text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5"
                    >
                      <span>View Full Catalog Results for "{searchQuery}"</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-10 space-y-2">
                    <Laptop className="w-10 h-10 text-slate-600 mx-auto" />
                    <p className="text-sm text-slate-300 font-medium">No matching laptops found</p>
                    <p className="text-xs text-slate-500">
                      Try searching with broader terms or check the filters on the catalog page.
                    </p>
                  </div>
                )
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                      Recent Popular Searches
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => handleApplyTag(s)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black border border-white/10 text-xs text-slate-300 hover:text-red-400 hover:border-red-500/40 transition-colors"
                        >
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>{s}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-black border border-white/10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Sparkles className="w-4 h-4 text-red-500" />
                      <span>Need help picking a machine? Compare specs side by side.</span>
                    </div>
                    <button
                      onClick={() => {
                        closeSearch();
                        navigate('/compare');
                      }}
                      className="text-red-400 font-bold hover:underline font-mono"
                    >
                      Open Comparator &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
