import { HandHeart, Lock } from 'lucide-react';
import { useTranslations } from 'next-intl';

import Image from 'next/image';
import TestimonialFeatureItem from './testimonial-feature-item';

export default function TestimonialTitle() {
  // Translation
  const t = useTranslations('testimonial');
  return (
    <section className="p-10">
      {/* Title */}
      <div className="space-y-4">
        <h1 className="text-sidebar-primary text-2xl">{t('title')}</h1>
        <h2 className="text-3xl font-semibold text-accent-foreground">
          {t('text')}
        </h2>
        <p className="text-lg text-muted-foreground">{t('description')}</p>
      </div>

      {/* Features */}
      <TestimonialFeatureItem
        icon={<Lock className="size-6 text-white" />}
        title={t('text-title-first')}
        description={t('description-title-first')}
      />

      <TestimonialFeatureItem
        icon={<HandHeart className="size-6 text-white" />}
        title={t('text-title-second')}
        description={t('description-title-second')}
      />

      {/* Image */}
      <div className="h-65 relative mt-6 w-full">
        <Image
          src="/assets/images/clincal.png"
          alt="clinc"
          fill
          className="rounded-xl object-cover"
        />
      </div>
    </section>
  );
}
