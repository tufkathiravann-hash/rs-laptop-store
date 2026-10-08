import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  ShieldCheck,
  Zap,
  Truck,
  RotateCcw,
  Headphones,
  CheckCircle2,
  ChevronRight,
  Share2,
  Heart,
  Layers,
  Sparkles,
  ArrowRight,
  Flame
} from 'lucide-react';
import { LAPTOPS_DATA } from '../data/laptops';
import { ProductGallery } from '../components/product/ProductGallery';
import { Configurator } from '../components/product/Configurator';
import { ProductSpecTable } from '../components/product/ProductSpecTable';
import { BenchmarkBars } from '../components/product/BenchmarkBars';
import { EmiCalculator } from '../components/product/EmiCalculator';
import { ReviewSection } from '../components/product/ReviewSection';
import { RelatedProducts } from '../components/product/RelatedProducts';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useToast } from '../context/ToastContext';
import { useCurrency } from '../context/CurrencyContext';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { format } = useCurrency();

  const [activeTab, setActiveTab] = useState<'specs' | 'benchmarks' | 'emi' | 'reviews'>('specs');

  const laptop = LAPTOPS_DATA.find((l) => l.id === id || l.slug === id) || LAPTOPS_DATA[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied', 'Product link copied to your clipboard.', 'info');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10 min-h-screen bg-black text-white"
    >
      {/* Breadcrumbs */}
      <div className="flex items-center justify-between">
        <Breadcrumbs
          items={[
            { label: 'Laptops', to: '/laptops' },
            { label: laptop.category.toUpperCase(), to: `/laptops?category=${laptop.category}` },
            { label: laptop.name }
          ]}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="p-2 rounded-xl bg-titanium-900 hover:bg-titanium-800 text-slate-300 hover:text-white border border-white/10 text-xs flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Share2 className="w-3.5 h-3.5 text-red-500" />
          <span className="hidden sm:inline">Share Rig</span>
        </motion.button>
      </div>

      {/* Main Top Section: Gallery (Left) + Configurator (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Gallery */}
        <div className="lg:col-span-7 space-y-6">
          <ProductGallery
            images={laptop.images}
            productName={laptop.name}
            isNew={laptop.isNew}
            isFlashDeal={laptop.isFlashDeal}
          />

          {/* Highlights bullet badges */}
          <div className="p-6 rounded-3xl bg-titanium-900/80 border border-white/15 space-y-3 shadow-xl">
            <span className="text-xs font-mono text-red-500 font-bold uppercase tracking-wider block">
              Flagship Engineering Highlights
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              {laptop.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                  <span className="font-medium text-white">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Configurator */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header Title & Rating */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="font-bold text-red-500 uppercase">{laptop.brand}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400 uppercase">{laptop.category} Fleet</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug font-display">
              {laptop.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {laptop.description}
            </p>

            <div className="flex items-center gap-2 pt-1">
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-white font-mono">{laptop.rating}</span>
              <span className="text-xs text-slate-400">({laptop.reviewCount} verified reviews)</span>
            </div>
          </div>

          {/* Configurator Component */}
          <Configurator laptop={laptop} />
        </div>
      </div>

      {/* Structured Details Tabs: Specs / Benchmarks / EMI / Reviews */}
      <div className="pt-8 border-t border-white/10 space-y-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 relative">
          {[
            { id: 'specs', label: 'Full Technical Specs' },
            { id: 'benchmarks', label: 'Silicon Benchmarks' },
            { id: 'emi', label: '0% EMI Financing' },
            { id: 'reviews', label: `Customer Reviews (${laptop.reviewCount})` }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative px-6 py-3 rounded-2xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'text-white'
                    : 'bg-titanium-900/60 hover:bg-titanium-800 text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="detailTabActive"
                    className="absolute inset-0 bg-red-600 rounded-2xl shadow-neon-red -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'specs' && <ProductSpecTable laptop={laptop} />}
            {activeTab === 'benchmarks' && (
              <BenchmarkBars benchmarks={laptop.benchmarks} laptopName={laptop.name} />
            )}
            {activeTab === 'emi' && <EmiCalculator price={laptop.price} />}
            {activeTab === 'reviews' && (
              <ReviewSection
                laptopId={laptop.id}
                rating={laptop.rating}
                reviewCount={laptop.reviewCount}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Related Products */}
      <div className="pt-10 border-t border-white/10">
        <RelatedProducts currentLaptop={laptop} />
      </div>
    </motion.div>
  );
};
