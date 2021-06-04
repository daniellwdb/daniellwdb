// @ts-check

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 * */
const nextConfig = {
  future: {
    webpack5: true,
  },
  reactStrictMode: true,
  experimental: {
    eslint: true,
    turboMode: true,
  },
  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: "preact/compat",
        "react-dom": "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
      })
    }

    return config
  },
  async rewrites() {
    return [
      {
        source: "/bee.js",
        destination: "https://cdn.splitbee.io/sb.js",
      },
      {
        source: "/_hive/:slug",
        destination: "https://hive.splitbee.io/:slug",
      },
    ]
  },
}

module.exports = nextConfig
