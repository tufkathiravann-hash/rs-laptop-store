import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      showToast('Invalid Email', 'Please enter a valid email address.', 'warning');
      return;
    }
    setIsSuccess(true);
    showToast('VIP Drop Invitation Active', 'Welcome to RS Private Allocations & Early Access.', 'success');
  };

  return (
    <section className="bg-gradient-to-r from-red-700 via-red-600 to-black text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden z-10">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-black/70 backdrop-blur-xl border border-white/20 p-8 sm:p-14 overflow-hidden shadow-2xl text-center space-y-6">
          <div className="max-w-xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              <span>PRIVATE HARDWARE ALLOCATIONS</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
              Join the RS VIP Hardware Club.
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Get first-hour access to limited-run custom laptop editions, private promotional coupons, and benchmarking teardowns before general release.
            </p>
          </div>

          {isSuccess ? (
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-white text-black font-bold text-xs font-mono flex items-center justify-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-red-600" />
              <span>VIP Invitation Sent! Check your inbox for your 10% instant promo code.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your VIP email..."
                  className="w-full bg-black/80 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-white hover:bg-slate-100 text-black font-black text-xs shadow-2xl flex items-center justify-center gap-2 transition-all shrink-0 hover:scale-105"
              >
                <span>Get VIP Access</span>
                <Send className="w-3.5 h-3.5 text-red-600" />
              </button>
            </form>
          )}

          <div className="flex items-center justify-center gap-6 text-[11px] text-slate-300">
            <span className="flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
              No spam, ever
            </span>
            <span className="text-slate-500">•</span>
            <span>Instant 10% coupon code</span>
            <span className="text-slate-500">•</span>
            <span>1-click unsubscribe anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
};
