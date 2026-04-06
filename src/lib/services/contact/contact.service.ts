import { ContactInfo } from '@/lib/types/contact/contact';

const FALLBACK_CONTACT: ContactInfo = {
  name: 'Hady Wahba',
  email: 'hadywahba19@gmail.com',
  role: 'Frontend Developer',
  phone: '+201010432457',
  address: 'Alexandria, Egypt',
  image: '/images/hady wahba - Frontend developer.jpg',
};

export const getContact = async (): Promise<ContactInfo> => {
  const baseUrl =
    process.env.NEXTAUTH_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    'http://localhost:3000';

  try {
    const response = await fetch(`${baseUrl}/api/contact`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch contact data');
    }

    return (await response.json()) as ContactInfo;
  } catch {
    return FALLBACK_CONTACT;
  }
};