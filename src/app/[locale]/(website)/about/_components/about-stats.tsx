import { useTranslations } from 'next-intl';
import { Package, Star, Smile, Award } from 'lucide-react';

export default function AboutStats() {
  const t = useTranslations('about-page.stats');

  const stats = [
    { icon: Package, value: '5K+', label: t('orders') },
    { icon: Star, value: '4.9', label: t('rating') },
    { icon: Smile, value: '3K+', label: t('customers') },
    { icon: Award, value: '2+', label: t('years') },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-maroon-50/40 to-white py-14 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 sm:py-20">
      <div className="pointer-events-none absolute -left-12 top-8 h-40 w-40 rounded-full bg-maroon-200/40 blur-3xl dark:bg-maroon-800/30" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-softpink-300/30 blur-3xl dark:bg-softpink-900/20" />

      <div className="container relative mx-auto px-4 lg:px-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <article
              key={i}
              className="group relative isolate overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-6 shadow-lg shadow-maroon-100/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-maroon-200/70 dark:border-zinc-700/80 dark:bg-zinc-900/80 dark:shadow-none"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-maroon-600 via-softpink-500 to-maroon-500" />
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-maroon-100/70 transition-transform duration-300 group-hover:scale-125 dark:bg-maroon-900/40" />

              <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-maroon-600 to-softpink-500 shadow-md shadow-maroon-200 dark:shadow-none">
                <Icon className="h-5 w-5 text-white" />
              </div>

              <p className="text-3xl font-extrabold tracking-tight text-maroon-700 dark:text-softpink-200">
                {value}
              </p>
              <p className="mt-1 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
