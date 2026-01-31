import { NextIntlClientProvider } from 'next-intl';
import { Toaster } from '../ui/sonner';
import ReactQueryProvider from './components/react-query-provider';
import { ThemeProvider } from 'next-themes';
import NextAuthProvider from '@/app/components/providers/global/components/next-auth.provider';

type Props = {
  children: React.ReactNode;
};

export default async function Providers({ children }: Props) {
  return (
    <NextIntlClientProvider>
      <NextAuthProvider>
        <ReactQueryProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <Toaster />
            {children}
          </ThemeProvider>
        </ReactQueryProvider>
      </NextAuthProvider>
    </NextIntlClientProvider>
    
  );
}
