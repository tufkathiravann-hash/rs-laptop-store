import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Trash2,
  Plus,
  ShoppingCart,
  Check,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react';
import { useCompare } from '../context/CompareContext';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { LAPTOPS_DATA } from '../data/laptops';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SafeImage } from '../components/common/SafeImage';

export const ComparePage: React.FC = () => {
  const { compareIds, removeFromCompare, clearCompare, toggleCompare } = useCompare();
  const { addToCart } = useCart();
  const { format } = useCurrency();

  const [highlightDifferences, setHighlightDifferences] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const comparedLaptops = LAPTOPS_DATA.filter((l) => compareIds.includes(l.id));

  const compareRows = [
    { label: 'Brand & Series', key: 'brand', extract: (l: any) => `${l.brand} • ${l.category.toUpperCase()}` },
    { label: 'Starting Price', key: 'price', extract: (l: any) => format(l.price) },
    { label: 'Customer Rating', key: 'rating', extract: (l: any) => `${l.rating} / 5.0 (${l.reviewCount} reviews)` },
    { label: 'Processor (CPU)', key: 'cpu', extract: (l: any) => l.specs.processor },
    { label: 'Graphics (GPU)', key: 'gpu', extract: (l: any) => l.specs.gpu },
    { label: 'Memory (RAM)', key: 'ram', extract: (l: any) => l.specs.ram },
    { label: 'Storage (SSD)', key: 'storage', extract: (l: any) => l.specs.storage },
    { label: 'Display Panel', key: 'display', extract: (l: any) => l.specs.display },
    { label: 'Refresh Rate', key: 'refresh', extract: (l: any) => l.specs.refreshRate },
    { label: 'Battery Capacity', key: 'battery', extract: (l: any) => l.specs.battery },
    { label: 'Battery Runtime', key: 'runtime', extract: (l: any) => `${l.benchmarks.batteryLifeHours} Hours` },
    { label: 'Chassis Weight', key: 'weight', extract: (l: any) => l.specs.weight },
    { label: 'Geekbench 6 Multi', key: 'gbMulti', extract: (l: any) => `${l.benchmarks.geekbenchMulti.toLocaleString()} pts` },
    { label: 'Cinebench R23', key: 'cinebench', extract: (l: any) => `${l.benchmarks.cinebenchR23.toLocaleString()} pts` },
    { label: 'Operating System', key: 'os', extract: (l: any) => l.specs.os }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 min-h-screen bg-black text-white"
    >
      <Breadcrumbs items={[{ label: 'Laptop Comparator' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-red-500 mb-1 uppercase tracking-wider font-bold">
            <Layers className="w-3.5 h-3.5" />
            <span>Silicon &amp; Hardware Comparison</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-display">
            Side-by-Side Spec Matrix.
          </h1>
        </div>

        {comparedLaptops.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setHighlightDifferences(!highlightDifferences)}
              className={`px-4 py-2 rounded-xl border text-xs font-mono font-bold transition-all ${
                highlightDifferences
                  ? 'bg-red-600/20 border-red-500 text-red-500 shadow-neon-red/40'
                  : 'bg-titanium-900 border-white/15 text-slate-300 hover:text-white'
              }`}
            >
              Highlight Differences
            </button>
            <button
              onClick={clearCompare}
              className="px-4 py-2 rounded-xl bg-titanium-900 hover:bg-titanium-800 text-slate-400 hover:text-red-500 border border-white/15 text-xs font-mono flex items-center gap-1.5 font-bold transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Matrix</span>
            </button>
          </div>
        )}
      </div>

      {comparedLaptops.length === 0 ? (
        <div className="max-w-lg mx-auto py-16 text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-titanium-900 border border-white/10 flex items-center justify-center mx-auto text-red-500 shadow-xl">
            <Layers className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">No Laptops in Comparison Matrix</h3>
            <p className="text-xs text-slate-400">
              Select up to 4 laptops to benchmark CPU speeds, GPU wattages, battery endurance, and display panels.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-bold">
              Quick Benchmark Presets:
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => {
                  toggleCompare(LAPTOPS_DATA[0]); // SCAR 18
                  toggleCompare(LAPTOPS_DATA[1]); // Razer Blade 16
                }}
                className="px-4 py-2.5 rounded-xl bg-titanium-900 border border-white/15 text-xs font-mono font-bold text-white hover:text-red-500 hover:border-red-500/40 transition-all shadow-md"
              >
                Compare Flagship Gaming Rigs
              </button>
              <button
                onClick={() => {
                  toggleCompare(LAPTOPS_DATA[4]); // MacBook Pro 16
                  toggleCompare(LAPTOPS_DATA[6]); // Dell XPS 16
                }}
                className="px-4 py-2.5 rounded-xl bg-titanium-900 border border-white/15 text-xs font-mono font-bold text-white hover:text-red-500 hover:border-red-500/40 transition-all shadow-md"
              >
                Compare Creator Ultrabooks
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto pb-6">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 text-left text-xs font-mono text-slate-400 uppercase w-48 sticky left-0 bg-black/95 backdrop-blur-md z-10 font-bold">
                  Hardware Metric
                </th>
                {comparedLaptops.map((laptop) => (
                  <th key={laptop.id} className="p-4 text-center align-top w-64">
                    <div className="space-y-3 p-5 rounded-3xl bg-titanium-900/80 border border-white/15 relative group shadow-xl">
                      <button
                        onClick={() => removeFromCompare(laptop.id)}
                        className="absolute top-3 right-3 text-slate-500 hover:text-red-500 p-1"
                        title="Remove"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <Link to={`/product/${laptop.id}`} className="block aspect-[16/11] p-2 bg-black rounded-2xl border border-white/10">
                        <SafeImage
                          src={laptop.images[0]}
                          alt={laptop.name}
                          className="max-h-28 mx-auto object-contain filter drop-shadow group-hover:scale-105 transition-transform"
                        />
                      </Link>

                      <div>
                        <span className="text-[10px] font-mono font-bold text-red-500 uppercase">
                          {laptop.brand}
                        </span>
                        <h4 className="text-xs font-bold text-white line-clamp-1">{laptop.name}</h4>
                        <div className="text-base font-black text-white font-mono mt-1">
                          {format(laptop.price)}
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => addToCart(laptop)}
                        className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-neon-red flex items-center justify-center gap-1.5 transition-all"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </motion.button>
                    </div>
                  </th>
                ))}
                {comparedLaptops.length < 4 && (
                  <th className="p-4 text-center align-top w-64">
                    <button
                      onClick={() => setAddModalOpen(true)}
                      className="w-full h-64 rounded-3xl border-2 border-dashed border-white/20 hover:border-red-500/50 bg-titanium-900/40 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-white transition-all shadow-xl"
                    >
                      <Plus className="w-8 h-8 text-red-500" />
                      <span className="text-xs font-mono font-bold">Add Laptop Slot</span>
                    </button>
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {compareRows.map((row, idx) => {
                const values = comparedLaptops.map((l) => row.extract(l));
                const allSame = values.every((v) => v === values[0]);
                const isDifferent = !allSame && comparedLaptops.length > 1;

                return (
                  <tr
                    key={idx}
                    className={`border-b border-white/10 transition-colors ${
                      highlightDifferences && isDifferent ? 'bg-red-950/20' : 'hover:bg-white/5'
                    }`}
                  >
                    <td className="p-4 text-xs font-mono font-bold text-slate-400 sticky left-0 bg-black/95 backdrop-blur-md z-10">
                      {row.label}
                    </td>
                    {comparedLaptops.map((laptop) => (
                      <td
                        key={laptop.id}
                        className={`p-4 text-xs font-mono text-center text-slate-200 ${
                          highlightDifferences && isDifferent ? 'text-red-400 font-bold' : ''
                        }`}
                      >
                        {row.extract(laptop)}
                      </td>
                    ))}
                    {comparedLaptops.length < 4 && <td className="p-4 text-center" />}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Add laptop modal */}
      <AnimatePresence>
        {addModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-xl bg-titanium-900 border border-white/15 rounded-3xl p-6 space-y-4 max-h-[80vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="text-sm font-bold text-white">Select Laptop to Compare</h3>
                <button onClick={() => setAddModalOpen(false)}><X className="w-5 h-5 text-slate-400 hover:text-white" /></button>
              </div>
              <div className="space-y-2">
                {LAPTOPS_DATA.filter((l) => !compareIds.includes(l.id)).map((laptop) => (
                  <div
                    key={laptop.id}
                    onClick={() => {
                      toggleCompare(laptop);
                      setAddModalOpen(false);
                    }}
                    className="p-3.5 rounded-2xl bg-black hover:bg-titanium-800 border border-white/10 flex items-center justify-between cursor-pointer group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <SafeImage src={laptop.images[0]} alt="" className="w-12 h-12 object-contain" />
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-red-500">{laptop.name}</h4>
                        <p className="text-[11px] text-slate-400 font-mono">{laptop.specs.processor}</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-white font-bold">{format(laptop.price)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
