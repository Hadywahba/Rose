'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Autoplay from 'embla-carousel-autoplay';
import MainHeading from './main-heading';
import { TestimonialCard } from './testimonial-card';
import ListError from '@/components/error/list-error';
import StartFeedback from '../../testimonials/_components/start-feedback';

interface TestimonialProps {
  data?: Testimonial[];
  error: Error | null;
}

export default function Testimonials({ data, error }: TestimonialProps) {
  // Translation
  const t = useTranslations('testimonial');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Const
  const plugin = useRef(
    Autoplay({
      delay: 1500,
      stopOnInteraction: true,
      stopOnMouseEnter: false,
      stopOnFocusIn: true,
    }),
  );

  const testimonials = data ?? [];

  return (
    <section id="testimonials" className="py-6 sm:py-10 lg:px-20">
      <MainHeading
        heading={t('testimonial-title')}
        paragraph={t('testimonial-subtitle')}
      />

      <ListError errors={error}>
        <div className="my-6 w-full rounded-3xl bg-[#FBEAEA] px-2 py-10 dark:bg-[#3F3F46] sm:my-11 sm:px-4 sm:py-20 md:p-10">
          {testimonials.length === 0 ? (
            <StartFeedback />
          ) : (
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
          )}
        </div>

        {testimonials.length === 0 ? (
          ''
        ) : (
          <div className="mx-auto max-w-[700px]">
            <StartFeedback />
          </div>
        )}
      </ListError>
    </section>
  );
}
