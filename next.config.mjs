import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // remote images source
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flower.elevateegy.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'flower.elevateegy.com',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
