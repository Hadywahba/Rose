'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { useRef } from 'react';

import { useTranslations, useLocale } from 'next-intl';
import Autoplay from 'embla-carousel-autoplay';
import MainHeading from './main-heading';
import {  TestimonialCard } from './testimonial-card';
import { Testimonial } from '@/lib/types/home/testimonials';


export default function Testimonials() {
  // Translation
  const t = useTranslations('testimonials');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Ref
  const plugin = useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: true,
      stopOnMouseEnter: false,
      stopOnFocusIn: true,
    }),
  );

  // Variables
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: t('reviews.0.name'),
      image: '/images/avatar1.png',
      rating: 4,
      review: t('reviews.0.review'),
      date: t('reviews.0.date'),
    },
    {
      id: 2,
      name: t('reviews.1.name'),
      image: '/images/avatar2.png',
      rating: 3,
      review: t('reviews.1.review'),
      date: t('reviews.1.date'),
    },
    {
      id: 3,
      name: t('reviews.2.name'),
      image: '/images/avatar3.png',
      rating: 4,
      review: t('reviews.2.review'),
      date: t('reviews.2.date'),
    },
    {
      id: 4,
      name: t('reviews.3.name'),
      image: '/images/avatar1.png',
      rating: 5,
      review: t('reviews.3.review'),
      date: t('reviews.3.date'),
    },
  ];

  return (
    <section id="testimonials" className="py-6 sm:py-10  lg:px-20">
      <MainHeading
        heading="Testimonials"
        paragraph="Real Words from Happy Customers"
      />
      {/* use Static Color because wait design system */}
      <div className="my-6 w-full bg-[#FBEAEA] px-2 py-10 dark:bg-[#3F3F46] rounded-3xl sm:my-11 sm:px-4 sm:py-20 md:p-10">
        <div className="container mx-auto w-full max-w-[19rem] sm:max-w-[25rem] md:max-w-none">
          <Carousel
            plugins={[plugin.current]}
            className="mx-auto w-full max-w-7xl"
            opts={{
              align: 'start',
              loop: true,
              direction: isRTL ? 'rtl' : 'ltr',
            }}
          >
            <CarouselContent className="-ml-2 sm:-ml-1">
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="flex py-2 pl-2 sm:py-4 sm:pl-4 sm:pr-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full w-full">
                    <TestimonialCard
                      testimonial={testimonial}
                      onMouseEnter={() => plugin.current.stop()}
                      onMouseLeave={() => plugin.current.play()}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
