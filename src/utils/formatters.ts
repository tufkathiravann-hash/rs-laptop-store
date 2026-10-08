import { CurrencyCode } from '../types/user';

export const CURRENCY_RATES: Record<CurrencyCode, { symbol: string; rate: number; prefix: boolean; locale: string }> = {
  INR: { symbol: '₹', rate: 1.0, prefix: true, locale: 'en-IN' },
  USD: { symbol: '$', rate: 0.012, prefix: true, locale: 'en-US' },
  EUR: { symbol: '€', rate: 0.011, prefix: false, locale: 'de-DE' },
  GBP: { symbol: '£', rate: 0.0095, prefix: true, locale: 'en-GB' },
};

export function formatPrice(inrAmount: number, currency: CurrencyCode = 'INR'): string {
  const info = CURRENCY_RATES[currency] || CURRENCY_RATES.INR;
  const converted = Math.round(inrAmount * info.rate);
  
  // Format in locale e.g. 2,49,999 for INR
  const formattedNumber = converted.toLocaleString(info.locale || 'en-IN');
  
  if (info.prefix) {
    return `${info.symbol}${formattedNumber}`;
  } else {
    return `${formattedNumber} ${info.symbol}`;
  }
}

export function formatNumber(num: number): string {
  return num.toLocaleString('en-IN');
}

export function calculateMonthlyEmi(inrAmount: number, months: number = 24, interestRate: number = 0.0): number {
  if (interestRate === 0) {
    return Math.round(inrAmount / months);
  }
  const monthlyRate = interestRate / 12;
  const emi = (inrAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(emi);
}

export function generateOrderId(): string {
  const prefix = 'RS-IND';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${timestamp}-${random}`;
}

export function generateTrackingNumber(): string {
  return `RS-EXP-${Math.random().toString(36).substring(2, 8).toUpperCase()}-IN`;
}

export function formatDate(dateString: string): string {
  const d = new Date(dateString);
  return d.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
