import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Laptop, LaptopCategory } from '../../types/product';
import { LAPTOPS_DATA } from '../../data/laptops';
import { ProductCard } from '../product/ProductCard';
import { QuickViewModal } from '../common/QuickViewModal';
import { Sparkles, ArrowRight } from 'lucide-react';

export const FeaturedSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | LaptopCategory>('all');
  const [quickViewLaptop, setQuickViewLaptop] = useState<Laptop | null>(null);

  const tabs: { label: string; value: 'all' | LaptopCategory }[] = [
    { label: 'All Flagships', value: 'all' },
    { label: 'Gaming Rigs', value: 'gaming' },
    { label: 'Ultrabooks', value: 'ultrabook' },
    { label: 'Creator Studio', value: 'creator' },
    { label: 'Workstations', value: 'performance' },
    { label: 'Student Edition', value: 'student' }
  ];

  const filteredLaptops = activeTab === 'all'
    ? LAPTOPS_DATA.filter((l) => l.isFeatured || l.isBestSeller).slice(0, 6)
    : LAPTOPS_DATA.filter((l) => l.category === activeTab).slice(0, 6);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyber-cyan mb-1 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Excellence</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-display">
            Featured Hardware Fleet.
          </h2>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
                activeTab === tab.value
                  ? 'bg-red-600 text-white font-bold shadow-neon-red scale-105'
                  : 'bg-titanium-900/60 hover:bg-titanium-800 text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid with AnimatePresence */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredLaptops.map((laptop) => (
            <motion.div
              layout
              key={laptop.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
            >
              <ProductCard
                laptop={laptop}
                onQuickView={(l) => setQuickViewLaptop(l)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* View more CTA */}
      <div className="text-center pt-4">
        <Link
          to={`/laptops${activeTab !== 'all' ? `?category=${activeTab}` : ''}`}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-titanium-900 hover:bg-titanium-800 border border-white/10 hover:border-cyber-cyan/40 text-xs font-mono font-bold text-white transition-all shadow-lg hover:scale-105 active:scale-95"
        >
          <span>Explore Entire {activeTab === 'all' ? '30+' : activeTab.toUpperCase()} Catalog</span>
          <ArrowRight className="w-4 h-4 text-cyber-cyan" />
        </Link>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        laptop={quickViewLaptop}
        onClose={() => setQuickViewLaptop(null)}
      />
    </section>
  );
};
