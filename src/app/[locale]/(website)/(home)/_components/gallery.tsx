'use client';

import Image from 'next/image';
import React from 'react';
import MainHeading from './main-heading';
import { useTranslations } from 'next-intl';

/**
 * Gallery section displaying gift box images in a masonry-style grid layout
 */
export default function Gallery() {
  // Translation
  const t = useTranslations('gallery');

  return (
    <section className="container mx-auto w-11/12 py-10">
      {/* Section header */}
      <div className="mb-11 text-center">
        <MainHeading heading={t('heading')} paragraph={t('paragraph')} />
      </div>

      {/* Mobile: 2-col simple grid | md+: 12-col masonry */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {[
          { src: '/images/galleryGrid1.svg', alt: t('images.galleryGrid1'), tall: true },
          { src: '/images/galleryGrid2.svg', alt: t('images.galleryGrid2'), tall: false },
          { src: '/images/galleryGrid3.svg', alt: t('images.galleryGrid3'), tall: false },
          { src: '/images/galleryGrid4.svg', alt: t('images.galleryGrid4'), tall: false },
          { src: '/images/galleryGrid5.svg', alt: t('images.galleryGrid5'), tall: true },
          { src: '/images/galleryGrid6.svg', alt: t('images.galleryGrid6'), tall: true },
        ].map((img) => (
          <div
            key={img.src}
            className={`relative overflow-hidden rounded-xl ${img.tall ? 'aspect-[3/4]' : 'aspect-square'}`}
          >
            <Image src={img.src} alt={img.alt} fill sizes="50vw" className="object-cover" />
          </div>
        ))}
      </div>

      {/* Desktop: 12-column masonry grid */}
      <div className="hidden grid-cols-12 grid-rows-[repeat(10,_6.5rem)] gap-3 md:grid">
        <div className="relative col-span-4 row-span-6 overflow-hidden rounded-xl">
          <Image src="/images/galleryGrid1.svg" alt={t('images.galleryGrid1')} fill sizes="33vw" className="object-cover" />
        </div>
        <div className="relative col-span-4 col-start-5 row-span-4 overflow-hidden rounded-xl">
          <Image src="/images/galleryGrid2.svg" alt={t('images.galleryGrid2')} fill sizes="33vw" className="object-cover" />
        </div>
        <div className="relative col-span-4 col-start-9 row-span-4 overflow-hidden rounded-xl">
          <Image src="/images/galleryGrid3.svg" alt={t('images.galleryGrid3')} fill sizes="33vw" className="object-cover" />
        </div>
        <div className="relative col-span-4 col-start-1 row-span-4 row-start-7 overflow-hidden rounded-xl">
          <Image src="/images/galleryGrid4.svg" alt={t('images.galleryGrid4')} fill sizes="33vw" className="object-cover" />
        </div>
        <div className="relative col-span-4 col-start-5 row-span-6 row-start-5 overflow-hidden rounded-xl">
          <Image src="/images/galleryGrid5.svg" alt={t('images.galleryGrid5')} fill sizes="33vw" className="object-cover" />
        </div>
        <div className="relative col-span-4 col-start-9 row-span-6 row-start-5 overflow-hidden rounded-xl">
          <Image src="/images/galleryGrid6.svg" alt={t('images.galleryGrid6')} fill sizes="33vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
