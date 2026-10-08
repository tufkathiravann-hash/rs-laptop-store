import { ShippingAddress, Order } from './cart';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatar: string;
  phone?: string;
  addresses: (ShippingAddress & { id: string; isDefault?: boolean })[];
  orders: Order[];
  memberTier: 'Standard' | 'Pro VIP' | 'Elite Black';
  savedPaymentMethods: {
    id: string;
    cardBrand: string;
    last4: string;
    expiry: string;
    holderName: string;
  }[];
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'INR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to USD (1.0)
  prefix: boolean;
}
