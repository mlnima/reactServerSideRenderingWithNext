/** @type {import('next').NextConfig} */
const rewrites = require('./nextConfigs/rewrites')
const {postTypes} = require("data-structures");

const postTypeQueryMatcher = `:postType(${postTypes.join('|')})?`
const languageQueryMatcher = `(${process.env.NEXT_PUBLIC_LOCALES.split(' ').join('|')})`;

const imagesAllowedDomainsForNextImage = process.env?.NEXT_PUBLIC_ALLOWED_IMAGES_SOURCES?.split(' ') || []


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
        }
    ]
    return acc
}, [])

const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        serverActions: true,
    },
    rewrites,
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
                permanent: true
            },
            {
                source: `/categories/:categoryId`,
                destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/category/:categoryId`,
                permanent: true
            },
            {
                source: `/${languageQueryMatcher}/tags/:tagId`,
                destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/tag/:tagId`,
                permanent: true
            },
            {
                source: `/tags/:tagId`,
                destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/tag/:tagId`,
                permanent: true
            },
            {
                source: `/${languageQueryMatcher}/actors/:actorId`,
                destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/actor/:actorId`,
                permanent: true
            },
            {
                source: `/actors/:actorId`,
                destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/actor/:actorId`,
                permanent: true
            },
            {
                source: `/${languageQueryMatcher}/posts`,
                destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/category/:content`,
                has: [{type: 'query', key: 'content'}],
                permanent: true
            },
            {
                source: `/posts`,
                destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/category/:content`,
                has: [{type: 'query', key: 'content'}],
                permanent: true
            },
            {
                source: `/${languageQueryMatcher}/posts/${postTypeQueryMatcher}/:id`,
                destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/post/video/:id`,
                permanent: true
            },
            {
                source: `/posts/${postTypeQueryMatcher}/:id`,
                destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/post/video/:id`,
                permanent: true
            },
            {
                source: `/${languageQueryMatcher}/${postTypeQueryMatcher}/:title`,
                destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/post/video/:id`,
                has: [{type: 'query', key: 'id'}],
                permanent: true
            },
            {
                source: `/${postTypeQueryMatcher}/:title`,
                destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE}/post/video/:id`,
                has: [{type: 'query', key: 'id'}],
                permanent: true
            },
        ]
    },
    reactStrictMode: false,
    compiler: {
        styledComponents: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: allowedDomainsForNextImageConfig
    },

}

module.exports = nextConfig

// imagesX: {
//     remotePatterns: [
//         {
//             protocol: 'https',
//             hostname: '**.example.com',
//         },
//     ],
// },