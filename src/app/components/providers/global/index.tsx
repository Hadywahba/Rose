
import { NextIntlClientProvider } from "next-intl";
import ReactQueryProvider from "../../react-quary.provider";
import NextAuthProvider from "./components/next-auth.provider";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextIntlClientProvider>
            <NextAuthProvider>
                <ReactQueryProvider>
                    {children}
                </ReactQueryProvider>
            </NextAuthProvider>
        </NextIntlClientProvider>

    )
}