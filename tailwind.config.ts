import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                "overlay-gray": "rgba(46, 46, 48, 0.05)",
                "overlay-gray-2": "rgba(46, 46, 48, 0.05)",
                "light-blue": "rgba(0, 99, 208, 0.05)",
                "light-purple": "rgba(117, 60, 191, 0.05)",
                "light-green": "rgba(0, 137, 97, 0.05)",
                "custom-purple": "#753CBF",
                "dark-maroon": "rgba(116, 28, 33, 0.2)",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    "1": "hsl(var(--chart-1))",
                    "2": "hsl(var(--chart-2))",
                    "3": "hsl(var(--chart-3))",
                    "4": "hsl(var(--chart-4))",
                    "5": "hsl(var(--chart-5))",
                },
                sidebar: {
                    DEFAULT: "hsl(var(--sidebar))",
                    foreground: "hsl(var(--sidebar-foreground))",
                    primary: "hsl(var(--sidebar-primary))",
                    "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
                    accent: "hsl(var(--sidebar-accent))",
                    "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
                    border: "hsl(var(--sidebar-border))",
                    ring: "hsl(var(--sidebar-ring))",
                },
                brand: {
                    light: "#3AB0FF",
                    DEFAULT: "#0077FF",
                    dark: "#0051AA",
                },
                customGray: "#f5f5f5",
                maroon: {
                    50: "#fbeaea",
                    100: "#f3c5c7",
                    200: "#ea9fa2",
                    300: "#e07a7d",
                    400: "#d75458",
                    500: "#cd2e33",
                    600: "#a6252a",
                    700: "#741c21",
                    800: "#501419",
                    900: "#2c0c10",
                    950: "#20090c",
                    DEFAULT: "#FBEAEA",
                },
                softpink: {
                    50: "#fff1f5",
                    100: "#ffe0e7",
                    200: "#ffc2d0",
                    300: "#ffa3b9",
                    400: "#ff85a2",
                    500: "#ff668b",
                    600: "#e65073",
                    700: "#cc3a5b",
                    800: "#b32443",
                    900: "#99102c",
                    950: "#590414",
                },
                customGold: "#DFAC16", // 1st place
                customSilver: "#757F95", // 2nd place
                customBronze: "#914400", // 3rd place
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
                10: "10px",
                xl: "calc(var(--radius) + 4px)",
                alert: "10px",
            },
            height: {
                "441": "441px",
                button: "46px",
                "pro-detailes": "402px",
            },
            width: {
                button: "181px",
                total: "490px",
            },
            borderWidth: {
                "1": "1px",
            },
            fontSize: {
                "12": "12px",
                "10": "10px",
            },
            fontFamily: {
                sans: ["var(--font-sarabun)", "var(--font-tajawal)", "system-ui", "sans-serif"],
                mono: ["var(--font-geist-mono)"],
                sarabun: ["var(--font-sarabun)", "system-ui", "sans-serif"],
                tajawal: ["var(--font-tajawal)", "system-ui", "sans-serif"],
            },
        },
    },
    plugins: [require("tailwind-scrollbar")],
};

export default config;
