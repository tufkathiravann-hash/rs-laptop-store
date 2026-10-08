import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { LAPTOPS_DATA } from '../../data/laptops';
import { ProductCard } from '../product/ProductCard';
import { Flame, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export const BestSellersCarousel: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bestSellers = LAPTOPS_DATA.filter((l) => l.isBestSeller || l.rating >= 4.9);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-slate-100 text-black py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-200 relative z-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header & Arrow Controls */}
        <div className="flex items-end justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/20 text-xs font-mono text-red-600 mb-2 uppercase tracking-widest font-bold">
              <Flame className="w-3.5 h-3.5 text-red-600" />
              <span>Community Favorites</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight font-display">
              Best Sellers &amp; Top Rated.
            </h2>
          </div>

          {/* Carousel arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-xl bg-white hover:bg-red-600 hover:text-white border border-slate-300 text-black transition-all shadow-md"
              aria-label="Scroll carousel left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-xl bg-white hover:bg-red-600 hover:text-white border border-slate-300 text-black transition-all shadow-md"
              aria-label="Scroll carousel right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth scrollbar-none snap-x snap-mandatory"
        >
          {bestSellers.map((laptop) => (
            <div
              key={laptop.id}
              className="w-[300px] sm:w-[360px] shrink-0 snap-start"
            >
              <ProductCard laptop={laptop} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
