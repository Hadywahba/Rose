import TestimonialsCarousel from './_components/testimonials';
import Hero from './_components/hero';
import OccasionSection from './_components/occasion-section';
import HeroServiceSection from './_components/hero-service-section';
import About from './_components/about';
import Gallery from './_components/gallery';
import Companies from './_components/companies';

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
