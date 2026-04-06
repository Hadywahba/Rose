import { useTranslations } from 'next-intl';
export default function AboutHero() {
  const t = useTranslations('about-page.hero');

  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-gradient-to-br from-maroon-950 via-maroon-800 to-maroon-700">
      {/* Decorative blobs */}
      <div className="absolute -right-32 top-0 h-[500px] w-[500px] rounded-full bg-softpink-600/10 blur-3xl" />
      <div className="absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-maroon-500/20 blur-3xl" />

      {/* Floating petals */}
      <div className="absolute left-[10%] top-[20%] h-8 w-8 rotate-45 rounded-full bg-softpink-400/20" />
      <div className="absolute right-[15%] top-[30%] h-5 w-5 rotate-12 rounded-full bg-maroon-300/30" />
      <div className="absolute bottom-[20%] left-[20%] h-6 w-6 rounded-full bg-softpink-300/20" />

      <div className="container relative mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center">
        {/* Badge */}
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-maroon-400/30 bg-maroon-600/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-maroon-100 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 text-sm md:text-lg rounded-full bg-softpink-400" />
          {t('badge')}
        </span>

        <h1 className="mb-6 max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          {t('title')}
          <span className="block bg-gradient-to-r from-softpink-300 to-maroon-200 bg-clip-text text-transparent">
            {t('title-highlight')}
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-xl text-base text-maroon-100/80 sm:text-lg">
          {t('description')}
        </p>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-2">
          <div className="h-10 w-6 rounded-full border-2 border-maroon-300/50 p-1">
            <div className="mx-auto h-2 w-1.5 animate-bounce rounded-full bg-softpink-300" />
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" className="fill-white dark:fill-zinc-950">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}
