import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Headphones,
  Flame
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useToast } from '../context/ToastContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('tech-support');
  const [formOrder, setFormOrder] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.includes('@') || !formMessage.trim()) {
      showToast('Missing Details', 'Please complete all required fields.', 'warning');
      return;
    }
    setIsSent(true);
    showToast('Inquiry Dispatched', 'A senior hardware concierge will respond within 2 hours.', 'success');
  };

  const faqs = [
    {
      q: 'How does the RS 2-Year VIP Shield and Zero-Downtime Swap work?',
      a: 'If your machine experiences any hardware failure during your 2-year coverage, we courier a brand new replacement unit directly to your address in India or internationally before picking up the defective laptop, ensuring zero downtime for your creative or enterprise work.'
    },
    {
      q: 'Can I request custom RAM and SSD upgrades without voiding manufacturer warranty?',
      a: 'Yes. All upgrades are performed by certified technicians in our ISO Class 5 clean-room facility using OEM-approved components, preserving the full factory warranty plus our 2-Year RS Care guarantee.'
    },
    {
      q: 'What are your pan-India and worldwide shipping times and insurance policies?',
      a: 'All orders over ₹99,999 qualify for free insured express air delivery (typically 24–48 hours across major metros). Every package is shipped with shock-indicator tamper tags and requires OTP / legal signature upon delivery.'
    },
    {
      q: 'What is your 30-day money back return policy?',
      a: 'You have 30 calendar days from delivery to test the machine with your games or workflow. If you are not completely satisfied, we provide a prepaid insured return label for a full 100% refund.'
    }
  ];

  const centers = [
    {
      city: 'Bengaluru Tech Lab',
      address: '100 Feet Road, Indiranagar, Bengaluru, Karnataka',
      phone: '+91 80 4912 8800',
      email: 'bangalore.concierge@rs-laptops.in',
      hours: 'Mon - Sat: 9:00 AM - 8:00 PM IST'
    },
    {
      city: 'Mumbai VIP Showroom',
      address: 'Bandra Kurla Complex (BKC), Mumbai, Maharashtra',
      phone: '+91 22 6124 9900',
      email: 'mumbai.concierge@rs-laptops.in',
      hours: 'Mon - Sat: 9:30 AM - 8:30 PM IST'
    },
    {
      city: 'Delhi NCR Flagship',
      address: 'Cyber City, Phase 2, Gurugram, Haryana',
      phone: '+91 124 489 1200',
      email: 'delhi.concierge@rs-laptops.in',
      hours: 'Mon - Sun: 10:00 AM - 9:00 PM IST'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-16 min-h-screen bg-black text-white"
    >
      <Breadcrumbs items={[{ label: 'VIP Concierge & Support' }]} />

      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-xs font-mono text-red-400 font-bold">
          <Headphones className="w-3.5 h-3.5 text-red-500" />
          <span>24/7 TECHNICAL CONCIERGE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
          We Are Here For You.
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Have questions about specific thermals, custom memory configurations, or enterprise bulk orders? Connect directly with our engineering team.
        </p>
      </div>

      {/* Form & Direct Contacts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Contact Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-titanium-900/80 border border-white/15 space-y-6 shadow-2xl">
          <div className="pb-4 border-b border-white/10">
            <h2 className="text-lg font-bold text-white">Send Direct Message to Hardware Desk</h2>
            <p className="text-xs text-slate-400 mt-1">Average response time: under 2 hours.</p>
          </div>

          {isSent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-3xl bg-red-600/10 border border-red-500/30 text-center space-y-3 shadow-xl"
            >
              <CheckCircle2 className="w-12 h-12 text-red-500 mx-auto" />
              <h3 className="text-lg font-bold text-white">Message Dispatched Successfully</h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                A dedicated senior hardware specialist has been assigned to ticket <strong>#TKT-{Date.now().toString().slice(-5)}</strong> and will contact you shortly.
              </p>
              <button
                onClick={() => setIsSent(false)}
                className="mt-4 px-5 py-2.5 rounded-xl bg-black border border-white/15 text-xs font-mono text-white hover:border-red-500 transition-colors"
              >
                Send Another Inquiry
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-300 mb-1 font-medium">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1 font-medium">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-300 mb-1 font-medium">Inquiry Subject</label>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                  >
                    <option value="tech-support">Technical &amp; Benchmark Question</option>
                    <option value="custom-config">Clean-Room Custom Upgrade Request</option>
                    <option value="warranty-claim">RS Care VIP Warranty &amp; Swap</option>
                    <option value="order-status">Tracking &amp; Shipping Inquiries</option>
                    <option value="enterprise-fleet">Enterprise / Corporate Fleet Purchase</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1 font-medium">Order ID (Optional)</label>
                  <input
                    type="text"
                    value={formOrder}
                    onChange={(e) => setFormOrder(e.target.value)}
                    placeholder="e.g. RS-EXP-847291-IN"
                    className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1 font-medium">Detailed Message *</label>
                <textarea
                  rows={4}
                  required
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Describe your hardware requirement or question in detail..."
                  className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs shadow-neon-red flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Submit Priority Inquiry</span>
              </motion.button>
            </form>
          )}
        </div>

        {/* Right: Direct Concierge & Global Centers */}
        <div className="lg:col-span-5 space-y-6">
          {/* Global Centers list */}
          <div className="p-6 rounded-3xl bg-titanium-900/80 border border-white/15 space-y-4 shadow-xl">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider pb-2 border-b border-white/10">
              RS Experience Centers &amp; Labs
            </h3>
            <div className="space-y-4">
              {centers.map((c, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-black border border-white/10 space-y-1">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    <span>{c.city}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{c.address}</p>
                  <div className="text-[11px] font-mono text-slate-300 flex items-center justify-between pt-1 font-bold">
                    <span>{c.phone}</span>
                    <span className="text-red-400">{c.hours.split(':')[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="p-8 sm:p-12 rounded-3xl bg-titanium-900/80 border border-white/15 space-y-6 shadow-2xl">
        <div className="text-center space-y-1 max-w-xl mx-auto">
          <span className="text-xs font-mono text-red-500 uppercase tracking-wider font-bold">Help &amp; Answers</span>
          <h2 className="text-2xl font-black text-white font-display">Frequently Asked Hardware Questions</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3 pt-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-black border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-bold text-white flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-red-500" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-white/10 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
