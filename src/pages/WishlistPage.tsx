import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { LAPTOPS_DATA } from '../data/laptops';
import { ProductCard } from '../components/product/ProductCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useToast } from '../context/ToastContext';

export const WishlistPage: React.FC = () => {
  const { wishlistIds, clearWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const savedLaptops = LAPTOPS_DATA.filter((l) => wishlistIds.includes(l.id));

  const handleMoveAllToCart = () => {
    savedLaptops.forEach((laptop) => {
      addToCart(laptop);
    });
    clearWishlist();
    showToast('All Items Moved', 'All saved machines have been added to your cart.', 'success');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 min-h-screen bg-black text-white"
    >
      <Breadcrumbs items={[{ label: 'Saved Wishlist' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-red-500 mb-1 uppercase tracking-wider font-bold">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Saved Hardware</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-display">
            Your Wishlist ({savedLaptops.length}).
          </h1>
        </div>

        {savedLaptops.length > 0 && (
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleMoveAllToCart}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-neon-red flex items-center gap-2 transition-all"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Move All to Cart</span>
            </motion.button>
            <button
              onClick={clearWishlist}
              className="px-4 py-2.5 rounded-xl bg-titanium-900 hover:bg-titanium-800 text-slate-400 hover:text-red-500 border border-white/15 text-xs flex items-center gap-1.5 transition-colors font-mono font-bold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        )}
      </div>

      {savedLaptops.length === 0 ? (
        <div className="max-w-md mx-auto py-16 text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-titanium-900 border border-white/10 flex items-center justify-center mx-auto text-red-500 shadow-xl">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">Your Wishlist is Empty</h3>
          <p className="text-xs text-slate-400">
            Save laptops while browsing by clicking the heart icon on any card to compare and purchase later.
          </p>
          <Link
            to="/laptops"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-neon-red transition-all"
          >
            <span>Explore Laptop Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {savedLaptops.map((laptop) => (
              <motion.div
                key={laptop.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
              >
                <ProductCard laptop={laptop} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
};
