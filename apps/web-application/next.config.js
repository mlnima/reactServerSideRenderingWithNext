/** @type {import('next').NextConfig} */
const rewrites = require('./nextConfigs/rewrites');
const { postTypes } = require('@repo/data-structures');
const projectLocales = process.env.NEXT_PUBLIC_LOCALES || 'en';
const postTypeQueryMatcher = `:postType(${postTypes.join('|')})?`;
const languageQueryMatcher = `(${projectLocales.split(' ').join('|')})`;
const imagesAllowedDomainsForNextImage = process.env.NEXT_PUBLIC_ALLOWED_IMAGES_SOURCES?.split(' ') || [];
const path = require('path');

const allowedDomainsForNextImageConfig = imagesAllowedDomainsForNextImage.reduce((acc, source) => {
  acc = [...acc,
    {
      protocol: 'https',
      hostname: source,
    },
    {
      protocol: 'http',
      hostname: source,
    },
    {
      protocol: 'https',
      hostname: `**.${source}`,
    },
    {
      protocol: 'http',
      hostname: `**.${source}`,
    },
  ];
  return acc;
}, []);

const nextConfig = {
  reactStrictMode: false,
  serverExternalPackages: ['mongoose'],
  experimental: {
    useCache: true,

    // for file uploading - might be removed and use the express server
    serverActions: {
      bodySizeLimit: '10mb',
    },

    // Configure cache settings
    staleTimes: {
      dynamic: 30,
      static: 180,
    },

    // Reduce memory usage for development
    ...(process.env.NODE_ENV === 'development' && {
      forceSwcTransforms: true,
    }),
  },
  cacheMaxMemorySize: 1024 * 1024 * 1024,
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: allowedDomainsForNextImageConfig,
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
    includePaths: [path.join(__dirname, 'app')],
  },
  // transpilePackages: [],
  async redirects() {
    return [
      {
        source: `/${languageQueryMatcher}/meta`,
        destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/categories`,
        permanent: true,
      },
      {
        source: `/meta`,
        destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/categories`,
        permanent: true,
      },
      {
        source: `/${languageQueryMatcher}/categories/:categoryId`,
        destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/category/:categoryId`,
        permanent: true,
      },
      {
        source: `/categories/:categoryId`,
        destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/category/:categoryId`,
        permanent: true,
      },
      {
        source: `/${languageQueryMatcher}/tags/:tagId`,
        destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/tag/:tagId`,
        permanent: true,
      },
      {
        source: `/tags/:tagId`,
        destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/tag/:tagId`,
        permanent: true,
      },
      {
        source: `/${languageQueryMatcher}/actors/:actorId`,
        destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/actor/:actorId`,
        permanent: true,
      },
      {
        source: `/actors/:actorId`,
        destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/actor/:actorId`,
        permanent: true,
      },
      {
        source: `/${languageQueryMatcher}/posts`,
        destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/category/:content`,
        has: [{ type: 'query', key: 'content' }],
        permanent: true,
      },
      {
        source: `/posts`,
        destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/category/:content`,
        has: [{ type: 'query', key: 'content' }],
        permanent: true,
      },
      {
        source: `/${languageQueryMatcher}/posts/${postTypeQueryMatcher}/:id`,
        destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/post/video/:id`,
        permanent: true,
      },
      {
        source: `/posts/${postTypeQueryMatcher}/:id`,
        destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/post/video/:id`,
        permanent: true,
      },
      {
        source: `/${languageQueryMatcher}/${postTypeQueryMatcher}/:title`,
        destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/post/video/:id`,
        has: [{ type: 'query', key: 'id' }],
        permanent: true,
      },
      {
        source: `/${postTypeQueryMatcher}/:title`,
        destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/post/video/:id`,
        has: [{ type: 'query', key: 'id' }],
        permanent: true,
      },
    ];
  },
  rewrites,
  // Environment-specific memory settings
  // env: {
  //   // Reduce memory usage in production
  //   NODE_OPTIONS: process.env.NODE_ENV === 'production'
  //     ? '--max-old-space-size=2048'
  //     : '--max-old-space-size=4096',
  // },
  webpack: (config, { dev, isServer }) => {
    // Memory optimization for production
    if (!dev && isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
        },
      };
    }

    return config;
  },
};

module.exports = nextConfig;



// dynamicIO: true,
// esmExternals: 'loose',
// instrumentationHook: true,
// nextScriptWorkers: true,