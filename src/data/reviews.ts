import { LaptopReview } from '../types/product';
import { getAssetUrl } from '../components/common/SafeImage';

export const SAMPLE_REVIEWS: Record<string, LaptopReview[]> = {
  default: [
    {
      id: 'rev-1',
      author: 'Marcus Vance',
      avatar: getAssetUrl('/images/avatars/avatar-1.jpg'),
      rating: 5,
      date: '3 days ago',
      title: 'Unbelievable performance and whisper-quiet thermals',
      comment: 'I upgraded from an older machine and the difference in compile times and Unreal Engine 5 rendering is night and day. The display calibration is studio-grade.',
      verifiedPurchase: true,
      helpfulCount: 42
    },
    {
      id: 'rev-2',
      author: 'Elena Rostova',
      avatar: getAssetUrl('/images/avatars/avatar-2.jpg'),
      rating: 5,
      date: '1 week ago',
      title: 'The build quality is breathtaking',
      comment: 'CNC machined chassis with zero keyboard flex. Trackpad gestures are responsive and tactile. Battery easily lasts an entire 10-hour workday of heavy design work.',
      verifiedPurchase: true,
      helpfulCount: 28
    },
    {
      id: 'rev-3',
      author: 'Devon Takahashi',
      avatar: getAssetUrl('/images/avatars/avatar-3.jpg'),
      rating: 4,
      date: '2 weeks ago',
      title: 'Top-tier graphics, power brick is a bit hefty',
      comment: 'Frames never drop below 140 FPS in Cyberpunk with ray tracing overdrive enabled. The power adapter is a bit bulky, but considering the wattage it makes sense.',
      verifiedPurchase: true,
      helpfulCount: 19
    }
  ]
};
