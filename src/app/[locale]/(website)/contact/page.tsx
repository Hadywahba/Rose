import { getContact } from '@/lib/services/contact/contact.service';
import { ContactInfo } from '@/lib/types/contact/contact';
import ContactHero from './_components/contact-hero';
import ContactTeam from './_components/contact-team';
import ContactForm from './_components/contact-form';

export default async function ContactPage() {
  // Fetch contact data
  const contact: ContactInfo = await getContact();

  return (
    <main className="overflow-hidden">
      <ContactHero contact={contact} />
      <ContactTeam contact={contact} />
      <ContactForm />
    </main>
  );
}
