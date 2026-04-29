import { ContactInfo } from '@/lib/types/contact/contact';

export const getContact = async (): Promise<ContactInfo> => {
  const baseUrl =
    process.env.NEXTAUTH_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/contact`, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch contact data');
  }

  const res: ContactInfo = await response.json();
  return res;
};
