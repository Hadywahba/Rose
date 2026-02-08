import Footer from '@/components/layout/app/footer';
import Header from '@/components/layout/app/header';
import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {/* Header */}
      <Header />

      {/* children Section */}
      {children}

      {/* Footer */}
      <Footer />
    </main>
  );
}
