import Footer from '@/components/layout/footer/footer';
// import Header from '@/components/layout/header/header';

import NextAuthProvider from '@/components/providers/components/next-auth.provider';
import ToggleLocale from '@/components/shared/ToggleLocale';
import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <ToggleLocale />
      {/* Header */}
      <NextAuthProvider>
        {/* children Section */}
        {children}
      </NextAuthProvider>
      {/* Footer */}
      <Footer />
    </main>
  );
}
