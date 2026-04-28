import Footer from '@/components/layout/footer/footer';
import Header from '@/components/layout/header/header';

import NextAuthProvider from '@/components/providers/components/next-auth.provider';

import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {/* Header */}
      <Header />

      {/* Next Auth  */}
      <NextAuthProvider>
        {/* children Section */}
        {children}
      </NextAuthProvider>

      {/* Footer */}
      <Footer />
    </main>
  );
}
