/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: {
    MAX_FETCH_SIZE: 10, //in MB
  },
  images: {
    domains: ["webtoon-phinf.pstatic.net", "images.unsplash.com"],
  },
};

module.exports = nextConfig;
