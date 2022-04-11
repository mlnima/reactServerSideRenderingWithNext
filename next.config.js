require('webpack')
const {parsed: localEnv} = require('dotenv').config();
const {i18n} = require('./next-i18next.config');
const withPlugins = require('next-compose-plugins');
const nextEnv = require('next-env');
const languages = process.env.NEXT_PUBLIC_LOCALS.replace(' ', '|')
const locales = process.env.NEXT_PUBLIC_LOCALS.split(' ')
const allowedDomainForImages = process.env.NEXT_PUBLIC_ALLOWED_IMAGES_SOURCES.split(' ')
//const withPWA = require('next-pwa')
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

const svgLoader = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });
        return config;
    }
}

const i18nConfig = locales?.length === 1 ? {} : {
    i18n: {
        locales,
        defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCAL,
        localeDetection: false,
    }
}

//*******************************Temporary SSG is disable************************************
// const staticPageGeneration = process.env.NEXT_PUBLIC_STATIC_PAGES === 'true' ? {
//     beforeFiles:[
//         {source: `/`, destination: '/staticIndex'},
//     ]
// } :{}


const rewrites = () => {
    return {
        beforeFiles: [
            {
                source: `/:postType(video|post|product|article|book|standard|promotion|learn|food|book)?/:title`,
                destination: '/post/:postType/:id',
                has: [{type: 'query', key: 'id'}]
            },
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
        fallback: []
    }
}

const nextImageConfig = {
    images: {
        domains: allowedDomainForImages,
        deviceSizes: [320, 375, 414, 540, 640, 717, 750, 768, 828, 1024, 1080, 1200, 1920, 2048, 3840],
    },
}

// const pwaSettings = {
//     pwa: {
//         dest: 'public',
//         register: true,
//         skipWaiting: true,
//         sw: '/sw.js'
//     }
// }

const nextConfigs = {
    env: {},
    reactStrictMode: true,
    rewrites,
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    compiler: {
        // ssr and displayName are configured by default
        styledComponents: true,
    },

}

module.exports = withPlugins([
    withCSS(withSass()),
    i18n,
    svgLoader,
    // process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_PWA === 'true' ? withPWA(pwaSettings) : {},
    nextImageConfig,
    withBundleAnalyzer,
    nextEnv({
        staticPrefix: 'NEXT_PUBLIC_',
        publicPrefix: 'NEXT_PUBLIC_'
    }),
    i18nConfig,
], nextConfigs);


// experimental: {
//     runtime: 'nodejs',
// },