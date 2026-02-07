import React from 'react';
import OccasionCard from './occasion-card';
import { occasionCard } from '@/lib/constants/occasion-card';

export default function OccasionSection() {
  return (
    <section className="grid w-full grid-cols-1 gap-6 px-10 pb-10 sm:px-20 md:grid-cols-2 lg:grid-cols-3">
      {occasionCard.map((occasion) => (
        <OccasionCard
          key={occasion.id}
          img={occasion.img}
          alt={occasion.alt}
          text={occasion.text}
          badge={occasion.badge}
        />
      ))}
    </section>
  );
}
