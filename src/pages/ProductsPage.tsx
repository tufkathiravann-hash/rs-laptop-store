import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter,
  Grid,
  List,
  Search,
  X,
  RotateCcw,
  SlidersHorizontal,
  Star,
  Check,
  ChevronDown,
  Sparkles,
  Laptop as LaptopIcon,
  Flame,
  ArrowRight
} from 'lucide-react';
import { Laptop, LaptopCategory } from '../types/product';
import { LAPTOPS_DATA } from '../data/laptops';
import { CATEGORIES_DATA } from '../data/categories';
import { ProductCard } from '../components/product/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SafeImage } from '../components/common/SafeImage';
import { useCurrency } from '../context/CurrencyContext';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { format } = useCurrency();

  // Filter States
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const cat = searchParams.get('category');
    return cat ? [cat] : [];
  });
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(450000);
  const [selectedRams, setSelectedRams] = useState<string[]>([]);
  const [selectedGpus, setSelectedGpus] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);

  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quickViewLaptop, setQuickViewLaptop] = useState<Laptop | null>(null);

  // Sync category param from URL if changed
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && !selectedCategories.includes(cat)) {
      setSelectedCategories([cat]);
    }
    const search = searchParams.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  // Available brand options
  const allBrands = ['Apple', 'ASUS', 'Razer', 'Dell', 'Lenovo', 'HP', 'Acer', 'MSI', 'Framework', 'Samsung'];
  const allRams = ['16GB', '32GB', '48GB', '64GB'];
  const allGpus = ['RTX 4090', 'RTX 4080', 'RTX 4070', 'Apple GPU', 'Intel Arc', 'Radeon'];

  // Toggle helpers
  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleRam = (ram: string) => {
    setSelectedRams((prev) =>
      prev.includes(ram) ? prev.filter((r) => r !== ram) : [...prev, ram]
    );
  };

  const toggleGpu = (gpu: string) => {
    setSelectedGpus((prev) =>
      prev.includes(gpu) ? prev.filter((g) => g !== gpu) : [...prev, gpu]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMaxPrice(450000);
    setSelectedRams([]);
    setSelectedGpus([]);
    setMinRating(0);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setSearchParams({});
  };

  // Filter and Sort Engine
  const filteredLaptops = useMemo(() => {
    return LAPTOPS_DATA.filter((laptop) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = laptop.name.toLowerCase().includes(q);
        const matchBrand = laptop.brand.toLowerCase().includes(q);
        const matchCPU = laptop.specs.processor.toLowerCase().includes(q);
        const matchGPU = laptop.specs.gpu.toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchCPU && !matchGPU) return false;
      }

      // 2. Category
      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(laptop.category)) return false;
      }

      // 3. Brand
      if (selectedBrands.length > 0) {
        if (!selectedBrands.includes(laptop.brand)) return false;
      }

      // 4. Max Price
      if (laptop.price > maxPrice) return false;

      // 5. RAM
      if (selectedRams.length > 0) {
        const hasRam = selectedRams.some((r) => laptop.specs.ram.includes(r));
        if (!hasRam) return false;
      }

      // 6. GPU
      if (selectedGpus.length > 0) {
        const hasGpu = selectedGpus.some((g) => laptop.specs.gpu.includes(g));
        if (!hasGpu) return false;
      }

      // 7. Rating
      if (minRating > 0 && laptop.rating < minRating) return false;

      // 8. Stock & Deals
      if (inStockOnly && !laptop.inStock) return false;
      if (onSaleOnly && laptop.originalPrice <= laptop.price) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'popular') return b.reviewCount - a.reviewCount;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // 'featured' default
    });
  }, [
    searchQuery,
    selectedCategories,
    selectedBrands,
    maxPrice,
    selectedRams,
    selectedGpus,
    minRating,
    inStockOnly,
    onSaleOnly,
    sortBy
  ]);

  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    selectedCategories.length +
    selectedBrands.length +
    (maxPrice < 450000 ? 1 : 0) +
    selectedRams.length +
    selectedGpus.length +
    (minRating > 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (onSaleOnly ? 1 : 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-screen bg-black text-white w-full max-w-full overflow-x-clip"
    >
      {/* Breadcrumb */}
      <Breadcrumbs items={[{ label: 'Catalog & Laptops' }]} />

      {/* Catalog Header Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-red-950/60 via-titanium-900/90 to-black border border-red-500/30 p-6 sm:p-10 overflow-hidden shadow-2xl space-y-4 w-full max-w-full">
        <div className="max-w-2xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/15 border border-red-500/30 text-xs font-mono text-red-500 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>2026 CERTIFIED FLEET</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            High-Performance Laptops.
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Browse and configure our verified collection of RTX 4090 gaming monsters, Apple M3 Max creative workstations, and ultra-thin titanium ultrabooks.
          </p>
        </div>

        {/* Quick Category Selector Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 relative z-10 w-full max-w-full">

          <button
            onClick={() => setSelectedCategories([])}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shrink-0 ${
              selectedCategories.length === 0
                ? 'bg-red-600 text-white shadow-neon-red'
                : 'bg-black/60 text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            All Hardware ({LAPTOPS_DATA.length})
          </button>
          {CATEGORIES_DATA.map((c) => (
            <button
              key={c.id}
              onClick={() => toggleCategory(c.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shrink-0 ${
                selectedCategories.includes(c.id)
                  ? 'bg-red-600 text-white shadow-neon-red'
                  : 'bg-black/60 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {c.name} ({c.laptopCount})
            </button>
          ))}
        </div>
      </div>

      {/* Control Bar: Search input, Sort selector, View toggle */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-titanium-900/80 border border-white/15">
        {/* Search within page */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search within 30+ laptops, GPUs, specs..."
            className="w-full bg-black border border-white/15 rounded-xl pl-10 pr-9 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-slate-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right Sort & View toggles */}
        <div className="flex items-center gap-3 justify-between sm:justify-end">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden px-3.5 py-2 rounded-xl bg-titanium-950 border border-white/15 text-xs font-mono text-white flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-red-500" />
            <span>Filters ({activeFiltersCount})</span>
          </button>

          {/* Sort selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400 hidden md:inline">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-black border border-white/15 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-red-500 font-mono"
            >
              <option value="featured">Featured Hardware</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated (★ 4.8+)</option>
              <option value="popular">Most Popular</option>
              <option value="newest">Newest Releases</option>
            </select>
          </div>

          {/* View mode toggle */}
          <div className="flex items-center p-1 rounded-xl bg-black border border-white/15">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View"
              aria-label="Grid view"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="List View"
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Pills Bar */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
          <span className="text-slate-500 font-mono text-[11px] font-bold">ACTIVE FILTERS:</span>

          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-600/15 border border-red-500/30 text-red-400 font-mono text-[11px]">
              Search: "{searchQuery}"
              <button onClick={() => setSearchQuery('')}><X className="w-3 h-3" /></button>
            </span>
          )}

          {selectedCategories.map((c) => (
            <span key={c} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 border border-white/20 text-white font-mono text-[11px]">
              {CATEGORIES_DATA.find((cat) => cat.id === c)?.name || c}
              <button onClick={() => toggleCategory(c)}><X className="w-3 h-3" /></button>
            </span>
          ))}

          {selectedBrands.map((b) => (
            <span key={b} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 border border-white/20 text-white font-mono text-[11px]">
              {b}
              <button onClick={() => toggleBrand(b)}><X className="w-3 h-3" /></button>
            </span>
          ))}

          {maxPrice < 450000 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 border border-white/20 text-white font-mono text-[11px]">
              Max: {format(maxPrice)}
              <button onClick={() => setMaxPrice(450000)}><X className="w-3 h-3" /></button>
            </span>
          )}

          {selectedRams.map((r) => (
            <span key={r} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 border border-white/20 text-white font-mono text-[11px]">
              RAM: {r}
              <button onClick={() => toggleRam(r)}><X className="w-3 h-3" /></button>
            </span>
          ))}

          {selectedGpus.map((g) => (
            <span key={g} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 border border-white/20 text-white font-mono text-[11px]">
              GPU: {g}
              <button onClick={() => toggleGpu(g)}><X className="w-3 h-3" /></button>
            </span>
          ))}

          {minRating > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 border border-white/20 text-white font-mono text-[11px]">
              {minRating}+ Stars
              <button onClick={() => setMinRating(0)}><X className="w-3 h-3" /></button>
            </span>
          )}

          <button
            onClick={clearAllFilters}
            className="text-[11px] text-red-500 hover:underline font-mono ml-2 font-bold"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 p-5 rounded-3xl bg-titanium-900/80 border border-white/15 shadow-xl sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-red-500" />
              <span>Hardware Filters</span>
            </h3>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-[11px] text-slate-400 hover:text-red-500 flex items-center gap-1 font-mono"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="space-y-2.5">
            <label className="text-xs font-mono text-slate-400 block uppercase tracking-wider font-bold">
              Category
            </label>
            <div className="space-y-1.5">
              {CATEGORIES_DATA.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center justify-between text-xs text-slate-300 hover:text-white cursor-pointer select-none py-0.5"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() => toggleCategory(cat.id)}
                      className="rounded border-white/20 bg-black text-red-600 focus:ring-red-500"
                    />
                    <span>{cat.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    {cat.laptopCount}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2.5 pt-4 border-t border-white/10">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400 uppercase tracking-wider font-bold">Max Budget</span>
              <span className="text-red-500 font-bold">{format(maxPrice)}</span>
            </div>
            <input
              type="range"
              min="60000"
              max="450000"
              step="10000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1.5 bg-black rounded-lg appearance-none cursor-pointer accent-red-600"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>{format(60000)}</span>
              <span>{format(450000)}</span>
            </div>
          </div>

          {/* Brand Filter */}
          <div className="space-y-2.5 pt-4 border-t border-white/10">
            <label className="text-xs font-mono text-slate-400 block uppercase tracking-wider font-bold">
              Manufacturer
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {allBrands.map((brand) => (
                <button
                  key={brand}
                  type="button"
                  onClick={() => toggleBrand(brand)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-mono transition-all text-left truncate ${
                    selectedBrands.includes(brand)
                      ? 'bg-red-600 text-white font-bold shadow-neon-red'
                      : 'bg-black border border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* RAM Filter */}
          <div className="space-y-2.5 pt-4 border-t border-white/10">
            <label className="text-xs font-mono text-slate-400 block uppercase tracking-wider font-bold">
              Memory (RAM)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {allRams.map((ram) => (
                <button
                  key={ram}
                  type="button"
                  onClick={() => toggleRam(ram)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-mono transition-all ${
                    selectedRams.includes(ram)
                      ? 'bg-red-600 text-white font-bold shadow-neon-red'
                      : 'bg-black border border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {ram}
                </button>
              ))}
            </div>
          </div>

          {/* GPU Filter */}
          <div className="space-y-2.5 pt-4 border-t border-white/10">
            <label className="text-xs font-mono text-slate-400 block uppercase tracking-wider font-bold">
              Graphics (GPU)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {allGpus.map((gpu) => (
                <button
                  key={gpu}
                  type="button"
                  onClick={() => toggleGpu(gpu)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-mono transition-all ${
                    selectedGpus.includes(gpu)
                      ? 'bg-red-600 text-white font-bold shadow-neon-red'
                      : 'bg-black border border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {gpu}
                </button>
              ))}
            </div>
          </div>

          {/* Rating filter */}
          <div className="space-y-2.5 pt-4 border-t border-white/10">
            <label className="text-xs font-mono text-slate-400 block uppercase tracking-wider font-bold">
              Customer Rating
            </label>
            <div className="space-y-1">
              {[4.8, 4.5].map((val) => (
                <label
                  key={val}
                  className="flex items-center gap-2 text-xs text-slate-300 hover:text-white cursor-pointer py-0.5"
                >
                  <input
                    type="radio"
                    name="minRating"
                    checked={minRating === val}
                    onChange={() => setMinRating(minRating === val ? 0 : val)}
                    className="border-white/20 bg-black text-red-600"
                  />
                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{val}+ Stars Only</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-2 pt-4 border-t border-white/10">
            <label className="flex items-center gap-2 text-xs text-slate-300 hover:text-white cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded border-white/20 bg-black text-red-600"
              />
              <span>In-Stock Ready to Ship</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-slate-300 hover:text-white cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={onSaleOnly}
                onChange={(e) => setOnSaleOnly(e.target.checked)}
                className="rounded border-white/20 bg-black text-red-600"
              />
              <span>Discounted &amp; Deals Only</span>
            </label>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-9 space-y-6">
          {filteredLaptops.length === 0 ? (
            <div className="text-center py-20 rounded-3xl bg-titanium-900/60 border border-white/10 p-8 space-y-4 shadow-xl">
              <LaptopIcon className="w-12 h-12 text-red-500 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">No machines match your criteria</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Try widening your price range, clearing specific hardware filters, or search terms.
                </p>
              </div>
              <button
                onClick={clearAllFilters}
                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-neon-red transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredLaptops.map((laptop) => (
                  <motion.div
                    key={laptop.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ProductCard
                      laptop={laptop}
                      onQuickView={(l) => setQuickViewLaptop(l)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredLaptops.map((laptop) => (
                <motion.div
                  key={laptop.id}
                  layout
                  className="p-5 rounded-3xl bg-titanium-900/80 hover:bg-titanium-800 border border-white/15 hover:border-red-500/40 flex flex-col md:flex-row items-center gap-6 transition-all group shadow-xl"
                >
                  <Link to={`/product/${laptop.id}`} className="w-full md:w-52 aspect-[16/11] bg-black rounded-2xl p-3 flex items-center justify-center shrink-0 border border-white/10">
                    <SafeImage
                      src={laptop.images[0]}
                      alt={laptop.name}
                      className="max-h-full max-w-full object-contain filter drop-shadow group-hover:scale-105 transition-transform"
                    />
                  </Link>

                  <div className="flex-1 space-y-2 w-full">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-red-500 font-mono font-bold uppercase">
                        {laptop.brand} • {laptop.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-white">{laptop.rating}</span>
                        <span className="text-slate-400">({laptop.reviewCount})</span>
                      </div>
                    </div>

                    <Link
                      to={`/product/${laptop.id}`}
                      className="text-lg font-bold text-white hover:text-red-500 transition-colors block"
                    >
                      {laptop.name}
                    </Link>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {laptop.description}
                    </p>

                    <div className="flex flex-wrap gap-2 text-[11px] font-mono text-slate-300 pt-1">
                      <span className="px-2.5 py-1 rounded-lg bg-black border border-white/10">
                        {laptop.specs.processor}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-black border border-white/10">
                        {laptop.specs.gpu}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-black border border-white/10">
                        {laptop.specs.ram}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0 flex flex-col items-end gap-2 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-white/10">
                    <div>
                      <div className="text-xl font-black text-white font-mono">{format(laptop.price)}</div>
                      {laptop.originalPrice > laptop.price && (
                        <div className="text-xs text-slate-500 line-through font-mono">{format(laptop.originalPrice)}</div>
                      )}
                    </div>
                    <Link
                      to={`/product/${laptop.id}`}
                      className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-neon-red transition-all flex items-center gap-1.5"
                    >
                      <span>Configure &amp; Buy</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        laptop={quickViewLaptop}
        onClose={() => setQuickViewLaptop(null)}
      />
    </motion.div>
  );
};
