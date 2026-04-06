import { Cookie, Lock, Shield } from 'lucide-react';
import { PrivacyCards, PrivacyIcons } from '../types/privacy/privacy';

export const Cards: PrivacyCards[] = [
  {
    text: 'collect',
  },
  {
    text: 'why',
  },
  {
    text: 'protect',
  },
  {
    text: 'share',
  },
];

export const Icons: PrivacyIcons[] = [
  { Icons: Shield },
  { Icons: Lock },
  { Icons: Cookie },
  { Icons: Shield },
];
