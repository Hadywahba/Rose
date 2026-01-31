import { routing } from '@/i18n/routing';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { Sarabun, Tajawal } from 'next/font/google';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/app/header';
import Footer from '@/components/layout/app/footer';
import Providers from '@/components/providers';

const sarabun = Sarabun({
  subsets: ['latin', 'thai'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sarabun',
});

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700', '800'],
  variable: '--font-tajawal',
});

type LayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: Pick<LayoutProps, 'params'>) {
  const t = await getTranslations({ locale });

  return {
    title: t('title'),
    alternates: {
      canonical: '/',
      languages: {
        en: '/en',
        ar: '/ar',
      },
    },
  };
}
// Generate static parameters for all supported locales, enabling pre-rendering for each language version
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {


  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body
        className={`${locale === 'ar'
          ? tajawal.className
          : sarabun.className
          } antialiased [@media(min-width:1920px)]:container [@media(min-width:1920px)]:mx-auto`}
      >
        <Providers>
          <Header />
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
