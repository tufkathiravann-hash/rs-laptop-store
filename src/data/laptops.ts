import { Laptop } from '../types/product';

export const LAPTOPS_DATA: Laptop[] = [
  // --- GAMING RIGS ---
  {
    id: 'rog-scar-18-2024',
    slug: 'asus-rog-strix-scar-18-2024',
    name: 'ROG Strix SCAR 18 (2024)',
    brand: 'ASUS',
    category: 'gaming',
    tagline: 'The Ultimate Desktop-Crushing Gaming Monster',
    description: 'Dominate every battlefield with the 2024 ROG Strix SCAR 18. Equipped with an Intel Core i9-14900HX processor and NVIDIA GeForce RTX 4090 laptop GPU running at max 175W TGP with Conductonaut Extreme liquid metal.',
    price: 289999,
    originalPrice: 369999,
    discountPercentage: 22,
    rating: 4.9,
    reviewCount: 342,
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    isFlashDeal: true,
    stockCount: 8,
    images: [
      '/images/laptops/rog-scar-18.jpg',
      '/images/laptops/gaming-1.jpg',
      '/images/laptops/gaming-2.jpg',
      '/images/laptops/gaming-3.jpg'
    ],
    specs: {
      processor: 'Intel Core i9-14900HX (24 cores, 32 threads, up to 5.8 GHz)',
      ram: '32GB DDR5 5600MHz (Dual Channel)',
      storage: '2TB PCIe 4.0 NVMe M.2 SSD (RAID 0 support)',
      gpu: 'NVIDIA GeForce RTX 4090 16GB GDDR6 (175W Max TGP)',
      display: '18" ROG Nebula HDR Mini-LED QHD+ (2560 x 1600), 1100 nits, 100% DCI-P3',
      displayResolution: '2560 x 1600 (QHD+)',
      refreshRate: '240Hz / 3ms',
      battery: '90WHrs, 4-cell Li-ion (330W Adapter)',
      weight: '3.10 kg (6.83 lbs)',
      os: 'Windows 11 Pro',
      ports: ['1x Thunderbolt 4', '1x USB 3.2 Gen 2 Type-C (DP/PD)', '2x USB 3.2 Gen 2 Type-A', '1x HDMI 2.1 FRL', '1x 2.5G LAN RJ-45', '1x 3.5mm Combo Audio'],
      wireless: 'Wi-Fi 7 (802.11be) Triple-band + Bluetooth 5.4',
      webcam: '720P HD IR Camera for Windows Hello'
    },
    config: {
      ramOptions: [
        { label: '32GB DDR5 (2x16GB)', priceDelta: 0 },
        { label: '64GB DDR5 (2x32GB)', priceDelta: 24000 }
      ],
      storageOptions: [
        { label: '2TB PCIe 4.0 NVMe SSD', priceDelta: 0 },
        { label: '4TB (2x2TB NVMe RAID 0)', priceDelta: 35000 }
      ],
      colorOptions: [
        { name: 'Off Black Cyber Mesh', hex: '#121316', imageIndex: 0 },
        { name: 'Eclipse Gray', hex: '#2A2D34', imageIndex: 1 }
      ]
    },
    benchmarks: {
      geekbenchSingle: 3040,
      geekbenchMulti: 17200,
      cinebenchR23: 34500,
      timeSpy3DMark: 22100,
      batteryLifeHours: 5.5
    },
    highlights: [
      'Conductonaut Extreme liquid metal on CPU & GPU',
      'Tri-Fan technology with full-surround heatsink',
      'Customizable AniMe Matrix and RGB lightbar',
      'ROG Nebula HDR with 2000+ dimming zones'
    ],
    inTheBox: [
      'ROG Strix SCAR 18 Laptop',
      '330W Power Adapter',
      'ROG Gladius III Gaming Mouse',
      'ROG Armor Caps (Customizable)',
      'Documentation & Warranty Card'
    ],
    warranty: '2-Year Global Warranty with RS On-Site Priority Support'
  },
  {
    id: 'razer-blade-16-dual-mode',
    slug: 'razer-blade-16-dual-mode-oled',
    name: 'Razer Blade 16 Dual-Mode',
    brand: 'Razer',
    category: 'gaming',
    tagline: 'World’s First Dual-Mode Mini-LED Display',
    description: 'Precision-crafted from a single CNC aluminum block with anodized matte black finish. Switch seamlessly between ultra-sharp 4K 120Hz for creative masterworks and blazing FHD+ 240Hz for competitive gaming.',
    price: 299999,
    originalPrice: 364999,
    discountPercentage: 18,
    rating: 4.8,
    reviewCount: 219,
    isFeatured: true,
    isFlashDeal: true,
    stockCount: 5,
    images: [
      '/images/laptops/razer-blade-16.jpg',
      '/images/laptops/gaming-3.jpg',
      '/images/laptops/gaming-1.jpg',
      '/images/laptops/gaming-2.jpg'
    ],
    specs: {
      processor: 'Intel Core i9-14900HX (24 Cores / 32 Threads)',
      ram: '32GB DDR5 5600MHz',
      storage: '2TB PCIe 4.0 NVMe SSD',
      gpu: 'NVIDIA GeForce RTX 4080 12GB GDDR6 (175W TGP)',
      display: '16" Dual-Mode Mini-LED (UHD+ 120Hz / FHD+ 240Hz), 1000 nits, HDR 1000',
      displayResolution: 'Dual Mode: 3840x2400 & 1920x1200',
      refreshRate: 'Switchable 120Hz / 240Hz',
      battery: '95.2WHrs with 330W GaN compact charger',
      weight: '2.45 kg (5.40 lbs)',
      os: 'Windows 11 Home',
      ports: ['1x Thunderbolt 4', '1x USB-C 3.2 Gen 2', '3x USB-A 3.2 Gen 2', '1x HDMI 2.1', '1x UHS-II SD Card Reader'],
      wireless: 'Wi-Fi 7 + Bluetooth 5.4',
      webcam: '1080p FHD IR with privacy shutter'
    },
    config: {
      ramOptions: [
        { label: '32GB DDR5', priceDelta: 0 },
        { label: '64GB DDR5', priceDelta: 28000 },
        { label: '96GB DDR5 Extreme', priceDelta: 52000 }
      ],
      storageOptions: [
        { label: '2TB NVMe SSD', priceDelta: 0 },
        { label: '4TB NVMe Dual SSD', priceDelta: 38000 }
      ],
      colorOptions: [
        { name: 'Anodized Matte Black', hex: '#0D0D0E', imageIndex: 0 },
        { name: 'Mercury White Edition', hex: '#E2E8F0', imageIndex: 1 }
      ]
    },
    benchmarks: {
      geekbenchSingle: 2980,
      geekbenchMulti: 16800,
      cinebenchR23: 32400,
      timeSpy3DMark: 19800,
      batteryLifeHours: 6.2
    },
    highlights: [
      'Patented Dual-Mode Mini-LED display technology',
      'Solid CNC T6 Aircraft-grade Aluminum Unibody',
      'Vacuum-sealed copper vapor chamber cooling system',
      'Razer Chroma RGB per-key programmable keyboard'
    ],
    inTheBox: ['Razer Blade 16', '330W GaN Power Adapter', 'Microfiber Cleaning Cloth', 'Manuals'],
    warranty: '2-Year RS Exclusive Protection + 1-Year Battery Warranty'
  },
  {
    id: 'alienware-m18-r2',
    slug: 'alienware-m18-r2-gaming',
    name: 'Alienware m18 R2 Gaming Beast',
    brand: 'Dell',
    category: 'gaming',
    tagline: 'Pure Unadulterated Titan Performance',
    description: 'Engineered for maximal thermal headroom with Alienware Cryo-tech cooling, Element 31 thermal interface, and massive 18-inch high-refresh screen with G-SYNC.',
    price: 274999,
    originalPrice: 329999,
    discountPercentage: 17,
    rating: 4.7,
    reviewCount: 180,
    stockCount: 12,
    images: [
      '/images/laptops/alienware-m18.jpg',
      '/images/laptops/gaming-2.jpg',
      '/images/laptops/gaming-1.jpg',
      '/images/laptops/gaming-3.jpg'
    ],
    specs: {
      processor: 'Intel Core i9-14900HX (up to 5.8 GHz)',
      ram: '32GB DDR5 5600MHz',
      storage: '2TB PCIe NVMe M.2 SSD',
      gpu: 'NVIDIA GeForce RTX 4080 12GB (175W)',
      display: '18" QHD+ (2560 x 1600) ComfortView Plus, 100% DCI-P3',
      displayResolution: '2560 x 1600',
      refreshRate: '165Hz / 3ms NVIDIA G-SYNC',
      battery: '97WHr integrated battery',
      weight: '4.04 kg (8.90 lbs)',
      os: 'Windows 11 Home',
      ports: ['2x Thunderbolt 4', '3x USB 3.2 Gen 1', '1x HDMI 2.1', '1x mini-DP 1.4', '1x RJ-45 2.5G'],
      wireless: 'Killer Wi-Fi 7 + Bluetooth 5.4',
      webcam: 'FHD IR Camera'
    },
    config: {
      ramOptions: [
        { label: '32GB DDR5', priceDelta: 0 },
        { label: '64GB DDR5', priceDelta: 25000 }
      ],
      storageOptions: [
        { label: '2TB NVMe', priceDelta: 0 },
        { label: '4TB NVMe (2x 2TB)', priceDelta: 34000 }
      ],
      colorOptions: [
        { name: 'Dark Metallic Moon', hex: '#1C1F26', imageIndex: 0 }
      ]
    },
    benchmarks: {
      geekbenchSingle: 2950,
      geekbenchMulti: 16500,
      cinebenchR23: 31800,
      timeSpy3DMark: 19400,
      batteryLifeHours: 4.8
    },
    highlights: ['CherryMX mechanical keyboard with 1.8mm travel', 'Cryo-tech quad-fan cooling architecture', 'AlienFX stadium rear ring lighting'],
    inTheBox: ['Alienware m18 R2', '360W Adapter', 'Setup Guide'],
    warranty: '2-Year RS Premium Care with 24/7 Tech Concierge'
  },
  {
    id: 'lenovo-legion-pro-7i-gen9',
    slug: 'lenovo-legion-pro-7i-gen-9',
    name: 'Lenovo Legion Pro 7i Gen 9',
    brand: 'Lenovo',
    category: 'gaming',
    tagline: 'AI-Tuned Pure Gaming Dominance',
    description: 'Powered by the revolutionary Lenovo LA-2Q AI chip that optimizes frame rates in real time. Features a gorgeous 16" PureSight WQXGA gaming panel with HDR 400.',
    price: 249999,
    originalPrice: 289999,
    discountPercentage: 14,
    rating: 4.9,
    reviewCount: 288,
    isBestSeller: true,
    stockCount: 15,
    images: [
      '/images/laptops/lenovo-legion-pro.jpg',
      '/images/laptops/gaming-1.jpg',
      '/images/laptops/gaming-3.jpg',
      '/images/laptops/gaming-2.jpg'
    ],
    specs: {
      processor: 'Intel Core i9-14900HX',
      ram: '32GB DDR5 5600MHz',
      storage: '1TB PCIe 4.0 SSD',
      gpu: 'NVIDIA GeForce RTX 4080 12GB GDDR6',
      display: '16" WQXGA (2560x1600) IPS 500nits Anti-glare, 100% sRGB',
      displayResolution: '2560 x 1600',
      refreshRate: '240Hz, DisplayHDR 400',
      battery: '99.99WHr with Super Rapid Charge (0-80% in 30min)',
      weight: '2.62 kg (5.78 lbs)',
      os: 'Windows 11 Pro',
      ports: ['1x Thunderbolt 4', '1x USB-C 3.2 Gen 2 (140W PD)', '4x USB-A 3.2 Gen 1', '1x HDMI 2.1', '1x RJ-45'],
      wireless: 'Wi-Fi 6E + Bluetooth 5.2',
      webcam: '1080p FHD with E-Shutter'
    },
    config: {
      ramOptions: [{ label: '32GB DDR5', priceDelta: 0 }, { label: '64GB DDR5', priceDelta: 22000 }],
      storageOptions: [{ label: '1TB NVMe', priceDelta: 0 }, { label: '2TB NVMe', priceDelta: 16000 }],
      colorOptions: [{ name: 'Eclipse Black', hex: '#18191C', imageIndex: 0 }]
    },
    benchmarks: {
      geekbenchSingle: 2990,
      geekbenchMulti: 16900,
      cinebenchR23: 33100,
      timeSpy3DMark: 19600,
      batteryLifeHours: 5.8
    },
    highlights: ['Lenovo Legion Coldfront: Vapor cooling', 'Legion TrueStrike keyboard with per-key RGB', '99.99Wh maximum flight-legal battery'],
    inTheBox: ['Legion Pro 7i', '300W Slim AC Adapter', '4 Keycaps + Tool', 'Warranty Docs'],
    warranty: '2-Year RS Premium Onsite Care'
  },

  // --- ULTRABOOKS ---
  {
    id: 'macbook-pro-16-m3max',
    slug: 'apple-macbook-pro-16-m3-max',
    name: 'MacBook Pro 16" (M3 Max)',
    brand: 'Apple',
    category: 'ultrabook',
    tagline: 'Mind-Blowing. Head-Turning. All-Day Phenomenon.',
    description: 'The pinnacle of laptop computing. M3 Max brings unprecedented GPU compute, hardware-accelerated ray tracing, up to 22 hours of battery life, and the breathtaking Liquid Retina XDR display in Space Black.',
    price: 339999,
    originalPrice: 399999,
    discountPercentage: 15,
    rating: 5.0,
    reviewCount: 612,
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    isFlashDeal: true,
    stockCount: 14,
    images: [
      '/images/laptops/macbook-pro-16.jpg',
      '/images/laptops/macbook-1.jpg',
      '/images/laptops/macbook-2.jpg',
      '/images/laptops/creator-1.jpg'
    ],
    specs: {
      processor: 'Apple M3 Max (16-core CPU: 12 performance / 4 efficiency)',
      ram: '48GB Unified Memory (300GB/s bandwidth)',
      storage: '1TB Superfast NVMe SSD',
      gpu: '40-core GPU with Dynamic Caching & Hardware Ray Tracing',
      display: '16.2" Liquid Retina XDR (3456 x 2234), 1600 nits peak, 1,000,000:1 contrast',
      displayResolution: '3456 x 2234',
      refreshRate: 'ProMotion 120Hz Adaptive',
      battery: '100Wh Lithium-Polymer (Up to 22 hours video playback)',
      weight: '2.16 kg (4.8 lbs)',
      os: 'macOS Sonoma',
      ports: ['3x Thunderbolt 4 / USB-C', '1x HDMI 2.1 (8K 60Hz / 4K 240Hz)', '1x SDXC Card Slot', '1x MagSafe 3', '1x 3.5mm Headphone Jack'],
      wireless: 'Wi-Fi 6E (802.11ax) + Bluetooth 5.3',
      webcam: '1080p FaceTime HD camera with advanced ISP'
    },
    config: {
      ramOptions: [
        { label: '48GB Unified Memory', priceDelta: 0 },
        { label: '64GB Unified Memory', priceDelta: 30000 },
        { label: '128GB Unified Memory Extreme', priceDelta: 80000 }
      ],
      storageOptions: [
        { label: '1TB Fast SSD', priceDelta: 0 },
        { label: '2TB Fast SSD', priceDelta: 40000 },
        { label: '4TB Fast SSD', priceDelta: 100000 }
      ],
      colorOptions: [
        { name: 'Space Black Anodized', hex: '#1F2022', imageIndex: 0 },
        { name: 'Silver Aluminum', hex: '#E5E7EB', imageIndex: 1 }
      ]
    },
    benchmarks: {
      geekbenchSingle: 3200,
      geekbenchMulti: 21500,
      cinebenchR23: 24200,
      timeSpy3DMark: 17200,
      batteryLifeHours: 21.5
    },
    highlights: [
      'Extreme Dynamic Range with 10,000 mini-LEDs',
      'Six-speaker sound system with force-cancelling woofers',
      'Space Black finish with revolutionary anti-fingerprint seal',
      'Zero performance drop when running purely on battery power'
    ],
    inTheBox: ['16-inch MacBook Pro', '140W USB-C Power Adapter', 'USB-C to MagSafe 3 Braided Cable (2m)', 'Apple Polishing Cloth'],
    warranty: 'AppleCare+ 3-Year Extended Protection Included with RS VIP'
  },
  {
    id: 'macbook-air-15-m3',
    slug: 'apple-macbook-air-15-m3',
    name: 'MacBook Air 15" (M3)',
    brand: 'Apple',
    category: 'ultrabook',
    tagline: 'Lean. Mean. M3 Machine.',
    description: 'Impossibly thin with a silent, fanless design. Liquid Retina 15.3-inch display, dual external monitor support with lid closed, and up to 18 hours of pure battery efficiency.',
    price: 139999,
    originalPrice: 159999,
    discountPercentage: 12,
    rating: 4.9,
    reviewCount: 450,
    isBestSeller: true,
    stockCount: 22,
    images: [
      '/images/laptops/macbook-air-15.jpg',
      '/images/laptops/macbook-2.jpg',
      '/images/laptops/macbook-1.jpg',
      '/images/laptops/tech-1.jpg'
    ],
    specs: {
      processor: 'Apple M3 (8-core CPU: 4 perf / 4 efficiency)',
      ram: '16GB Unified Memory',
      storage: '512GB SSD',
      gpu: '10-core GPU',
      display: '15.3" Liquid Retina display (2880 x 1864), 500 nits, P3 wide color',
      displayResolution: '2880 x 1864',
      refreshRate: '60Hz True Tone',
      battery: '66.5Wh Li-Po (Up to 18 hours)',
      weight: '1.51 kg (3.3 lbs)',
      os: 'macOS Sonoma',
      ports: ['2x Thunderbolt / USB 4', '1x MagSafe 3', '1x 3.5mm Headphone Jack'],
      wireless: 'Wi-Fi 6E + Bluetooth 5.3',
      webcam: '1080p FaceTime HD'
    },
    config: {
      ramOptions: [{ label: '16GB Unified Memory', priceDelta: 0 }, { label: '24GB Unified Memory', priceDelta: 20000 }],
      storageOptions: [{ label: '512GB SSD', priceDelta: 0 }, { label: '1TB SSD', priceDelta: 20000 }],
      colorOptions: [
        { name: 'Midnight Deep Blue', hex: '#1A233A', imageIndex: 0 },
        { name: 'Starlight Warm Champagne', hex: '#F0EBE1', imageIndex: 1 },
        { name: 'Space Gray', hex: '#52525B', imageIndex: 0 }
      ]
    },
    benchmarks: {
      geekbenchSingle: 3120,
      geekbenchMulti: 12100,
      cinebenchR23: 10400,
      batteryLifeHours: 18.0
    },
    highlights: ['Fanless completely silent acoustics', 'MagSafe quick-release magnetic charging', '11.5 mm razor-thin profile'],
    inTheBox: ['15-inch MacBook Air', '35W Dual USB-C Port Compact Power Adapter', 'MagSafe Cable'],
    warranty: '1-Year Official Warranty + RS Zero-Downtime Swap'
  },
  {
    id: 'dell-xps-16-oled',
    slug: 'dell-xps-16-9640-oled',
    name: 'Dell XPS 16 (9640) OLED',
    brand: 'Dell',
    category: 'ultrabook',
    tagline: 'Futuristic Glass Touch Bar & 4K InfinityEdge OLED',
    description: 'Crafted with machined aluminum, Gorilla Glass 3, and a seamless seamless glass touchpad with haptic response. Powered by Intel Core Ultra 9 with dedicated NPU for local AI acceleration.',
    price: 239999,
    originalPrice: 299999,
    discountPercentage: 20,
    rating: 4.8,
    reviewCount: 165,
    isFeatured: true,
    isFlashDeal: true,
    stockCount: 9,
    images: [
      '/images/laptops/dell-xps-16.jpg',
      '/images/laptops/gaming-2.jpg',
      '/images/laptops/creator-1.jpg',
      '/images/laptops/tech-1.jpg'
    ],
    specs: {
      processor: 'Intel Core Ultra 9 185H (16 Cores, up to 5.1 GHz, Intel AI Boost NPU)',
      ram: '32GB LPDDR5x 7467MHz Dual Channel',
      storage: '1TB PCIe 4.0 NVMe SSD',
      gpu: 'NVIDIA GeForce RTX 4070 8GB GDDR6 (60W)',
      display: '16.3" 4K+ (3840 x 2400) OLED Touch, 400 nits, 100% DCI-P3, DisplayHDR 500',
      displayResolution: '3840 x 2400 (4K+)',
      refreshRate: '90Hz VRR',
      battery: '99.5WHr battery with 130W USB-C fast charge',
      weight: '2.13 kg (4.7 lbs)',
      os: 'Windows 11 Pro',
      ports: ['3x Thunderbolt 4 Type-C (DisplayPort and PowerDelivery)', '1x microSDXC card reader', '1x 3.5mm audio'],
      wireless: 'Intel Killer Wi-Fi 7 BE1750 (2x2) + Bluetooth 5.4',
      webcam: '1080p FHD RGB-IR with Windows Hello'
    },
    config: {
      ramOptions: [{ label: '32GB LPDDR5x', priceDelta: 0 }, { label: '64GB LPDDR5x', priceDelta: 30000 }],
      storageOptions: [{ label: '1TB NVMe', priceDelta: 0 }, { label: '2TB NVMe', priceDelta: 20000 }, { label: '4TB NVMe', priceDelta: 60000 }],
      colorOptions: [
        { name: 'Platinum Machined Aluminum', hex: '#D1D5DB', imageIndex: 0 },
        { name: 'Graphite Dark Finish', hex: '#1F2937', imageIndex: 1 }
      ]
    },
    benchmarks: {
      geekbenchSingle: 2450,
      geekbenchMulti: 13900,
      cinebenchR23: 18200,
      timeSpy3DMark: 9800,
      batteryLifeHours: 11.2
    },
    highlights: ['Invisible seamless haptic glass trackpad', 'Capacitive touch function row', 'Quad-speaker design with Waves MaxxAudio Pro'],
    inTheBox: ['Dell XPS 16', '130W USB-C GaN Charger', 'USB-C to USB-A/HDMI Dongle', 'Manuals'],
    warranty: '2-Year RS Concierge Guarantee'
  },
  {
    id: 'asus-zenbook-duo-oled',
    slug: 'asus-zenbook-duo-oled-2024',
    name: 'ASUS Zenbook DUO OLED (2024)',
    brand: 'ASUS',
    category: 'ultrabook',
    tagline: 'Dual 14" 3K OLED Screens in One Featherlight Package',
    description: 'Double your workspace anywhere with dual 14-inch 3K 120Hz ASUS Lumina OLED touchscreens, detachable Bluetooth keyboard with built-in kickstand.',
    price: 189999,
    originalPrice: 219999,
    discountPercentage: 13,
    rating: 4.8,
    reviewCount: 142,
    isNew: true,
    stockCount: 11,
    images: [
      '/images/laptops/asus-zenbook-duo.jpg',
      '/images/laptops/creator-1.jpg',
      '/images/laptops/student-1.jpg',
      '/images/laptops/tech-1.jpg'
    ],
    specs: {
      processor: 'Intel Core Ultra 9 185H (Intel Arc Graphics & NPU)',
      ram: '32GB LPDDR5X',
      storage: '1TB PCIe 4.0 NVMe SSD',
      gpu: 'Intel Arc Integrated GPU (8 Xe Cores)',
      display: 'Dual 14.0" 3K (2880 x 1800) OLED 16:10, 0.2ms, 100% DCI-P3, 500 nits HDR',
      displayResolution: 'Dual 2880 x 1800',
      refreshRate: '120Hz OLED 0.2ms',
      battery: '75WHrs 4-cell Li-ion (Up to 13.5 hours on single screen)',
      weight: '1.35 kg (2.98 lbs) without keyboard',
      os: 'Windows 11 Home',
      ports: ['2x Thunderbolt 4', '1x USB 3.2 Gen 1 Type-A', '1x HDMI 2.1 TMDS', '1x 3.5mm Audio'],
      wireless: 'Wi-Fi 6E (802.11ax) + Bluetooth 5.3',
      webcam: 'FHD camera with IR sensor & ambient light sensor'
    },
    config: {
      ramOptions: [{ label: '32GB LPDDR5X', priceDelta: 0 }],
      storageOptions: [{ label: '1TB NVMe', priceDelta: 0 }, { label: '2TB NVMe', priceDelta: 18000 }],
      colorOptions: [{ name: 'Inkwell Gray', hex: '#212529', imageIndex: 0 }]
    },
    benchmarks: {
      geekbenchSingle: 2420,
      geekbenchMulti: 13600,
      cinebenchR23: 17800,
      batteryLifeHours: 10.5
    },
    highlights: ['Dual full-size 120Hz 3K OLED touch displays', 'Integrated multi-angle metal kickstand', 'ASUS Pen 2.0 4096 pressure level support'],
    inTheBox: ['Zenbook DUO', 'Detachable Magnetic Keyboard', 'ASUS Pen 2.0 Stylus', '65W USB-C Adapter', 'Protective Sleeve'],
    warranty: '2-Year International Warranty'
  },

  // --- CREATOR STUDIO ---
  {
    id: 'asus-proart-studiobook-16',
    slug: 'asus-proart-studiobook-16-oled',
    name: 'ASUS ProArt Studiobook 16 OLED',
    brand: 'ASUS',
    category: 'creator',
    tagline: 'Master Any Render with Physical ASUS Dial & 4K OLED',
    description: 'Designed exclusively for cinematic VFX artists, colorists, and 3D animators. Features the physical ASUS Dial for micro-adjustments in Adobe Creative Cloud and 100% DCI-P3 color accuracy.',
    price: 259999,
    originalPrice: 299999,
    discountPercentage: 13,
    rating: 4.9,
    reviewCount: 98,
    isFeatured: true,
    stockCount: 7,
    images: [
      '/images/laptops/asus-proart-16.jpg',
      '/images/laptops/creator-1.jpg',
      '/images/laptops/gaming-3.jpg',
      '/images/laptops/tech-1.jpg'
    ],
    specs: {
      processor: 'Intel Core i9-13980HX (24 cores, up to 5.6 GHz)',
      ram: '64GB DDR5 5200MHz',
      storage: '2TB PCIe 4.0 Performance SSD',
      gpu: 'NVIDIA RTX 4070 8GB Studio Driver Certified',
      display: '16.0" 3.2K (3200 x 2000) OLED 16:10, 120Hz, 0.2ms, Delta E < 1, Calman Verified',
      displayResolution: '3200 x 2000 (3.2K)',
      refreshRate: '120Hz 0.2ms',
      battery: '90WHrs fast-charging battery',
      weight: '2.40 kg (5.29 lbs)',
      os: 'Windows 11 Pro',
      ports: ['2x Thunderbolt 4', '2x USB 3.2 Gen 2 Type-A', '1x HDMI 2.1 FRL', '1x SD Express 7.0 Card Reader', '1x 2.5G RJ-45 LAN'],
      wireless: 'Wi-Fi 6E + Bluetooth 5.3',
      webcam: 'FHD IR camera with physical privacy shutter'
    },
    config: {
      ramOptions: [{ label: '64GB DDR5', priceDelta: 0 }, { label: '96GB DDR5', priceDelta: 36000 }],
      storageOptions: [{ label: '2TB NVMe', priceDelta: 0 }, { label: '4TB NVMe Dual', priceDelta: 32000 }],
      colorOptions: [{ name: 'Mineral Black Anti-Fingerprint', hex: '#111317', imageIndex: 0 }]
    },
    benchmarks: {
      geekbenchSingle: 2910,
      geekbenchMulti: 16200,
      cinebenchR23: 30500,
      timeSpy3DMark: 12800,
      batteryLifeHours: 7.2
    },
    highlights: ['Intuitive physical ASUS Rotary Dial', 'SD Express 7.0 with 985 MB/s transfer speed', 'Haptic touchpad with stylus support'],
    inTheBox: ['ProArt Studiobook 16', '240W AC Adapter', 'ProArt Backpack', 'Documentation'],
    warranty: '3-Year RS Creator Pro Shield with Accidental Damage Coverage'
  },
  {
    id: 'msi-creator-16-ai-studio',
    slug: 'msi-creator-16-ai-studio-4k',
    name: 'MSI Creator 16 AI Studio (Mini-LED)',
    brand: 'MSI',
    category: 'creator',
    tagline: 'Ultralight Magnesium-Aluminum 4K Mini-LED Powerhouse',
    description: 'Supercharged with NVIDIA Studio certifications, Intel Core Ultra 9, and a 4K 120Hz Mini-LED panel with 1000 nits peak HDR in an ultra-portable 1.99kg chassis.',
    price: 269999,
    originalPrice: 319999,
    discountPercentage: 15,
    rating: 4.8,
    reviewCount: 76,
    isNew: true,
    stockCount: 6,
    images: [
      '/images/laptops/msi-creator-16.jpg',
      '/images/laptops/creator-1.jpg',
      '/images/laptops/gaming-1.jpg',
      '/images/laptops/tech-1.jpg'
    ],
    specs: {
      processor: 'Intel Core Ultra 9 185H (16 Cores / 22 Threads)',
      ram: '32GB DDR5 5600MHz',
      storage: '2TB PCIe Gen4 NVMe SSD',
      gpu: 'NVIDIA GeForce RTX 4080 12GB GDDR6 (NVIDIA Studio)',
      display: '16" UHD+ (3840x2400) 120Hz Mini-LED, 100% DCI-P3, HDR 1000',
      displayResolution: '3840 x 2400 (4K+ UHD)',
      refreshRate: '120Hz Mini-LED',
      battery: '99.9WHr maximum capacity battery',
      weight: '1.99 kg (4.38 lbs)',
      os: 'Windows 11 Pro',
      ports: ['1x Thunderbolt 4', '1x USB-C 3.2 Gen 2 (PD 3.0)', '1x USB-A 3.2 Gen 2', '1x HDMI 2.1 (8K 60Hz)', '1x SD Card Reader'],
      wireless: 'Wi-Fi 7 + Bluetooth 5.4',
      webcam: 'FHD IR Webcam with HDR & 3D Noise Reduction+'
    },
    config: {
      ramOptions: [{ label: '32GB DDR5', priceDelta: 0 }, { label: '64GB DDR5', priceDelta: 24000 }],
      storageOptions: [{ label: '2TB NVMe', priceDelta: 0 }, { label: '4TB NVMe', priceDelta: 34000 }],
      colorOptions: [{ name: 'Lunar Gray Magnesium', hex: '#4B5563', imageIndex: 0 }]
    },
    benchmarks: {
      geekbenchSingle: 2490,
      geekbenchMulti: 14100,
      cinebenchR23: 19500,
      timeSpy3DMark: 17600,
      batteryLifeHours: 8.5
    },
    highlights: ['Featherweight 1.99kg aerospace magnesium alloy', 'Vapor Chamber Cooler Boost 5', 'MSI AI Engine dynamically auto-tunes parameters'],
    inTheBox: ['MSI Creator 16 AI Studio', '240W Slim GaN Adapter', 'USB-C Docking Hub'],
    warranty: '2-Year RS Global Warranty'
  },

  // --- BUSINESS ELITE ---
  {
    id: 'thinkpad-x1-carbon-gen12',
    slug: 'lenovo-thinkpad-x1-carbon-gen-12',
    name: 'ThinkPad X1 Carbon Gen 12',
    brand: 'Lenovo',
    category: 'business',
    tagline: 'The Undisputed King of Business Ultrabooks',
    description: 'Iconic TrackPoint, carbon fiber reinforced chassis meeting MIL-STD-810H standards, Communications Bar with Computer Vision presence sensing, and Intel Core Ultra 7 vPro.',
    price: 184999,
    originalPrice: 224999,
    discountPercentage: 17,
    rating: 4.9,
    reviewCount: 310,
    isBestSeller: true,
    stockCount: 18,
    images: [
      '/images/laptops/thinkpad-x1.jpg',
      '/images/laptops/business-1.jpg',
      '/images/laptops/tech-1.jpg',
      '/images/laptops/student-1.jpg'
    ],
    specs: {
      processor: 'Intel Core Ultra 7 165U vPro (12 Cores, up to 4.9 GHz)',
      ram: '32GB LPDDR5X 6400MHz',
      storage: '1TB PCIe Gen4 Performance SSD (Opal 2.0 self-encrypting)',
      gpu: 'Intel Graphics',
      display: '14.0" 2.8K (2880 x 1800) OLED 120Hz Anti-reflective, 400 nits, 100% DCI-P3',
      displayResolution: '2880 x 1800 (2.8K)',
      refreshRate: '120Hz OLED',
      battery: '57WHr with Rapid Charge (80% in 60 mins)',
      weight: '1.09 kg (2.40 lbs)',
      os: 'Windows 11 Pro 64-bit',
      ports: ['2x Thunderbolt 4 (40Gbps)', '2x USB-A 3.2 Gen 1', '1x HDMI 2.1', '1x Nano-SIM (Optional)', '1x 3.5mm Headphone'],
      wireless: 'Intel Wi-Fi 6E + 5G Sub-6 LTE (Optional) + BT 5.3',
      webcam: '8MP MIPI IR Camera with Privacy Shutter & Presence Detection'
    },
    config: {
      ramOptions: [{ label: '32GB LPDDR5X', priceDelta: 0 }, { label: '64GB LPDDR5X', priceDelta: 28000 }],
      storageOptions: [{ label: '1TB Opal SSD', priceDelta: 0 }, { label: '2TB Opal SSD', priceDelta: 22000 }],
      colorOptions: [
        { name: 'Carbon Fiber Weave Top', hex: '#1A1A1A', imageIndex: 0 },
        { name: 'Deep Black Anodized', hex: '#0F0F10', imageIndex: 1 }
      ]
    },
    benchmarks: {
      geekbenchSingle: 2380,
      geekbenchMulti: 12200,
      cinebenchR23: 12800,
      batteryLifeHours: 14.5
    },
    highlights: ['Legendary ergonomic spill-resistant keyboard', 'Discrete TPM 2.0 Security Chip + Fingerprint on Power Button', 'Ultralight 1.09kg aerospace carbon construction'],
    inTheBox: ['ThinkPad X1 Carbon Gen 12', '65W USB-C GaN Charger', 'Quick Start Guide'],
    warranty: '3-Year Premier Support with Next Business Day Onsite'
  },
  {
    id: 'hp-elite-dragonfly-g4',
    slug: 'hp-elite-dragonfly-g4-business',
    name: 'HP Elite Dragonfly G4',
    brand: 'HP',
    category: 'business',
    tagline: 'Ultralight Executive Elegance Under 1 Kilogram',
    description: 'Designed for the modern C-suite leader. CNC magnesium chassis, dual camera multi-angle framing with HP Auto Frame, 5G LTE capability, and HP Wolf Pro Security.',
    price: 199999,
    originalPrice: 239999,
    discountPercentage: 16,
    rating: 4.8,
    reviewCount: 115,
    stockCount: 10,
    images: [
      '/images/laptops/hp-dragonfly.jpg',
      '/images/laptops/business-1.jpg',
      '/images/laptops/tech-1.jpg',
      '/images/laptops/macbook-2.jpg'
    ],
    specs: {
      processor: 'Intel Core i7-1365U vPro (10 Cores, up to 5.2 GHz)',
      ram: '32GB LPDDR5',
      storage: '1TB PCIe 4.0 NVMe TLC SSD',
      gpu: 'Intel Iris Xe Graphics',
      display: '13.5" 3:2 3Kx2K (3000 x 2000) OLED Touch, 400 nits, 100% DCI-P3',
      displayResolution: '3000 x 2000 (3:2 Aspect Ratio)',
      refreshRate: '60Hz OLED Touch',
      battery: '68WHr Long Life Fast-Charge Battery',
      weight: '0.99 kg (2.2 lbs)',
      os: 'Windows 11 Pro',
      ports: ['2x Thunderbolt 4', '1x SuperSpeed USB Type-A (5Gbps)', '1x HDMI 2.1', '1x 3.5mm combo'],
      wireless: 'Intel Wi-Fi 6E + 5G Snapdragon X62 Modem + BT 5.3',
      webcam: '5MP Camera with HP Auto Frame & AI Noise Reduction'
    },
    config: {
      ramOptions: [{ label: '32GB LPDDR5', priceDelta: 0 }],
      storageOptions: [{ label: '1TB NVMe', priceDelta: 0 }, { label: '2TB NVMe', priceDelta: 19000 }],
      colorOptions: [
        { name: 'Slate Blue Magnesium', hex: '#2C3E50', imageIndex: 0 },
        { name: 'Natural Silver', hex: '#E5E7EB', imageIndex: 1 }
      ]
    },
    benchmarks: {
      geekbenchSingle: 2310,
      geekbenchMulti: 10900,
      cinebenchR23: 11200,
      batteryLifeHours: 15.8
    },
    highlights: ['Sub-1kg featherweight luxury magnesium build', 'HP Wolf Security hardware-enforced protection', '3:2 tall aspect ratio for optimal spreadsheet and document viewing'],
    inTheBox: ['HP Elite Dragonfly G4', '65W Slim USB-C Adapter', 'HP Executive Sleeve'],
    warranty: '3-Year RS Enterprise Care'
  },

  // --- WORKSTATIONS / PERFORMANCE ---
  {
    id: 'framework-laptop-16',
    slug: 'framework-laptop-16-modular-performance',
    name: 'Framework Laptop 16 (Modular)',
    brand: 'Framework',
    category: 'performance',
    tagline: '100% Upgradable, Repairable & Modular Beast',
    description: 'The future of sustainable high-performance computing. Swap graphics modules, change expansion ports on the fly, upgrade mainboards, and customize the input deck with mechanical numpads and macropads.',
    price: 219999,
    originalPrice: 249999,
    discountPercentage: 12,
    rating: 4.9,
    reviewCount: 220,
    isNew: true,
    isFeatured: true,
    stockCount: 14,
    images: [
      '/images/laptops/framework-16.jpg',
      '/images/laptops/tech-1.jpg',
      '/images/laptops/gaming-3.jpg',
      '/images/laptops/creator-1.jpg'
    ],
    specs: {
      processor: 'AMD Ryzen 9 7940HS (8 Cores / 16 Threads, 5.2 GHz)',
      ram: '64GB DDR5 5600MHz (2x SODIMM Slots, up to 96GB)',
      storage: '2TB WD_BLACK SN850X NVMe (Dual M.2 slots)',
      gpu: 'Modular AMD Radeon RX 7700S 8GB (Expansion Bay Module)',
      display: '16.0" 2560x1600 (16:10) 165Hz Matte Display, 500 nits, 100% DCI-P3, FreeSync',
      displayResolution: '2560 x 1600 (QHD+)',
      refreshRate: '165Hz FreeSync Premium',
      battery: '85WHr battery (180W USB-C GaN charger)',
      weight: '2.40 kg (5.29 lbs)',
      os: 'Windows 11 Pro / Linux Certified',
      ports: ['6x Modular User-Configurable Expansion Cards (USB-C, USB-A, HDMI, DP, MicroSD, Audio)'],
      wireless: 'Wi-Fi 7 + Bluetooth 5.4',
      webcam: '1080p 60fps with physical hardware privacy killswitches'
    },
    config: {
      ramOptions: [{ label: '32GB DDR5', priceDelta: -15000 }, { label: '64GB DDR5', priceDelta: 0 }, { label: '96GB DDR5', priceDelta: 26000 }],
      storageOptions: [{ label: '1TB NVMe', priceDelta: -10000 }, { label: '2TB NVMe', priceDelta: 0 }, { label: '4TB NVMe Dual', priceDelta: 28000 }],
      colorOptions: [{ name: 'Anodized Aluminum Gray', hex: '#64748B', imageIndex: 0 }]
    },
    benchmarks: {
      geekbenchSingle: 2650,
      geekbenchMulti: 14200,
      cinebenchR23: 17900,
      timeSpy3DMark: 11400,
      batteryLifeHours: 9.0
    },
    highlights: ['Modular Expansion Bay for interchangeable discrete GPUs', 'Fully open source embedded controller and schematics', 'Included T5 screwdriver for complete disassembly in under 5 minutes'],
    inTheBox: ['Framework 16 Laptop', '180W GaN USB-C Charger', 'Framework T5 Screwdriver/Spudger', '6x Expansion Cards of Choice'],
    warranty: '2-Year RS Open-Hardware Warranty with Free Spare Parts Credit'
  },
  {
    id: 'dell-precision-7780',
    slug: 'dell-precision-7780-workstation',
    name: 'Dell Precision 7780 Workstation',
    brand: 'Dell',
    category: 'performance',
    tagline: 'Certified Mobile Supercomputer for AI & CAD',
    description: 'Built for mission-critical engineering. Equipped with NVIDIA RTX 5000 Ada Generation 16GB, CAMM DDR5 memory, four NVMe slots, and ISV certifications across AutoCAD, SolidWorks, and Revit.',
    price: 389999,
    originalPrice: 459999,
    discountPercentage: 15,
    rating: 4.9,
    reviewCount: 64,
    stockCount: 4,
    images: [
      '/images/laptops/dell-precision-7780.jpg',
      '/images/laptops/gaming-3.jpg',
      '/images/laptops/business-1.jpg',
      '/images/laptops/creator-1.jpg'
    ],
    specs: {
      processor: 'Intel Core i9-13950HX vPro (24 Cores, 32 Threads, up to 5.5 GHz)',
      ram: '64GB CAMM DDR5 5600MHz',
      storage: '4TB (2x 2TB NVMe PCIe Gen4 in RAID 1 Mirroring)',
      gpu: 'NVIDIA RTX 5000 Ada Generation 16GB GDDR6 (ISV Certified)',
      display: '17.3" UHD (3840 x 2160) 120Hz Anti-Glare, 500 nits, 100% DCI-P3 PremierColor',
      displayResolution: '3840 x 2160 (4K UHD)',
      refreshRate: '120Hz PremierColor',
      battery: '93WHr ExpressCharge capable',
      weight: '3.05 kg (6.73 lbs)',
      os: 'Windows 11 Pro for Workstations',
      ports: ['2x Thunderbolt 4', '1x USB 3.2 Gen 2 Type-C', '2x USB 3.2 Gen 1 Type-A', '1x HDMI 2.1', '1x Mini DisplayPort 1.4', '1x RJ-45 LAN', '1x SD Card'],
      wireless: 'Intel Wi-Fi 6E + Bluetooth 5.3',
      webcam: 'FHD IR Camera with Proximity Sensor'
    },
    config: {
      ramOptions: [{ label: '64GB CAMM DDR5', priceDelta: 0 }, { label: '128GB CAMM DDR5', priceDelta: 65000 }],
      storageOptions: [{ label: '4TB NVMe RAID', priceDelta: 0 }, { label: '8TB (4x 2TB NVMe)', priceDelta: 72000 }],
      colorOptions: [{ name: 'Titan Gray Aluminum', hex: '#374151', imageIndex: 0 }]
    },
    benchmarks: {
      geekbenchSingle: 2900,
      geekbenchMulti: 16400,
      cinebenchR23: 31200,
      timeSpy3DMark: 18900,
      batteryLifeHours: 6.5
    },
    highlights: ['NVIDIA RTX 5000 Ada with 16GB ECC VRAM', 'Supports up to 16TB total internal storage across 4 M.2 slots', 'Dell Optimizer AI tailored for professional CAD apps'],
    inTheBox: ['Dell Precision 7780', '240W Barrel AC Adapter', 'Recovery Media', 'Docs'],
    warranty: '3-Year RS Enterprise Workstation Care with 4-Hour Response'
  },

  // --- STUDENT & CAMPUS ---
  {
    id: 'asus-zenbook-14-oled-um3406',
    slug: 'asus-zenbook-14-oled-amd',
    name: 'ASUS Zenbook 14 OLED (Ryzen 7)',
    brand: 'ASUS',
    category: 'student',
    tagline: 'Stunning 3K OLED & 17-Hour Battery for Campus Life',
    description: 'The student dream laptop. Powered by AMD Ryzen 7 8840HS with Ryzen AI, vibrant 14-inch 120Hz OLED screen, NumberPad integrated in the trackpad, and weighing just 1.2 kg.',
    price: 99999,
    originalPrice: 119999,
    discountPercentage: 16,
    rating: 4.8,
    reviewCount: 388,
    isBestSeller: true,
    isFeatured: true,
    stockCount: 25,
    images: [
      '/images/laptops/asus-zenbook-14.jpg',
      '/images/laptops/student-1.jpg',
      '/images/laptops/macbook-2.jpg',
      '/images/laptops/tech-1.jpg'
    ],
    specs: {
      processor: 'AMD Ryzen 7 8840HS (8 Cores / 16 Threads, Ryzen AI 16 NPU TOPS)',
      ram: '16GB LPDDR5X 7500MHz',
      storage: '1TB PCIe 4.0 NVMe SSD',
      gpu: 'AMD Radeon 780M Graphics (High-Efficiency RDNA3)',
      display: '14.0" 3K (2880 x 1800) OLED 16:10 120Hz 0.2ms, 600 nits HDR, 100% DCI-P3',
      displayResolution: '2880 x 1800 (3K OLED)',
      refreshRate: '120Hz OLED',
      battery: '75WHr high-density battery (Up to 17 hours)',
      weight: '1.20 kg (2.65 lbs)',
      os: 'Windows 11 Home',
      ports: ['1x USB4 40Gbps', '1x USB 3.2 Gen 2 Type-C', '1x USB 3.2 Gen 1 Type-A', '1x HDMI 2.1 TMDS', '1x 3.5mm combo'],
      wireless: 'Wi-Fi 6E + Bluetooth 5.3',
      webcam: 'FHD IR camera with Windows Hello & 3DNR'
    },
    config: {
      ramOptions: [{ label: '16GB LPDDR5X', priceDelta: 0 }, { label: '32GB LPDDR5X', priceDelta: 16000 }],
      storageOptions: [{ label: '1TB NVMe SSD', priceDelta: 0 }, { label: '2TB NVMe SSD', priceDelta: 14000 }],
      colorOptions: [
        { name: 'Ponder Blue Matte', hex: '#1E293B', imageIndex: 0 },
        { name: 'Foggy Silver', hex: '#CBD5E1', imageIndex: 1 }
      ]
    },
    benchmarks: {
      geekbenchSingle: 2420,
      geekbenchMulti: 11900,
      cinebenchR23: 15400,
      batteryLifeHours: 16.5
    },
    highlights: ['Class-leading 17-hour battery life', 'ASUS NumberPad 2.0 LED numeric keypad on glass trackpad', 'Harman Kardon Dolby Atmos sound system'],
    inTheBox: ['ASUS Zenbook 14 OLED', '65W USB-C Compact Charger', 'Protective Felt Sleeve'],
    warranty: '2-Year RS Campus Protection'
  },
  {
    id: 'hp-envy-x360-15',
    slug: 'hp-envy-x360-15-2in1',
    name: 'HP Envy x360 2-in-1 (15.6")',
    brand: 'HP',
    category: 'student',
    tagline: 'Versatile Convertible with IMAX Enhanced OLED',
    description: 'Flip effortlessly between laptop for note-taking, tent mode for video lectures, and tablet mode for digital sketching with included rechargeable HP Tilt Pen.',
    price: 89999,
    originalPrice: 109999,
    discountPercentage: 18,
    rating: 4.7,
    reviewCount: 260,
    stockCount: 20,
    images: [
      '/images/laptops/hp-envy-x360.jpg',
      '/images/laptops/creator-1.jpg',
      '/images/laptops/student-1.jpg',
      '/images/laptops/tech-1.jpg'
    ],
    specs: {
      processor: 'Intel Core Ultra 5 125U (12 Cores, up to 4.3 GHz)',
      ram: '16GB LPDDR5',
      storage: '512GB PCIe NVMe SSD',
      gpu: 'Intel Graphics',
      display: '15.6" FHD (1920 x 1080) OLED Touch 360-degree hinge, IMAX Enhanced, 500 nits',
      displayResolution: '1920 x 1080 (FHD Touch)',
      refreshRate: '60Hz Touch / Pen Active',
      battery: '55WHr with HP Fast Charge (50% in 30 mins)',
      weight: '1.78 kg (3.92 lbs)',
      os: 'Windows 11 Home',
      ports: ['2x Thunderbolt 4', '2x USB-A 3.2 Gen 2', '1x HDMI 2.1', '1x SD Media Reader', '1x 3.5mm combo'],
      wireless: 'Wi-Fi 6E + Bluetooth 5.3',
      webcam: '5MP IR camera with manual privacy shutter'
    },
    config: {
      ramOptions: [{ label: '16GB LPDDR5', priceDelta: 0 }],
      storageOptions: [{ label: '512GB NVMe', priceDelta: 0 }, { label: '1TB NVMe', priceDelta: 10000 }],
      colorOptions: [
        { name: 'Nightfall Black Aluminum', hex: '#1C1917', imageIndex: 0 },
        { name: 'Natural Silver', hex: '#E2E8F0', imageIndex: 1 }
      ]
    },
    benchmarks: {
      geekbenchSingle: 2150,
      geekbenchMulti: 9400,
      cinebenchR23: 10200,
      batteryLifeHours: 12.0
    },
    highlights: ['360-degree geared hinge for 4 flexible modes', 'IMAX Enhanced certified cinematic audio-visuals', 'Rechargeable HP MPP 2.0 Tilt Pen included in box'],
    inTheBox: ['HP Envy x360', 'HP Rechargeable MPP 2.0 Tilt Pen', '65W USB-C Adapter'],
    warranty: '1-Year RS Comprehensive Warranty'
  },
  {
    id: 'acer-swift-go-14-oled',
    slug: 'acer-swift-go-14-oled-ai',
    name: 'Acer Swift Go 14 OLED AI',
    brand: 'Acer',
    category: 'student',
    tagline: 'Incredible 2.8K 90Hz OLED Value with Intel AI Boost',
    description: 'Compact, ultra-crisp 2.8K OLED display with 100% DCI-P3 color gamut, 1440p QHD AI webcam for crystal-clear Zoom classes, and fast all-day USB-C charging.',
    price: 79999,
    originalPrice: 94999,
    discountPercentage: 15,
    rating: 4.7,
    reviewCount: 195,
    stockCount: 30,
    images: [
      '/images/laptops/acer-swift-go-14.jpg',
      '/images/laptops/business-1.jpg',
      '/images/laptops/student-1.jpg',
      '/images/laptops/tech-1.jpg'
    ],
    specs: {
      processor: 'Intel Core Ultra 7 155H (16 Cores, 22 Threads)',
      ram: '16GB LPDDR5X',
      storage: '1TB PCIe 4.0 NVMe SSD',
      gpu: 'Intel Arc Graphics',
      display: '14.0" 2.8K (2880 x 1800) OLED 16:10, 90Hz, 500 nits, 100% DCI-P3, DisplayHDR 500',
      displayResolution: '2880 x 1800 (2.8K)',
      refreshRate: '90Hz OLED',
      battery: '65WHr Li-ion (Up to 12.5 hours)',
      weight: '1.32 kg (2.91 lbs)',
      os: 'Windows 11 Home',
      ports: ['2x Thunderbolt 4 / USB-C', '2x USB 3.2 Gen 1 Type-A', '1x HDMI 2.1', '1x MicroSD Slot', '1x 3.5mm Headphone'],
      wireless: 'Wi-Fi 7 + Bluetooth 5.3',
      webcam: '1440p QHD Camera with Acer PurifiedVoice AI'
    },
    config: {
      ramOptions: [{ label: '16GB LPDDR5X', priceDelta: 0 }],
      storageOptions: [{ label: '1TB NVMe', priceDelta: 0 }, { label: '2TB NVMe', priceDelta: 13000 }],
      colorOptions: [{ name: 'Steel Gray Aluminum', hex: '#475569', imageIndex: 0 }]
    },
    benchmarks: {
      geekbenchSingle: 2360,
      geekbenchMulti: 12400,
      cinebenchR23: 15200,
      batteryLifeHours: 12.2
    },
    highlights: ['2.8K 90Hz OLED with DisplayHDR True Black 500', '1440p QHD webcam with dual AI microphones', '180-degree lie-flat hinge for study groups'],
    inTheBox: ['Acer Swift Go 14', '100W USB-C GaN Charger', 'User Guide'],
    warranty: '1-Year RS Express Warranty'
  },
  {
    id: 'samsung-galaxy-book4-ultra',
    slug: 'samsung-galaxy-book-4-ultra',
    name: 'Samsung Galaxy Book4 Ultra',
    brand: 'Samsung',
    category: 'creator',
    tagline: 'Dynamic AMOLED 2X Touch Screen & Galaxy AI Ecosystem',
    description: 'Immerse yourself in a 16-inch 3K Dynamic AMOLED 2X touch display with anti-reflective glass. Features seamless Samsung Galaxy multi-control, Second Screen tablet integration, and RTX 4070 power.',
    price: 249999,
    originalPrice: 289999,
    discountPercentage: 14,
    rating: 4.8,
    reviewCount: 154,
    isNew: true,
    stockCount: 10,
    images: [
      '/images/laptops/samsung-galaxy-book4.jpg',
      '/images/laptops/tech-1.jpg',
      '/images/laptops/creator-1.jpg',
      '/images/laptops/gaming-2.jpg'
    ],
    specs: {
      processor: 'Intel Core Ultra 9 185H (Intel AI Boost NPU)',
      ram: '32GB LPDDR5X 7467MHz',
      storage: '1TB PCIe 4.0 SSD',
      gpu: 'NVIDIA GeForce RTX 4070 8GB GDDR6',
      display: '16.0" 3K (2880 x 1800) Dynamic AMOLED 2X Touch, 120Hz VRR, 120% DCI-P3, Anti-Reflective Glass',
      displayResolution: '2880 x 1800 (3K Touch)',
      refreshRate: '120Hz VRR Adaptive',
      battery: '76WHr with 140W Ultra-Fast GaN charger (55% in 30 min)',
      weight: '1.86 kg (4.10 lbs)',
      os: 'Windows 11 Home with Samsung Galaxy Connected Experience',
      ports: ['2x Thunderbolt 4', '1x USB 3.2 Type-A', '1x HDMI 2.1 (8K 60Hz / 4K 120Hz)', '1x MicroSD slot', '1x 3.5mm combo'],
      wireless: 'Wi-Fi 6E + Bluetooth 5.3',
      webcam: '1080p FHD with Studio Effects'
    },
    config: {
      ramOptions: [{ label: '32GB LPDDR5X', priceDelta: 0 }, { label: '64GB LPDDR5X', priceDelta: 28000 }],
      storageOptions: [{ label: '1TB NVMe', priceDelta: 0 }, { label: '2TB NVMe', priceDelta: 20000 }],
      colorOptions: [{ name: 'Moonstone Gray', hex: '#334155', imageIndex: 0 }]
    },
    benchmarks: {
      geekbenchSingle: 2480,
      geekbenchMulti: 13900,
      cinebenchR23: 18600,
      timeSpy3DMark: 12200,
      batteryLifeHours: 12.8
    },
    highlights: ['Anti-reflective Corning Gorilla Glass with DX coating', 'AKG Quad-speaker array with Dolby Atmos', 'Galaxy Phone & Tab second screen integration'],
    inTheBox: ['Galaxy Book4 Ultra', '140W USB-C GaN Charger', 'USB-C to USB-C 5A Cable'],
    warranty: '2-Year RS VIP Support'
  }
];
