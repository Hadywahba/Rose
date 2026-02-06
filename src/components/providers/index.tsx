import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Toaster } from '../ui/sonner';
import ReactQueryProvider from './components/react-query-provider';
import { ThemeProvider } from 'next-themes';
import UserEmailProvider from './app/forget-password/email-provider';

type Props = {
  children: React.ReactNode;
  locale: string;
};

export default async function RootLayout({ children }: Props) {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
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
