import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FAQContact() {
  // Translation
  const t = useTranslations('faq');

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-maroon-600 to-maroon-700 py-14 dark:from-maroon-800 dark:to-maroon-900 sm:py-20">
      <div className="pointer-events-none absolute -left-16 top-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-softpink-400/20 blur-3xl" />

      <div className="container relative mx-auto px-4 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white/20 shadow-lg shadow-maroon-900/30">
          <MessageCircle className="h-7 w-7 text-white" />
        </div>

        <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
          {t('contact.heading')}
        </h2>
        <p className="mx-auto mb-8 max-w-md text-sm text-maroon-100 sm:text-base">
          {t('contact.description')}
        </p>

        <Button
          asChild
          className="h-12 rounded-full bg-white px-8 font-semibold text-maroon-700 shadow-lg shadow-maroon-900/20 transition-transform hover:scale-[1.02] hover:bg-maroon-50"
        >
          <Link href="/contact">{t('contact.button')}</Link>
        </Button>
      </div>
    </section>
  );
}
