require('webpack')
const {parsed: localEnv} = require('dotenv').config();
const {i18n} = require('./next-i18next.config');
const withImages = require('next-images')
const withPlugins = require('next-compose-plugins');
const nextEnv = require('next-env');
const languages = process.env.NEXT_PUBLIC_LOCALS.replace(' ', '|')
const locales = process.env.NEXT_PUBLIC_LOCALS.split(' ')
const withPWA = require('next-pwa')
const withCSS = require('@zeit/next-css');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');


const svgLoader = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });
        return config;
    }
}

const i18nConfig = locales.length === 1 ? {} : {
    i18n: {
        locales,
        defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCAL,
        localeDetection: false,
    }
}

const staticPageGeneration = process.env.NEXT_PUBLIC_STATIC_PAGES === 'true' ? {
    beforeFiles:[
        {source: `/`, destination: '/staticIndex'},
    ]
} :{}

const rewrites = () => {
    return {
        ...staticPageGeneration,
        afterFiles: [
            {source: `/admin`, destination: '/admin', locale: false},
            {source: `/:locale(${languages})?/:postType(video|post|product|article|book)/:title`, destination: '/post'},
            {source: `/:postType(video|post|product|article|book)?/:title`, destination: '/post'},
            {source: `/:locale(${languages})?/login`, destination: '/auth/login'},
            {source: `/login`, destination: '/auth/login'},
            {source: `/:locale(${languages})?/register`, destination: '/auth/register'},
            {source: `/register`, destination: '/auth/register'},
        ],
        fallback: []
    }
}

const redirects = () => {
    return [

    ]
}

const nextImageConfig = {
    images: {
        domains: process.env.NEXT_PUBLIC_ALLOWED_IMAGES_SOURCES.split(' '),
        deviceSizes: [320, 375, 414, 540, 640, 717, 750, 768, 828, 1024, 1080, 1200, 1920, 2048, 3840],
    },
}

const pwaSettings = {
    pwa: {
        dest: 'public',
        register: true,
        skipWaiting: true,
        sw: '/sw.js'
    }
}

const nextConfigs = {
    env: {},
    rewrites,
    // redirects
}

module.exports = withPlugins([
    withCSS({
        webpack(config, options) {
            config.plugins.push(new MonacoWebpackPlugin());
            return config;
        },
        cssLoaderOptions: { url: false }
    }),
    i18n,
    svgLoader,
    process.env.NODE_ENV === 'production'  && process.env.NEXT_PUBLIC_PWA === 'true' ? withPWA(pwaSettings) : {},
    nextImageConfig,
    withImages,
    // reWriteRoutes,
    nextEnv({
        staticPrefix: 'NEXT_PUBLIC_',
        publicPrefix: 'NEXT_PUBLIC_'
    }),
    i18nConfig,
], nextConfigs);

