"use client"
import React from 'react';
import HeroService from './hero-service';
import { heroService } from '@/lib/constants/hero-service';

export default function HeroServiceSection() {
  return (
    <section className="w-full px-10 pb-28 sm:px-20">
      <div className="grid grid-cols-1 rounded-2xl bg-maroon-50 dark:bg-zinc-700 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {heroService.map((service) => (
          <HeroService
            key={service.id}
            Icon={service.Icon}
            text={service.text}
            title={service.title}
          />
        ))}
      </div>
    </section>
  );
}
