import AboutHero from './_components/about-hero';
import AboutMission from './_components/about-mission';
import AboutTeam from './_components/about-team';
import AboutStats from './_components/about-stats';

export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      <AboutHero />
      <AboutStats />
      <AboutMission />
      <AboutTeam />
    </main>
  );
}
