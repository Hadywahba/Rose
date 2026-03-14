import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  // footer links
  const footerLinks = [
    { name: t('home'), href: '/' },
    { name: t('products'), href: '/products' },
    { name: t('categories'), href: '/categories' },
    { name: t('occasion'), href: '/occasions' },
    { name: t('contact'), href: '/contact' },
    { name: t('about'), href: '/about' },
    { name: t('terms'), href: '/terms' },
    { name: t('privacy'), href: '/privacy' },
    { name: t('faqs'), href: '/faqs' },
  ];

  return (
    <footer className="mt-auto w-full bg-zinc-800 px-4 py-16 text-white md:px-8">
      <div className="mx-auto flex max-w-7xl gap-12 md:gap-8">
        <div className="flex flex-col items-center space-y-4 text-center md:items-start md:text-left">
          <div className="relative h-52 w-52">
            <Image
              src="/assets/images/logo.png"
              alt="Rose Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-normal text-softpink-300">
              {t('title')}
            </h3>
            <p className="text-center text-sm text-zinc-100">
              {t('copyright')}
            </p>
          </div>
        </div>

        {/* Middle Section: Links */}
        <div className="flex flex-col items-center ps-5 md:items-start">
          <h4 className="mb-2 text-lg font-semibold text-softpink-300">
            {t('discover')}
          </h4>
          <ul className="grid grid-cols-1 text-center md:text-left">
            {footerLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm font-light text-zinc-100 transition-colors hover:text-maroon-50"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section: Newsletter */}
        <div className="ms-auto flex flex-col items-center md:items-start">
          <div className="mb-6 text-center md:text-left">
            <h4 className="text-lg font-semibold text-softpink-300">
              {t('get')} <span className="text-maroon-50">{t('discount')}</span>{' '}
              {t('get-discount')}
            </h4>
            <p className="mt-1 text-sm text-zinc-500">{t('subscribing-way')}</p>
          </div>

          <div className="relative w-full max-w-md">
            <div className="flex items-center rounded-full border border-transparent bg-zinc-600 transition-all">
              <Input
                type="email"
                placeholder={t('email-placeholder')}
                className="h-10 border-none bg-transparent text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button className="group flex h-10 items-center gap-2 rounded-full bg-maroon-50 px-6 py-4 font-medium text-maroon-700 transition-all hover:bg-white">
                {t('subscribe')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
