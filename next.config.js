const {parsed: localEnv} = require('dotenv').config();
const withImages = require('next-images')
const withPlugins = require('next-compose-plugins');
const nextEnv = require('next-env');
const languages = process.env.REACT_APP_LOCALS.replace(' ', '|')
const locales = process.env.REACT_APP_LOCALS.split(' ')
//const withSass = require('@zeit/next-sass');
const withPWA = require('next-pwa')
require('webpack')

// const webpackConfig = {
//     webpack (config, options) {
//         config.module.rules.push({
//             test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
//             use: {
//                 loader: 'url-loader',
//                 options: {
//                     limit: 100000
//                 }
//             }
//         });
//         return config;
//     }
// }

const svgLoader= {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });

        return config;
    }
}
// const sassLoader= {
//     webpack(config) {
//         config.module.rules.push({
//             test: /\.scss$/,
//             use: ['style-loader','css-loader']
//         });
//
//         return config;
//     }
// }




const i18nConfig = locales.length === 1 ? {} : {
    i18n: {
        locales,
        defaultLocale: process.env.REACT_APP_DEFAULT_LOCAL,
        localeDetection: false,
    }
}
const additionalConfig = {
    onDemandEntries: {
        maxInactiveAge: 1000 * 60 * 60 * 24,
        pagesBufferLength: 200,
    },
    // cleanDistDir: false
}
const reWriteRoutes = {
    rewrites: async () => {
        return [
            {source: `/admin`, destination: '/admin', locale: false},
            {source: `/login`, destination: '/auth/login'},
            {source: `/register`, destination: '/auth/register'},
            //custom pages
            {source: `/:locale(${languages})?/page/:pageName`, destination: '/page'},
            {source: `/page/:pageName`, destination: '/page'},
            //profile pages
            {source: `/:locale(${languages})?/profile`, destination: '/profile'},
            {source: `/profile`, destination: '/profile'},

            {source: `/:locale(${languages})?/user/:username`, destination: '/user/:username'},
            {source: `/user/:username`, destination: '/user/:username'},

            {source: `/:locale(${languages})?/chatroom/:chatRoomName`, destination: '/chatroom/:chatRoomName'},
            {source: `/chatroom/:chatRoomName`, destination: '/chatroom/:chatRoomName'},
            // {source: `/:locale(${languages})?/profile/:activeTab`, destination: '/profile',has: [{ type: 'query', key: 'activeTab' }]},
            // {source: `/profile/:activeTab`, destination: '/profile',has: [{ type: 'query', key: 'activeTab' }]},
            //meta route
            {source: `/:locale(${languages})?/:metaType(categories|tags|actors)`, destination: '/meta'},
            {source: `/:metaType(categories|tags|actors)`, destination: '/meta'},
            //posts routes
            {source: `/:locale(${languages})?/:metaType(categories|tags|actors)?/:metaName`, destination: '/posts'},
            {source: `/:metaType(categories|tags|actors)?/:metaName`, destination: '/posts'},
            {source: `/:locale(${languages})?/posts`, destination: '/posts'},
            //{source: `/posts`, destination: '/posts'},
            //post routes
            {source: `/:locale(${languages})?/:postType(video|post|product|article|book)/:title`, destination: '/post'},
            {source: `/:postType(video|post|product|article|book)?/:title`, destination: '/post'},
            //auth pages
            {source: `/:locale(${languages})?/login`, destination: '/auth/login'},
            {source: `/:locale(${languages})?/register`, destination: '/auth/register'},
            {source: `/:locale(${languages})?/profile`, destination: '/profile'},
            //checkout
            {source: `/:locale(${languages})?/checkout`, destination: '/checkout'}
        ]
    }
}
const nextImageConfig = {
    images: {
        domains: process.env.REACT_APP_ALLOWED_IMAGES_SOURCES.split(' '),
        deviceSizes: [320,375,414,540, 640,717, 750,768, 828,1024, 1080, 1200, 1920, 2048, 3840],
    },
}
const pwaSettings = {
    pwa:{
        dest:'public',
        register:true,
        skipWaiting:true,
        sw: '/sw.js'
    }
}

module.exports = withPlugins([
    svgLoader,
    process.env.NODE_ENV === 'production' ? withPWA(pwaSettings) :{},
    additionalConfig,
    reWriteRoutes,
    nextImageConfig,
    withImages,
    nextEnv({
        staticPrefix: 'REACT_APP_',
        publicPrefix: 'REACT_APP_',
    }),
    i18nConfig,
]);


