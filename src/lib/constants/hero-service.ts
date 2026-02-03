import { Headset, RefreshCw, ShieldCheck, Truck } from 'lucide-react';
import { HeroService } from '../types/home/hero-service';

export const heroService: HeroService[] = [
  {
    id: 1,
    Icon: Truck,
    text: 'free-delivery.text',
    title: 'free-delivery.title',
  },
  {
    id: 2,
    Icon: RefreshCw,
    text: 'refund.text',
    title: 'refund.title',
  },
  {
    id: 3,
    Icon: ShieldCheck,
    text: 'secure-payment.text',
    title: 'secure-payment.title',
  },
  {
    Icon: Headset,
    id: 4,
    text: 'support.text',
    title: 'support.title',
  },
];
