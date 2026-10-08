import { Laptop } from './product';

export interface CartItem {
  id: string; // unique cart item id (e.g. laptopId + config hashes)
  laptop: Laptop;
  quantity: number;
  selectedRam: string;
  selectedStorage: string;
  selectedColor: string;
  selectedGpu?: string;
  extraPrice: number;
  unitPrice: number;
  warrantyIncluded?: boolean;
}

export interface CouponCode {
  code: string;
  discountPercentage: number;
  maxDiscount?: number;
  description: string;
  minSpend?: number;
}

export interface OrderItem {
  laptopId: string;
  name: string;
  image: string;
  quantity: number;
  unitPrice: number;
  configSummary: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  shippingMethod: 'standard' | 'express' | 'priority';
  shippingCost: number;
  paymentMethod: 'card' | 'upi' | 'emi' | 'crypto' | 'cod';
  paymentDetailsLast4?: string;
  subtotal: number;
  discount: number;
  couponCode?: string;
  tax: number;
  total: number;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
  trackingNumber: string;
  estimatedDelivery: string;
}
