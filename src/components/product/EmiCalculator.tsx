import React, { useState } from 'react';
import { CreditCard, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { calculateMonthlyEmi } from '../../utils/formatters';
import { useCurrency } from '../../context/CurrencyContext';

interface EmiCalculatorProps {
  price: number;
}

export const EmiCalculator: React.FC<EmiCalculatorProps> = ({ price }) => {
  const [tenureMonths, setTenureMonths] = useState<number>(24);
  const [downPayment, setDownPayment] = useState<number>(0);
  const { format } = useCurrency();

  const financedAmount = Math.max(0, price - downPayment);
  // 0% interest on 6/12 months, 9.9% on 24/36 months
  const interestRate = tenureMonths <= 12 ? 0 : 0.099;
  const monthlyPayment = tenureMonths <= 12
    ? Math.round(financedAmount / tenureMonths)
    : calculateMonthlyEmi(financedAmount, tenureMonths, interestRate);

  const totalPayable = downPayment + (monthlyPayment * tenureMonths);

  return (
    <div className="p-6 rounded-2xl bg-titanium-900/60 border border-white/5 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-cyber-cyan" />
          <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
            Flexible Financing &amp; No-Cost EMI
          </h3>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 font-mono">
          Instant Approval
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-mono text-slate-300 block mb-2">
              Select Tenure Period
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[6, 12, 24, 36].map((months) => (
                <button
                  key={months}
                  onClick={() => setTenureMonths(months)}
                  className={`py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                    tenureMonths === months
                      ? 'bg-cyber-cyan text-titanium-950 shadow-neon-cyan/40'
                      : 'bg-titanium-950 text-slate-400 border border-white/10 hover:border-white/20'
                  }`}
                >
                  {months} Mo
                  {months <= 12 && (
                    <span className="block text-[9px] font-normal text-emerald-400">0% APR</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
              <span>Down Payment</span>
              <span className="text-white font-bold">{format(downPayment)}</span>
            </div>
            <input
              type="range"
              min="0"
              max={price * 0.7}
              step="50"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full h-1.5 bg-titanium-950 rounded-lg appearance-none cursor-pointer accent-cyber-cyan"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>$0 (Zero Down)</span>
              <span>70% Max Down</span>
            </div>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="p-4 rounded-xl bg-titanium-950 border border-white/10 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase">Estimated Monthly Installment</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyber-cyan font-mono mt-1">
              {format(monthlyPayment)} <span className="text-xs text-slate-400 font-normal">/ month</span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-slate-400 border-t border-white/5 pt-3">
            <div className="flex justify-between">
              <span>Total Product Cost</span>
              <span className="font-mono text-white">{format(price)}</span>
            </div>
            <div className="flex justify-between">
              <span>Annual Percentage Rate (APR)</span>
              <span className="font-mono text-emerald-400">{interestRate === 0 ? '0.0% Special' : '9.9% Flat'}</span>
            </div>
            <div className="flex justify-between font-bold text-slate-200 pt-1 border-t border-white/5">
              <span>Total Financed Outlay</span>
              <span className="font-mono text-white">{format(totalPayable)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
