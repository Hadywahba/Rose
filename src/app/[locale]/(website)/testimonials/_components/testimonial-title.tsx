import { HandHeart, Lock, Quote } from 'lucide-react';
import { useTranslations } from 'next-intl';
import TestimonialFeatureItem from './testimonial-feature-item';

export default function TestimonialTitle() {
  const t = useTranslations('testimonial');

  return (
    <section className="flex h-full flex-col justify-center gap-6 p-8 lg:p-12">
      {/* Quote decoration */}
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-maroon-100 dark:bg-maroon-900/40">
        <Quote className="h-6 w-6 text-maroon-600 dark:text-softpink-400" />
      </div>

      {/* Text */}
      <div className="space-y-3">
        <p className="text-sm font-bold uppercase tracking-widest text-maroon-600 dark:text-softpink-400">
          {t('title')}
        </p>
        <h2 className="text-3xl font-extrabold leading-tight text-zinc-800 dark:text-zinc-50 lg:text-4xl">
          {t('text')}
        </h2>
        <p className="text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
          {t('description')}
        </p>
      </div>

      {/* Features */}
      <div className="flex flex-col gap-3">
        <TestimonialFeatureItem
          icon={<Lock className="h-5 w-5 text-white dark:text-zinc-900" />}
          title={t('text-title-first')}
          description={t('description-title-first')}
        />
        <TestimonialFeatureItem
          icon={<HandHeart className="h-5 w-5 text-white dark:text-zinc-900" />}
          title={t('text-title-second')}
          description={t('description-title-second')}
        />
      </div>

      {/* Decorative bottom */}
      <div className="mt-2 flex items-center gap-2">
        <div className="h-1 w-12 rounded-full bg-maroon-600 dark:bg-softpink-400" />
        <div className="h-1 w-6 rounded-full bg-maroon-300 dark:bg-maroon-700" />
        <div className="h-1 w-3 rounded-full bg-maroon-200 dark:bg-maroon-800" />
      </div>
    </section>
  );
}
