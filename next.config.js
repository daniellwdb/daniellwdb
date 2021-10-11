// @ts-check
// eslint-disable-next-line @typescript-eslint/no-var-requires
const generateSiteMap = require("./scripts/sitemap")

/**
 * @type {import('next').NextConfig}
 * */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    if (isServer) {
      const generateSiteMapPromise = async () => {
        await generateSiteMap()
      }

      generateSiteMapPromise()
    }

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
