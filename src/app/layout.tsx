import { ReactNode } from "react";
import "./globals.css";

/**
 * RootLayout is the top-level layout component for the application.
 * It wraps all child components inside the global application context.
 *
 * @param children - The components that will be rendered within this layout.
 * @returns The rendered children within the root layout.
 */
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return children;
}
