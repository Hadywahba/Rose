import About from '@/app/[locale]/(home)/_components/about';
import Companies from '@/app/[locale]/(home)/_components/companies';
import Gallery from '@/app/[locale]/(home)/_components/gallery';
import TestimonialsCarousel from './_components/testimonials';
import Hero from './_components/hero';
import OccasionSection from './_components/occasion-section';
import HeroServiceSection from './_components/hero-service-section';
import Header from '@/components/layout/app/header';
import Footer from '@/components/layout/app/footer';

export default function Home() {
  return (
    <main className="mx-auto flex flex-col items-center justify-center">
      <Header />
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
      <Footer />
    </main>
  );
}
