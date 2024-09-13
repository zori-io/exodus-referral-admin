/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/(.*)', // Apply headers to all API routes
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: 'https://exodus-referral-admin.vercel.app' }, // Allow your domain
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,POST,PUT,DELETE' }, // Allow these HTTP methods
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' }, // Allow these headers
        ],
      },
    ];
  },
};

module.exports = nextConfig;
