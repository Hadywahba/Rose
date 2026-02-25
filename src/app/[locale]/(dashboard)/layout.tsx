import NextAuthProvider from '@/components/providers/components/next-auth.provider';
import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <NextAuthProvider>
        {children}
      </NextAuthProvider>
    </main>
  );
}
