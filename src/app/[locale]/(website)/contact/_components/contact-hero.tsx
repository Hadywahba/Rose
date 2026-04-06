import { ContactInfo } from '@/lib/types/contact/contact';
import { Mail, MapPin, Phone } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

interface ContactHeroProps {
  contact: ContactInfo;
}

export default async function ContactHero({ contact }: ContactHeroProps) {
  // Translation
  const t = await getTranslations('contact');

  // Variables
  const info = [
    { icon: Phone, label: t('info.phone'), value: contact.phone },
    { icon: Mail, label: t('info.email'), value: contact.email },
    { icon: MapPin, label: t('info.location'), value: contact.address },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-maroon-700 via-maroon-600 to-softpink-600 py-20 sm:py-28">
      {/* Decorative circles */}
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/5" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/5" />
      <div className="absolute right-1/3 top-10 h-20 w-20 rounded-full bg-softpink-400/20" />

      <div className="container relative mx-auto px-4 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-maroon-100">
          {t('hero.subtitle')}
        </p>
        <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
          {t('hero.title')}
        </h1>
        <p className="mx-auto mb-12 max-w-lg text-base text-maroon-100 sm:text-lg">
          {t('hero.description')}
        </p>

        {/* Info cards */}
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {info.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 rounded-2xl bg-white/10 px-4 py-5 backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <p className="text-xs font-medium text-maroon-100">{label}</p>
              <p className="text-sm font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
