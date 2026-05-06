import About from '@/app/[locale]/(website)/(home)/_components/about';
import Companies from '@/app/[locale]/(website)/(home)/_components/companies';
import Gallery from '@/app/[locale]/(website)/(home)/_components/gallery';
import TestimonialsCarousel from './_components/testimonials';
import Hero from './_components/hero';
import OccasionSection from './_components/occasion-section';
import HeroServiceSection from './_components/hero-service-section';
import { SearchParams } from '@/lib/types/global';
import BestSelling from './_components/best-selling';
import { displayTestimonials } from '../testimonials/_hook/get-testimonial';

type HomeProps = {
  searchParams: SearchParams;
};

export default async function Home({ searchParams }: HomeProps) {
  // Fetch Testimonial on server
  const { data, error } = await displayTestimonials();

  return (
    <main className="mx-auto flex flex-col items-center justify-center">
      {/* Hero Section */}
      <Hero />

      {/* Occasions Section */}
      <OccasionSection />

      {/* Hero Service */}
      <HeroServiceSection />

      {/* Best Selling */}
      <BestSelling searchParams={searchParams} />

      {/* About Section */}
      <About />

      {/* Gallery Section */}
      <Gallery />

      {/* Testimonials Carousel */}
      <TestimonialsCarousel data={data} error={error} />

      {/* Companies Section */}
      <Companies />
    </main>
  );
}
