const {parsed: localEnv} = require('dotenv').config();
const withImages = require('next-images')
const withPlugins = require('next-compose-plugins');
const nextEnv = require('next-env');
const languages = process.env.REACT_APP_LOCALS.replace(' ', '|')
const locales = process.env.REACT_APP_LOCALS.split(' ')

const i18nConfig = locales.length === 1 ? {} : {
    i18n: {
        locales,
        defaultLocale: process.env.REACT_APP_DEFAULT_LOCAL,
        localeDetection: false,
    },
}



const reDirectRoutes = {
    redirects: async () => {
        return [
            {
                source: '/en',
                destination: '/fa',
                permanent: false,
                // locale: true
            },
            // {
            //     source: '/',
            //     destination: '/',
            //     permanent: false,
            //     locale: false
            // },
        ]
    }
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
            //post routes
            {source: `/posts`, destination: '/posts'},
            {source: `/:locale(${languages})?/video/:title`, destination: '/post'},
            {source: `/:locale(${languages})?/post/:title`, destination: '/post'},
            {source: `/:locale(${languages})?/product/:title`, destination: '/post'},
            {source: `/:locale(${languages})?/article/:title`, destination: '/post'},
            {source: `/video/:title`, destination: '/post'},
            {source: `/post/:title`, destination: '/post'},
            {source: `/product/:title`, destination: '/post'},
            {source: `/article/:title`, destination: '/post'},
            //posts route
            {source: `/:locale(${languages})?/posts`, destination: '/posts'},
            //meta route
            {source: `/:locale(${languages})?/categories`, destination: '/meta'},
            {source: `/:locale(${languages})?/tags`, destination: '/meta'},
            {source: `/:locale(${languages})?/actors`, destination: '/meta'},
            {source: `/categories`, destination: '/meta'},
            {source: `/tags`, destination: '/meta'},
            {source: `/actors`, destination: '/meta'},
            //meta content
            {source: `/:locale(${languages})?/categories/:category`, destination: '/posts'},
            {source: `/:locale(${languages})?/tags/:tag`, destination: '/posts'},
            {source: `/:locale(${languages})?/actors/:actor`, destination: '/posts'},
            {source: `/categories/:category`, destination: '/posts'},
            {source: `/tags/:tag`, destination: '/posts'},
            {source: `/actors/:actor`, destination: '/posts'},
            //auth pages
            //
            {source: `/:locale(${languages})?/page/:pageName`, destination: '/page'},
            {source: `/:locale(${languages})?/profile`, destination: '/profile'},
            {source: `/:locale(${languages})?/checkout`, destination: '/checkout'},
            {source: `/:locale(${languages})?/login`, destination: '/auth/login'},
            {source: `/:locale(${languages})?/register`, destination: '/auth/register'},
        ]
    }
}


const nextImageConfig = {
    images: {
        domains: process.env.REACT_APP_ALLOWED_IMAGES_SOURCES.split(' '),
        deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
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
