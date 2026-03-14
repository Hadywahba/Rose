import { NextIntlClientProvider } from 'next-intl';
import { Toaster } from '../ui/sonner';
import ReactQueryProvider from './components/react-query-provider';
import { ThemeProvider } from 'next-themes';
import UserEmailProvider from './app/forget-password/email-provider';
import NextAuthProvider from './components/next-auth.provider';
import { GuestCartProvider } from './cart/guest-cart.provider';

type Props = {
  children: React.ReactNode;
  locale: string;
};

export default async function RootLayout({ children }: Props) {
  return (
    <NextIntlClientProvider>
      <NextAuthProvider>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
          >
            <Toaster />
            {/* Provider for Cart for guest */}
            <GuestCartProvider>
              <UserEmailProvider>{children}</UserEmailProvider>
            </GuestCartProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </NextAuthProvider>
    </NextIntlClientProvider>
  );
}
