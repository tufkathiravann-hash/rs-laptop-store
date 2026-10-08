import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Laptop,
  Mail,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Check,
  Send,
  Twitter,
  Instagram,
  Youtube,
  Github,
  Linkedin,
  Lock
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@') || !newsletterEmail.includes('.')) {
      showToast('Invalid Email', 'Please enter a valid email address.', 'warning');
      return;
    }
    setIsSubscribed(true);
    showToast('VIP Access Granted', 'You are now subscribed to RS Private Drops and Tech Insights.', 'success');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-titanium-950 border-t border-white/10 text-slate-400 text-sm relative z-20 overflow-hidden">
      {/* Glow gradient backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyber-cyan/5 blur-3xl pointer-events-none rounded-full" />

      {/* Trust Badges Strip */}
      <div className="border-b border-white/5 bg-titanium-900/40 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">100% Genuine Certified</h4>
              <p className="text-xs text-slate-400">Direct factory warranty & verification</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">White-Glove Express</h4>
              <p className="text-xs text-slate-400">Next-day insured delivery available</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyber-purple/10 border border-cyber-purple/30 flex items-center justify-center text-cyber-purple shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">30-Day Zero-Risk Return</h4>
              <p className="text-xs text-slate-400">Hassle-free swap or 100% refund</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">24/7 Tech Concierge</h4>
              <p className="text-xs text-slate-400">Expert engineering hardware advice</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-cyan via-indigo-500 to-cyber-purple p-[1.5px]">
                <div className="w-full h-full bg-titanium-950 rounded-[10px] flex items-center justify-center">
                  <Laptop className="w-5 h-5 text-cyber-cyan" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold tracking-tight text-white">
                  RS LAPTOPS
                </span>
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                  Pinnacle Engineering
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              RS Laptops curates and delivers the world's most sophisticated mobile computing hardware. From liquid-metal cooled RTX 4090 flagships to fanless aerospace titanium ultrabooks, we build and deliver the future.
            </p>

            {/* Newsletter Subscription */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                Subscribe for Private Drops & VIP Perks
              </span>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-md">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your VIP email..."
                    className="w-full bg-titanium-900 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-cyber-cyan hover:bg-cyan-300 text-titanium-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-neon-cyan/50"
                >
                  <span>{isSubscribed ? 'Joined' : 'Join'}</span>
                  {isSubscribed ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </form>
              {isSubscribed && (
                <p className="text-xs text-cyber-cyan font-mono">
                  ✓ Successfully subscribed! Check your inbox for your 10% welcome coupon.
                </p>
              )}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-cyber-cyan/20 border border-white/5 hover:border-cyber-cyan/40 flex items-center justify-center text-slate-400 hover:text-cyber-cyan transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-rose-500/20 border border-white/5 hover:border-rose-500/40 flex items-center justify-center text-slate-400 hover:text-rose-400 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 border border-white/5 hover:border-red-500/40 flex items-center justify-center text-slate-400 hover:text-red-400 transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/20 border border-white/5 hover:border-white/40 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-indigo-500/20 border border-white/5 hover:border-indigo-500/40 flex items-center justify-center text-slate-400 hover:text-indigo-400 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
              Hardware
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/laptops?category=gaming" className="hover:text-cyber-cyan transition-colors">
                  Flagship Gaming Rigs
                </Link>
              </li>
              <li>
                <Link to="/laptops?category=ultrabook" className="hover:text-cyber-cyan transition-colors">
                  CNC Titanium Ultrabooks
                </Link>
              </li>
              <li>
                <Link to="/laptops?category=creator" className="hover:text-cyber-cyan transition-colors">
                  Creator Studio &amp; 4K OLED
                </Link>
              </li>
              <li>
                <Link to="/laptops?category=business" className="hover:text-cyber-cyan transition-colors">
                  Enterprise Business Elite
                </Link>
              </li>
              <li>
                <Link to="/laptops?category=performance" className="hover:text-cyber-cyan transition-colors">
                  Modular Workstations
                </Link>
              </li>
              <li>
                <Link to="/laptops?category=student" className="hover:text-cyber-cyan transition-colors">
                  Student Campus Edition
                </Link>
              </li>
              <li>
                <Link to="/deals" className="hover:text-amber-400 font-medium transition-colors">
                  ⚡ Flash Deals &amp; Specials
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
              VIP Support
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/contact" className="hover:text-cyber-cyan transition-colors">
                  Track Existing Order
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyber-cyan transition-colors">
                  RS Care Warranty Claim
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyber-cyan transition-colors">
                  Return &amp; Exchange Portal
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-cyber-cyan transition-colors">
                  Laptop Spec Comparator
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyber-cyan transition-colors">
                  Global Service Centers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyber-cyan transition-colors">
                  Enterprise Fleet Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Trust */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
              The Firm
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/about" className="hover:text-cyber-cyan transition-colors">
                  About RS Heritage
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyber-cyan transition-colors">
                  Innovation &amp; Labs
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyber-cyan transition-colors">
                  Sustainable Hardware
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyber-cyan transition-colors">
                  RS Flagship Showrooms
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyber-cyan transition-colors">
                  Contact Concierge
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-Bit SSL Encrypted Checkout • PCI-DSS Level 1 Certified</span>
          </div>

          <div className="text-center md:text-right">
            <span>© 2026 RS LAPTOPS INC. All rights reserved. Crafted for extreme performance.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
