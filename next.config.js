const languages = process.env.NEXT_PUBLIC_LOCALS.replace(' ', '|')
const locales = process.env.NEXT_PUBLIC_LOCALS.split(' ')
const allowedDomainForImages = process.env.NEXT_PUBLIC_ALLOWED_IMAGES_SOURCES.split(' ')
// const withPWA = require('next-pwa')
// const withPlugins = require('next-compose-plugins');
// const nextEnv = require('next-env');
// import { loadEnvConfig } from '@next/env'

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: true,
// })

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
    openAnalyzer: true,
})

const i18nConfig = locales?.length === 1 ? {} : {
    i18n: {
        locales,
        defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCAL,
        localeDetection: false,
    }
}

const rewrites = () => {
    return {
        beforeFiles: [
            // {
            //     source: `/post/:postType(video|post|product|article|book)`,
            //     destination: '/posts?postType=:postType' ,
            //     has: [{type: 'query', key: 'postType'}]
            // },
            {
                source: `/post`,
                destination: '/post/old/:id',
                has: [{type: 'query', key: 'id'}]
            },
            {
                source: `/video`,
                destination: '/post/old/:id',
                has: [{type: 'query', key: 'id'}]
            },
            {
                source: `/:postType(video|product|article|book|standard|promotion|learn|food|book)?/:title`,
                destination: '/post/:postType/:id',
                has: [{type: 'query', key: 'id'}]
            },
            // {
            //     source: `/post/out/:postType(video|product|article|book|standard|promotion|learn|food|book|out)?/:id`,
            //     destination: '/post/:postType/:id',
            //     has: [{type: 'query', key: 'id'},{type: 'query', key: 'postType'}]
            // },
            // {
            //     source: `/:title`,
            //     destination: '/post/undefinedType/:title',
            //     has: [{type: 'query', key: 'title'}]
            // },
            // {source: `/:locale(${languages})?/login`, destination: '/auth/login'},
            {source: `/login`, destination: '/auth/login'},
            // {source: `/:locale(${languages})?/register`, destination: '/auth/register'},
            {source: `/register`, destination: '/auth/register'},
        ],
        afterFiles: [
            {source: `/admin`, destination: '/admin', locale: false},
            {source: `/:locale(${languages})?/:postType(video|post|product|article|book)/:title`, destination: '/post'},
            {source: `/:postType(video|post|product|article|book)?/:title`, destination: '/post'},


        ],
        fallback: [
            {
                source: `/:title`,
                destination: '/post/undefinedType/:title',
                has: [{type: 'query', key: 'title'}]
            }
        ]
    }
}

const nextImageConfig = {
    images: {
        domains: allowedDomainForImages,
        deviceSizes: [320, 375, 414, 540, 640, 717, 750, 768, 828, 1024, 1080, 1200, 1920, 2048, 3840],
    },
}

// const pwaSettings = process.env.NEXT_PUBLIC_PWA ? withPWA({
//     pwa: {
//         dest: 'public',
//         register: true,
//         skipWaiting: true,
//         sw: '/sw.js'
//     }
// }) : {}

const nextConfigs = {
    ...i18nConfig,
    ...nextImageConfig,
    reactStrictMode: false,
    rewrites,
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    compiler: {
        styledComponents: true,
    }
}

//@ts-ignore
module.exports = withBundleAnalyzer(nextConfigs);

// module.exports = nextConfigs;


// module.exports = withPlugins([
//     process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_PWA === 'true' ? withPWA(pwaSettings) : {},
//     process.env.ANALYZE === 'true' ? withBundleAnalyzer :{},
//     nextEnv({
//         staticPrefix: 'NEXT_PUBLIC_',
//         publicPrefix: 'NEXT_PUBLIC_'
//     }),
//     // i18nConfig,
// ], nextConfigs);