export interface FlashDeal {
  id: string;
  laptopId: string;
  badge: string;
  discountPercentage: number;
  dealPrice: number;
  originalPrice: number;
  unitsTotal: number;
  unitsClaimed: number;
  endTimeISO: string;
  tag: string;
}

const now = new Date();
const inTwoDays = new Date(now.getTime() + 48 * 60 * 60 * 1000).toISOString();
const inTwelveHours = new Date(now.getTime() + 12 * 60 * 60 * 1000).toISOString();
const inThreeDays = new Date(now.getTime() + 72 * 60 * 60 * 1000).toISOString();

export const FLASH_DEALS: FlashDeal[] = [
  {
    id: 'deal-1',
    laptopId: 'rog-scar-18-2024',
    badge: 'CYBER DROP',
    discountPercentage: 22,
    dealPrice: 289999,
    originalPrice: 369999,
    unitsTotal: 25,
    unitsClaimed: 19,
    endTimeISO: inTwelveHours,
    tag: 'Flagship Gaming RTX 4090'
  },
  {
    id: 'deal-2',
    laptopId: 'macbook-pro-16-m3max',
    badge: 'CREATOR SPECIAL',
    discountPercentage: 15,
    dealPrice: 339999,
    originalPrice: 399999,
    unitsTotal: 30,
    unitsClaimed: 24,
    endTimeISO: inTwoDays,
    tag: '128GB Unified Memory Ready'
  },
  {
    id: 'deal-3',
    laptopId: 'razer-blade-16-dual-mode',
    badge: 'LIMITED STOCK',
    discountPercentage: 18,
    dealPrice: 299999,
    originalPrice: 364999,
    unitsTotal: 20,
    unitsClaimed: 17,
    endTimeISO: inTwelveHours,
    tag: 'Dual-Mode Mini-LED Display'
  },
  {
    id: 'deal-4',
    laptopId: 'dell-xps-16-oled',
    badge: 'EXECUTIVE PICK',
    discountPercentage: 20,
    dealPrice: 239999,
    originalPrice: 299999,
    unitsTotal: 40,
    unitsClaimed: 28,
    endTimeISO: inThreeDays,
    tag: '4K Touch OLED + Intel Ultra 9'
  }
];

export const PROMO_COUPONS = [
  {
    code: 'RSWELCOME10',
    discountPercentage: 10,
    maxDiscount: 25000,
    description: '10% OFF for first-time VIP members (Up to ₹25,000)',
    minSpend: 50000
  },
  {
    code: 'CYBER50',
    discountPercentage: 15,
    maxDiscount: 40000,
    description: 'Instant 15% discount on Gaming & Creator workstations',
    minSpend: 150000
  },
  {
    code: 'VIPPRO100',
    discountPercentage: 20,
    maxDiscount: 60000,
    description: 'Exclusive 20% OFF for RS VIP Club Members',
    minSpend: 200000
  }
];
