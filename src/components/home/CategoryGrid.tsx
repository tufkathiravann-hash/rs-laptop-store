import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Gamepad2,
  Feather,
  Palette,
  Briefcase,
  Cpu,
  GraduationCap,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { CATEGORIES_DATA } from '../../data/categories';

export const CategoryGrid: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Gamepad2':
        return <Gamepad2 className="w-5 h-5" />;
      case 'Feather':
        return <Feather className="w-5 h-5" />;
      case 'Palette':
        return <Palette className="w-5 h-5" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'GraduationCap':
      default:
        return <GraduationCap className="w-5 h-5" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="bg-white text-black py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-200 relative z-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header with Black & Red Contrast */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/20 text-xs font-mono text-red-600 mb-2 uppercase tracking-widest font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Targeted Architectures</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight font-display">
              Engineered by Category.
            </h2>
          </div>
          <Link
            to="/laptops"
            className="text-xs font-mono font-bold text-red-600 hover:text-black transition-colors flex items-center gap-1 group bg-red-50 px-4 py-2 rounded-xl border border-red-100"
          >
            <span>View All Hardware Classes</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid with Framer Motion Stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CATEGORIES_DATA.map((cat) => (
            <motion.div key={cat.id} variants={itemVariants}>
              <Link
                to={`/laptops?category=${cat.id}`}
                className="group relative h-72 rounded-3xl overflow-hidden border border-black/10 bg-black p-6 flex flex-col justify-between transition-all duration-300 hover:border-red-600 hover:shadow-2xl hover:shadow-red-950/40 block shadow-xl"
              >
                {/* Background Image with Dark Vignette Gradient */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                  style={{ backgroundImage: `url(${cat.bannerImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

                {/* Top Bar inside Card */}
                <div className="relative z-10 flex items-center justify-between">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20 transition-transform group-hover:scale-110 bg-red-600 text-white shadow-neon-red"
                  >
                    {getIcon(cat.iconName)}
                  </div>
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-black/80 text-white border border-white/20 backdrop-blur-md font-bold">
                    {cat.laptopCount} Machines
                  </span>
                </div>

                {/* Bottom Content inside Card */}
                <div className="relative z-10 space-y-1.5 text-white">
                  <div className="text-[11px] font-mono font-bold text-red-400 uppercase tracking-wider">
                    {cat.highlightSpec}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {cat.shortDesc}
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-xs text-red-400 font-bold group-hover:translate-x-1.5 transition-transform">
                    <span>Browse Collection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
