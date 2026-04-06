import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function FooterUpperBody() {
      // Translation
      const t = useTranslations('homepage');

  return (
    <div className="rounded-3xl border border-maroon-200/70 bg-white/80 p-6 shadow-lg shadow-maroon-100/60 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/80 dark:shadow-none md:p-7">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-maroon-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-maroon-700 dark:bg-maroon-900/40 dark:text-softpink-200">
            <Sparkles className="h-3.5 w-3.5" />
            Rose
          </p>
          <h3 className="text-xl font-bold text-maroon-700 dark:text-softpink-200 sm:text-2xl">
            {t('footer.faq.contact.heading')}
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {t('footer.faq.contact.description')}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            asChild
            className="h-10 rounded-full bg-maroon-600 px-5 text-xs font-semibold hover:bg-maroon-700"
          >
            <Link href="/faq">
              {t('footer.faqs')}
              <ArrowRight className="ms-1 h-3.5 w-3.5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-10 rounded-full border-maroon-300 bg-white px-5 text-xs font-semibold text-maroon-700 hover:bg-maroon-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            <Link href="/contact">{t('footer.contact')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
