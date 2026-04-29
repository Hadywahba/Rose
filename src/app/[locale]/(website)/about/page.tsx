import AboutHero from './_components/about-hero';
import AboutMission from './_components/about-mission';
import AboutTeam from './_components/about-team';
import AboutStats from './_components/about-stats';
import { getContact } from '@/lib/services/contact/contact.service';
import { ContactInfo } from '@/lib/types/contact/contact';

export default async function AboutPage() {
    // Fetch contact data
    const contact: ContactInfo = await getContact();

  return (
    <main className="overflow-hidden">
      <AboutHero />
      <AboutStats />
      <AboutMission />
      <AboutTeam contact={contact} />
    </main>
  );
}
