const {parsed: localEnv} = require('dotenv').config();
const withImages = require('next-images')
const withPlugins = require('next-compose-plugins');
const nextEnv = require('next-env');
const languages = process.env.REACT_APP_LOCALS.replace(' ', '|')
const locales = process.env.REACT_APP_LOCALS.split(' ')
require('webpack')

const i18nConfig = locales.length === 1 ? {} : {
    i18n: {
        locales,
        defaultLocale: process.env.REACT_APP_DEFAULT_LOCAL,
        localeDetection: false,
    },
}

const additionalConfig = {
    future: {
        webpack5: true,
    },
    onDemandEntries: {
        // period (in ms) where the server will keep pages in the buffer
        maxInactiveAge: 1000 * 60 * 60 * 24,
        // number of pages that should be kept simultaneously without being disposed
        pagesBufferLength: 200,
    },
}

const reWriteRoutes = {
    rewrites: async () => {
        return [
            {source: `/admin`, destination: '/admin', locale: false},
            //meta route
            {source: `/:locale(${languages})?/:contentType(categories|tags|actors)`, destination: '/meta'},
            {source: `/:contentType(categories|tags|actors)`, destination: '/meta'},
            //posts route
            {source: `/:locale(${languages})?/posts`, destination: '/posts'},
            {source: `/posts`, destination: '/posts'},
            //post routes
            {source: `/:locale(${languages})?/:postType(video|post|product|article|book)/:title`, destination: '/post'},
            {source: `/:postType(video|post|product|article|book)?/:title`, destination: '/post'},
            //meta content
            {source: `/:locale(${languages})?/:contentType(categories|tags|actors)?/:contentName`, destination: '/posts'},
            {source: `/:contentType(categories|tags|actors)?/:contentName`, destination: '/posts'},
            //auth pages
            {source: `/:locale(${languages})?/login`, destination: '/auth/login'},
            {source: `/:locale(${languages})?/register`, destination: '/auth/register'},
            //custom pages
            {source: `/:locale(${languages})?/page/:pageName`, destination: '/page'},
            {source: `/:locale(${languages})?/profile`, destination: '/profile'},
            //checkout
            {source: `/:locale(${languages})?/checkout`, destination: '/checkout'},
        ]
    }
}

const nextImageConfig = {
    images: {
        domains: process.env.REACT_APP_ALLOWED_IMAGES_SOURCES.split(' '),
        deviceSizes: [320,375,414,540, 640,717, 750,768, 828,1024, 1080, 1200, 1920, 2048, 3840],
    },
}

module.exports = withPlugins([
    additionalConfig,
    // reDirectRoutes,
    reWriteRoutes,
    nextImageConfig,
    withImages,
    nextEnv({
        staticPrefix: 'REACT_APP_',
        publicPrefix: 'REACT_APP_',
    }),
    i18nConfig,
]);


