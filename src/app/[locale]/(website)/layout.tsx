import Footer from '@/components/layout/app/footer';
import Header from '@/components/layout/app/header';
import NextAuthProvider from '@/components/providers/components/next-auth.provider';
import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {/* Header */}
      <NextAuthProvider>
      <Header />

      {/* children Section */}
      {children}
</NextAuthProvider>
      {/* Footer */}
      <Footer />
    </main>
  );
}
