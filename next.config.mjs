/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'utfs.io' },
      { protocol: 'https', hostname: 'ams8gpdtcg.ufs.sh' },
    ],
  },
}

export default nextConfig;
