/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },

  images: {
    domains: [
      // "webtoon-phinf.pstatic.net",
    ],
  },
};

module.exports = nextConfig;
