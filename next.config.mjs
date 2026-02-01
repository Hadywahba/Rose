import createNextIntlPlugin from "next-intl/plugin";
/** @type {import('next').NextConfig} */
const nextConfig = {
    // remote images source
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "flower.elevateegy.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "via.placeholder.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

// ===== Apply next-intl plugin =====
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
