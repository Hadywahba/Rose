import About from '@/app/[locale]/(home)/_components/about';
import Companies from '@/app/[locale]/(home)/_components/companies';
import Gallery from '@/app/[locale]/(home)/_components/gallery';
import TestimonialsCarousel from './_components/testimonials';
import Hero from './_components/hero';
import OccasionSection from './_components/occasion-section';
import HeroServiceSection from './_components/hero-service-section';

export default function Home() {
  return (
    <main className="mx-auto flex flex-col items-center justify-center">
      {/* Hero Section */}
      <Hero />

      {/* Occasions Section */}
      <OccasionSection />

      {/* Hero Service */}
      <HeroServiceSection />
      <About />
      <Gallery />
      <TestimonialsCarousel />
      <Companies />
    </main>
  );
}
