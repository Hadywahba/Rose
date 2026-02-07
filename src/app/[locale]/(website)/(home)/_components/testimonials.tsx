'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { useTranslations, useLocale } from 'next-intl';
import MainHeading from './main-heading';
import { TestimonialCard, type Testimonial } from './testimonial-card';

export default function TestimonialsCarousel() {
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
      image: '/avatar/avatar1.png',
      rating: 4,
      review: t('reviews.0.review'),
      date: t('reviews.0.date'),
    },
    {
      id: 2,
      name: t('reviews.1.name'),
      image: '/avatar/avatar2.png',
      rating: 3,
      review: t('reviews.1.review'),
      date: t('reviews.1.date'),
    },
    {
      id: 3,
      name: t('reviews.2.name'),
      image: '/avatar/avatar3.png',
      rating: 4,
      review: t('reviews.2.review'),
      date: t('reviews.2.date'),
    },
    {
      id: 4,
      name: t('reviews.3.name'),
      image: '/avatar/avatar1.png',
      rating: 5,
      review: t('reviews.3.review'),
      date: t('reviews.3.date'),
    },
  ];

  return (
    <section id="testimonials" className="py-10">
      <MainHeading
        heading="Testimonials"
        paragraph="Real Words from Happy Customers"
      />
      {/* use Static Color because wait design system */}
      <div className="my-11 w-full bg-[#FBEAEA] px-4 md:p-10 py-20 dark:bg-[#3F3F46]">
        <div className="container mx-auto">
          <Carousel
            plugins={[plugin.current]}
            className="mx-auto w-full max-w-7xl"
            opts={{
              align: 'start',
              loop: true,
              direction: isRTL ? 'rtl' : 'ltr',
            }}
          >
            <CarouselContent className="sm:-ml-1">
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="flex py-4 md:basis-1/2 sm:px-8 lg:basis-1/3"
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
