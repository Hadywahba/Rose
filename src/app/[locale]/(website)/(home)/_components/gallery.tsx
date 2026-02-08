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

      {/* 12-column grid with varied image sizes */}
      <div className="grid grid-cols-12 grid-rows-[repeat(10,_6.5rem)] gap-3">
        {/* Image 1 - Large left column */}
        <div className="relative col-span-4 row-span-6">
          <Image
            src="/images/galleryGrid1.svg"
            alt={t('images.galleryGrid1')}
            fill
            className="object-cover"
          />
        </div>

        {/* Image 2 - Top middle */}
        <div className="relative col-span-4 col-start-5 row-span-4">
          <Image
            src="/images/galleryGrid2.svg"
            alt={t('images.galleryGrid2')}
            fill
            className="object-cover"
          />
        </div>

        {/* Image 3 - Top right */}
        <div className="relative col-span-4 col-start-9 row-span-4">
          <Image
            src="/images/galleryGrid3.svg"
            alt={t('images.galleryGrid3')}
            fill
            className="object-cover"
          />
        </div>

        {/* Image 4 - Bottom left */}
        <div className="relative col-span-4 col-start-1 row-span-4 row-start-7">
          <Image
            src="/images/galleryGrid4.svg"
            alt={t('images.galleryGrid4')}
            fill
            className="object-cover"
          />
        </div>

        {/* Image 5 - Large middle column */}
        <div className="relative col-span-4 col-start-5 row-span-6 row-start-5">
          <Image
            src="/images/galleryGrid5.svg"
            alt={t('images.galleryGrid5')}
            fill
            className="object-cover"
          />
        </div>

        {/* Image 6 - Large right column */}
        <div className="relative col-span-4 col-start-9 row-span-6 row-start-5">
          <Image
            src="/images/galleryGrid6.svg"
            alt={t('images.galleryGrid6')}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
