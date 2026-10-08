import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Check,
  ShieldCheck,
  Truck,
  CreditCard,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  MapPin,
  Clock,
  Download,
  ShoppingBag,
  Flame
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { useToast } from '../context/ToastContext';
import { ShippingAddress, Order } from '../types/cart';
import { SafeImage } from '../components/common/SafeImage';
import { generateOrderId, generateTrackingNumber } from '../utils/formatters';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const CheckoutPage: React.FC = () => {
  const {
    items,
    subtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    grandTotal,
    appliedCoupon,
    clearCart
  } = useCart();

  const { user, addOrder } = useAuth();
  const { format } = useCurrency();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Steps: 1: Address, 2: Shipping Method, 3: Payment, 4: Confirmation
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Address form state
  const defaultAddr = user?.addresses[0];
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: defaultAddr?.fullName || user?.fullName || 'Rahul Sharma',
    email: defaultAddr?.email || user?.email || 'rahul.sharma@rs-laptops.com',
    phone: defaultAddr?.phone || user?.phone || '+91 98765 43210',
    street: defaultAddr?.street || '742 Cyber City, Tower 4, Indiranagar',
    city: defaultAddr?.city || 'Bengaluru',
    state: defaultAddr?.state || 'Karnataka',
    postalCode: defaultAddr?.postalCode || '560001',
    country: defaultAddr?.country || 'India'
  });

  // Shipping method
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'priority'>('express');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'emi' | 'crypto' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('884');

  // Confirmed order state
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // If cart is empty and not on confirmation step, show notice
  if (items.length === 0 && currentStep !== 4) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4 min-h-screen bg-black text-white"
      >
        <h2 className="text-2xl font-bold text-white">Your bag is empty</h2>
        <p className="text-xs text-slate-400">Add a laptop to your bag before proceeding to checkout.</p>
        <Link
          to="/laptops"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-neon-red transition-all"
        >
          <span>Browse Laptops</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    );
  }

  const handleNextToShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.fullName || !address.email || !address.street || !address.city || !address.postalCode) {
      showToast('Incomplete Address', 'Please fill in all shipping fields.', 'warning');
      return;
    }
    setCurrentStep(2);
  };

  const handleNextToPayment = () => {
    setCurrentStep(3);
  };

  const handlePlaceOrder = () => {
    const orderId = generateOrderId();
    const tracking = generateTrackingNumber();

    const order: Order = {
      id: orderId,
      date: new Date().toISOString(),
      items: items.map((i) => ({
        laptopId: i.laptop.id,
        name: i.laptop.name,
        image: i.laptop.images[0],
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        configSummary: `${i.selectedRam} • ${i.selectedStorage} • ${i.selectedColor}`
      })),
      shippingAddress: address,
      shippingMethod,
      shippingCost: shippingFee,
      paymentMethod,
      paymentDetailsLast4: '4242',
      subtotal,
      discount: discountAmount,
      couponCode: appliedCoupon?.code,
      tax: taxAmount,
      total: grandTotal,
      status: 'confirmed',
      trackingNumber: tracking,
      estimatedDelivery: shippingMethod === 'priority' ? 'Tomorrow by 10:00 AM' : 'In 2 business days'
    };

    setConfirmedOrder(order);
    addOrder(order);
    clearCart();
    setCurrentStep(4);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Confetti fallback
    }

    showToast('Order Placed Successfully!', `Order #${orderId} has been confirmed.`, 'success');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 min-h-screen bg-black text-white"
    >
      <Breadcrumbs items={[{ label: 'Bag', to: '/cart' }, { label: 'Secure Checkout' }]} />

      {/* Checkout Progress Stepper */}
      {currentStep !== 4 && (
        <div className="p-4 rounded-2xl bg-titanium-900/80 border border-white/10 flex items-center justify-between max-w-3xl mx-auto text-xs font-mono shadow-xl">
          {[
            { step: 1, label: 'Address' },
            { step: 2, label: 'Delivery' },
            { step: 3, label: 'Payment' }
          ].map((s) => (
            <div key={s.step} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold transition-colors ${
                  currentStep === s.step
                    ? 'bg-red-600 text-white shadow-neon-red'
                    : currentStep > s.step
                    ? 'bg-emerald-500 text-white'
                    : 'bg-black text-slate-500 border border-white/10'
                }`}
              >
                {currentStep > s.step ? <Check className="w-4 h-4" /> : s.step}
              </div>
              <span className={currentStep === s.step ? 'text-white font-bold' : 'text-slate-500'}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* STEP 4: ORDER CONFIRMATION SCREEN */}
      {currentStep === 4 && confirmedOrder ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-titanium-900/90 border border-red-500/40 shadow-2xl space-y-8"
        >
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center mx-auto text-red-500 shadow-neon-red">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
              HARDWARE ALLOCATION CONFIRMED
            </span>
            <h1 className="text-3xl font-black text-white font-display">
              Thank You For Your Order!
            </h1>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Your bespoke machine configuration is now entering the RS precision test bench for final thermal and OS validation.
            </p>
          </div>

          {/* Receipt Info Box */}
          <div className="p-6 rounded-2xl bg-black border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono shadow-inner">
            <div>
              <span className="text-slate-400 block font-bold">ORDER ID</span>
              <span className="text-white font-bold text-sm">{confirmedOrder.id}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-bold">TRACKING #</span>
              <span className="text-red-400 font-bold">{confirmedOrder.trackingNumber}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-bold">ESTIMATED ARRIVAL</span>
              <span className="text-emerald-400 font-bold">{confirmedOrder.estimatedDelivery}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-bold">TOTAL PAID</span>
              <span className="text-white font-black text-sm">{format(confirmedOrder.total)}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
            <Link
              to="/account"
              className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-neon-red text-center transition-all"
            >
              View Order Tracking in VIP Account
            </Link>
            <Link
              to="/laptops"
              className="px-6 py-3 rounded-xl bg-black hover:bg-titanium-800 text-slate-300 hover:text-white border border-white/15 font-bold text-xs text-center transition-all"
            >
              Continue Exploring
            </Link>
          </div>
        </motion.div>
      ) : (
        /* Steps 1, 2, 3 Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-titanium-900/80 border border-white/15 space-y-6 shadow-2xl">
            <AnimatePresence mode="wait">
              {/* STEP 1: SHIPPING ADDRESS */}
              {currentStep === 1 && (
                <motion.form
                  key="step1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onSubmit={handleNextToShipping}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <h2 className="text-base font-bold text-white">1. Shipping &amp; Contact Details</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-300 mb-1 font-medium">Full Name</label>
                      <input
                        type="text"
                        required
                        value={address.fullName}
                        onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                        className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1 font-medium">Email Address</label>
                      <input
                        type="email"
                        required
                        value={address.email}
                        onChange={(e) => setAddress({ ...address, email: e.target.value })}
                        className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1 font-medium">Street Address</label>
                    <input
                      type="text"
                      required
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs text-slate-300 mb-1 font-medium">City</label>
                      <input
                        type="text"
                        required
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1 font-medium">State</label>
                      <input
                        type="text"
                        required
                        value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1 font-medium">PIN / ZIP Code</label>
                      <input
                        type="text"
                        required
                        value={address.postalCode}
                        onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                        className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1 font-medium">Country</label>
                      <input
                        type="text"
                        required
                        value={address.country}
                        onChange={(e) => setAddress({ ...address, country: e.target.value })}
                        className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-neon-red flex items-center gap-2"
                    >
                      <span>Proceed to Delivery Method</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.form>
              )}

              {/* STEP 2: SHIPPING METHOD */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-5"
                >
                  <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                    <Truck className="w-4 h-4 text-red-500" />
                    <h2 className="text-base font-bold text-white">2. Select Insured Shipping Method</h2>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        id: 'express' as const,
                        title: 'RS Express Insured Courier (Recommended)',
                        desc: 'Delivered in 2 business days with tamper-proof seal and real-time GPS tracking.',
                        cost: shippingFee === 0 ? 'FREE' : format(1499)
                      },
                      {
                        id: 'priority' as const,
                        title: 'Same-Day / Next-Morning Priority Air',
                        desc: 'Direct airport priority freight. OTP on delivery strictly required.',
                        cost: format(2999)
                      },
                      {
                        id: 'standard' as const,
                        title: 'Standard Ground Secure',
                        desc: 'Standard 4-5 business days delivery.',
                        cost: 'FREE'
                      }
                    ].map((m) => (
                      <div
                        key={m.id}
                        onClick={() => setShippingMethod(m.id)}
                        className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                          shippingMethod === m.id
                            ? 'bg-red-600/15 border-red-500 shadow-neon-red/30'
                            : 'bg-black border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="text-xs font-bold text-white flex items-center gap-2">
                            <span>{m.title}</span>
                          </div>
                          <p className="text-xs text-slate-400">{m.desc}</p>
                        </div>
                        <span className="font-mono text-xs font-bold text-red-500 shrink-0 ml-4">
                          {m.cost}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="px-4 py-2.5 rounded-xl bg-black text-slate-300 hover:text-white border border-white/15 text-xs flex items-center gap-1.5 font-bold"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleNextToPayment}
                      className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-neon-red flex items-center gap-2"
                    >
                      <span>Proceed to Payment</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: PAYMENT METHOD */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                    <CreditCard className="w-4 h-4 text-red-500" />
                    <h2 className="text-base font-bold text-white">3. Payment &amp; Security Validation</h2>
                  </div>

                  {/* Payment Option Tabs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'card' as const, label: 'Credit / Debit Card' },
                      { id: 'upi' as const, label: 'Instant UPI / QR' },
                      { id: 'emi' as const, label: '0% No-Cost EMI' },
                      { id: 'crypto' as const, label: 'NetBanking / COD' }
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPaymentMethod(p.id)}
                        className={`p-3.5 rounded-xl border text-xs font-mono font-bold transition-all text-center ${
                          paymentMethod === p.id
                            ? 'bg-red-600 text-white border-red-500 shadow-neon-red'
                            : 'bg-black border-white/10 text-slate-400 hover:text-white'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  {/* Card input mockup */}
                  {paymentMethod === 'card' && (
                    <div className="p-5 rounded-2xl bg-black border border-white/10 space-y-4">
                      <div>
                        <label className="block text-xs text-slate-300 mb-1 font-medium">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-titanium-900 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-red-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-300 mb-1 font-medium">Expiry Date</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full bg-titanium-900 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-red-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-300 mb-1 font-medium">CVC / Security Code</label>
                          <input
                            type="text"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            className="w-full bg-titanium-900 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-red-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <div className="p-6 rounded-2xl bg-black border border-white/10 space-y-3 text-center">
                      <p className="text-xs text-slate-300">Enter your UPI VPA handle for instant app push request</p>
                      <input
                        type="text"
                        defaultValue="rahul@okhdfcbank"
                        className="w-full max-w-sm mx-auto bg-titanium-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white font-mono text-center focus:outline-none focus:border-red-500"
                      />
                    </div>
                  )}

                  {paymentMethod === 'emi' && (
                    <div className="p-5 rounded-2xl bg-black border border-white/10 space-y-2 text-xs text-slate-300">
                      <p>Financed at <strong className="text-white">{format(Math.round(grandTotal / 24))}/month</strong> for 24 months with 0% interest and zero down payment.</p>
                    </div>
                  )}

                  {paymentMethod === 'crypto' && (
                    <div className="p-5 rounded-2xl bg-black border border-white/10 space-y-2 text-xs text-slate-300">
                      <p className="font-mono text-red-500 font-bold">Secure NetBanking &amp; Cash on Delivery Available</p>
                      <p className="text-[11px] text-slate-400 font-mono">Verified OTP confirmation upon courier arrival</p>
                    </div>
                  )}

                  <div className="pt-4 flex justify-between items-center">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="px-4 py-2.5 rounded-xl bg-black text-slate-300 hover:text-white border border-white/15 text-xs flex items-center gap-1.5 font-bold"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handlePlaceOrder}
                      className="px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs shadow-neon-red flex items-center gap-2 transition-all"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Confirm &amp; Pay ({format(grandTotal)})</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Order Summary Preview */}
          <div className="lg:col-span-4 p-6 rounded-3xl bg-titanium-900/90 border border-white/15 space-y-4 shadow-2xl sticky top-24">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider pb-3 border-b border-white/10 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-red-500" />
              <span>Order Summary ({items.length} machines)</span>
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 text-xs">
                  <SafeImage
                    src={item.laptop.images[0]}
                    alt={item.laptop.name}
                    className="w-12 h-12 object-contain rounded-lg bg-black border border-white/10 shrink-0 p-1"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-bold truncate">{item.laptop.name}</div>
                    <div className="text-slate-400 font-mono text-[10px]">
                      {item.selectedRam} • {item.selectedStorage}
                    </div>
                    <div className="text-red-400 font-mono font-bold mt-0.5">
                      {format(item.unitPrice * item.quantity)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs text-slate-300 border-t border-white/10 pt-3 font-mono">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-bold">{format(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-red-400 font-bold">
                  <span>VIP Discount</span>
                  <span>-{format(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className={shippingFee === 0 ? 'text-red-400 font-bold' : 'text-white'}>
                  {shippingFee === 0 ? 'FREE' : format(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span className="text-white">{format(taxAmount)}</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between text-base font-bold text-white">
                <span>Total</span>
                <span className="text-red-500 font-mono font-black text-lg">{format(grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
