import { getAssetUrl } from '../components/common/SafeImage';

export interface CategoryInfo {
  id: 'gaming' | 'ultrabook' | 'business' | 'creator' | 'student' | 'performance';
  name: string;
  shortDesc: string;
  fullDesc: string;
  bannerImage: string;
  accentColor: string;
  iconName: string;
  laptopCount: number;
  highlightSpec: string;
}

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: 'gaming',
    name: 'Gaming Rigs',
    shortDesc: 'Uncompromising FPS with RTX 4090 & liquid metal cooling',
    fullDesc: 'Dominate esports and AAA blockbusters with high-TGP NVIDIA RTX graphics, 240Hz+ OLED displays, mechanical keyboards, and vapor chamber thermals.',
    bannerImage: getAssetUrl('/images/categories/gaming.jpg'),
    accentColor: '#FF0033',
    iconName: 'Gamepad2',
    laptopCount: 8,
    highlightSpec: 'Up to RTX 4090 175W + 300Hz QHD'
  },

  {
    id: 'ultrabook',
    name: 'Ultrabooks',
    shortDesc: 'Featherlight precision CNC unibody & all-day battery life',
    fullDesc: 'Engineered for discerning modern executives and travelers. Whisper-quiet fanless and ultra-slim designs with 18+ hour battery endurance and borderless screens.',
    bannerImage: getAssetUrl('/images/categories/ultrabook.jpg'),
    accentColor: '#FFFFFF',
    iconName: 'Feather',
    laptopCount: 7,
    highlightSpec: 'Under 1.2 kg & 22h Battery'
  },
  {
    id: 'creator',
    name: 'Creator Studio',
    shortDesc: 'Color-accurate 4K OLED, DCI-P3 100% & hardware encode engines',
    fullDesc: 'Breathe life into 8K video editing, 3D CGI rendering, and architectural modeling with factory-calibrated Pantone validated displays and dual encoder silicon.',
    bannerImage: getAssetUrl('/images/categories/creator.jpg'),
    accentColor: '#FF2A4D',
    iconName: 'Palette',
    laptopCount: 6,
    highlightSpec: '100% DCI-P3 & Pro Cinema Silicon'
  },
  {
    id: 'business',
    name: 'Business Elite',
    shortDesc: 'Enterprise biometric security, MIL-STD toughness & 5G connectivity',
    fullDesc: 'Built for enterprise leadership. Features discrete TPM 2.0, mechanical privacy shutters, carbon fiber reinforcement, and legendary ergonomic keyboards.',
    bannerImage: getAssetUrl('/images/categories/business.jpg'),
    accentColor: '#E5E7EB',
    iconName: 'Briefcase',
    laptopCount: 6,
    highlightSpec: 'vPro Security + Carbon Fiber Chassis'
  },
  {
    id: 'performance',
    name: 'Workstations',
    shortDesc: 'Maxed multicore compute, ECC RAM & modular upgradeability',
    fullDesc: 'Extreme mobile desktop replacement workstations tailored for data science, AI training, CAD simulation, and massive parallel computing workloads.',
    bannerImage: getAssetUrl('/images/categories/performance.jpg'),
    accentColor: '#DC2626',
    iconName: 'Cpu',
    laptopCount: 5,
    highlightSpec: '64GB+ RAM & 16-Core Extreme CPU'
  },
  {
    id: 'student',
    name: 'Student & Campus',
    shortDesc: 'High efficiency, durable construction & unbeatable value',
    fullDesc: 'The ultimate academic companions. Fast multi-tasking, all-day battery life, crisp displays for lectures, and lightweight builds that slip easily into any backpack.',
    bannerImage: getAssetUrl('/images/categories/student.jpg'),
    accentColor: '#F87171',
    iconName: 'GraduationCap',
    laptopCount: 6,
    highlightSpec: 'All-Day Charge & Fast Wi-Fi 7'
  }
];
