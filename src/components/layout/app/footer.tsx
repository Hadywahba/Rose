import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Footer() {
  // footer links
  const footerLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'Occasions', href: '/occasions' },
    { name: 'Contact', href: '/contact' },
    { name: 'About', href: '/about' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'FAQs', href: '/faqs' },
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
              Rose E-Commerce App
            </h3>
            <p className="text-center text-sm text-zinc-100">
              All rights reserved | 2026
            </p>
          </div>
        </div>

        {/* Middle Section: Links */}
        <div className="flex flex-col items-center ps-5 md:items-start">
          <h4 className="mb-2 text-lg font-semibold text-softpink-300">
            Discover our website
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
              Get <span className="text-maroon-50">20%</span> Off Discount
              Coupon
            </h4>
            <p className="mt-1 text-sm text-zinc-500">
              By subscribing to our newsletter
            </p>
          </div>

          <div className="relative w-full max-w-md">
            <div className="flex items-center rounded-full border border-transparent bg-zinc-600 pl-4 transition-all">
              <Input
                type="email"
                placeholder="Enter Your Email"
                className="h-10 border-none bg-transparent text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button className="group flex h-10 items-center gap-2 rounded-full bg-maroon-50 px-6 py-4 font-medium text-maroon-700 transition-all hover:bg-white">
                Subscribe
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
