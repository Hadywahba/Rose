import { PublicFooter } from "../types/home/footer";




// Footer column items without IDs
const footercolumnItems: Omit<PublicFooter, 'id'>[] = [
  {
    name: 'footer.home',
    link: '/',
  },
  {
    name: 'footer.products',
    link: '/products',
  },
  {
    name: 'footer.occasions',
    link: '/occasions',
  },
  {
    name: 'footer.contact',
    link: '/contact',
  },
  {
    name: 'footer.about',
    link: '/about',
  },
  {
    name: 'footer.terms',
    link: '/terms',
  },
  {
    name: 'footer.privacy',
    link: '/privacy',
  },
  {
    name: 'footer.faqs',
    link: '/faq',
  },
];

// Export final Footer with IDs
export const footerItems: PublicFooter[] = footercolumnItems.map(
  (item, index) => ({
    ...item,
    id: index + 1,
  }),
);
