import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Mail,
  User,
  ShieldCheck,
  Sparkles,
  Zap,
  ArrowRight,
  CheckCircle2,
  Laptop,
  Flame,
  Award,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'register' ? 'register' : 'login';
  const [tab, setTab] = useState<'login' | 'register'>(initialTab);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login, register, loginAsDemo } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Invalid Email', 'Please enter a valid email address.', 'warning');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (tab === 'register') {
        if (!fullName.trim()) {
          showToast('Missing Name', 'Please enter your full legal name.', 'warning');
          setIsLoading(false);
          return;
        }
        if (password.length < 6) {
          showToast('Weak Password', 'Password must be at least 6 characters.', 'warning');
          setIsLoading(false);
          return;
        }
        register(fullName, email, password);
      } else {
        login(email, password);
      }
      setIsLoading(false);
      navigate('/account');
    }, 600);
  };

  const handleDemoClick = () => {
    loginAsDemo();
    navigate('/account');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-6 lg:p-12 relative overflow-hidden bg-black">
      {/* Laser Ambient Red & White Flares */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/20 blur-3xl pointer-events-none rounded-full"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-white/10 blur-3xl pointer-events-none rounded-full"
      />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-titanium-950/90 backdrop-blur-2xl relative z-10">
        {/* Left Column: Visual Showcase & VIP Perks Stage (Crimson Red & Black) */}
        <div className="lg:col-span-6 p-8 sm:p-12 bg-gradient-to-br from-red-950 via-red-900 to-black text-white flex flex-col justify-between space-y-8 relative overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/30 blur-3xl rounded-full pointer-events-none" />

          {/* Top Brand Tag */}
          <div className="space-y-4 relative z-10">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-rose-500 to-white p-[1.5px] shadow-neon-red">
                <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
                  <Laptop className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-xl font-bold text-white tracking-tight">RS</span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white text-black">
                    VIP CLUB
                  </span>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-slate-300 uppercase">
                  Private Access
                </span>
              </div>
            </Link>

            <div className="space-y-2 pt-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/20 text-xs font-mono text-white">
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                <span>MEMBER PRIVILEGES 2026</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
                Unlock Desktop-Crushing <br />
                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.7)]">
                  Performance &amp; Perks.
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Join thousands of enterprise software architects, 3D artists, and competitive esports athletes who rely on RS certified hardware.
              </p>
            </div>
          </div>

          {/* Floating Laptop Visual with Motion */}
          <div className="relative aspect-[16/10] bg-black/60 rounded-2xl border border-white/15 overflow-hidden flex items-center justify-center p-4 shadow-2xl group">
            <div className="absolute inset-0 bg-red-600/10 pointer-events-none" />
            <motion.img
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              src="/images/laptops/rog-scar-18.jpg"
              alt="RS Flagship Machine"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (target.src !== window.location.origin + '/images/laptop-placeholder.svg') {
                  target.src = '/images/laptop-placeholder.svg';
                }
              }}
              className="max-h-[200px] object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
            />
            <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-white font-bold">ROG SCAR 18 (2024)</span>
              <span className="text-red-400 font-bold">RTX 4090 175W</span>
            </div>
          </div>

          {/* Perks list */}
          <div className="grid grid-cols-2 gap-3 text-xs text-slate-200 border-t border-white/15 pt-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-white shrink-0" />
              <span>2-Year Priority Care</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-300 shrink-0" />
              <span>Zero-Downtime Swap</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-red-400 shrink-0" />
              <span>Early Drop Access</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-white shrink-0" />
              <span>Up to ₹60,000 Off</span>
            </div>
          </div>
        </div>

        {/* Right Column: High-End Interactive Form (Pure Black & Crisp White) */}
        <div className="lg:col-span-6 p-8 sm:p-12 bg-black flex flex-col justify-between space-y-6">
          {/* Header Switcher Tabs */}
          <div className="space-y-4">
            <div className="flex p-1.5 rounded-2xl bg-titanium-900 border border-white/10">
              <button
                onClick={() => setTab('login')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold font-mono transition-all ${
                  tab === 'login'
                    ? 'bg-red-600 text-white shadow-neon-red'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setTab('register')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold font-mono transition-all ${
                  tab === 'register'
                    ? 'bg-red-600 text-white shadow-neon-red'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Create VIP Account
              </button>
            </div>

            {/* 1-Click VIP Demo Login */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-red-600/15 via-red-950/30 to-black border border-red-500/30 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-red-500" />
                  1-Click VIP Demo Session
                </span>
                <p className="text-[11px] text-slate-300">Access Alexander Wright's VIP profile &amp; orders</p>
              </div>
              <button
                type="button"
                onClick={handleDemoClick}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-neon-red transition-all hover:scale-105"
              >
                Launch Demo
              </button>
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-white/10" />
            <span className="flex-shrink mx-3 text-[11px] font-mono text-slate-400 uppercase">
              Or continue with credential
            </span>
            <div className="flex-grow border-t border-white/10" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {tab === 'register' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-1"
                >
                  <label className="block text-xs font-mono text-slate-300">Full Legal Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alexander Wright"
                      className="w-full bg-titanium-900 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1">
              <label className="block text-xs font-mono text-slate-300">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.wright@executive.tech"
                  className="w-full bg-titanium-900 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-mono text-slate-300">Password *</label>
                {tab === 'login' && (
                  <button
                    type="button"
                    onClick={() => showToast('Password Reset', 'Password recovery instructions sent to your email.', 'info')}
                    className="text-[11px] font-mono text-red-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-titanium-900 border border-white/15 rounded-xl pl-10 pr-10 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-500 hover:text-white"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs shadow-neon-red flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{tab === 'register' ? 'Create VIP Membership' : 'Sign In to RS Portal'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Terms */}
          <div className="text-center text-[11px] text-slate-400">
            By accessing the RS Storefront, you agree to our{' '}
            <Link to="/about" className="text-white hover:underline">
              Terms of Hardware Service
            </Link>{' '}
            &amp;{' '}
            <Link to="/about" className="text-white hover:underline">
              Privacy Policy
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
};
