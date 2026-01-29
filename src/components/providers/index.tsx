import { NextIntlClientProvider } from 'next-intl';
import { Toaster } from '../ui/sonner';
import ReactQueryProvider from './components/react-query-provider';
import { ThemeProvider } from 'next-themes';
import UserEmailProvider from './app/forget-password/email-provider';

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <NextIntlClientProvider>
      <ReactQueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <Toaster />
          <UserEmailProvider>{children}</UserEmailProvider>
        </ThemeProvider>
      </ReactQueryProvider>
    </NextIntlClientProvider>
  );
}
