'use client';

import { Link } from '@/i18n/navigation';
import { MessageSquareHeart, PenLine, Quote, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function StartFeedback() {
  const t = useTranslations('testimonial');

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl px-6 py-14 text-center">

      {/* Decorative blur circles — light: maroon tones / dark: softer */}
      <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-maroon-300/30 blur-2xl dark:bg-maroon-950/60" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-softpink-300/30 blur-2xl dark:bg-zinc-900/60" />

      {/* Floating quote icons */}
      <Quote className="absolute left-6 top-6 h-8 w-8 rotate-180 text-maroon-300 dark:text-zinc-500" />
      <Quote className="absolute bottom-6 right-6 h-8 w-8 text-maroon-200 dark:text-zinc-600" />

      {/* Main icon */}
      <div className="relative mb-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-maroon-700 to-maroon-500 shadow-lg">
          <MessageSquareHeart className="h-10 w-10 text-white" />
        </div>
        {/* Star badge */}
        <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-softpink-500 shadow-md dark:bg-softpink-400">
          <Star className="h-3.5 w-3.5 fill-white text-white" />
        </div>
      </div>

      {/* Subtitle — small label */}
      <p className="mb-1 text-sm font-bold uppercase tracking-widest text-maroon-500 dark:text-softpink-300">
        {t('page-title')}
      </p>

      {/* Title */}
      <h2 className="mb-3 text-2xl font-extrabold text-maroon-800 dark:text-zinc-50 sm:text-3xl">
        {t('page-form-title')}
      </h2>

      {/* Description */}
      <p className="mb-8 max-w-md text-sm leading-relaxed text-maroon-700/70 dark:text-zinc-300">
        {t('page-form-subtitle')}
      </p>

      {/* Button */}
      <Link href="/testimonials">
        <button className="group flex items-center gap-2.5 rounded-2xl bg-maroon-700 px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-maroon-800 hover:shadow-lg active:scale-95 dark:bg-softpink-400 dark:text-zinc-900 dark:hover:bg-softpink-500">
          <PenLine className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
          {t('form-button')}
        </button>
      </Link>
    </div>
  );
}
