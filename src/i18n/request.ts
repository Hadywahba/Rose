import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import { CURRENCY } from '@/lib/constants/global.constant';

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  const numberingSystem = locale === 'ar' ? 'arab' : 'latn';

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
    formats: {
      number: {
        'currency-full': {
          numberingSystem,
          style: 'currency',
          currency: CURRENCY,
          currencyDisplay: 'symbol',
        },
        'percentage-base': {
          style: 'percent',
          numberingSystem,
        },
        numbers: {
          numberingSystem,
          style: 'decimal',
        },
        'currency-no-decimals': {
          numberingSystem,
          style: 'currency',
          currency: CURRENCY,
          currencyDisplay: 'symbol',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        },
        'currency-after-number': {
          numberingSystem,
          style: 'currency',
          currency: CURRENCY,
          currencyDisplay: 'symbol',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
        'currancy-base': {
          numberingSystem: locale === 'ar' ? 'arab' : 'latn',
          currency: CURRENCY,
          style: 'currency',
          maximumFractionDigits: 0,
        },
        decimals: {
          numberingSystem,
          style: 'decimal',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        },
      },
      dateTime: {
        'date-max': {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',

          weekday: 'long',
          dayPeriod: 'long',
          numberingSystem,
        },
      },
    },
  };
});
