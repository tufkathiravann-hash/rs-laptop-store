import React from 'react';
import { Laptop } from '../../types/product';
import { LAPTOPS_DATA } from '../../data/laptops';
import { ProductCard } from './ProductCard';
import { Sparkles } from 'lucide-react';

interface RelatedProductsProps {
  currentLaptop: Laptop;
  onQuickView?: (laptop: Laptop) => void;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentLaptop, onQuickView }) => {
  const related = LAPTOPS_DATA.filter(
    (l) => l.id !== currentLaptop.id && (l.category === currentLaptop.category || l.brand === currentLaptop.brand)
  ).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyber-cyan" />
          <h3 className="text-lg font-bold text-white tracking-tight">
            Similar Flagships &amp; Alternatives
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((laptop) => (
          <ProductCard key={laptop.id} laptop={laptop} onQuickView={onQuickView} />
        ))}
      </div>
    </div>
  );
};
