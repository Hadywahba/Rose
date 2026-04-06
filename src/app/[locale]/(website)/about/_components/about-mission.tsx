import { useTranslations } from 'next-intl';
import { Heart, Sparkles, Target } from 'lucide-react';

export default function AboutMission() {
  const t = useTranslations('about-page.mission');

  const values = [
    { icon: Heart, title: t('values.0.title'), desc: t('values.0.desc') },
    { icon: Sparkles, title: t('values.1.title'), desc: t('values.1.desc') },
    { icon: Target, title: t('values.2.title'), desc: t('values.2.desc') },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-16 dark:bg-zinc-950 sm:py-24">
      <div className="pointer-events-none absolute left-0 top-0 h-40 w-40 -translate-x-1/3 -translate-y-1/3 rounded-full bg-maroon-100/70 blur-3xl dark:bg-maroon-900/30" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-52 w-52 translate-x-1/3 translate-y-1/3 rounded-full bg-softpink-200/60 blur-3xl dark:bg-softpink-900/20" />

      <div className="container relative mx-auto px-4 lg:px-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left */}
          <div>
            <p className="mb-3 inline-flex rounded-full bg-maroon-100 px-3 py-1 text-sm md:text-lg font-semibold uppercase tracking-widest text-maroon-700 dark:bg-maroon-900/40 dark:text-softpink-300">
              {t('subtitle')}
            </p>
            <h2 className="mb-5 text-3xl font-bold leading-tight text-maroon-700 dark:text-softpink-200 sm:text-4xl">
              {t('heading')}
            </h2>
            <p className="mb-8 max-w-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t('description')}
            </p>

            {/* Timeline */}
            <div className="space-y-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-maroon-100 bg-maroon-50/40 px-4 py-4 transition-all duration-300 hover:border-maroon-300 hover:bg-maroon-50 dark:border-zinc-700 dark:bg-zinc-900/60 dark:hover:border-maroon-700"
                >
                  <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-maroon-600 to-softpink-500" />
                  <div className="pl-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-maroon-500 dark:text-maroon-400">
                      {t(`timeline.${i}.year`)}
                    </p>
                    <p className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {t(`timeline.${i}.event`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Values */}
          <div className="grid gap-4 lg:gap-5">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-maroon-200 hover:bg-maroon-50/60 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-maroon-700"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-maroon-600 to-softpink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-maroon-600 to-softpink-500">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-maroon-700 dark:text-softpink-200">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
