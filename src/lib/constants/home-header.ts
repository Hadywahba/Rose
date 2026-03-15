import {
  Gift,
  Headset,
  Home,
  Info,
  LayoutGrid,
  PartyPopper,
} from 'lucide-react';
import { HomeMenuHeader } from '../types/header/home-header';


// Header column items without IDs
const headercolumnItems: Omit<HomeMenuHeader, 'id'>[] = [
  {
    name: 'header.home',
    link: '/',
    Icon: Home,
  },
  {
    name: 'header.products',
    link: '/products',
    Icon: Gift,
  },
  {
    name: 'header.categories',
    link: '/categorie',
    Icon: LayoutGrid,
  },
  {
    name: 'header.occasions',
    link: '/occasion',
    Icon: PartyPopper,
  },
  {
    name: 'header.contact',
    link: '/contact',
    Icon: Headset,
  },
  {
    name: 'header.about',
    link: '/about',
    Icon: Info,
  },
];

// Export final header with IDs
export const homeheadercolumnItems: HomeMenuHeader[] = headercolumnItems.map(
  (item, index) => ({
    ...item,
    id: index + 1,
  }),
);
