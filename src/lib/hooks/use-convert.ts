import { useLocale } from 'next-intl';

export const useCurrency = () => {
  const locale = useLocale();

  return locale === 'ar' ? 'ج.م' : 'EGP';
};
