export type LaptopCategory = 
  | 'gaming' 
  | 'ultrabook' 
  | 'business' 
  | 'creator' 
  | 'student' 
  | 'performance';

export interface LaptopSpecOption {
  label: string;
  priceDelta: number;
}

export interface LaptopConfig {
  ramOptions: LaptopSpecOption[];
  storageOptions: LaptopSpecOption[];
  colorOptions: { name: string; hex: string; imageIndex?: number }[];
  gpuOptions?: LaptopSpecOption[];
}

export interface LaptopReview {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface LaptopBenchmark {
  geekbenchSingle: number;
  geekbenchMulti: number;
  cinebenchR23: number;
  timeSpy3DMark?: number;
  batteryLifeHours: number;
}

export interface Laptop {
  id: string;
  slug: string;
  name: string;
  brand: 'Apple' | 'ASUS' | 'Razer' | 'Dell' | 'Lenovo' | 'HP' | 'Acer' | 'MSI' | 'Framework' | 'Samsung';
  category: LaptopCategory;
  tagline: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isFlashDeal?: boolean;
  stockCount: number;
  images: string[];
  specs: {
    processor: string;
    ram: string;
    storage: string;
    gpu: string;
    display: string;
    displayResolution: string;
    refreshRate: string;
    battery: string;
    weight: string;
    os: string;
    ports: string[];
    wireless: string;
    webcam: string;
  };
  config: LaptopConfig;
  benchmarks: LaptopBenchmark;
  highlights: string[];
  inTheBox: string[];
  warranty: string;
}

export interface FilterState {
  searchQuery: string;
  categories: LaptopCategory[];
  brands: string[];
  priceRange: [number, number];
  ram: string[];
  storage: string[];
  processorBrands: string[];
  gpuTypes: string[];
  displayTypes: string[];
  minRating: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest' | 'discount';
}
