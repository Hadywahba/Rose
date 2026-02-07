import { Locale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { formats } from '@/i18n/request';
import messages from './messages/en.json';
import { getTranslations } from 'next-intl/server';

// next intl Types
declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
    Formats: typeof formats;
  }
}

// Params Types
declare type Params = {
  locale: Locale;
};

// SearchParams Types
declare type SearchParams = Record<string, string | string[] | undefined>;

// Props Types
declare type RouteProps = {
  params: Params;
  searchParams: SearchParams;
};

declare type Translations = Awaited<ReturnType<typeof getTranslations>>;
