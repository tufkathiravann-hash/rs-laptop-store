import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Home, Search, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
      <div className="max-w-lg mx-auto p-8 sm:p-12 rounded-3xl bg-titanium-900/60 border border-white/10 space-y-4 shadow-2xl">
        <span className="text-6xl font-extrabold font-mono text-cyber-cyan block">404</span>
        <h1 className="text-2xl font-bold text-white">Hardware Vector Not Found</h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          The requested URL does not match any current chassis allocation or product page in our catalog.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link
            to="/"
            className="px-6 py-2.5 rounded-xl bg-cyber-cyan text-titanium-950 font-bold text-xs shadow-neon-cyan flex items-center justify-center gap-2 transition-all hover:bg-cyan-300"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/laptops"
            className="px-6 py-2.5 rounded-xl bg-titanium-950 hover:bg-titanium-800 text-white border border-white/10 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Laptop className="w-4 h-4" />
            <span>Browse All Laptops</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
